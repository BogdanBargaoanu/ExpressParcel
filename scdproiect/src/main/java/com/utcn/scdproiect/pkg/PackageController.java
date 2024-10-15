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
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }
}
