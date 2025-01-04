package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.pkg.Package;
import com.utcn.scdproiect.utils.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/couriers")
public class CourierController {
    @Autowired
    private CourierService courierService;

    @PostMapping
    public Courier createCourier(@RequestBody Courier newCourier) {
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

    @PutMapping
    public Courier setManagerForCourier(@RequestParam Integer courierId, @RequestParam Integer managerId) {
        return courierService.setManagerForCourier(courierId, managerId);
    }

    @GetMapping("/no-pending-packages")
    public List<Courier> getAllCouriersWithoutPendingPackages() {
        return courierService.getAllCouriersWithoutPendingPackages();
    }

    @GetMapping("/delivered-by-managers")
    public List<Object[]> getAllManagersAndDeliveredNumber() {
        return courierService.getAllManagersAndDeliveredNumber();
    }

    @PostMapping("/login")
    public Courier loginCourier(@RequestBody LoginRequest loginRequest) {
        return courierService.loginCourier(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
