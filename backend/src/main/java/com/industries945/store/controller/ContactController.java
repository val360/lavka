package com.industries945.store.controller;

import com.industries945.store.dto.ContactRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @PostMapping
    public ResponseEntity<Map<String, String>> submitContactForm(@Valid @RequestBody ContactRequest request) {
        // In a real app, this would send an email or store the message
        return ResponseEntity.ok(Map.of("message",
                "Thank you for contacting us, " + request.getName() + ". We'll get back to you soon!"));
    }
}
