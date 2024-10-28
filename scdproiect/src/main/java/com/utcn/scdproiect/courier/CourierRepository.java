package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.courier.Courier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourierRepository extends JpaRepository<Courier, Integer> {
    @Query("SELECT * FROM Courier c WHERE c.courier_id NOT IN (SELECT p.courier_id FROM Package p WHERE p.status = 'PENDING')")
    List<Courier> findAllCouriersWithoutPendingPackages();

    @Query("SELECT c.manager_id, COUNT(p.id) FROM package p JOIN courier c WHERE p.status = 'DELIVERED' GROUP BY c.manager_id")
    List<Object[]> findAllManagersAndDeliveredNumber();
}
