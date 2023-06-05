package sg.edu.nus.iss.miniproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vape {
    private String type;
    private String flavor;
    private int quantity;
    private double price;
}
