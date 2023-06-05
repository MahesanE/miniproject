// package sg.edu.nus.iss.miniproject.CSVtoMYSQL;

// import org.apache.commons.csv.CSVFormat;
// import org.apache.commons.csv.CSVRecord;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.ClassPathResource;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.stereotype.Service;

// import java.io.FileReader;
// import java.io.IOException;
// import java.io.Reader;
// import java.sql.SQLException;
// import java.util.logging.Logger;

// @Service
// public class CSVtoMySQLService {

//     @Autowired
//     private JdbcTemplate jdbcTemplate;

//     private static final Logger LOGGER = Logger.getLogger(CSVtoMySQLService.class.getName());

//     public void loadDataFromCSVToMySQL() throws IOException, SQLException {
//         String sql = "INSERT INTO pods_data (type, flavor, quantity, price) VALUES (?, ?, ?, ?)";

//         try (Reader in = new FileReader(new ClassPathResource("testing.csv").getFile())) {
//             Iterable<CSVRecord> records = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(in);
//             for (CSVRecord record : records) {
//                 String relxFlavor = record.get("RELX Pods");
//                 String relxQty = record.get("RELX QTY");
//                 String relxPrice = record.get("RELX Price");
//                 String roneFlavor = record.get("RONE Pods");
//                 String roneQty = record.get("RONE QTY");
//                 String ronePrice = record.get("RONE Price");  

//                 try {
//                     if (relxFlavor != null && !relxFlavor.isBlank() && relxQty != null && !relxQty.isBlank() && isNumeric(relxQty) && relxPrice != null && !relxPrice.isBlank() && isNumeric(relxPrice) && Double.parseDouble(relxPrice) > 0) {
//                         jdbcTemplate.update(sql, "RELX Pods", relxFlavor, Integer.parseInt(relxQty), Double.parseDouble(relxPrice));
//                     } else {
//                         LOGGER.warning("Invalid data for RELX Pod: " + relxFlavor);
//                     }

//                     if (roneFlavor != null && !roneFlavor.isBlank() && roneQty != null && !roneQty.isBlank() && isNumeric(roneQty) && ronePrice != null && !ronePrice.isBlank() && isNumeric(ronePrice) && Double.parseDouble(ronePrice) > 0) {
//                         jdbcTemplate.update(sql, "RONE Pods", roneFlavor, Integer.parseInt(roneQty), Double.parseDouble(ronePrice));
//                     } else {
//                         LOGGER.warning("Invalid data for RONE Pod: " + roneFlavor);
//                     }
//                 } catch (NumberFormatException ex) {
//                     LOGGER.warning("Number format exception for pod: " + relxFlavor + " or " + roneFlavor);
//                 }
//             }
//         }
//     }

//     private static boolean isNumeric(String str) {
//         if (str == null) {
//             return false;
//         }
//         try {
//             double d = Double.parseDouble(str);
//         } catch (NumberFormatException nfe) {
//             return false;
//         }
//         return true;
//     }
// }


