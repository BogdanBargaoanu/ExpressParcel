package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.courier.Courier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourierRepository extends JpaRepository<Courier, Integer> {
    @Query("SELECT c FROM Courier c WHERE c.courier_id NOT IN (SELECT p.courier_id FROM Package p WHERE p.status = 'PENDING')")
    List<Courier> findAllCouriersWithoutPendingPackages();
}
