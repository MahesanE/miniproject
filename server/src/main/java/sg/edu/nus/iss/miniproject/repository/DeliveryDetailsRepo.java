package sg.edu.nus.iss.miniproject.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.miniproject.model.DeliveryDetails;

@Repository
public class DeliveryDetailsRepo {

    @Autowired
    private MongoTemplate template;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String COLLECTION_NAME = "DeliveryDetails";

    public DeliveryDetails save(DeliveryDetails deliveryDetails) {
        return template.save(deliveryDetails, COLLECTION_NAME);
    }

    public DeliveryDetails saveMySQL(DeliveryDetails deliveryDetails) {
        String sql = "INSERT INTO delivery_details (userId, phoneNumber, address, postalCode, unitNumber, comments, deliveryNumber) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, deliveryDetails.getUser().getId(), deliveryDetails.getPhoneNumber(),
                deliveryDetails.getAddress(), deliveryDetails.getPostalCode(), deliveryDetails.getUnitNumber(),
                deliveryDetails.getComments(), deliveryDetails.getDeliveryNumber());
        return deliveryDetails;
    }

}