package com.utcn.scdproiect.pkg;

import com.utcn.scdproiect.courier.Courier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    @Transactional
    public Package updatePackage(Integer id, Package updatedPackage) {
        Optional<Package> existingPackageOpt = packageRepository.findById(id);
        if (existingPackageOpt.isPresent()) {
            Package existingPackage = existingPackageOpt.get();
            existingPackage.setCourier(updatedPackage.getCourier());
            existingPackage.setDeliveryAddress(updatedPackage.getDeliveryAddress());
            existingPackage.setPayOnDelivery(updatedPackage.isPayOnDelivery());
            existingPackage.setStatus(updatedPackage.getStatus());
            return packageRepository.save(existingPackage);
        } else {
            throw new RuntimeException("Package not found with id " + id);
        }
    }
    //TODO: DELETE
    //TODO: chestii din readme

    //public List<Package> getPackagesForCourier(Courier courier) {
        //return packageRepository.findBy<Courier>(courier);
    //}
}
