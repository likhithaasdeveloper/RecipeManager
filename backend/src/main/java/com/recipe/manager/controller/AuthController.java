package com.recipe.manager.controller;

import com.recipe.manager.model.User;
import com.recipe.manager.repository.UserRepository;
import com.recipe.manager.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils; // INJECT JWT UTILS

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email is already taken!");
            return ResponseEntity.badRequest().body(error);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("USER");
        } else {
            user.setRole(user.getRole().toUpperCase());
        }

        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                
                // GENERATE REAL SIGNED JWT TOKEN
                String token = jwtUtils.generateToken(user.getEmail(), user.getRole());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                
                Map<String, String> userData = new HashMap<>();
                userData.put("name", user.getName());
                userData.put("email", user.getEmail());
                userData.put("role", user.getRole());
                
                response.put("user", userData);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, String> error = new HashMap<>();
        error.put("message", "Invalid email or password!");
        return ResponseEntity.status(401).body(error);
    }
}