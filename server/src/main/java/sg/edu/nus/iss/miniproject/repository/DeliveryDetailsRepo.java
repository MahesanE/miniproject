package sg.edu.nus.iss.miniproject.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;
import sg.edu.nus.iss.miniproject.model.DeliveryDetails;

@Repository
public class DeliveryDetailsRepo {

    @Autowired
    private MongoTemplate template;

    private final String COLLECTION_NAME = "DeliveryDetails";

    public DeliveryDetails save(DeliveryDetails deliveryDetails) {
        return template.save(deliveryDetails, COLLECTION_NAME);
    }
}
