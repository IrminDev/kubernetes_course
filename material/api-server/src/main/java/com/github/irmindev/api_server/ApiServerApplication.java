package com.github.irmindev.api_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.github.irmindev")
public class ApiServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiServerApplication.class, args);
	}
}
