package com.industries945.store.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class NewsletterRequest {
    @NotBlank @Email
    private String email;
}
