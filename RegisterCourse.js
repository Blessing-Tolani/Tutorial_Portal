$(document).ready(function () {
    var access = window.localStorage.getItem('Accesstoken');
    var refresh = window.localStorage.getItem('Refreshtoken');
    var x = document.getElementById("")
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
});
