package sg.edu.nus.iss.miniproject.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import sg.edu.nus.iss.miniproject.model.DeliveryDetails;
import sg.edu.nus.iss.miniproject.model.PurchasedItem;
import sg.edu.nus.iss.miniproject.model.User;
import sg.edu.nus.iss.miniproject.model.Vape;
import sg.edu.nus.iss.miniproject.service.EmailService;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public void sendEmail(@RequestBody Map<String, Object> payload) {

        System.out.println(">>>>>PAYLOAD: " + payload);
        ObjectMapper mapper = new ObjectMapper();
        User user = mapper.convertValue(payload.get("user"), User.class);
        DeliveryDetails deliveryDetails = mapper.convertValue(payload.get("deliveryDetails"), DeliveryDetails.class);

        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        String content = "Dear " + user.getUserName() + ",\n\n";
        content += "Your order has been placed with the following details:\n";
        content += "Address: " + deliveryDetails.getAddress() + "\n";
        content += "Postal Code: " + deliveryDetails.getPostalCode() + "\n";
        content += "Unit number: " + deliveryDetails.getUnitNumber() + "\n";
        content += "Phone Number: " + deliveryDetails.getPhoneNumber() + "\n";
        content += "Delivery Number: " + deliveryDetails.getDeliveryNumber() + "\n";
        content += "Comments: " + deliveryDetails.getComments() + "\n";
        content += "Items Purchased:\n";
        for (PurchasedItem item : deliveryDetails.getItemsPurchased()) {
            Vape vape = item.getVape();
            content += "- " + vape.getType() + " " + vape.getFlavor() + " (Quantity: " + item.getSelectedQuantity()
                    + ", Price: $" + vape.getPrice() + ")\n";
        }

        content += "Your items will be delivered to you in 24 hours.\n";
        content += "Please remember to save this email until your delivery has been complete! \n";
        content += "Thank you for shopping with NotAVapeStore!! We hope to see you soon!! :) \n";

        emailService.sendEmail(user.getEmail(), "VapeStore Order Confirmation: " + deliveryDetails.getDeliveryNumber(),
                content);
    }

}

// @PostMapping("/send")
// public void sendEmail(@RequestBody DeliveryDetails deliveryDetails){
// String content = "Dear " + deliveryDetails.getUserName() + ",\n\n";
// content += "Your order has been placed with the following details:\n";
// content += "Address: " + deliveryDetails.getAddress() + "\n";
// content += "Postal Code: " + deliveryDetails.getPostalCode() + "\n";
// content += "Unit number: " + deliveryDetails.getUnitNumber() + "\n";
// content += "Phone Number: " + deliveryDetails.getPhoneNumber() + "\n";
// content += "Delivery Number: " + deliveryDetails.getDeliveryNumber() + "\n";
// content += "Comments: " + deliveryDetails.getComments() + "\n";
// content += "Items Purchased:\n";
// for (PurchasedItem item : deliveryDetails.getItemsPurchased()) {
// Vape vape = item.getVape();
// content += "- " + vape.getType() + " " + vape.getFlavor() + " (Quantity: " +
// item.getSelectedQuantity() + ", Price: $" + vape.getPrice() + ")\n";
// }

// content += "Your items will be delivered to you in 24 hours.\n";
// content += "Please remember to save this email until your delivery has been
// complete! \n";
// content += "Thank you for shopping with us!! We hope to see you soon!! :)
// \n";

// emailService.sendEmail(deliveryDetails.getEmail(), "VapeStore Order
// Confirmation: " + deliveryDetails.getDeliveryNumber(), content);
// }
   

