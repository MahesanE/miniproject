package sg.edu.nus.iss.miniproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.miniproject.model.DeliveryDetails;
import sg.edu.nus.iss.miniproject.repository.DeliveryDetailsRepo;

@Service
public class DeliveryDetailsService {

    @Autowired
    private DeliveryDetailsRepo deliveryDetailsRepo;


    public DeliveryDetails saveDeliveryDetailsMongo(DeliveryDetails deliveryDetails) {
        return deliveryDetailsRepo.save(deliveryDetails);
    }

    public DeliveryDetails saveDeliveryDetailsMySQL(DeliveryDetails deliveryDetails){
        return deliveryDetailsRepo.saveMySQL(deliveryDetails);
    }


}
