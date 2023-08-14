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
import LOGOPCIA from "../assets/images/LOGOPCIA.png";
import { NumerosALetras } from "numero-a-letras";


const styles = StyleSheet.create({
  page: {
    flexDirection: "row",

    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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
    width: 150,
    height: 40,
  },

  hr: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    width: "100%",
  },
  hr1: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    width: "100%",
  },

  text: {
    fontSize: "10px",
  },

  detalletitle: {
fontSize:"18px",
 color:"gray",
 paddingBottom:"15px",
 


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
  logopcia: {
    maxWidth: "70%",
    marginLeft: 60,
  },
  cell1: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 80,
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginVertical: 5,
  },

  pdfdownloadbutton: {
    color: "white",
    backgroundColor: "#419bf6",
    padding: 10,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 16,
    textDecoration: "none",
    width: "120px",
    marginTop: 20,
    transition: "background-color 0.8s",
    marginRight: 10,
    textAlign: "center",
  },
});

const numberInWords = (number) => NumerosALetras(number);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export const OrdenDetail = () => {
  const { liquidacion_id } = useParams();
  const { data, isFetched } =
    useOrdenPorLiquidacionId(liquidacion_id).ordenesPorIdQuery;

  const personasArray = Array.isArray(data) ? data[0] : [];
  const personasExceptLast = personasArray.slice(0, -1);

  const gastos = personasArray[personasArray.length - 1];

  const generatePDFContent = (personasExceptLast) => (
    <Document>
      <Page size="A4">
        <View>
          <View style={{ marginTop: 40, marginLeft: 60 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ marginRight: 20 }}>
                <Image src={Logo} style={styles.logo} />
              </View>
              <View>
                <Image src={LOGOPCIA} style={styles.logopcia} />
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  ORDEN DE PAGO SAMO N°{" "}
                  {gastos.gastos.da_op_nro ? gastos.gastos.da_op_nro : null}/
                  {gastos.gastos.da_op_anio}{" "}
                </Text>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  Fecha de Emisión :{" "}
                  {formatDate(gastos.gastos.op_fecha_emision)}
                </Text>
              </View>
            </View>
            <View style={{ marginLeft: 60 }}>
              <Text style={styles.text}>FORMULARIO 20 EOC</Text>
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
              <Text style={[styles.text, { marginBottom: 10 }]}>
                CANTIDAD DE PESOS: ${" "}
                {gastos.gastos.op_monto ? gastos.gastos.op_monto : null}
              </Text>{" "}
              <Text style={[styles.text, { marginBottom: 10 }]}>
                POR LA SUMA DE PESOS:{" "}
                {numberInWords(gastos.gastos.op_monto).replace(
                  / 00\/100 M\.N\.$/,
                  ""
                )}
                .-
              </Text>{" "}
              <Text style={[styles.text, { marginBottom: 10 }]}>
                EN CONCEPTO DE PAGOS DE VARIABLES DE PROCURACION
              </Text>
              <Text style={styles.text}>
                CON CARGO A LA CUENTA ESPECIAL 52880/3 FONDO SOLIDARIO DE
                TRANSPLANTE
              </Text>
              <Text style={styles.text}>SAMO DECRETO LEY 8801/77</Text>
              <Text style={styles.text}>
                EJERCICIO {gastos.gastos.da_op_anio}{" "}
                {gastos.gastos.op_codinstitucional
                  ? gastos.gastos.op_codinstitucional
                  : null}{" "}
                {gastos.gastos.op_jurisdiccion
                  ? gastos.gastos.op_jurisdiccion
                  : null}
                {gastos.gastos.op_jurisauxiliar
                  ? gastos.gastos.op_jurisauxiliar
                  : null}{" "}
                {gastos.gastos.op_entidad ? gastos.gastos.entidad : null}{" "}
                CATEGORIA PROG:{" "}
                <Text style={styles.text}>
                  {gastos.gastos.op_programa ? gastos.gastos.op_programa : null}
                </Text>{" "}
              </Text>{" "}
              <Text style={[styles.text, { marginBottom: 10 }]}>
                FUENTE DE FINANCIAMIENTO: PROCEDENCIA{" "}
                {gastos.gastos.op_procedencia} - FUENTE{" "}
                {gastos.gastos.op_fuente}
              </Text>{" "}
              <Text style={styles.text}>Inciso 3</Text>
              <Text style={[styles.text, { marginBottom: 10 }]}>
                3.5.5 : ${" "}
                {gastos.gastos.op_monto ? gastos.gastos.op_monto : null}
              </Text>{" "}
              <Text style={[styles.text, { marginLeft: 60, marginBottom: 10 }]}>
                TOTAL IMPUTADO: ${" "}
                {gastos.gastos.op_monto ? gastos.gastos.op_monto : null}
              </Text>{" "}
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
                <Text style={styles.cell1}>Vº Bº</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>
                  1 Fecha Liquidación del gasto{" "}
                  {formatDate(gastos.gastos.op_fecha_emision ? gastos.gastos.op_fecha_emision : null )}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>
                  2 Fecha Imputación{" "}
                  {formatDate(gastos.gastos.da_fecha_dispo ? gastos.gastos.da_fecha_dispo : null)}
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
              <View style={[styles.hr1, { marginBottom: 10 }]}></View>
              <Text style={styles.cellText}>
                Firma y Sello del Administrador
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Text style={[styles.detalletitle]}> Detalle de la Orden de Pago </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Nombre</Text>
            <Text style={[styles.cell, styles.header]}>CUIL</Text>
            <Text style={[styles.cell, styles.header]}>PD Nro</Text>
            <Text style={[styles.cell, styles.header]}>Descripción</Text>
            <Text style={[styles.cell, styles.header]}>Monto</Text>
            <Text style={[styles.cell, styles.header]}>Monto Total</Text>
          </View>
          {personasExceptLast.map((personasData, index) => {
            const { nombre, cuil, items, valor_total } = personasData;

            return (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{nombre}</Text>
                <Text style={styles.cell}>{cuil}</Text>
                <View style={styles.cell}>
                  {items.map((item, itemIndex) => (
                    <Text key={itemIndex}>{item.referencia}</Text>
                  ))}
                </View>
                <View style={styles.cell}>
                  {items.map((item, itemIndex) => (
                    <View key={itemIndex}>
                      {item.descripciones.map((descripcion, descIndex) => (
                        <Text key={descIndex}>{descripcion.descripcion}</Text>
                      ))}
                    </View>
                  ))}
                </View>
                <View style={styles.cell}>
                  {items.map((item, itemIndex) => (
                    <View key={itemIndex}>
                      {item.descripciones.map((descripcion, descIndex) => (
                        <Text key={descIndex}>
                          $ {descripcion.valor_unitario.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
                <Text style={styles.cell}>$ {valor_total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="card">
      <h1> Órden de Pago </h1>
      <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
        Detalle de la órden de pago
      </h5>
      <br />
      {isFetched ? (
        <>
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>CUIL</th>
                  <th>PD Nro</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Monto Total</th>
                </tr>
              </thead>
              <tbody>
                {personasExceptLast.map((personasData, index) => {
                  const { nombre, cuil, valor_total, items } = personasData;
                  const rowSpan = items.length;

                  return items.map((item, itemIndex) => (
                    <tr key={index + "-" + itemIndex}>
                      {itemIndex === 0 && <td rowSpan={rowSpan}>{nombre}</td>}
                      {itemIndex === 0 && <td rowSpan={rowSpan}>{cuil}</td>}
                      <td>{item.referencia}</td>
                      <td>
                        {item.descripciones.map((descripcion, descIndex) => (
                          <div key={descIndex}>{descripcion.descripcion}</div>
                        ))}
                      </td>
                      <td>
                        {item.descripciones.map((descripcion, descIndex) => (
                          <div key={descIndex}>
                            $ {descripcion.valor_unitario.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </div>
                        ))}
                      </td>
                      {itemIndex === 0 && (
                        <td rowSpan={rowSpan}>$ {valor_total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                      )}
                    </tr>
                  ));
                })}
              </tbody>
            </table>

            <div className="w-100 d-flex justify-content-end align-items-center">
              <PDFDownloadLink
                document={generatePDFContent(personasExceptLast)}
                file
                fileName="detalle_orden_pago.pdf"
                style={styles.pdfdownloadbutton}
              >
                {({ loading }) =>
                  loading ? "Cargando documento..." : "Descargar"
                }
              </PDFDownloadLink>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
