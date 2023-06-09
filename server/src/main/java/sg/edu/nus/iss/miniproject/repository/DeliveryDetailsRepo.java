package sg.edu.nus.iss.miniproject.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.miniproject.model.DeliveryDetails;

@Repository
public class DeliveryDetailsRepo {
    private MongoTemplate template;

    private final MongoTemplate mongoTemplate;

    @Autowired
    public DeliveryDetailsRepo(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public DeliveryDetails save(DeliveryDetails deliveryDetails) {
        return mongoTemplate.save(deliveryDetails);
    }
}
