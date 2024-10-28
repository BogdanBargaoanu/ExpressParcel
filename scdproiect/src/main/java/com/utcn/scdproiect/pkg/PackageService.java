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

    // Update
    @Transactional
    public Package updatePackage(Integer id, Package updatedPackage) {
        try {
            Optional<Package> existingPackageOpt = packageRepository.findById(id);
            if (existingPackageOpt.isPresent()) {
                Package existingPackage = existingPackageOpt.get();
                existingPackage.setCourier(updatedPackage.getCourier());
                existingPackage.setDeliveryAddress(updatedPackage.getDeliveryAddress());
                existingPackage.setPayOnDelivery(updatedPackage.isPayOnDelivery());
                existingPackage.setStatus(updatedPackage.getStatus());
                return packageRepository.save(existingPackage);
            } else {
                Package failed = new Package();
                failed.setId(-1);
                return failed;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            Package failed = new Package();
            failed.setId(-1);
            return failed;
        }
    }

    // Delete
    @Transactional
    public boolean deletePackage(Integer id) {
        try {
            if (packageRepository.existsById(id)) {
                packageRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    // Get packages for courier
    public List<Package> getPackagesForCourier(Integer courierId) {
        return packageRepository.findByCourierId(courierId);
    }
}
