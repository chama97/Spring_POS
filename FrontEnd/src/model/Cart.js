function CartTM(oid,code,qty,price) {
    var __orderId=oid;
    var __itemCode=code;
    var __itemQty=qty;
    var __itemPrice=price;

    this.getOrderId=function () {
        return __orderId;
    }
    this.getItemCode=function () {
        return __itemCode;
    }
    this.getItemQty=function () {
        return __itemQty;
    }
    this.getItemPrice=function (){
        return __itemPrice;
    }
    this.setOrderId=function (oid) {
        __orderId=oid;
    }
    this.setItemCode=function (code) {
        __itemCode=code;
    }
    this.setItemQty=function (qty) {
        __itemQty=qty;
    }
    this.setItemPrice=function (price){
        __itemPrice=price;
    }
}

/*function CartDTO(code,type,price,qty,total) {
    this.code=code;
    this.type=type;
    this.price=price;
    this.qty=qty;
    this.total=total;
}*/



