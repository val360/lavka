package com.industries945.store.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class AddToCartRequest {
    @NotNull
    private Long productId;

    @Min(1)
    private int quantity = 1;
}
