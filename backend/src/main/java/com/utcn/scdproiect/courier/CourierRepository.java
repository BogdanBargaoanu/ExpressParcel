package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.courier.Courier;
import com.utcn.scdproiect.pkg.Package;
import com.utcn.scdproiect.pkg.PackageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface CourierRepository extends JpaRepository<Courier, Integer> {
    // Find all couriers who have no packages with a specific status
    @Query("SELECT c FROM Courier c WHERE c.id NOT IN (SELECT p.courier.id FROM Package p WHERE p.status = :status)")
    List<Courier> findAllCouriersWithoutPendingPackages(@Param("status") PackageStatus status);

    // Find all manager IDs and their corresponding number of packages (based on status)
    @Query("SELECT c.manager.id AS id, c.manager.name AS name, c.manager.email AS email, COUNT(p) AS packages FROM Package p JOIN p.courier c WHERE p.status = :status AND c.manager.id IS NOT NULL GROUP BY c.manager.id")
    List<Object[]> findAllManagersAndDeliveredNumber(@Param("status") PackageStatus status);

    // Check if a courier with a specific email exists
    boolean existsByEmail(String email);

    // Find a courier by email and password
    @Query("SELECT c FROM Courier c WHERE c.email = :email AND c.password = :password")
    Optional<Courier> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}
