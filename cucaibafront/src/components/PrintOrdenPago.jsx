import React from "react";
import { useParams } from "react-router-dom";
import { useOrdenPorLiquidacionId } from "../hooks/useOrdenesDePago";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
} from "@react-pdf/renderer";
import { styles } from "./OrdenDetail";
import NumberFormatter from "../utils/NumberFormatter";

export const PrintOrdenPago = ({ liquidacionId }) => {
  
 const { data, isFetched } =
    useOrdenPorLiquidacionId(liquidacionId ).ordenesPorIdQuery;

  const personasArray = Array.isArray(data) ? data[0] : [];

  const personasExceptLast = personasArray.slice(0, -1);


  return (
    <PDFDownloadLink style={{textDecoration:"none", color:"black", marginLeft:"15px"}}
      document={
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.detalletitle]}>
                  {" "}
                  Detalle de la Orden de Pago N° 
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.header]}>Nombre</Text>
                <Text style={[styles.cell, styles.header]}>Legajo</Text>
                <Text style={[styles.cell, styles.header]}>CUIL</Text>
                <Text style={[styles.cell, styles.header]}>CBU</Text>

                <Text style={[styles.cell, styles.header]}>Monto Total</Text>
              </View>
              {personasExceptLast.map((personasData, index) => {
                const { nombre, cuil, valor_total, legajo, cbu } = personasData;

                return (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{nombre}</Text>
                    <Text style={styles.cell}>{legajo}</Text>
                    <Text style={styles.cell}>{cuil}</Text>
                    <Text style={styles.cbu}>{cbu} </Text>
       
      
                    <Text style={styles.cell}>
                      $ {NumberFormatter(valor_total)}
                    </Text>
                   
                  </View>
                  
                );
              })}

              <View style={styles.totalRow}>
              <Text style={styles.totalText}>
                      Total: ${" "}
                      {personasExceptLast
                        .reduce(
                          (total, personaData) =>
                            total + personaData.valor_total,
                          0
                        )
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
              </View>
            </View>
          </Page>
        </Document>
      }
      fileName="detalle_orden_pago.pdf"

    >
   
      {({ loading }) => (loading ? "Cargando documento..." : " Imprimir Orden De Pago ")}
    </PDFDownloadLink>
  );
};

export default PrintOrdenPago;
