import {
StyleSheet
} from "@react-pdf/renderer";

export const styles = StyleSheet.create({
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
  
    cbu: {
      padding: 2,
      flex: 1,
      borderWidth: 0.5,
      borderColor: "gray",
      fontSize: "10px",
      flexShrink: 1,
      flexWrap: "wrap",
      
    },
  
    cbuContainer: {
      padding: 4,
      flex: 1,
      margin:"auto",
      fontSize: 10,
      flexShrink: 1,
      flexWrap: 'wrap',
      alignItems: 'center', 
      justifyContent: 'center', 
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
  
    totalRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10,
    },
    totalText: {
      fontWeight: "bold",
      fontSize: 12,
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
      fontSize: "18px",
      color: "gray",
      paddingBottom: "15px",
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