package sg.edu.nus.iss.miniproject.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryDetails {
    @Id
    private String id;
    private String userName;
    private String phoneNumber;
    private String address;
    private String deliveryNumber;
    private List<PurchasedItem> itemsPurchased;
}
