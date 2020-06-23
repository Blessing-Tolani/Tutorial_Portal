
$(document).ready(function () {
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

        document.getElementById("text").innerHTML =  LastName +" "+ FirstName;
       
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
                        

                        document.getElementById("text").innerHTML =  LastName +" "+ FirstName;
                       
                    }).fail(function(error){
                        console.log(error);
                        alert("Couldn't retrieve details!")
                    });
                }).fail(function(error){
                    console.log(error);
                    alert("An Error Occurred!");
                });
            }
            else if(error.status == 404){
                window.location.href = 'index.html';
            }
            else{
              
                alert("Ooops! An Error Occurred");
            }
       
    });
        
   

});

