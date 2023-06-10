package sg.edu.nus.iss.miniproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.miniproject.model.DeliveryDetails;
import sg.edu.nus.iss.miniproject.model.PurchasedItem;
import sg.edu.nus.iss.miniproject.model.Vape;
import sg.edu.nus.iss.miniproject.service.DeliveryDetailsService;
import sg.edu.nus.iss.miniproject.service.VapeService;

@RestController
@RequestMapping("/api/vape")
public class VapeController {

    @Autowired
    private VapeService vapeService;

    @Autowired
    private DeliveryDetailsService deliveryDetailsService;

    @GetMapping("/search")
    public List<Vape> searchVapes(@RequestParam(required = false) String flavor) {
        if (flavor != null && !flavor.isEmpty()) {
            return vapeService.searchVapes(flavor);
        } else {
            return vapeService.getAllVapes();
        }
    }

    @GetMapping("/all")
    public List<Vape> getAllVapes() {
        return vapeService.getAllVapes();
    }

    @PostMapping
    public ResponseEntity<DeliveryDetails> saveDeliveryDetails(@RequestBody DeliveryDetails deliveryDetails) {
        DeliveryDetails savedDetails = deliveryDetailsService.saveDeliveryDetails(deliveryDetails);
    
        // Update the stock quantity in MySQL
        for (PurchasedItem item : savedDetails.getItemsPurchased()) {
            Vape vape = item.getVape();
            int selectedQuantity = item.getSelectedQuantity();
            vapeService.updateStockQuantity(vape.getFlavor(), selectedQuantity);
        }
        return ResponseEntity.ok(savedDetails);
        
}
}