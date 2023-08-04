import React from "react";
import "../assets/styles/detalle.css";
import { useOrdenPorLiquidacionId } from "../hooks/useOrdenesDePago";
import Spinner from "../components/UI/Spinner";
import "../assets/styles/detalle.css";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: "#F1F1F1",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  header: {
    fontWeight: "bold",
    fontSize: "12px",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#e0e0e0",
    padding: 5,
    width: "20%",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#F1F1F1",
  },
  cell: {
    padding: 5,
    flex: 1,
    borderWidth: 0.5,
    borderColor: "gray",
    fontSize: "10px",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "bold",
    fontSize: "10px",
  },
});

export const OrdenDetail = () => {
  const { liquidacion_id } = useParams();
  const { data, isFetched } =
    useOrdenPorLiquidacionId(liquidacion_id).ordenesPorIdQuery;

  const personasArray = Array.isArray(data) ? data[0] : [];

  // console.log({arrayDescripcion, arrayValores})

  const generatePDFContent = (data) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Nombre</Text>
            <Text style={[styles.cell, styles.header]}>CUIL</Text>
            <Text style={[styles.cell, styles.header]}>PD Nro</Text>
            <Text style={[styles.cell, styles.header]}>Descripción</Text>
            <Text style={[styles.cell, styles.header]}>Monto</Text>
            <Text style={[styles.cell, styles.header]}>Valor Total</Text>
          </View>
          {personasArray.map((personasData, index) => {
            return Object.entries(personasData).map(([nombre, detalles]) => {
              return (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{nombre.split(":")[1]}</Text>
                  <Text style={styles.cell}>{detalles.cuil}</Text>
                  <Text style={styles.cell}>{detalles.referencia}</Text>
                  {}
                    {detalles.items.map((item, itemIndex) => 
                    // (
                    //   <>
                    //     <View key={itemIndex}>
                    //       <Text style={{ textTransform: "lowercase" }}>
                    //         {item.descripcion}
                    //       </Text>
                    //     </View>
                    //     <View style={styles.cell}>
                    //       <Text>${item.valor_unitario.toFixed(2)}a</Text>
                    //     </View>
                    //   </>
                    // )
                    {
                      const arrayDescripcion = detalles.items.map((objeto) => objeto.descripcion);
                      const arrayValores = detalles.items.map((objeto) => objeto.valor_unitario);
                      return ( arrayDescripcion.map((v, i) => <>
                      <Text style={styles.cell}>{v}</Text>
                      {/* <Text style={styles.cell}>{arrayValores[i]}</Text> */}
                    </>))
                    })}
                 

                  <Text style={styles.cell}>
                    ${detalles.valor_total.toFixed(2)}
                  </Text>
                </View>
              );
            });
          })}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="card">
      {isFetched ? (
        <>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>CUIL</th>
                <th>PD Nro</th>
                <th>Descripción</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {personasArray.map((personasData, index) => {
                return Object.entries(personasData).map(
                  ([nombre, detalles]) => {
                    return (
                      <tr key={index}>
                        <td>{nombre.split(":")[1]}</td>
                        <td>{detalles.cuil}</td>
                        <td>{detalles.referencia}</td>
                        <td>
                          {detalles.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>Función: {item.descripcion}</span>
                              <span>
                                Valor: ${item.valor_unitario.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td>$ {detalles.valor_total.toFixed(2)}</td>
                      </tr>
                    );
                  }
                );
              })}
            </tbody>
          </table>

          <PDFDownloadLink
            document={generatePDFContent()}
            fileName="detalle_orden_pago.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Cargando documento..." : "Descargar"
            }
          </PDFDownloadLink>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
