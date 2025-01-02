package com.utcn.scdproiect.pkg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/packages")
@CrossOrigin
public class PackageController {
    @Autowired
    private PackageService packageService;

    @PostMapping
    public Package createPackage(Package newPackage) {
        return packageService.createPackage(newPackage);
    }

    @GetMapping
    public List<Package> getAllPackages() { return packageService.getAllPackages(); }

    @PutMapping("/{id}")
    public Package updatePackage(@PathVariable Integer id, @RequestBody Package updatedPackage) {
        return packageService.updatePackage(id, updatedPackage);
    }

    @DeleteMapping("/{id}")
    public boolean deletePackage(@PathVariable Integer id) {
        return packageService.deletePackage(id);
    }

    @GetMapping("/courier/{courierId}")
    public List<Package> getPackagesForCourier(@PathVariable Integer courierId) {
        return packageService.getPackagesForCourier(courierId);
    }

    @PutMapping("/deliver/{id}")
    public Package deliverPackage(@PathVariable Integer id) {
        return packageService.deliverPackage(id);
    }
}
