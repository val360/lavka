package com.industries945.store.service;

import com.industries945.store.dto.ProductDto;
import com.industries945.store.model.Product;
import com.industries945.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findByActiveTrue().stream()
                .map(this::toDto)
                .toList();
    }

    public ProductDto getProductBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Product not found: " + slug));
    }

    public ProductDto getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    public List<ProductDto> getProductsByCategory(String categorySlug) {
        return productRepository.findByCategorySlugAndActiveTrue(categorySlug).stream()
                .map(this::toDto)
                .toList();
    }

    public List<ProductDto> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue().stream()
                .map(this::toDto)
                .toList();
    }

    public List<ProductDto> searchProducts(String query) {
        return productRepository.searchProducts(query).stream()
                .map(this::toDto)
                .toList();
    }

    public ProductDto toDto(Product p) {
        return ProductDto.builder()
                .id(p.getId())
                .name(p.getName())
                .slug(p.getSlug())
                .description(p.getDescription())
                .price(p.getPrice())
                .compareAtPrice(p.getCompareAtPrice())
                .categorySlug(p.getCategory() != null ? p.getCategory().getSlug() : null)
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .imageUrls(p.getImageUrls())
                .color(p.getColor())
                .size(p.getSize())
                .material(p.getMaterial())
                .stockQuantity(p.getStockQuantity())
                .featured(p.getFeatured())
                .active(p.getActive())
                .build();
    }
}
