package sg.edu.nus.iss.miniproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sg.edu.nus.iss.miniproject.model.DeliveryDetails;
import sg.edu.nus.iss.miniproject.service.DeliveryDetailsService;

@RestController
@RequestMapping("/api/deliverydetails")
public class DeliveryDetailsController {

    @Autowired
    private DeliveryDetailsService deliveryDetailsService;

    @PostMapping
    public ResponseEntity<DeliveryDetails> saveDeliveryDetails(@RequestBody DeliveryDetails deliveryDetails) {
        System.out.println("Saving the following delivery details: " + deliveryDetails.toString());
        DeliveryDetails savedDetails = deliveryDetailsService.saveDeliveryDetails(deliveryDetails);
        return ResponseEntity.ok(savedDetails);
    }
}
