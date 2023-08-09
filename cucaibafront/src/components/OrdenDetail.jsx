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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ marginRight: 20 }}>
                <Image src={Logo} style={styles.logo} />
              </View>
              <View>
                <Image src={LOGOPCIA} style={styles.logopcia} />
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
                <Text style={styles.cell1}>Vº Bº</Text>
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
                  2 Fecha Imputación 31/12/2022
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
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Nombre</Text>
            <Text style={[styles.cell, styles.header]}>CUIL</Text>
            <Text style={[styles.cell, styles.header]}>PD Nro</Text>
            <Text style={[styles.cell, styles.header]}>Descripción</Text>
            <Text style={[styles.cell, styles.header]}>Monto</Text>
            <Text style={[styles.cell, styles.header]}>Valor Total</Text>
          </View>
          {personasArray.map((personasData, index) => {
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
                  <Text key={itemIndex}>{item.descripciones[0].descripcion}</Text>
                ))}
              </View>
              <View style={styles.cell}>
                {items.map((item, itemIndex) => (
                  <Text key={itemIndex}>$ {item.descripciones[0].valor_unitario.toFixed(2)}</Text>
                ))}
              </View>
              <Text style={styles.cell}>$ {valor_total.toFixed(2)}</Text>
            </View>
            );
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
      const { nombre, cuil, valor_total, items } = personasData;

      return (
        <tr key={index}>
          <td>{nombre}</td>
          <td>{cuil}</td>
          <td>
            {items.map((item, itemIndex) => (
              <div key={itemIndex}>{item.referencia}</div>
            ))}
          </td>
          <td>
            {items.map((item, itemIndex) => (
              <div key={itemIndex}>
                <div>{item.descripciones[0].descripcion}</div>
                <div>$ {item.descripciones[0].valor_unitario.toFixed(2)}</div>
              </div>
            ))}
          </td>
          <td>$ {valor_total.toFixed(2)}</td>
        </tr>
      );
    })}
  </tbody>
</table>


          <PDFDownloadLink
            document={generatePDFContent(personasArray)}
            file
            fileName="detalle_orden_pago.pdf"
          >
            {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar')}
          </PDFDownloadLink>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
