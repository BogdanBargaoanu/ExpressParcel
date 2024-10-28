package com.utcn.scdproiect.courier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/couriers")
@CrossOrigin
public class CourierController {
    @Autowired
    private CourierService courierService;
}
