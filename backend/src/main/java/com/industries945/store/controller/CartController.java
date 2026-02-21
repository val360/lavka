package com.industries945.store.controller;

import com.industries945.store.dto.AddToCartRequest;
import com.industries945.store.dto.CartDto;
import com.industries945.store.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDto> getCart(@RequestHeader(value = "X-Session-Id", required = true) String sessionId) {
        return ResponseEntity.ok(cartService.getOrCreateCart(sessionId, null));
    }

    @PostMapping("/items")
    public ResponseEntity<CartDto> addToCart(
            @RequestHeader("X-Session-Id") String sessionId,
            @Valid @RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(sessionId, request));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartDto> updateQuantity(
            @RequestHeader("X-Session-Id") String sessionId,
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateCartItemQuantity(sessionId, itemId, quantity));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartDto> removeItem(
            @RequestHeader("X-Session-Id") String sessionId,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeFromCart(sessionId, itemId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@RequestHeader("X-Session-Id") String sessionId) {
        cartService.clearCart(sessionId);
        return ResponseEntity.noContent().build();
    }
}
