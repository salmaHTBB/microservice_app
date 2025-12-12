
package net.youssfi.billingservice.web;

import net.youssfi.billingservice.entities.ProductItem;

import net.youssfi.billingservice.entities.Bill;
import net.youssfi.billingservice.feign.CustomerRestClient;
import net.youssfi.billingservice.feign.ProductRestClient;
import net.youssfi.billingservice.repository.BillRepository;
import net.youssfi.billingservice.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillRestController {
    private final BillRepository billRepository;
    private final ProductItemRepository productItemRepository;
    private final CustomerRestClient customerRestClient;
    private final ProductRestClient productRestClient;

    public BillRestController(BillRepository billRepository,
                            ProductItemRepository productItemRepository,
                            CustomerRestClient customerRestClient,
                            ProductRestClient productRestClient) {
        this.billRepository = billRepository;
        this.productItemRepository = productItemRepository;
        this.customerRestClient = customerRestClient;
        this.productRestClient = productRestClient;
    }
    
    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        List<Bill> bills = billRepository.findAll();
        bills.forEach(this::loadBillDetails);
        return ResponseEntity.ok(bills);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable Long id) {
        return billRepository.findById(id)
                .map(bill -> {
                    loadBillDetails(bill);
                    return ResponseEntity.ok(bill);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    private void loadBillDetails(Bill bill) {
        bill.setCustomer(customerRestClient.getCustomerById(bill.getCustomerId()));
        bill.getProductItems().forEach(productItem -> {
            productItem.setProduct(productRestClient.getProductById(productItem.getProductId()));
        });
    }
    
    @PostMapping
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {
        bill.setId(null); // Ensure new ID is generated

        // Fix: Set the bill reference on each product item and re-assign the list
        if (bill.getProductItems() != null) {
            for (int i = 0; i < bill.getProductItems().size(); i++) {
                ProductItem item = bill.getProductItems().get(i);
                item.setBill(bill);
            }
            bill.setProductItems(bill.getProductItems()); // Re-assign to trigger JPA
        }

        Bill savedBill = billRepository.save(bill);
        loadBillDetails(savedBill);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bill> updateBill(@PathVariable Long id, @RequestBody Bill bill) {
        return billRepository.findById(id)
                .map(existingBill -> {
                    bill.setId(id);
                    Bill updatedBill = billRepository.save(bill);
                    return ResponseEntity.ok(updatedBill);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        return billRepository.findById(id)
                .map(bill -> {
                    billRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
