package com.recipe.manager.controller;

import com.recipe.manager.model.User;
import com.recipe.manager.repository.UserRepository;
import com.recipe.manager.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

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

        user.setEnabled(true);
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
                String token = jwtUtils.generateToken(user.getEmail(), user.getRole());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                
                Map<String, Object> userData = new HashMap<>();
                userData.put("name", user.getName());
                userData.put("email", user.getEmail());
                userData.put("role", user.getRole());
                userData.put("enabled", user.getEnabled());
                
                response.put("user", userData);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, String> error = new HashMap<>();
        error.put("message", "Invalid email or password!");
        return ResponseEntity.status(401).body(error);
    }

    // GET ALL CREATORS FOR ADMIN (FLEXIBLE ROLE MATCHING)
    @GetMapping("/creators")
    public ResponseEntity<List<Map<String, Object>>> getAllCreators() {
        List<User> creators = userRepository.findAll().stream()
                .filter(u -> u.getRole() != null && u.getRole().toUpperCase().contains("CREATOR"))
                .collect(Collectors.toList());

        List<Map<String, Object>> response = creators.stream().map(c -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("name", c.getName());
            map.put("email", c.getEmail());
            map.put("enabled", c.getEnabled());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // TOGGLE CREATOR ENABLED / DISABLED STATUS
    @PutMapping("/creators/{id}/toggle-status")
    public ResponseEntity<?> toggleCreatorStatus(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            boolean currentStatus = user.getEnabled() != null ? user.getEnabled() : true;
            user.setEnabled(!currentStatus);
            userRepository.save(user);

            Map<String, Object> res = new HashMap<>();
            res.put("message", "Creator status updated successfully");
            res.put("enabled", user.getEnabled());
            return ResponseEntity.ok(res);
        }).orElse(ResponseEntity.notFound().build());
    }

    // FETCH CURRENT STATUS BY EMAIL
    @GetMapping("/user-status")
    public ResponseEntity<?> getUserStatus(@RequestParam String email) {
        return userRepository.findByEmail(email).map(user -> {
            Map<String, Object> res = new HashMap<>();
            res.put("email", user.getEmail());
            res.put("enabled", user.getEnabled());
            return ResponseEntity.ok(res);
        }).orElse(ResponseEntity.notFound().build());
    }
}