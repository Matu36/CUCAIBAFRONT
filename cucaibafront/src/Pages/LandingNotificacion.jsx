import React from "react";
import { motion } from "framer-motion";

const LandingNotificacion = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5 }}
    >
      <div className="mx-auto text-center" style={{ border: "2px solid gray", maxWidth:"50%"}}>
        Ud tiene 5 liquidaciones de agentes pendientes
      </div>
    </motion.div>
  );
};

export default LandingNotificacion;
