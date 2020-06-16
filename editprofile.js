$(document).ready(function () {
    var access = window.localStorage.getItem('Accesstoken');
    var refresh = window.localStorage.getItem('Refreshtoken');
    var x = window.localStorage.getItem('id');
    var id = JSON.parse(x);

    $.ajax({
        url: "https://peak-tutors-ub.herokuapp.com/api/accounts/profile-update/" + id,
        method: "GET",
    
        headers : {
            Authorization : "Bearer " + JSON.parse(access)
        },

        dataType: 'JSON'
    }).done(function (response) {
        console.log(response);
        var LastName = response.last_name;
        var FirstName = response.first_name;
        var Department = response.the_department;
        var Faculty = response.the_faculty;

        var first = document.getElementById("firstname");
        var last = document.getElementById("lastname");
        var department = document.getElementById("department");
        var faculty = document.getElementById("faculty");

        first.value = FirstName;
        last.value = LastName;
        department.value = Department;
        faculty.value = Faculty; 
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
                var x = window.localStorage.getItem('id');
                var id = JSON.parse(x);

                    $.ajax({
                        url: "https://peak-tutors-ub.herokuapp.com/api/accounts/profile-update/" + id,
                        method: "GET",
                    
                        headers : {
                            Authorization : "Bearer " + JSON.parse(access)
                        },
                
                        dataType: 'JSON'
                    }).done(function (response) {
                        console.log(response);
                        var LastName = response.last_name;
                        var FirstName = response.first_name;
                        var Department = response.the_department;
                        var Faculty = response.the_faculty;
                
                        var first = document.getElementById("firstname");
                        var last = document.getElementById("lastname");
                        var department = document.getElementById("department");
                        var faculty = document.getElementById("faculty");
                
                        first.value = FirstName;
                        last.value = LastName;
                        department.value = Department;
                        faculty.value = Faculty; 
                    }).fail(function (error) {
                        console.log(error);
                        alert("Error! Try Again!");
                    })
            }).fail(function(error){
                console.log(error);
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
                    alert("An Error Occurred!");
                }
            });
        }      
        else{
            alert("Ooops! An Error Occurred");
        }       

       
    });

    $('#profileupdate').on('submit', function (e) {
        e.preventDefault();
        var id = JSON.parse(x);
        var first_name = $('#firstname').val();
        var last_name = $('#lastname').val();
        var faculty = $('#faculty').val();
        var department = $('#department').val();
        var access = window.localStorage.getItem('Accesstoken');
        var refresh = window.localStorage.getItem('Refreshtoken');
        $('#profilebtn').attr('disabled',true);
        $.ajax({
            url: "https://peak-tutors-ub.herokuapp.com/api/accounts/profile-update/" + id,
            method: "PUT",
           
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
                        url: "https://peak-tutors-ub.herokuapp.com/api/accounts/profile-update/" + id,
                        method: "PUT",
                       
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
                        alert("Ooops! An Error Occurred!")
                    });

                }).fail(function (error) {
                    console.log(error);
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
                        alert("An Error Occurred!");
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