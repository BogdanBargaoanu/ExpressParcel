package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.pkg.Package;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/couriers")
@CrossOrigin
public class CourierController {
    @Autowired
    private CourierService courierService;

    @PostMapping
    public Courier createCourier(Courier newCourier) {
        return courierService.createCourier(newCourier);
    }

    @GetMapping
    public List<Courier> getAllCouriers() {
        return courierService.getAllCouriers();
    }

    @PutMapping("/{id}")
    public Courier updateCourier(@PathVariable Integer id, @RequestBody Courier updatedCourier) {
        return courierService.updateCourier(id, updatedCourier);
    }

    @DeleteMapping("/{id}")
    public boolean deleteCourier(@PathVariable Integer id) {
        return courierService.deleteCourier(id);
    }
}
