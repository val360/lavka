package com.industries945.store.controller;

import com.industries945.store.dto.NewsletterRequest;
import com.industries945.store.service.NewsletterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@RequiredArgsConstructor
public class NewsletterController {

    private final NewsletterService newsletterService;

    @PostMapping
    public ResponseEntity<Map<String, String>> subscribe(@Valid @RequestBody NewsletterRequest request) {
        String message = newsletterService.subscribe(request.getEmail());
        return ResponseEntity.ok(Map.of("message", message));
    }
}
