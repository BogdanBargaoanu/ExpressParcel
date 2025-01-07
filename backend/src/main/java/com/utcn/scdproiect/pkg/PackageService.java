package com.utcn.scdproiect.pkg;

import com.utcn.scdproiect.courier.Courier;
import com.utcn.scdproiect.mail.MailService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {
    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private MailService mailService;

    // GetAll
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    // Get By AWB
    public List<Package> getPackageByAwb(String awb) {
        return packageRepository.findByAwb(awb);
    }

    // Create
    @Transactional
    public Package createPackage(Package newPackage) {
        return packageRepository.save(newPackage);
    }

    // Update
    @Transactional
    public Package updatePackage(Integer id, Package updatedPackage) {
        // Validate the input package
        if (updatedPackage == null) {
            throw new IllegalArgumentException("Updated package cannot be null");
        }

        return packageRepository.findById(id)
                .map(existingPackage -> {
                    existingPackage.setCourier(updatedPackage.getCourier());
                    existingPackage.setDeliveryAddress(updatedPackage.getDeliveryAddress());
                    existingPackage.setPayOnDelivery(updatedPackage.isPayOnDelivery());
                    existingPackage.setStatus(updatedPackage.getStatus());
                    existingPackage.setPackageEmail(updatedPackage.getPackageEmail());
                    existingPackage.setAwb(updatedPackage.getAwb());
                    return packageRepository.save(existingPackage);
                })
                .orElseThrow(() -> new EntityNotFoundException("Package with ID " + id + " not found"));
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

    // Deliver package
    @Transactional
    public Package deliverPackage(Integer id) {
        return packageRepository.findById(id)
                .map(existingPackage -> {
                    existingPackage.setStatus(PackageStatus.DELIVERED);
                    mailService.sendEmail(
                            existingPackage.getPackageEmail(),
                            "Package Delivered",
                            "Your package has been delivered." + existingPackage.getAwb() + " has been delivered to " + existingPackage.getDeliveryAddress()
                    );
                    return packageRepository.save(existingPackage);
                })
                .orElseThrow(() -> new EntityNotFoundException("Package with ID " + id + " not found"));
    }

    // Get packages for courier
    public List<Package> getPackagesForCourier(Integer courierId) {
        return packageRepository.findByCourierId(courierId);
    }
}
