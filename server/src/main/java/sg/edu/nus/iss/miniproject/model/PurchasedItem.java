package sg.edu.nus.iss.miniproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchasedItem {
    private Vape vape;
    private int selectedQuantity;
}
