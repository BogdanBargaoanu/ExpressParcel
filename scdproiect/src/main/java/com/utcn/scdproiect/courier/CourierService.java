package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.pkg.Package;
import com.utcn.scdproiect.pkg.PackageStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return courierRepository.save(newCourier);
    }

    // Update
    @Transactional
    public Courier updateCourier(Integer id, Courier updatedCourier) {
        try {
            Optional<Courier> existingCourierOpt = courierRepository.findById(id);
            if (existingCourierOpt.isPresent()) {
                Courier existingCourier = existingCourierOpt.get();
                existingCourier.setName(updatedCourier.getName());
                existingCourier.setEmail(updatedCourier.getEmail());
                existingCourier.setManager(updatedCourier.getManager());
                return courierRepository.save(existingCourier);
            } else {
                Courier failed = new Courier();
                failed.setId(-1);
                return failed;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            Courier failed = new Courier();
            failed.setId(-1);
            return failed;
        }
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
        try {
            Optional<Courier> courierOpt = courierRepository.findById(courierId);
            Optional<Courier> managerOpt = courierRepository.findById(managerId);
            if (courierOpt.isPresent() && managerOpt.isPresent()) {
                Courier courier = courierOpt.get();
                Courier manager = managerOpt.get();
                courier.setManager(manager);
                return courierRepository.save(courier);
            } else {
                Courier failed = new Courier();
                failed.setId(-1);
                return failed;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            Courier failed = new Courier();
            failed.setId(-1);
            return failed;
        }
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
