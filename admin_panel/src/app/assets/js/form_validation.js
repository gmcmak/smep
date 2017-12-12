//validate by submit button click
$('#submit1').on('click', function() {
    $("#form1").validate();
});


//validate by submit button click
$('#submit2').on('click', function() {
    $("#form2").validate();
});

$().ready(function(){
    $("#form1").validate({
        rules: {
            cpName: "required",
            cpFullName: "required",
            gender: "required",
            cpDesignation: "required",
            cpDob: "required",
            highest_quali: "required",
            highest_uni: "required",
            highest_grade: "required",
            country_list1: "required",
            highest_year: "required",
            check1: "required",

        cpNic: {
            required: true,
            maxlength: 15,
        },
        cpEmail: {
            required: true,
            email: true,
        },
        cpMobile: {
            required: true,
            maxlength: 10,
        },
    },
        messages: {
            cpName: "Enter your name",
            cpFullName: "Enter your full name",
            check1: "Please verify"
        }
    });
});

$().ready(function(){
    $("#form2").validate({
        rules: {
            instName: "required",
            regNo: "required",
            dateOfReg: "required",
            adrz: "required",
            mobileNum: "required",
            person_no: "required",
            foreignUni: "required",
            check2: "required",
            // expert_sub1: "required",
            // expert_sub2: "required",
            // expert_sub3: "required"
        },
        messages: {
            check2: "Please verify"
        }
    });
});