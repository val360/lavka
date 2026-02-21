package com.industries945.store.service;

import com.industries945.store.dto.AddToCartRequest;
import com.industries945.store.dto.CartDto;
import com.industries945.store.dto.CartItemDto;
import com.industries945.store.model.Cart;
import com.industries945.store.model.CartItem;
import com.industries945.store.model.Product;
import com.industries945.store.repository.CartRepository;
import com.industries945.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    private static final BigDecimal FREE_SHIPPING_THRESHOLD = new BigDecimal("99.99");
    private static final BigDecimal SHIPPING_COST = new BigDecimal("9.99");

    @Transactional
    public CartDto getOrCreateCart(String sessionId, Long userId) {
        Cart cart;
        if (userId != null) {
            cart = cartRepository.findByUserId(userId).orElseGet(() -> {
                Cart newCart = Cart.builder().build();
                newCart.setUser(null); // will be set later
                newCart.setSessionId(sessionId);
                return cartRepository.save(newCart);
            });
        } else {
            cart = cartRepository.findBySessionId(sessionId).orElseGet(() -> {
                Cart newCart = Cart.builder().sessionId(sessionId).build();
                return cartRepository.save(newCart);
            });
        }
        return toDto(cart);
    }

    @Transactional
    public CartDto addToCart(String sessionId, AddToCartRequest request) {
        Cart cart = cartRepository.findBySessionId(sessionId).orElseGet(() -> {
            Cart newCart = Cart.builder().sessionId(sessionId).build();
            return cartRepository.save(newCart);
        });

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(request.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cart.getItems().add(newItem);
        }

        cart = cartRepository.save(cart);
        return toDto(cart);
    }

    @Transactional
    public CartDto updateCartItemQuantity(String sessionId, Long itemId, int quantity) {
        Cart cart = cartRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (quantity <= 0) {
            cart.getItems().removeIf(item -> item.getId().equals(itemId));
        } else {
            cart.getItems().stream()
                    .filter(item -> item.getId().equals(itemId))
                    .findFirst()
                    .ifPresent(item -> item.setQuantity(quantity));
        }

        cart = cartRepository.save(cart);
        return toDto(cart);
    }

    @Transactional
    public CartDto removeFromCart(String sessionId, Long itemId) {
        Cart cart = cartRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(item -> item.getId().equals(itemId));
        cart = cartRepository.save(cart);
        return toDto(cart);
    }

    @Transactional
    public void clearCart(String sessionId) {
        cartRepository.findBySessionId(sessionId).ifPresent(cart -> {
            cart.getItems().clear();
            cartRepository.save(cart);
        });
    }

    private CartDto toDto(Cart cart) {
        var items = cart.getItems().stream().map(item -> {
            Product p = item.getProduct();
            BigDecimal lineTotal = p.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            return CartItemDto.builder()
                    .id(item.getId())
                    .productId(p.getId())
                    .productName(p.getName())
                    .productSlug(p.getSlug())
                    .productImage(p.getImageUrls().isEmpty() ? null : p.getImageUrls().get(0))
                    .price(p.getPrice())
                    .quantity(item.getQuantity())
                    .lineTotal(lineTotal)
                    .build();
        }).toList();

        BigDecimal subtotal = items.stream()
                .map(CartItemDto::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal shipping = subtotal.compareTo(FREE_SHIPPING_THRESHOLD) >= 0
                ? BigDecimal.ZERO : SHIPPING_COST;

        int itemCount = items.stream().mapToInt(CartItemDto::getQuantity).sum();

        return CartDto.builder()
                .id(cart.getId())
                .items(items)
                .subtotal(subtotal)
                .shipping(shipping)
                .total(subtotal.add(shipping))
                .itemCount(itemCount)
                .build();
    }
}
