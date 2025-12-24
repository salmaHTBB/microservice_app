package net.youssfi.billingservice;

import net.youssfi.billingservice.entities.Bill;
import net.youssfi.billingservice.entities.ProductItem;
import net.youssfi.billingservice.feign.CustomerRestClient;
import net.youssfi.billingservice.feign.ProductRestClient;
import net.youssfi.billingservice.model.Customer;
import net.youssfi.billingservice.model.Product;
import net.youssfi.billingservice.repository.BillRepository;
import net.youssfi.billingservice.repository.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner(BillRepository billRepository,
										ProductItemRepository productItemRepository,
										CustomerRestClient customerRestClient,
										ProductRestClient productRestClient) {
		return args -> {
			try {
				Collection<Customer> customers = customerRestClient.getAllCustomers().getContent();
				Collection<Product> products = productRestClient.getAllProducts().getContent();

				customers.forEach(customer -> {
					Bill bill = Bill.builder()
							.billingDate(new Date())
							.customerId(customer.getId())
							.build();
					billRepository.save(bill);

					products.forEach(product -> {
						ProductItem productItem = ProductItem.builder()
								.bill(bill)
								.productId(product.getId())
								.quantity(1 + new Random().nextInt(10))
								.unitPrice(product.getPrice())
								.build();
						productItemRepository.save(productItem);
					});
				});
				System.out.println("Données de test générées avec succès !");
			} catch (Exception e) {
				System.out.println("--- ATTENTION ---");
				System.out.println("Impossible de générer les données de test car Customer ou Inventory ne répondent pas encore.");
				System.out.println("Le service Billing reste quand même allumé.");
			}
		};
	}}