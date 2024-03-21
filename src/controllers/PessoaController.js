const Controller = require("./Controller.js");
const PessoaServices = require("../services/PessoaServices.js");

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async pegaMatriculasAtivas(req, res) {
    const { estudanteId } = req.params;
    
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudanteId));
      return res.status(200).json(listaMatriculas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async pegaTodasAsMatriculas(req, res) {
    const { estudanteId } = req.params;
    
    try {
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante(Number(estudanteId));
      return res.status(200).json(listaMatriculas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async pegaTodasAsPessoas(req, res) {
    try {
      const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodos();
      return res.status(200).json(listaTodasAsPessoas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PessoaController;
