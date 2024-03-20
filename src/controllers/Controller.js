class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (error) {
      return res.status(500).json(`Ocorreu um error: ${error}`);
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
      return res.status(500).json(`Ocorreu um error: ${error}`);
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
      return res.status(500).json(`Ocorreu um error: ${error}`);
    }
  }

  async atualiza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      const foiAtualizado = await this.entidadeService.atualizaResgistro(
        dadosAtualizados,
        Number(id)
      );

      if (!foiAtualizado) {
        return res.status(400).json({ message: `Registro não foi atualizado` })
      }

      return res.status(200).json({ message: `Registro atualizado` });
    } catch (error) {}
  }

  async exclui(req, res) {
    const { id } = req.params;

    try {
      await this.entidadeService.excluiRegistro(id);
      return res.status(200).json({ message: `${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = Controller;
