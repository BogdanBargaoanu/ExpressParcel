package com.utcn.scdproiect.pkg;

import com.utcn.scdproiect.courier.Courier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PackageService {
    @Autowired
    private PackageRepository packageRepository;

    // GetAll
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    // Create
    @Transactional
    public Package createPackage(Package newPackage) {
        return packageRepository.save(newPackage);
    }

    //TODO: Update
    //TODO: DELETE
    //TODO: chestii din readme

    //public List<Package> getPackagesForCourier(Courier courier) {
        //return packageRepository.findBy<Courier>(courier);
    //}
}
