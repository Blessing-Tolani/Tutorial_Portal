$(document).ready(function () {
    var access = window.localStorage.getItem('Accesstoken');
    
    $.ajax({
        url: "https://peak-tutors-ub.herokuapp.com/api/resources/allcourses/",
        method: "GET",
    
        headers : {
            Authorization : "Bearer " + JSON.parse(access)
        },

        dataType: 'JSON'
    }).done(function (response) {
        console.log(response);
        for(i=0; i<response.length; i++){
            $('#myselect').append($("<option></option>").val(response[i].course).text(response[i].course))
        }    
    }).fail(function(error){
        console.log(error);
        if (error.status == 403){
        var refresh = window.localStorage.getItem('Refreshtoken');
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
                        url: "https://peak-tutors-ub.herokuapp.com/api/resources/allcourses/",
                        method: "GET",
                    
                        headers : {
                            Authorization : "Bearer " + JSON.parse(access)
                        },
                
                        dataType: 'JSON'
                    }).done(function (response) {
                        for(i=0; i<response.length; i++){
                            $('#myselect').append($("<option></option>").val(response[i].course).text(response[i].course))
                        }   
                
                    }).fail(function(error){
                        console.log(error);
                        alert("Couldn't retrieve all courses!")
                    });
            }).fail(function(error){
                console.log(error);
                if(error.status == 401){
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
            alert("Total failure!");
        }
    });

    $('#registercourse').on('submit', function (e) {
        e.preventDefault();
   
        $('#submit').attr('disabled',true);
        var select = document.querySelector('#myselect');
        var coursename = select.options[select.selectedIndex].value;
        var access = window.localStorage.getItem('Accesstoken');
       
        $.ajax({
            url: "https://peak-tutors-ub.herokuapp.com/api/resources/enrol/",
            method: "POST",

            data: {
                course:coursename,
            },
        
            headers : {
                Authorization : "Bearer " + JSON.parse(access)
            },
    
            dataType: 'JSON'
        }).done(function (response) {
            console.log(response);
            var count = 1;
            var timer = setInterval(function () {
                count--;
            }, 1000);

            setTimeout(function () {
                clearInterval(timer);
                window.location.href = 'homepage.html';
            }, 1000);
        }).fail(function (error) {
            console.log(error);
            if (error.status == 403){
                var refresh = window.localStorage.getItem('Refreshtoken');
                $.ajax({
                    url: "https://peak-tutors-ub.herokuapp.com/api/accounts/token-refresh/",
                    method: "POST",
                    
                    data: {
                        refresh:JSON.parse(refresh),
                    },
                    dataType: 'JSON'
                }).done(function (response){ 
                    console.log(response);
                    window.localStorage.setItem('Accesstoken', JSON.stringify (response.access));
                    var access = window.localStorage.getItem('Accesstoken');
                     $.ajax({
                         url: "https://peak-tutors-ub.herokuapp.com/api/resources/enrol/",
                         method: "POST",
                
                         data: {
                             course:coursename,
                         },
                     
                         headers : {
                             Authorization : "Bearer " + JSON.parse(access)
                         },
                 
                         dataType: 'JSON'
                    }).done(function(response){
                        console(response);
                        var count = 1;
                        var timer = setInterval(function () {
                            count--;
                            $('#redirect-count').html(count);
                        }, 1000);
                
                        setTimeout(function () {
                            clearInterval(timer);
                            window.location.href = 'homepage.html';
                        }, 1000);
                    }).fail(function(error){
                        console.log(error);
                        alert("Couldnt enrol courses even after getting token");
                    });
                }).fail(function(error){
                     console.log(error);
                     if(error.status == 401){
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
                        $('#submit').removeAttr('disabled');
                         alert("An Error Occurred but not 401!");
                     }
                });
                
            } 
            
            else {
                $('#submit').removeAttr('disabled');
                alert("Ërror but not 403 tho");
            }
        });
    
    });

});
