const express = require("express");
const pessoas = require("./pessoasRoute");
const categorias = require("./categoriaRoute");
const cursos = require("./cursosRoute");

module.exports = (app) => {
  app.use(express.json(),
    pessoas,
    categorias,
    cursos
  );
};
