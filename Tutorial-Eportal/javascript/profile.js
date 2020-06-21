$(document).ready(function () {
    $('#profileupdate').on('submit', function (e) {
        e.preventDefault();

        var first_name = $('#firstname').val();
        var last_name = $('#lastname').val();
        var faculty = $('#faculty').val();
        var department = $('#department').val();
        var access = window.localStorage.getItem('Accesstoken');
        var refresh = window.localStorage.getItem('Refreshtoken');
        $('#profilebtn').attr('disabled',true);
        $.ajax({
            url: "https://peak-tutors-ub.herokuapp.com/api/accounts/profile-update/",
            method: "POST",
           
            data: {
                first_name : first_name,
                last_name : last_name,
                faculty : faculty,
                department: department,
            },
        
            headers : {
                Authorization : "Bearer " + JSON.parse(access)
            },

            dataType: 'JSON'
        }).done(function (response) {
            console.log(response);
            window.localStorage.setItem('id', JSON.stringify (response.id));
            
            $('#profileupdate')
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
            if (error.status == 403){
                $.ajax({
                    url: "https://peak-tutors-ub.herokuapp.com/api/accounts/token-refresh/",
                    method: "POST",
                   
                    data: {
                        refresh:JSON.parse(refresh),
                    },
                    dataType: 'JSON'
                }).done(function (response) {   
                    console.log(response);
                    window.localStorage.setItem('Accesstoken', JSON.stringify (response.access));
                    var access = window.localStorage.getItem('Accesstoken');

                    $.ajax({
                        url: "https://peak-tutors-ub.herokuapp.com/api/accounts/profile-update/",
                        method: "POST",
                       
                        data: {
                            first_name : first_name,
                            last_name : last_name,
                            faculty : faculty,
                            department: department,
                        },
                    
                        headers : {
                            Authorization : "Bearer " + JSON.parse(access)
                        },
            
                        dataType: 'JSON'
                    }).done(function (response) {
                        console.log(response);
                        window.localStorage.setItem('id', JSON.stringify (response.id));
                        
                        $('#profileupdate')
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
                        alert("Error Occurred, Try Again!");
                    });
                  
                }).fail(function(error){
                    if(error.status == 403){
                        $('#profileupdate')
                        var count = 1;
                        var timer = setInterval(function () {
                            count--;
                            $('#redirect-count').html(count);
                        }, 1000);
            
                        setTimeout(function () {
                            clearInterval(timer);
                            window.location.href = 'index.html';
                        }, 1000);
                    }
                    else{
                        alert("Ooops! Authentication Error occurred!");
                    }
                });
            }
            else{
                $('#profilebtn').removeAttr('disabled');
                alert("Ooops! An Error Occurred");
            }
          
            
        });
    });

});