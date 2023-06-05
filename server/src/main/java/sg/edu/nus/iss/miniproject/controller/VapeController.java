package sg.edu.nus.iss.miniproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.miniproject.model.Vape;
import sg.edu.nus.iss.miniproject.service.VapeService;

@RestController
@RequestMapping("/api/vape")
public class VapeController {

    @Autowired
    private VapeService vapeService;

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
}

    

