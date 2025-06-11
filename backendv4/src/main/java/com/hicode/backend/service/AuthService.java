package com.hicode.backend.service;

import com.hicode.backend.dto.AuthResponse;
import com.hicode.backend.dto.LoginRequest;
import com.hicode.backend.dto.RegisterRequest;
import com.hicode.backend.model.entity.BloodType;
import com.hicode.backend.model.entity.Role;
import com.hicode.backend.model.entity.User;
import com.hicode.backend.repository.BloodTypeRepository;
import com.hicode.backend.repository.RoleRepository;
import com.hicode.backend.repository.UserRepository;
import com.hicode.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private BloodTypeRepository bloodTypeRepository;

    @Transactional
    public User registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Error: Email is already in use!");
        }
        if (userRepository.existsByUsername(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Error: Username (derived from email) is already taken!");
        }

        User user = new User();
        user.setFullName(registerRequest.getFullName());
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhone(registerRequest.getPhone());
        user.setAddress(registerRequest.getAddress());

        // --- PHẦN THÊM MỚI ---
        user.setDateOfBirth(registerRequest.getDateOfBirth());
        // --- KẾT THÚC PHẦN THÊM MỚI ---

        if (registerRequest.getBloodTypeId() != null) {
            Optional<BloodType> bloodTypeOptional = bloodTypeRepository.findById(registerRequest.getBloodTypeId());
            user.setBloodType(bloodTypeOptional.orElse(null));
        }

        Role userRole = roleRepository.findByName("Member")
                .orElseThrow(() -> new RuntimeException("Error: Role 'Member' not found. Please run DataInitializer."));
        user.setRole(userRole);

        return userRepository.save(user);
    }

    public AuthResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + loginRequest.getEmail()));

        return new AuthResponse(jwt, user.getId(), user.getEmail(), user.getFullName(), user.getRole().getName());
    }
}