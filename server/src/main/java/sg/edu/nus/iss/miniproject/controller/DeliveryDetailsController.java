package sg.edu.nus.iss.miniproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.miniproject.model.DeliveryDetails;
import sg.edu.nus.iss.miniproject.model.PurchasedItem;
import sg.edu.nus.iss.miniproject.model.User;
import sg.edu.nus.iss.miniproject.model.Vape;
import sg.edu.nus.iss.miniproject.service.DeliveryDetailsService;
import sg.edu.nus.iss.miniproject.service.UserService;
import sg.edu.nus.iss.miniproject.service.VapeService;


@RestController
@RequestMapping("/api/deliverydetails")
public class DeliveryDetailsController {

    @Autowired
    private DeliveryDetailsService deliveryDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private VapeService vapeService;

    @PostMapping("/mongo")
    public ResponseEntity<DeliveryDetails> saveDeliveryDetailsMongo(@RequestBody DeliveryDetails deliveryDetails) {
        // Save the delivery details to MongoDB
        DeliveryDetails savedDetails = deliveryDetailsService.saveDeliveryDetailsMongo(deliveryDetails);

        for (PurchasedItem item : savedDetails.getItemsPurchased()) {
            Vape vape = item.getVape();
            int selectedQuantity = item.getSelectedQuantity();
            System.out.println(
                    "Updating stock quantity for flavor: " + vape.getFlavor() + ", quantity: " + selectedQuantity);
            vapeService.updateStockQuantity(vape.getFlavor(), selectedQuantity);
        }
        return ResponseEntity.ok(savedDetails);
    }

    @PostMapping("/mysql")
    @Transactional
    public ResponseEntity<DeliveryDetails> saveDeliveryDetailsMySQL(@RequestBody DeliveryDetails deliveryDetails) {

        User user = deliveryDetails.getUser();
        user = userService.saveUser(user);
        deliveryDetails.setUser(user);

        // Save the delivery details to MySQL
        DeliveryDetails savedDetails = deliveryDetailsService.saveDeliveryDetailsMySQL(deliveryDetails);

        // for (PurchasedItem item : savedDetails.getItemsPurchased()) {
        //     Vape vape = item.getVape();
        //     int selectedQuantity = item.getSelectedQuantity();
        //     System.out.println(
        //             "Updating stock quantity for flavor: " + vape.getFlavor() + ", quantity: " + selectedQuantity);
        //     vapeService.updateStockQuantity(vape.getFlavor(), selectedQuantity);
        // }
        return ResponseEntity.ok(savedDetails);
    }
}

// @PostMapping
// public ResponseEntity<DeliveryDetails> saveDeliveryDetails(@RequestBody
// DeliveryDetails deliveryDetails) {
// System.out.println("Saving the following delivery details: " +
// deliveryDetails.toString());
// DeliveryDetails savedDetails =
// deliveryDetailsService.saveDeliveryDetails(deliveryDetails);
// for (PurchasedItem item : savedDetails.getItemsPurchased()) {
// Vape vape = item.getVape();
// int selectedQuantity = item.getSelectedQuantity();
// System.out.println("Updating stock quantity for flavor: " + vape.getFlavor()
// + ", quantity: " + selectedQuantity);
// vapeService.updateStockQuantity(vape.getFlavor(), selectedQuantity);
// }
// return ResponseEntity.ok(savedDetails);
// }
