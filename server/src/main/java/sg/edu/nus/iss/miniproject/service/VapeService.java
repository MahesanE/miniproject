package sg.edu.nus.iss.miniproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sg.edu.nus.iss.miniproject.model.Vape;

@Service
public class VapeService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public final String RELX_SQL = "SELECT * FROM pods_data WHERE type = 'RELX Pods'";
    public final String RONE_SQL = "SELECT * FROM pods_data WHERE type = 'RONE Pods'";
    public final String RELX_FLAVOUR_SQL = "SELECT * FROM pods_data WHERE type = 'RELX Pods' AND flavor LIKE ?";
    public final String ALL_FLAVOUR_SQL = "SELECT * FROM pods_data WHERE LOWER(flavor) LIKE LOWER(?)";
    public final String ALL_VAPE_SQL = "SELECT * FROM pods_data";
    public final String UPDATE_QUANTITY_SQL = "UPDATE pods_data SET quantity = quantity - ? WHERE flavor = ?";

    public List<Vape> getAllRelxPods() {
        return jdbcTemplate.query(RELX_SQL, (resultSet, rowNum) -> new Vape(
                resultSet.getString("type"),
                resultSet.getString("flavor"),
                resultSet.getInt("quantity"),
                resultSet.getDouble("price")));   // Added price
    }

    public List<Vape> getAllRonePods() {
        return jdbcTemplate.query(RONE_SQL, new BeanPropertyRowMapper<>(Vape.class));
    }

    public List<Vape> searchRelxPods(String flavor) {
        return jdbcTemplate.query(RELX_FLAVOUR_SQL,
                ps -> ps.setString(1, "%" + flavor + "%"),
                (resultSet, rowNum) -> new Vape(
                        resultSet.getString("type"),
                        resultSet.getString("flavor"),
                        resultSet.getInt("quantity"),
                        resultSet.getDouble("price")));  // Added price
    }

    public List<Vape> searchVapes(String flavor){
        String searchQuery = "%" + flavor + "%"; // to find flavor anywhere in the string
        return jdbcTemplate.query(ALL_FLAVOUR_SQL, new BeanPropertyRowMapper<>(Vape.class), searchQuery);
    }

    public List<Vape> getAllVapes() {
        return jdbcTemplate.query(ALL_VAPE_SQL, new BeanPropertyRowMapper<>(Vape.class));
    }

    @Transactional
    public void updateStockQuantity(String flavor, int quantity) {
        jdbcTemplate.update(UPDATE_QUANTITY_SQL, quantity, flavor);
    }
}
