package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.pkg.Package;
import com.utcn.scdproiect.pkg.PackageStatus;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class CourierService {
    @Autowired
    private CourierRepository courierRepository;

    // GetAll
    public List<Courier> getAllCouriers() {
        return courierRepository.findAll();
    }

    // Create
    @Transactional
    public Courier createCourier(Courier newCourier) {
        if (courierRepository.existsByEmail(newCourier.getEmail())) {
            throw new IllegalArgumentException("Courier with email " + newCourier.getEmail() + " already exists");
        }
        return courierRepository.save(newCourier);
    }

    // Login Courier
    public Courier loginCourier(String email, String password) {
        return courierRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new EntityNotFoundException("Courier with email " + email + " and password " + password + " not found"));
    }

    // Update
    @Transactional
    public Courier updateCourier(Integer id, Courier updatedCourier) {
        // Validate the input courier
        if (updatedCourier == null) {
            throw new IllegalArgumentException("Updated courier cannot be null");
        }

        return courierRepository.findById(id)
                .map(existingCourier -> {
                    existingCourier.setName(updatedCourier.getName());
                    existingCourier.setEmail(updatedCourier.getEmail());
                    existingCourier.setPassword(updatedCourier.getPassword());
                    existingCourier.setManager(updatedCourier.getManager());
                    return courierRepository.save(existingCourier);
                })
                .orElseThrow(() -> new EntityNotFoundException("Courier with ID " + id + " not found"));
    }

    // Delete
    @Transactional
    public boolean deleteCourier(Integer id) {
        try {
            if (courierRepository.existsById(id)) {
                courierRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    // Set manager for courier
    @Transactional
    public Courier setManagerForCourier(Integer courierId, Integer managerId) {
        // Validate the input courier
        if (courierId < 0 || managerId < 0 || courierId.equals(managerId)) {
            throw new IllegalArgumentException("Courier ID's cannot be negative or equal");
        }
        Courier manager = courierRepository.findById(managerId)
                .orElseThrow(() -> new EntityNotFoundException("Manager with ID " + managerId + " not found"));

        return courierRepository.findById(courierId)
                .map(existingCourier -> {
                    existingCourier.setManager(manager);
                    return courierRepository.save(existingCourier);
                })
                .orElseThrow(() -> new EntityNotFoundException("Courier with ID " + courierId + " not found"));
    }

    // Get couriers without pending packages
    public List<Courier> getAllCouriersWithoutPendingPackages() {
        return courierRepository.findAllCouriersWithoutPendingPackages(PackageStatus.PENDING);
    }

    // Get all managers and delivered number
    public List<Object[]> getAllManagersAndDeliveredNumber() {
        return courierRepository.findAllManagersAndDeliveredNumber(PackageStatus.DELIVERED);
    }
}
