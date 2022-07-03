var itemUrl = "http://localhost:8080/BackEnd_war/api/v1/item";

$("#btnGetAllItems").click(function () {
    loadAllItems();
});

$("#btnSaveItem").click(function () {
    var data = $("#itemsForm").serialize();
    $.ajax({
        url: itemUrl,
        method: "POST",
        data: data,
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Item Registered");
                loadAllItems();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});


$("#btnDeleteItem").click(function () {
    let itemID = $("#itemCode").val();
    $.ajax({
        url: itemUrl + "?code=" + itemID,
        method: "DELETE",
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                alert("Item Successfully Deleted");
                loadAllItems();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});


$("#btnUpdateItem").click(function () {
    var itOb = {
        code: $("#itemCode").val(),
        type: $("#itemType").val(),
        qty: $("#itemQty").val(),
        price: $("#itemPrice").val()
    }
    $.ajax({
        url: itemUrl,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itOb),
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Updated");
                loadAllItems();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});


$("#btnItemSearch").click(function () {
    var searchID = $("#txtItemSearch").val();
    $.ajax({
        url: itemUrl + "/" + searchID,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                $("#itemCode").val(res.data.code);
                $("#itemType").val(res.data.type);
                $("#itemQty").val(res.data.qty);
                $("#itemPrice").val(res.data.price);
            } else {
                alert(res.data);
            }
        },
        error:function (ob){
            alert(ob.responseJSON.message);
        }
    });
});

loadAllItems();

function loadAllItems() {
    $("#tblItem").empty();
    $.ajax({
        url: itemUrl,
        method: "GET",
        success: function (resp) {
            for (const item of resp.data) {
                let row = `<tr><td>${item.code}</td><td>${item.type}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
                $("#tblItem").append(row);
            }
            bindClickEventsItem();
        }
    });
}

function bindClickEventsItem() {
    $("#tblItem>tr").click(function () {

        let code = $(this).children().eq(0).text();
        let type = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#itemCode").val(code);
        $("#itemType").val(type);
        $("#itemQty").val(qty);
        $("#itemPrice").val(price);
    });
}



//Validation//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const itemIDRegEx = /^(I-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{4,20}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); 
    }
});

$('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').on('blur', function () {
    ItemformValid();
});

$("#txtItemId").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtItemId").val();
        var srcItem = searchItemFromID(typedItemID);
        $("#txtItemId").val(srcItem.getItemID());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtItemQty").val(srcItem.getItemQty());
        $("#txtItemPrice").val(srcItem.getItemPrice());
    }
});

$("#txtItemName").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
      checkIfValidItem()
    }
});

$("#txtItemQty").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
      checkIfValidItem()
    }
});

$("#txtItemPrice").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
      checkIfValidItem()
    }
});

$("#btnItemadd").attr('disabled', true);

function clearAllItem() {
    $('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').val("");
    $('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').css('border', '2px solid #ced4da');
    $('#txtItemId').focus();
    $("#btnItemadd").attr('disabled', true);
    loadAllItems();
    $("#lblitemid,#lblitemname,#lblitemqty,#lblitemprice").text("");
}

function ItemformValid() {
    var itemID = $("#txtItemId").val();
    $("#txtItemId").css('border', '3px solid green');
    $("#lblitemid").text("");
    if (itemIDRegEx.test(itemID)) {
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemName").css('border', '3px solid green');
            $("#lblitemname").text("");
            var itemQty = $("#txtItemQty").val();
            if (itemQtyRegEx.test(itemQty)) {
                var itemPrice = $("#txtItemPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                $("#txtItemQty").css('border', '3px solid green');
                $("#lblitemqty").text("");
                if (resp) {
                    $("#txtItemPrice").css('border', '3px solid green');
                    $("#lblitemprice").text("");
                    return true;
                } else {
                    $("#txtItemPrice").css('border', '3px solid red');
                    $("#lblitemprice").text("item Price is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtItemQty").css('border', '3px solid red');
                $("#lblitemqty").text("Item Qty is a required field :1");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '3px solid red');
            $("#lblitemname").text("Item Name is a required field : Mimimum 4, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemId").css('border', '3px solid red');
        $("#lblitemid").text("Item ID is a required field : Pattern I-000");
        return false;
    }
}

function checkIfValidItem() {
    var itemID = $("#txtItemId").val();
    if (itemIDRegEx.test(itemID)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemQty").focus();
            var itemQty = $("#txtItemQty").val();
            if (itemQtyRegEx.test(itemQty)) {
                $("#txtItemPrice").focus();
                var itemPrice = $("#txtItemPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAllItem();
                    }
                } else {
                    $("#txtItemPrice").focus();
                }
            } else {
                $("#txtItemQty").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemId").focus();
    }
}

function setItemButton() {
    let b = ItemformValid();
    if (b) {
        $("#btnItemAdd").attr('disabled', false);
    } else {
        $("#btnItemAdd").attr('disabled', true);
    }
}

$('#btnItemAdd').click(function () {
    checkIfValidItem();
});


