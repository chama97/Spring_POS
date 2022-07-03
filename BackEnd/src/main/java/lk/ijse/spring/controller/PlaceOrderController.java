package lk.ijse.spring.controller;

import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.PurchaseOrderService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/order")
@CrossOrigin
public class PlaceOrderController {
    @Autowired
    PurchaseOrderService purchaseOrderService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllOrders() {
        return new ResponseUtil(200, "Ok", purchaseOrderService.getAllOrders());
    }

    @ResponseStatus(HttpStatus.CREATED) //201
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil purchaseOrder(@RequestBody OrdersDTO ordersDTO) {
        System.out.println(ordersDTO.toString());
        purchaseOrderService.purchaseOrder(ordersDTO);
        return new ResponseUtil(200, "Save", null);
    }


    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateOrder(@RequestBody OrdersDTO ordersDTO) {
        purchaseOrderService.updateOrder(ordersDTO);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"oid"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteOrder(@RequestParam String oid) {
        purchaseOrderService.deleteOrder(oid);
        return new ResponseUtil(200, "Deleted", null);
    }

    @GetMapping(path = "/{oid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchOrder(@PathVariable String oid) {
        return new ResponseUtil(200, "Ok", purchaseOrderService.searchOrder(oid));
    }


}
