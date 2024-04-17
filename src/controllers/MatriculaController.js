const Controller = require("./Controller.js");
const MatriculaServices = require("../services/MatriculaService.js");

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculasPorEstudante =
        await MatriculaServices.pegaEContaRegistros({
          estudante_id: Number(estudante_id),
          status: "matriculado",
        });
      return res.status(200).json(listaMatriculasPorEstudante);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MatriculaController;
