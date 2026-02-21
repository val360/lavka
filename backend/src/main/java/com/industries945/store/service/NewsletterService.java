package com.industries945.store.service;

import com.industries945.store.model.NewsletterSubscription;
import com.industries945.store.repository.NewsletterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewsletterService {

    private final NewsletterRepository newsletterRepository;

    public String subscribe(String email) {
        if (newsletterRepository.existsByEmail(email)) {
            return "Already subscribed!";
        }
        NewsletterSubscription sub = NewsletterSubscription.builder().email(email).build();
        newsletterRepository.save(sub);
        return "Successfully subscribed!";
    }
}
