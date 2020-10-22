function fnInsert() {
    const fName = $("#firstName").val();
    const lName = $("#lastName").val();
    const email = $("#email").val();
    const phoneNum = $("#phoneNum").val();
    const domain = $("#domain").val();
    const notes = $("#notes").val();
    $.ajax({
        type: "POST",
        url: "/Home/InsertFields/",
        datatype: "json",
        headers: {
            "Authorization": "Basic " + btoa('sk_c7e3c0299230dfd26b2f3a30d9a4ec3b:')
        },
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ fName: fName, lName: lName, email: email, phoneNum: phoneNum, domain: domain, notes: notes }),
        success: async function (json) {
        
           let url = "https://person.clearbit.com/v2/combined/find?email=" + email;
           let req = new Request(url, {
               method: "GET",
               headers: h,
                
            });
            await fetch(req)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error("BAD HTTP STUFF");
                    }
                })
                .then((jsonData) => {
                    console.log(jsonData);
                })
            console.log(json);
           // ViewData()
        },
        failure: function (errMsg) {
            alert(errMsg);

        }
    })
}


$(document).ready(function () {
    ViewData();

    function ViewData() {
        $.ajax({
            type: "POST",
            url: "/Home/ViewData/",
            datatype: "json",
            contentType: "application/json: charset=utf-8",
            data: JSON.stringify({}),
            success: function (response) {

                const tableLoad = response.html;

                const dataSet = eval("[" + tableLoad + "]");
                $('#ViewValues').DataTable({
                    ordering: false,
                    data: dataSet,
                    columns: [
                        { title: "First Name" },
                        { title: "Last Name" },
                        { title: "Email" },
                        { title: "Phone Number" },
                        { title: "Domain" },
                        { title: "Notes" },
                        { title: "ID" },
                        { title: "Actions" }


                    ]
                });
            },
            failure: function (errMsg) {
                alert(errMsg);

            }
        });
    };
});


// Delete Function

function fnDelete(id) {
    $("#confirm-delete").modal("show");
    $(".btn-delete").click(function () {
        $.ajax({
            type: "POST",
            url: "/Home/DeleteData/",
            datatype: "json",
            contentType: "application/json: charset=utf-8",
            data: JSON.stringify({ id: id }),
            success: function (response) {

                location.reload();

            },
            failure: function (errMsg) {
                alert(errMsg);

            }
        })
    })
}
// Edit Function

function fnEdit(id) {

    $("#confirm-edit").modal("show");


    $.ajax({
        type: "POST",
        url: "/Home/EditData/",
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ id: id }),
        success: function (response) {
            const arrval = response.htmlValues;
            console.log(arrval);
            $("#firstName-edit").val(arrval[0]);
            $("#lastName-edit").val(arrval[1]);
            $("#email-edit").val(arrval[2]);
            $("#phoneNum-edit").val(arrval[3]);
            $("#domain-edit").val(arrval[4]);
            $("#notes-edit").val(arrval[5]);
            $("#id-edit").val(arrval[6]);

            
        },
        failure: function (errMsg) {
            alert(errMsg);

        }
    })




 
}

function UpdateData() {    

        const fNameEdit = $("#firstName-edit").val();
        const lNameEdit = $("#lastName-edit").val();
        const emailEdit = $("#email-edit").val();
        const phoneNumEdit = $("#phoneNum-edit").val();
        const domainEdit = $("#domain-edit").val();
        const notesEdit = $("#notes-edit").val();
        const idEdit = $("#id-edit").val();


        $.ajax({
            type: "POST",
            url: "/Home/UpdateData/",
            datatype: "json",
            contentType: "application/json: charset=utf-8",
            data: JSON.stringify({ fNameEdit: fNameEdit, lNameEdit: lNameEdit, emailEdit: emailEdit, phoneNumEdit: phoneNumEdit, domainEdit: domainEdit, notesEdit: notesEdit, id: idEdit }),
            success: function (response) {

               // ViewData();
                
                location.reload();
            },
            failure: function (errMsg) {
                alert(errMsg);

            }
        })
    
}


// Get Authentification

    //

    let h = new Headers();
    h.append('Accept', 'application/json');

    let encoded = window.btoa('sk_c7e3c0299230dfd26b2f3a30d9a4ec3b:');
    let auth = 'Basic ' + encoded;

h.append('Authorization', auth);


function doFetch(ev) {
    let url = "https://person.clearbit.com/v2/combined/find?email=paddy@itcareerswitch.co.uk";
    let h = new Headers();
    h.append('Accept', 'application/json');

    let encoded = window.btoa('sk_c7e3c0299230dfd26b2f3a30d9a4ec3b:');
    let auth = 'Basic ' + encoded;

    h.append('Authorization', auth);

    let req = new Request(url, {
        method: "GET",
        headers: h,
       
    });

    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("BAD HTTP STUFF");
            }
        })
        .then((jsonData) => {
            console.log(jsonData);
        })
}
