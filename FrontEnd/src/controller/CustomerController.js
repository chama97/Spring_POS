var baseUrl = "http://localhost:8080/BackEnd_war/api/v1/customer";

$("#btnGetAllCustomers").click(function () {
    loadAllCustomers();
});

$("#btnSaveCustomer").click(function () {
    var data = $("#customerForm").serialize(); // return query string of form with name:type-value
    $.ajax({
        url: baseUrl,
        method: "POST",
        data: data,// if we send data with the request
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Customer Registered");
                loadAllCustomers();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});


$("#btnDeleteCustomer").click(function () {
    let customerID = $("#cusID").val();
    $.ajax({
        url: baseUrl + "?id=" + customerID,
        method: "DELETE",
        success: function (res) {
            if (res.code == 200) {
                alert("Customer Successfully Deleted");
                loadAllCustomers();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});

$("#btnCustomerSearch").click(function () {
    var searchID = $("#txtCustomerSearch").val();
    $.ajax({
        url: baseUrl + "/" + searchID,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                $("#cusID").val(res.data.id);
                $("#cusName").val(res.data.name);
                $("#cusAddress").val(res.data.address);
                $("#cusContact").val(res.data.contact);
            } else {
                alert(res.data);
            }
        },
        error:function (ob){
            alert(ob.responseJSON.message);
        }
    });
});

$("#btnUpdateCustomer").click(function () {
    var cusOb = {
        id: $("#cusID").val(),
        name: $("#cusName").val(),
        address: $("#cusAddress").val(),
        contact: $("#cusContact").val()
    }
    $.ajax({
        url: baseUrl,
        method: "PUT",
        contentType: "application/json", //You should state request's content type using MIME types
        data: JSON.stringify(cusOb), // format js object to valid json string
        success: function (res) {
            if (res.code == 200) { // process is  ok
                alert("Successfully Updated");
                loadAllCustomers();
                clearForm();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});

loadAllCustomers();

function loadAllCustomers() {
    $("#tblCustomerJson").empty();
    $.ajax({
        url: baseUrl,
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#tblCustomerJson").append(row);
            }
            bindClickEvents();
        }
    });
}

function bindClickEvents() {
    $("#tblCustomerJson>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        $("#cusID").val(id);
        $("#cusName").val(name);
        $("#cusAddress").val(address);
        $("#cusContact").val(contact);
    });
}



/////Validation/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const cusIDRegEx = /^(C-)[0-9]{1,3}$/;
    const cusNameRegEx = /^[A-z ]{3,20}$/;
    const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
    const cusContactRegEx = /^[0-9]{3}[-]?[0-9]{7}$/;

    $('#cusID,#cusName,#cusAddress,#cusContact').on('keydown', function (eventOb) {
        if (eventOb.key == "Tab") {
            eventOb.preventDefault(); 
        }
    });

    $('#cusID,#cusName,#cusAddress,#cusContact').on('blur', function () {
        formValid();
    });

    $("#cusID").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }

        if (eventOb.key == "Control") {
            var typedCustomerID = $("#cusID").val();
            var srcCustomer = searchCustomerFromID(typedCustomerID);
            $("#cusID").val(srcCustomer.getCustomerID());
            $("#cusName").val(srcCustomer.getCustomerName());
            $("#cusAddress").val(srcCustomer.getCustomerAddress());
            $("#cusContact").val(srcCustomer.getCustomerContact());
        }
    });

    $("#cusName").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#cusAddress").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#cusContact").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });
  
    $("#btnCustadd").attr('disabled', true);
  
    function clearAll() {  
        $('#cusID,#cusName,#cusAddress,#cusContact').val("");
        $('#cusID,#cusName,#cusAddress,#cusContact').css('border', '3px solid #ced4da');
        $('#cusID').focus();
        $("#btnCustadd").attr('disabled', true);
        loadAllCustomers();
        $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
    }
  
    function formValid() {
        var cusID = $("#cusID").val();
        $("#cusID").css('border', '3px solid green');
        if (cusIDRegEx.test(cusID)) {
            var cusName = $("#cusID").val();
            if (cusNameRegEx.test(cusName)) {
                $("#cusName").css('border', '3px solid green');
                var cusAddress = $("#cusAddress").val();
                if (cusAddressRegEx.test(cusAddress)) {
                    var cusContact = $("#cusContact").val();
                    var resp = cusContactRegEx.test(cusContact);
                    $("#cusAddress").css('border', '3px solid green');
                    if (resp) {
                        $("#cusContact").css('border', '3px solid green');
                        return true;
                    } else {
                        $("#cusContact").css('border', '3px solid red');
                        return false;
                    }
                } else {
                    $("#cusAddress").css('border', '3px solid red');
                    return false;
                }
            } else {
                $("#cusName").css('border', '3px solid red');
                return false;
            }
        } else {
            $("#cusID").css('border', '3px solid red');
            return false;
        }
    }
  
    function checkIfValid() {
        var cusID = $("#cusID").val();
        if (cusIDRegEx.test(cusID)) {
            $("#cusName").focus();
            var cusName = $("#cusName").val();
            if (cusNameRegEx.test(cusName)) {
                $("#cusAddress").focus();
                var cusAddress = $("#cusAddress").val();
                if (cusAddressRegEx.test(cusAddress)) {
                    $("#cusContact").focus();
                    var cusContact = $("#cusContact").val();
                    var resp = cusContactRegEx.test(cusContact);
                    if (resp) {
                        let res = confirm("Do you really need to add this Customer..?");
                        if (res) {
                            saveCustomer();
                            clearAll();
                        }
                    } else {
                        $("#cusContact").focus();
                    }
                } else {
                    $("#cusAddress").focus();
                }
            } else {
                $("#cusName").focus();
            }
        } else {
            $("#cusID").focus();
        }
    }

    function setButton() {
        let b = formValid();
        if (b) {
            $("#btnCustadd").attr('disabled', false);
        } else {
            $("#btnCustadd").attr('disabled', true);
        }
    }

    $('#btnCustadd').click(function () {
        checkIfValid();
    });


