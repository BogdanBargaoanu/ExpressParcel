package com.utcn.scdproiect.pkg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/packages")
public class PackageController {
    @Autowired
    private PackageService packageService;

    @PostMapping
    public Package createPackage(@RequestBody Package newPackage) {
        return packageService.createPackage(newPackage);
    }

    @GetMapping
    public List<Package> getAllPackages() { return packageService.getAllPackages(); }

    @GetMapping("/find")
    public List<Package> getPackageByAwb(@RequestParam("awb") String awb) {
        return packageService.getPackageByAwb(awb);
    }

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
