package com.utcn.scdproiect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Or just "/packages/**" for more specific mapping
                        .allowedOrigins("http://localhost:3000, http://localhost:3001") // Or "*" to allow all origins
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Important: Include OPTIONS
                        .allowedHeaders("*") // Allow all headers (or specify the ones you need)
                        .allowCredentials(true); // If you're using cookies or HTTP authentication
            }
        };
    }
}
