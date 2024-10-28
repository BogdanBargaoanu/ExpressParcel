package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.pkg.Package;
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
                existingCourier.setManager_id(updatedCourier.getManager_id());
                return courierRepository.save(existingCourier);
            } else {
                Courier failed = new Courier();
                failed.setCourierId(-1);
                return failed;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            Courier failed = new Courier();
            failed.setCourierId(-1);
            return failed;
        }
    }

    // Delete
    @Transactional
    public boolean deleteCourier(Integer courier_id) {
        try {
            if (courierRepository.existsById(courier_id)) {
                courierRepository.deleteById(courier_id);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
}
