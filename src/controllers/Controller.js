const converteIds = require("../utils/conversorStringHelper.js");

class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;

    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(
        Number(id)
      );
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);

    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(
        where
      );
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;

    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(
        dadosParaCriacao
      );
      return res.status(201).json(novoRegistroCriado);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async atualiza(req, res) {
    const { ...params } = req.params;
    const dadosAtualizados = req.body;
    const where = converteIds(params);

    try {
      const foiAtualizado = await this.entidadeService.atualizaResgistro(
        dadosAtualizados,
        ...where
      );

      if (!foiAtualizado) {
        return res.status(400).json({ message: `Registro não foi atualizado` })
      }

      return res.status(200).json({ message: `Registro atualizado` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async exclui(req, res) {
    const { id } = req.params;

    try {
      await this.entidadeService.excluiRegistro(id);
      return res.status(200).json({ message: `${id} deletado` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = Controller;
