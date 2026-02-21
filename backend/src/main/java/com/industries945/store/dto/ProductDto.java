package com.industries945.store.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductDto {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private BigDecimal compareAtPrice;
    private String categorySlug;
    private String categoryName;
    private List<String> imageUrls;
    private String color;
    private String size;
    private String material;
    private Integer stockQuantity;
    private Boolean featured;
    private Boolean active;
}
