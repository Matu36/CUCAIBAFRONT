const obtenerMesYAño = (fecha) => {
  const fechaObj = new Date(fecha);
  const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
  const año = fechaObj.getFullYear();
  return `${mes}/${año}`;
};

export { obtenerMesYAño };
