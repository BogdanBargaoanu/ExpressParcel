package com.utcn.scdproiect.pkg;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Package, Integer> {
    List<Package> findByCourierId(Integer courierId);
}
