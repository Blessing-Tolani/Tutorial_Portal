
function kris(){
    document.getElementById("item3a").style.display = "none";
    document.getElementById("item3b").style.display = "block";

  };
//Login code
$(document).ready(function () {
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
    
        var username = $('#matricno').val();
        var password = $('#password').val();

        $('#button').attr('disabled',true);
        $.ajax({
            url: "https://peak-tutors-ub.herokuapp.com/api/accounts/login/",
            method: "POST",
            data: {
                username : username,
                password : password
            },
            dataType: 'JSON'

        }).done(function (response) {
            console.log(response);
            window.localStorage.setItem('Accesstoken', JSON.stringify (response.access));
            // alert("Successful!");
            // return true;
                if(response.department == "null" && response.faculty == "null"){

                    $('#login-form')
                    var count = 1;
                    var timer = setInterval(function () {
                        count--;
                        $('#redirect-count').html(count);
                    }, 1000);
        
                    setTimeout(function () {
                        clearInterval(timer);
                        window.location.href = 'profile.html';
                    }, 1000);
                }
                else{
                    $('#login-form')
                    var count = 1;
                    var timer = setInterval(function () {
                        count--;
                        $('#redirect-count').html(count);
                    }, 1000);
        
                    setTimeout(function () {
                        clearInterval(timer);
                        window.location.href = 'homepage.html';
                    }, 1000);
                }
           

        }).fail(function (error) {
            console.log(error);
            $('#button').removeAttr('disabled');
            alert("No Active Account found with the given Credentails");
        });
    });
//Signup code
    $('#signup-form').on('submit', function (e) {
        e.preventDefault();
        var email = $('#email').val();
        var matric_no = $('#signup-matricno').val();
        var password = $('#signup-password').val();
        var confirm_password = $('#password2').val();

        if (password !== confirm_password) {
            alert("Password don't match: Kindly re-enter the Confirm Password");
            return false;
        }
        $('#signbtn').attr('disabled',true);
        $.ajax({
            url: "https://peak-tutors-ub.herokuapp.com/api/accounts/register/",
            method: "POST",
            data: {
                email : email,
                matric_no : matric_no,
                password : password,
                confirm_password : confirm_password
            
            },
            dataType: 'JSON'
           
        }).done(function (response) {
            console.log(response);
            window.localStorage.setItem('Blessing', JSON.stringify (response));

            $("#signup-form").append("<div id='countdown'>Account successfully created, redirecting to Login page in <b id='redirect-count'>3</b></div>");
            var count = 3;
            var timer = setInterval(function () {
                count--;
                $('#redirect-count').html(count);
            }, 1000);

            setTimeout(function () {
                clearInterval(timer);
                $('#signbtn').removeAttr('disabled');
                document.getElementById("item3a").style.display = "block";
                document.getElementById("item3b").style.display = "none";
                $('#countdown').remove();
            }, 3000);

        }).fail(function (error) {
            console.log(error);
          
            alert("Something went wrong");
        });
    });
});