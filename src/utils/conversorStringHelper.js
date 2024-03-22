module.exports = (objetoParams) => {
  for (let propriedades in objetoParams) {
    if (/Id|id/.test(propriedades)) {
      objetoParams[propriedades] = Number(objetoParams[propriedades]);
    }
  }
  return objetoParams;
};
