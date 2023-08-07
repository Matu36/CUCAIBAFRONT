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
  Image,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import Logo from "../assets/images/LOGOSAMO.jpg";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    // backgroundColor: "#E4E4E4",
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

  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    maxWidth: "40%",
    maxHeight: "70%",
  },

  hr: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    width: "100%",
  },

  text: {
    fontSize: "10px",
  },
  container: {
    border: 2,
    borderColor: "#000",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: "80%",
    marginLeft: 60,
  },
  table: {
    flexDirection: "column",
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  cellText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  columnSeparator: {
    borderRightWidth: 1,
    borderColor: "#000",
  },
});

export const OrdenDetail = () => {
  const { liquidacion_id } = useParams();
  const { data, isFetched } =
    useOrdenPorLiquidacionId(liquidacion_id).ordenesPorIdQuery;

  const personasArray = Array.isArray(data) ? data[0] : [];
  console.log(personasArray);

  const generatePDFContent = (personasArray) => (
    <Document>
      <Page size="A4">
        <View>
          <View style={{ marginTop: 40, marginLeft: 60 }}>
            <Image src={Logo} style={styles.logo} />
            <br />
            <br />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.text}>FORMULARIO 20 EOC </Text>
            </View>

            <View style={{ marginTop: 40, maxWidth: "90%" }}>
              <View style={[styles.hr, { marginBottom: 10 }]}></View>
              <Text style={[styles.text, { marginBottom: 10 }]}>
                ESTABLECIMIENTO: HOSPITAL ZONAL GENERAL AGUDOS DR. ISIDORO
                IRIARTE
              </Text>
              <Text style={[styles.text, { marginBottom: 10 }]}>
                POR TESORERIA PAGUESE: VARIABLES OPERATIVOS{" "}
              </Text>{" "}
              //dinamico
              <Text style={[styles.text, { marginBottom: 10 }]}>
                CANTIDAD DE PESOS: 1.736,11
              </Text>{" "}
              //dinamico
              <Text style={[styles.text, { marginBottom: 10 }]}>
                POR LA SUMA DE PESOS:mil setecientos treinta y seis con once
                centavos.-
              </Text>{" "}
              //dinamico
              <Text style={[styles.text, { marginBottom: 10 }]}>
                EN CONCEPTO DE PAGOS DE VARIABLES DE PROCURACION
              </Text>
              <Text style={styles.text}>
                CON CARGO A LA CUENTA ESPECIAL 52880/3 FONDO SOLIDARIO DE
                TRANSPLANTE
              </Text>
              <Text style={styles.text}>SAMO DECRETO LEY 8801/77</Text>
              <Text style={styles.text}>
                EJERCICIO 2022//DINAMICO//, C.INSTITUCIONAL 1.1.1. JURISD 12
                JURIS AUXILIAR 01 ENTIDAD 0 CATEGORIA PROG:
              </Text>{" "}
              //ORDENPAGOH
              <Text style={styles.text}>
                PRG 022 ACT 1 FONDOS PROVINCIALES DE LA SALUD - ART 22° LEY
                8801. FINALIDAD 3 - FUNCION 1.
              </Text>{" "}
              //ORDENPAGOH
              <Text style={[styles.text, { marginBottom: 10 }]}>
                FUENTE DE FINANCIAMIENTO: PROCEDENCIA 1 - FUENTE 2.
              </Text>{" "}
              //ORDENPAGOH
              <Text style={styles.text}>Inciso 3</Text>
              <Text style={[styles.text, { marginBottom: 10 }]}>
                3.5.5 : 1.736,11
              </Text>{" "}
              //DINAMICO
              <Text style={[styles.text, { marginLeft: 60, marginBottom: 10 }]}>
                TOTAL IMPUTADO: 1.736,11
              </Text>{" "}
              //DINAMICO
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>INTERVENCION</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>Vº Bº</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>
                  1 Fecha Liquidación del gasto 31/12/2022
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>
                  2 Fecha Imputación: 31/12/2022
                </Text>
              </View>
              <View style={styles.tableCell}>{/* Celda vacía */}</View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>3 Folio Libro de Banco 5</Text>
              </View>
              <View style={styles.tableCell}>{/* Celda vacía */}</View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>4 Nro.Cheque/Transferencia</Text>
              </View>

              <View style={styles.tableCell}></View>
            </View>
          </View>
          <View>
            <View style={styles.tableCell}></View>
            <View
              style={[
                styles.tableCell,
                { alignItems: "flex-end", marginTop: 100 },
              ]}
            >
              {/* Adjust the styling of this cell */}
              <Text style={styles.cellText}>
                Firma y Sello del Administrador
              </Text>
            </View>
          </View>
        </View>
      </Page>
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
                  <View style={styles.cell}>
                    {detalles.items.map((item, itemIndex) => (
                      <>
                        <View key={itemIndex}>
                          <Text style={{ textTransform: "lowercase" }}>
                            {item.descripcion}
                          </Text>
                        </View>
                      </>
                    ))}
                  </View>
                  <View style={styles.cell}>
                    {detalles.items.map((item, itemIndex) => (
                      <>
                        <View key={itemIndex}></View>
                        <Text>$ {item.valor_unitario.toFixed(2)}</Text>
                      </>
                    ))}
                  </View>

                  <Text style={styles.cell}>
                    $ {detalles.valor_total.toFixed(2)}
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
            document={generatePDFContent(personasArray)}
            file
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
