package com.utcn.scdproiect.courier;

import com.utcn.scdproiect.courier.Courier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourierRepository extends JpaRepository<Courier, Integer> {
}
