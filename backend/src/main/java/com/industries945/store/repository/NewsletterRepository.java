package com.industries945.store.repository;

import com.industries945.store.model.NewsletterSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsletterRepository extends JpaRepository<NewsletterSubscription, Long> {
    boolean existsByEmail(String email);
}
