var orderUrl = "http://localhost:8080/BackEnd_war/api/v1/order";
var cusUrl = "http://localhost:8080/BackEnd_war/api/v1/customer";
var itemsUrl = "http://localhost:8080/BackEnd_war/api/v1/item";

$("#btnCustomerSearch3").click(function () {
    var searchID = $("#txtCustomerSearch3").val();
    $.ajax({
        url: cusUrl + "/" + searchID,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                $("#cusName3").val(res.data.name);
                $("#cusAddress3").val(res.data.address);
                $("#cusSalary3").val(res.data.contact);
                generateOrderId();
            }
        },
        error:function (ob){
            alert(ob.responseJSON.message);
        }
    });
});

$("#btnItemSearch2").click(function () {
    var searchIID = $("#txtItemSearch2").val();
    $.ajax({
        url: itemsUrl + "/" + searchIID,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                $("#itemType2").val(res.data.type);
                $("#itemQty2").val(res.data.qty);
                $("#itemPrice2").val(res.data.price);
            }
        },
        error:function (ob){
            alert(ob.responseJSON.message);
        }
    });
});


$("#btnAddToCart").click(function () {
    addToCart();
    loadAllCartItems()
    clearItemDetails();
});

$("#btnClearItem").click(function () {
    clearItemDetails();
});

function loadAllCartItems() {
    $("#tblCart").empty();
    for (var i of cartDB) {
        let row = `<tr><td>${i.getOrderId()}</td><td>${i.getItemCode()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td></tr>`;
        $("#tblCart").append(row);
    }
}

function addToCart() {
    let orderId = $("#orderId").val();
    let itemCode = $("#txtItemSearch2").val();
    let itemQty = $("#itemQty2").val();
    let itemQtySale = $("#itemQtySale").val();
    let totalPrice = $("#itemPrice2").val()*$("#itemQtySale").val();

    if ((+itemQtySale) > (+itemQty) || (itemQtySale)=='') {
        alert("Invalid Qty. Please Input Valid Qty");
        itemQtySale.focus();
        return;
    }
    let index=isExists(itemCode);
    if(index!=-1){
        alert("Cart Item Updated");
        let iQty = cartDB[index].getItemQty();
        let iTotal = cartDB[index].getItemPrice();
        cartDB[index].setItemQty((+iQty) + (+itemQtySale));
        cartDB[index].setItemPrice((+iTotal) + (+totalPrice));
        loadAllCartItems()
        calculateTotal()
        return;
    }
    let c1=new CartTM(orderId,itemCode,itemQtySale,totalPrice);
    cartDB.push(c1);
    loadAllCartItems();
    calculateTotal();

}

function isExists(id){
    let x=-1;
    for(let i=0;i<cartDB.length;i++){
        if(cartDB[i].getItemCode() == id) {
            x = i;
        }
    }
    return x;
}

function calculateTotal() {
    let totalPrice = 0;
    for (let i = 0; i < cartDB.length; i++) {
        totalPrice = (+totalPrice) + (+cartDB[i].getItemPrice());
    }
    $("#orderPrice").val(totalPrice+'/=');
    $("#orderBalance").val(totalPrice);
}


function calculateBalance() {
    let totalPrice = $("#orderPrice").val();
    let discount = $("#orderDiscount").val();
    let profit = totalPrice*discount/100;
    let balance = totalPrice-profit;
    $("#orderBalance").val(balance+'/=');
}

$("#orderDiscount").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        calculateBalance();
    }
});

$("#btnPlaceOrder").click(function () {

    if ($("#orderBalance,#cusName3,#orderDate").val()!='') {
        placeOrder();
        generateOrderId();
    } else {
        alert("Please Enter All Order Details");
    }
});

function placeOrder() {
    var orderOb = {
        orderId: $("#orderId").val(),
        oderDate: $("#orderDate").val(),
        customerId: $("#txtCustomerSearch3").val(),
        orderCost:$("#orderBalance").val(),
        cartDb:cartDB,
    }
    $.ajax({
        url: orderUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(orderOb),
        success: function (res) {
            if (res.code == 200) {
                alert(res.message);
                clearOrderDetails();
                cartDB.splice(0, cartDB.length);
                $("#tblCart").empty();
            }
        },
        error:function (ob){
            alert(ob.responseJSON.message);
        }
    });
}

let tempOid = 0;
function generateOrderId() {
    tempOid+=1;
    $("#orderId").val('O-00'+tempOid);

}

$("#btnCancelOrder").click(function () {
    clearOrderDetails();
});

function clearItemDetails() {
    $('#searchItemID2,#itemType2,#itemQty2,#itemPrice2,#itemQtySale').val("");
    $('#InputItemCode').focus();
}

function clearOrderDetails() {
    $('#searchItemID2,#itemType2,#itemQty2,#itemPrice2,#itemQtySale').val("");
    $('#txtCustomerSearch3,#cusName3,#cusAddress3,#cusSalary3').val("");
    $('#orderId,#orderDate,#orderBalance,#orderDiscount,#orderPrice').val("");
    $('#txtCustomerSearch3').focus();
}