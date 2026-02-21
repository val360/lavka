package com.industries945.store.config;

import com.industries945.store.model.Category;
import com.industries945.store.model.Product;
import com.industries945.store.repository.CategoryRepository;
import com.industries945.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) return;

        Category bags = categoryRepository.save(Category.builder()
                .name("BAGS").slug("bags")
                .description("Premium concealed carry bags crafted for durability, comfort, and discretion.")
                .imageUrl("/images/categories/bags.jpg")
                .build());

        Category holsters = categoryRepository.save(Category.builder()
                .name("HOLSTERS").slug("holsters")
                .description("High-quality holsters designed for secure and comfortable carry.")
                .imageUrl("/images/categories/holsters.jpg")
                .build());

        Category accessories = categoryRepository.save(Category.builder()
                .name("ACCESSORIES").slug("accessories")
                .description("Essential accessories for your everyday carry needs.")
                .imageUrl("/images/categories/accessories.jpg")
                .build());

        Category bundles = categoryRepository.save(Category.builder()
                .name("BUNDLES").slug("bundles")
                .description("Save more with our curated product bundles.")
                .imageUrl("/images/categories/bundles.jpg")
                .build());

        Category giftCards = categoryRepository.save(Category.builder()
                .name("Gift Cards").slug("gift-cards")
                .description("Give the gift of choice with 945 Industries gift cards.")
                .imageUrl("/images/categories/gift-cards.jpg")
                .build());

        // BAGS
        productRepository.saveAll(List.of(
            Product.builder()
                .name("QAPS LOW PROFILE CORDURA® CONCEALMENT BAG (SMALL) BLACK WITH IWB ADAPTER")
                .slug("qaps-low-profile-cordura-concealment-bag-small-black-with-iwb-adapter")
                .description("The QAPS Small Concealment Bag is designed for minimal footprint with maximum functionality. Made from 500D CORDURA® fabric, this bag features a dedicated concealment compartment with IWB adapter for secure firearm retention. Quick-access pull tab for rapid deployment. Ambidextrous design.")
                .price(new BigDecimal("89.99"))
                .category(bags).color("Black").size("Small").material("500D CORDURA®")
                .imageUrls(List.of("/images/products/qaps-small-black-iwb.jpg"))
                .stockQuantity(50).featured(true).active(true).build(),

            Product.builder()
                .name("QAPL LOW PROFILE CORDURA® CONCEALMENT BAG (LARGE) BLACK WITH IWB ADAPTER")
                .slug("qapl-cordura-concealment-bag-large-black-with-iwb-adapter")
                .description("The QAPL Large Concealment Bag offers expanded storage while maintaining a low-profile design. Built with 500D CORDURA® fabric for exceptional durability. Features IWB adapter, multiple organizational pockets, and quick-access concealment compartment.")
                .price(new BigDecimal("109.99"))
                .category(bags).color("Black").size("Large").material("500D CORDURA®")
                .imageUrls(List.of("/images/products/qapl-large-black-iwb.jpg"))
                .stockQuantity(40).featured(true).active(true).build(),

            Product.builder()
                .name("QAPL LOW PROFILE CORDURA® CONCEALMENT BAG (LARGE) BLACK WITH KYDEX HOLSTER")
                .slug("qapl-cordura-concealment-bag-large-black-with-kydex-holster")
                .description("The QAPL Large with Kydex Holster combines our popular large concealment bag with a custom-molded Kydex holster for superior firearm retention. 500D CORDURA® construction. Quick-access design with adjustable retention.")
                .price(new BigDecimal("129.99"))
                .category(bags).color("Black").size("Large").material("500D CORDURA®")
                .imageUrls(List.of("/images/products/qapl-large-black-kydex.jpg"))
                .stockQuantity(35).featured(true).active(true).build(),

            Product.builder()
                .name("MORPH EXPANDABLE CONCEALMENT BAG CORDURA® BLACK WITH KYDEX HOLSTER")
                .slug("morph-cordura-nylon-concealment-bag-x-large-black-with-kydex-holster")
                .description("The MORPH Expandable bag transforms from a compact fanny pack to an expanded carry solution. Made with premium CORDURA® nylon and featuring our custom Kydex holster system. Expandable main compartment, quick-access concealment pocket, and adjustable waist strap.")
                .price(new BigDecimal("149.99"))
                .category(bags).color("Black").size("X-Large").material("CORDURA® Nylon")
                .imageUrls(List.of("/images/products/morph-black-kydex.jpg"))
                .stockQuantity(30).featured(true).active(true).build(),

            Product.builder()
                .name("MORPH EXPANDABLE CONCEALMENT BAG CORDURA® RANGER GREEN WITH KYDEX HOLSTER")
                .slug("morph-cordura-concealment-bag-x-large-ranger-green-with-kydex-holster")
                .description("The MORPH in Ranger Green. Same expandable design and Kydex holster system as our black variant, with a tactical Ranger Green colorway. Premium CORDURA® construction.")
                .price(new BigDecimal("149.99"))
                .category(bags).color("Ranger Green").size("X-Large").material("CORDURA® Nylon")
                .imageUrls(List.of("/images/products/morph-ranger-green-kydex.jpg"))
                .stockQuantity(25).featured(true).active(true).build(),

            Product.builder()
                .name("QAPS LOW PROFILE CORDURA® CONCEALMENT BAG (SMALL) BLACK WITH KYDEX HOLSTER")
                .slug("qaps-cordura-concealment-bag-small-black-with-kydex-holster")
                .description("Our smallest concealment bag paired with a custom Kydex holster. Perfect for subcompact firearms. 500D CORDURA® fabric, quick-access design, and adjustable retention.")
                .price(new BigDecimal("99.99"))
                .category(bags).color("Black").size("Small").material("500D CORDURA®")
                .imageUrls(List.of("/images/products/qaps-small-black-kydex.jpg"))
                .stockQuantity(45).featured(true).active(true).build(),

            Product.builder()
                .name("QAPX LOW PROFILE CORDURA® CONCEALMENT BAG (X-LARGE) BLACK WITH IWB ADAPTER")
                .slug("qapx-cordura-concealment-bag-x-large-black-with-iwb-adapter")
                .description("Our largest low-profile bag. The QAPX X-Large accommodates full-size firearms with IWB adapter. 500D CORDURA® construction, multiple pockets, and quick-access concealment compartment.")
                .price(new BigDecimal("119.99"))
                .category(bags).color("Black").size("X-Large").material("500D CORDURA®")
                .imageUrls(List.of("/images/products/qapx-xlarge-black-iwb.jpg"))
                .stockQuantity(30).featured(true).active(true).build(),

            Product.builder()
                .name("QAPX LOW PROFILE CORDURA® CONCEALMENT BAG (X-LARGE) BLACK WITH KYDEX HOLSTER")
                .slug("qapx-cordura-concealment-bag-x-large-black-with-kydex-holster")
                .description("The QAPX X-Large with Kydex holster. Maximum carry capacity with premium Kydex retention system. 500D CORDURA® fabric, ambidextrous design.")
                .price(new BigDecimal("139.99"))
                .category(bags).color("Black").size("X-Large").material("500D CORDURA®")
                .imageUrls(List.of("/images/products/qapx-xlarge-black-kydex.jpg"))
                .stockQuantity(25).featured(true).active(true).build(),

            Product.builder()
                .name("QAPL LOW PROFILE X-Pac® Black Concealment Bag (LARGE) WITH IWB ADAPTER")
                .slug("spire-l-x-pac-black-concealment-bag-with-iwb-adapter")
                .description("Premium X-Pac® material variant of our QAPL Large bag. Lightweight, waterproof, and extremely durable. Features IWB adapter and our signature quick-access design.")
                .price(new BigDecimal("139.99"))
                .category(bags).color("Black").size("Large").material("X-Pac®")
                .imageUrls(List.of("/images/products/qapl-xpac-large-black-iwb.jpg"))
                .stockQuantity(20).featured(true).active(true).build(),

            Product.builder()
                .name("QAPX LOW PROFILE X-Pac® Black Concealment Bag (X-LARGE) WITH IWB ADAPTER")
                .slug("spire-xl-x-pac-black-concealment-bag-with-iwb-adapter")
                .description("Our X-Large bag in premium X-Pac® material. Waterproof, lightweight, and built to last. IWB adapter included with quick-access concealment compartment.")
                .price(new BigDecimal("149.99"))
                .category(bags).color("Black").size("X-Large").material("X-Pac®")
                .imageUrls(List.of("/images/products/qapx-xpac-xlarge-black-iwb.jpg"))
                .stockQuantity(20).featured(true).active(true).build()
        ));

        // HOLSTERS
        productRepository.saveAll(List.of(
            Product.builder()
                .name("Universal Kydex Holster Insert")
                .slug("universal-kydex-holster-insert")
                .description("Custom-molded Kydex holster insert compatible with all 945 Industries concealment bags. Adjustable retention, universal fit for most compact and subcompact pistols.")
                .price(new BigDecimal("49.99"))
                .category(holsters).color("Black").material("Kydex")
                .imageUrls(List.of("/images/products/kydex-holster-insert.jpg"))
                .stockQuantity(100).featured(false).active(true).build(),

            Product.builder()
                .name("IWB Adapter Holster")
                .slug("iwb-adapter-holster")
                .description("Inside-the-waistband adapter for use with 945 Industries bags. Secure clip system, adjustable cant, and universal compatibility.")
                .price(new BigDecimal("39.99"))
                .category(holsters).color("Black").material("Polymer/Kydex")
                .imageUrls(List.of("/images/products/iwb-adapter.jpg"))
                .stockQuantity(80).featured(false).active(true).build(),

            Product.builder()
                .name("Full-Size Kydex Holster Insert")
                .slug("full-size-kydex-holster-insert")
                .description("Kydex holster insert designed for full-size pistols. Fits QAPX and MORPH bags. Adjustable retention and audible click retention.")
                .price(new BigDecimal("54.99"))
                .category(holsters).color("Black").material("Kydex")
                .imageUrls(List.of("/images/products/fullsize-kydex-holster.jpg"))
                .stockQuantity(60).featured(false).active(true).build()
        ));

        // ACCESSORIES
        productRepository.saveAll(List.of(
            Product.builder()
                .name("945 Industries Morale Patch")
                .slug("945-industries-morale-patch")
                .description("Hook-backed morale patch featuring the 945 Industries logo. Compatible with all loop-lined surfaces on our bags.")
                .price(new BigDecimal("12.99"))
                .category(accessories).color("Black/White").material("Woven")
                .imageUrls(List.of("/images/products/morale-patch.jpg"))
                .stockQuantity(200).featured(false).active(true).build(),

            Product.builder()
                .name("Extra Waist Strap Extension")
                .slug("extra-waist-strap-extension")
                .description("Additional waist strap extension for all 945 Industries bags. Adds up to 18 inches of adjustable length.")
                .price(new BigDecimal("14.99"))
                .category(accessories).color("Black").material("Nylon Webbing")
                .imageUrls(List.of("/images/products/strap-extension.jpg"))
                .stockQuantity(150).featured(false).active(true).build(),

            Product.builder()
                .name("Magazine Pouch Insert")
                .slug("magazine-pouch-insert")
                .description("Elastic magazine pouch insert compatible with all 945 Industries bags. Holds 1-2 magazines securely.")
                .price(new BigDecimal("19.99"))
                .category(accessories).color("Black").material("Elastic/Nylon")
                .imageUrls(List.of("/images/products/mag-pouch.jpg"))
                .stockQuantity(120).featured(false).active(true).build()
        ));

        // BUNDLES
        productRepository.saveAll(List.of(
            Product.builder()
                .name("QAPS Complete Carry Bundle")
                .slug("qaps-complete-carry-bundle")
                .description("Everything you need in one package: QAPS Small bag with Kydex holster, magazine pouch insert, and morale patch. Save 15% compared to buying separately.")
                .price(new BigDecimal("119.99"))
                .compareAtPrice(new BigDecimal("132.97"))
                .category(bundles).color("Black").size("Small")
                .imageUrls(List.of("/images/products/qaps-bundle.jpg"))
                .stockQuantity(20).featured(false).active(true).build(),

            Product.builder()
                .name("MORPH Ultimate Bundle")
                .slug("morph-ultimate-bundle")
                .description("The ultimate carry setup: MORPH Expandable bag with Kydex holster, strap extension, magazine pouch, and morale patch. Best value bundle.")
                .price(new BigDecimal("179.99"))
                .compareAtPrice(new BigDecimal("197.96"))
                .category(bundles).color("Black").size("X-Large")
                .imageUrls(List.of("/images/products/morph-bundle.jpg"))
                .stockQuantity(15).featured(false).active(true).build()
        ));

        // GIFT CARDS
        productRepository.saveAll(List.of(
            Product.builder()
                .name("$25 Gift Card")
                .slug("gift-card-25")
                .description("$25 945 Industries digital gift card. Delivered via email.")
                .price(new BigDecimal("25.00"))
                .category(giftCards)
                .imageUrls(List.of("/images/products/gift-card.jpg"))
                .stockQuantity(999).featured(false).active(true).build(),

            Product.builder()
                .name("$50 Gift Card")
                .slug("gift-card-50")
                .description("$50 945 Industries digital gift card. Delivered via email.")
                .price(new BigDecimal("50.00"))
                .category(giftCards)
                .imageUrls(List.of("/images/products/gift-card.jpg"))
                .stockQuantity(999).featured(false).active(true).build(),

            Product.builder()
                .name("$100 Gift Card")
                .slug("gift-card-100")
                .description("$100 945 Industries digital gift card. Delivered via email.")
                .price(new BigDecimal("100.00"))
                .category(giftCards)
                .imageUrls(List.of("/images/products/gift-card.jpg"))
                .stockQuantity(999).featured(false).active(true).build()
        ));

        System.out.println("✓ Seeded " + productRepository.count() + " products across " + categoryRepository.count() + " categories");
    }
}
