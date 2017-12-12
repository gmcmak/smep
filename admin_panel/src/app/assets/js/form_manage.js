//function for educational instution radio button
$(document).ready(function () {
    $("#radio-btn2").click(function(){
        $("#professional-category").slideDown(1000);
    });
    $("#radio-btn2").click(function(){
        $("#individual-category").slideUp(1000);
    });
    $("#radio-btn2").click(function(){
        $("#radioB1").css("background-color","white");
    });
    $("#radio-btn2").click(function(){
        $("#radioB2").css("background-color","#D0F5A9");
    });
   });

   //function for individual
   $(document).ready(function () {
    $("#radio-btn1").click(function(){
        $("#professional-category").slideUp(1000);
    });
    $("#radio-btn1").click(function(){
        $("#individual-category").slideDown(1000);
    });
    $("#radio-btn1").click(function(){
        $("#radioB1").css("background-color","#F2F5A9");
    });
    $("#radio-btn1").click(function(){
        $("#radioB2").css("background-color","white");
    });
    
   });

   //show remove btn
   $(document).ready(function () {
    $("#add-btn").click(function(){
        $("#remove-btn").show();
    });
   });

   //show courses drop down list
   $(document).ready(function () {
    $("#radio-btn3").click(function(){
        $("#courses").show();
    });
   });

   //hide courses drop down list
   $(document).ready(function () {
    $("#radio-btn4").click(function(){
        $("#courses").hide();
        $("#courses").val("");
        $("#other-details").val("");
    });
   });

   //hide other input field
   $(document).ready(function () {
    $("#radio-btn4").click(function(){
        $("#other-field").hide();
        $("#other-field1").hide();
        $("#other-details").val("");
    });
   });

   $(function () {
    $("#courses").change(function () {
        if ($(this).val() == "Other") {
            $("#other-field").show();
            $("#other-field1").show();
        } else {
            $("#other-field").hide();
            $("#other-field1").hide();
        }
    });
    });

    //get only cp individual phone numbers as the input
    function phoneno(){          
        $('#cpMobile').keypress(function(e) {
            var a = [];
            var k = e.which;

            for (i = 48; i < 58; i++)
                a.push(i);

            if (!(a.indexOf(k)>=0))
                e.preventDefault();
        });
    }

    //get only institute phone numbers as the input
    function phoneno1(){          
        $('#mobileNum').keypress(function(e) {
            var a = [];
            var k = e.which;

            for (i = 48; i < 58; i++)
                a.push(i);

            if (!(a.indexOf(k)>=0))
                e.preventDefault();
        });
    }

    //get only institute person phone numbers as the input
    function phoneno2(){          
        $('#person_no').keypress(function(e) {
            var a = [];
            var k = e.which;

            for (i = 48; i < 58; i++)
                a.push(i);

            if (!(a.indexOf(k)>=0))
                e.preventDefault();
        });
    }

    //handle expertise subjects in institute form
    $(document).ready(function () {
    $("#add_sub_btn1").click(function(){
        $("#add_sub_btn1").hide();
        $("#expert_sub2").show();
        $("#add_sub_btn2").show();
        $("#remove_sub_btn2").show();
    });
    });

    $(document).ready(function () {
    $("#add_sub_btn2").click(function(){
        $("#add_sub_btn2").hide();
        $("#expert_sub3").show();
        $("#add_sub_btn3").hide();
        $("#remove_sub_btn3").show();
    });
   });

   $(document).ready(function () {
    $("#remove_sub_btn2").click(function(){
        $("#expert_sub2").val("");
        $("#expert_sub2").hide();
        $("#remove_sub_btn2").hide();
        $("#add_sub_btn2").hide();
        $("#add_sub_btn1").show();
    });
   });

   $(document).ready(function () {
    $("#remove_sub_btn3").click(function(){
        $("#expert_sub3").val("");
        $("#expert_sub3").hide();
        $("#remove_sub_btn3").hide();
        $("#add_sub_btn1").show();
    });
   });

   //handle expertise subjects in individual form
   $(document).ready(function () {
    $("#add_subject_btn1").click(function(){
        $("#add_subject_btn1").hide();
        $("#expert_subject2").show();
        $("#add_subject_btn2").show();
        $("#remove_subject_btn2").show();
    });
    });

    $(document).ready(function () {
    $("#add_subject_btn2").click(function(){
        $("#add_subject_btn2").hide();
        $("#expert_subject3").show();
        $("#add_subject_btn3").hide();
        $("#remove_subject_btn3").show();
    });
   });

   $(document).ready(function () {
    $("#remove_subject_btn2").click(function(){
        $("#expert_subject2").val("");
        $("#expert_subject2").hide();
        $("#remove_subject_btn2").hide();
        $("#add_subject_btn2").hide();
        $("#add_subject_btn1").show();
    });
   });

   $(document).ready(function () {
    $("#remove_subject_btn3").click(function(){
        $("#expert_subject3").val("");
        $("#expert_subject3").hide();
        $("#remove_subject_btn3").hide();
        $("#add_subject_btn1").show();
    });
   });

   //handle professional qualification rows

   //row1 add btn
   $(document).ready(function(){
    $("#add_btn_row1").click(function(){
        $("#row_2").show();
        $("#add_btn_row1").hide();
        $("#add_btn_row2").show();
    });
   });

   //row2 add btn
   $(document).ready(function(){
    $("#add_btn_row2").click(function(){
        $("#row_3").show();
        $("#add_btn_row2").hide();
        
    });
   });

   //row2 remove btn
   $(document).ready(function(){
       $("#remove_btn_row2").click(function(){
           $("#prof_row[1]").val("");
           $("#row_2").hide();
           $("#add_btn_row1").show();
           
           $("#prof_row1").val("");
           $("#uniName_row1").val("");
           $("#grade_list_row1").val("");
           $("#year_row1").val("");
           $("#country_row1").val("");
       });
   });

   //row3 remove btn
   $(document).ready(function(){
       $("#remove_btn_row3").click(function(){
           $("#row_3").hide();
           $("#add_btn_row2").show();

           $("#prof_row2").val("");
           $("#uniName_row2").val("");
           $("#grade_list_row2").val("");
           $("#year_row2").val("");
           $("#country_row2").val("");
       });
   });

    //validate date of birth
       $( function() {
           $( "#cpDob" ).datepicker({
           dateFormat: 'yy-mm-dd'
           });
       });

    //validate date of registration
       $( function() {
           $( "#dateOfReg" ).datepicker({
           dateFormat: 'yy-mm-dd'
           });
       });