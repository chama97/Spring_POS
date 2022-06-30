package lk.ijse.spring.repo;

import lk.ijse.spring.config.JPAConfig;
import lk.ijse.spring.entity.Customer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
class CustomerRepoTest {

    @Autowired
    CustomerRepo customerRepo; // Inject the dependency of Customer Repo

    @Test // Test method
    public void saveCustomer() {
        //Ok let's save a customer using Customer Repo
        Customer customer1 = new Customer("C001", "Dasun", "Panadura", 1000.00);
        Customer customer2 = new Customer("C002", "Kasun", "Kaluthara", 2000.00);
        Customer customer3 = new Customer("C003", "Damith", "Galle", 3000.00);
        customerRepo.save(customer1);
        customerRepo.save(customer2);
        customerRepo.save(customer3);
    }

    @Test
    public void getAllCustomers() {
        List<Customer> all = customerRepo.findAll();
        for (Customer customer : all) {
            System.out.println(customer.toString());
        }
    }

    @Test
    public void searchCustomer() {
        Optional<Customer> optional = customerRepo.findById("C001");
        boolean present = optional.isPresent();
        System.out.println(present);

        Customer customer = optional.get();
        System.out.println(customer);

    }

    @Test
    public void deleteCustomer() {
        customerRepo.deleteById("C001");
    }

    @Test
    public void updateCustomer(){
        if (customerRepo.existsById("C009")) {
            Customer customer1 = new Customer("C001", "Dasuni", "Panadura", 1000.00);
            customerRepo.save(customer1);
        }else{
            throw new RuntimeException("No Such Customer To Update");
        }

    }



}