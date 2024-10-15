package com.utcn.scdproiect;

import org.springframework.boot.SpringApplication;

public class TestScdproiectApplication {

	public static void main(String[] args) {
		SpringApplication.from(ScdproiectApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
