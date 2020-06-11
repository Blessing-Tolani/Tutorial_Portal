$(document).ready(function () {
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        var username = $('#matricno').val();
        var password = $('#password').val();
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
            window.localStorage.setItem('Blessing', JSON.stringify (response));
            alert("Successful!");

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

        }).fail(function (error) {
            console.log(error);
          
            alert("No Active Account found with the given Credentails");
        });
    });

    $('#signup-form').on('submit', function (e) {
        e.preventDefault();
        var email = $('#email').val();
        var matric_no = $('#signup-matricno').val();
        var password = $('#signup-password').val();
        var confirm_password = $('#password2').val();

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
            alert("Successful");

        }).fail(function (error) {
            console.log(error);
          
            alert("Something went wrong");
        });
    });
});