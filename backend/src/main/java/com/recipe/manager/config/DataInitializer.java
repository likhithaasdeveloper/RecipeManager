package com.recipe.manager.config;

import com.recipe.manager.model.User;
import com.recipe.manager.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed default system admin if missing
            if (!userRepository.existsByEmail("admin@recipe.com")) {
                User admin = new User();
                admin.setName("System Admin");
                admin.setEmail("admin@recipe.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println(">>> Default Admin account created: admin@recipe.com / admin123");
            }
        };
    }
}