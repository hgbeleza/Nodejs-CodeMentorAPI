'use strict';

const isCpfValido = require("../../utils/validaCpfHelper.js");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        as: 'aulasMatriculadas',
        scope: { status: 'matriculado' }
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        as: 'todasAsMatriculas',
      });
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          agrs: [3, 30],
          msg: 'O nome deve ter no mínimo 3 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Formato de e-mail inválido'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        cpfEhValido: (cpf) => {
          if (!isCpfValido(cpf)) throw new Error('Cpf inválido');
        }
      },
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      todosOsRegistros: {
        
      }
    },
  });
  return Pessoa;
};