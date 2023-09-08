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
  Image,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import Logo from "../assets/images/LOGOSAMO.jpg";
import LOGOPCIA from "../assets/images/LOGOPCIA.png";
import { NumerosALetras } from "numero-a-letras";
import NumberFormatter from "../utils/NumberFormatter";
import { styles } from "./styles/StylesPdf";

//Componente, que dentro de Ver órdenes de Pago, muestra los datos del agente dentro del Honorario creado, el operativo y las funciones que
//desempeñó, asi como el monto unitario y el monto total; Da la posibilidad de Descargar el PDF.

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

  //PDF

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
                  Fecha de Emisión :
                  {gastos.gastos.op_fecha_emision
                    ? formatDate(gastos.gastos.op_fecha_emision)
                    : "------"}
                </Text>
              </View>
            </View>
            <View style={{ marginLeft: 60 }}>
              <Text style={styles.text}>FORMULARIO 20 EOC</Text>
            </View>

            <View style={{ marginTop: 40, maxWidth: "90%" }}>
              <View style={styles.hr}></View>
              <Text style={{ ...styles.text, marginBottom: 10 }}>
                ESTABLECIMIENTO: HOSPITAL ZONAL GENERAL AGUDOS DR. ISIDORO
                IRIARTE
              </Text>
              <Text style={{ ...styles.text, marginBottom: 10 }}>
                POR TESORERIA PAGUESE: VARIABLES OPERATIVOS{" "}
              </Text>{" "}
              <Text style={{ ...styles.text, marginBottom: 10 }}>
                CANTIDAD DE PESOS: ${" "}
                {gastos.gastos.op_monto
                  ? NumberFormatter(gastos.gastos.op_monto)
                  : null}
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
                {gastos.gastos.op_monto
                  ? NumberFormatter(gastos.gastos.op_monto)
                  : null}
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
                  1 Fecha Liquidación del gasto:
                  {gastos.gastos.op_fecha_emision
                    ? formatDate(gastos.gastos.op_fecha_emision)
                    : "------"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.cellText}>
                  2 Fecha Imputación:
                  {gastos.gastos.op_fecha_emision
                    ? formatDate(gastos.gastos.da_fecha_dispo)
                    : "------"}
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
        {!gastos.gastos.op_fecha_emision && (
          <View style={styles.marcaAgua}>
            <Text>No válido</Text>
          </View>
        )}
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.detalletitle]}>
              {" "}
              Detalle de la Orden de Pago{" "}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Nombre</Text>
            <Text style={[styles.cell, styles.header]}>Legajo</Text>
            <Text style={[styles.cell, styles.header]}>CUIL</Text>
            <Text style={[styles.cell, styles.header]}>PD Nro</Text>
            <Text style={[styles.cell, styles.header]}>Descripción</Text>
            <Text style={[styles.cell, styles.header]}>Monto</Text>
            <Text style={[styles.cell, styles.header]}>Monto Total</Text>
          </View>
          {personasExceptLast.map((personasData, index) => {
            const { nombre, cuil, items, valor_total, legajo } = personasData;

            return (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{nombre}</Text>
                <Text style={styles.cell}>{legajo}</Text>
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
                          $ {NumberFormatter(descripcion.valor_unitario)}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
                <Text style={styles.cell}>
                  $ {NumberFormatter(valor_total)}
                </Text>
              </View>
            );
          })}
        </View>
        {!gastos.gastos.op_fecha_emision && (
          <View
            style={{
              ...styles.marcaAgua,
              width: "500px",
            }}
          >
            <Text>No válido</Text>
          </View>
        )}
      </Page>
    </Document>
  );

  //Vista de la pagina en el navegador

  return (
    <div>
      {isFetched ? (
        <>
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Legajo</th>
                  <th>CUIL</th>
                  <th>PD Nro</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Monto Total</th>
                </tr>
              </thead>
              <tbody>
                {personasExceptLast.map((personasData, index) => {
                  const { nombre, legajo, cuil, valor_total, items } =
                    personasData;
                  const rowSpan = items.length;

                  return items.map((item, itemIndex) => (
                    <tr key={index + "-" + itemIndex}>
                      {itemIndex === 0 && <td rowSpan={rowSpan}>{nombre}</td>}
                      {itemIndex === 0 && <td rowSpan={rowSpan}>{legajo}</td>}
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
                            ${" "}
                            {descripcion.valor_unitario
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </div>
                        ))}
                      </td>
                      {itemIndex === 0 && (
                        <td rowSpan={rowSpan}>
                          ${" "}
                          {valor_total
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
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
