import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getModulos } from "../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";

const LandingNotificacion = () => {
  let dispatch = useDispatch();
  const liquidaciones = useSelector((state) => state.modulos);

  let primerArreglo = [];
  if (liquidaciones.length > 1) {
    primerArreglo = liquidaciones[1][0];
  }

  const [modulo, setModulo] = useState(primerArreglo);

  useEffect(() => {
    dispatch(getModulos());
  }, []);

  useEffect(() => {
    setModulo(primerArreglo);
  }, [primerArreglo]);

  return (
    <>
      {primerArreglo.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5 }}
          style={{
            margin: "20px auto",
            padding: "10px",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "50%",
          }}
        >
          <div
            className="mx-auto text-center"
            style={{
              padding: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
            }}
          >
            Ud tiene {primerArreglo.length} liquidaciones de agentes pendientes
          </div>
        </motion.div>
      )}
    </>
  );
};

export default LandingNotificacion;
