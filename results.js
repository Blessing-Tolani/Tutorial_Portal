function viewresult(){
    
    document.getElementById("item3a").style.display = "none";
    document.getElementById("item3b").style.display = "none";
    document.getElementById("item3c").style.display = "block";

    var access = window.localStorage.getItem('Accesstoken');
    $.ajax({
        url: "https://peak-tutors-ub.herokuapp.com/api/resources/result/",
        method: "GET",
    
        headers : {
            Authorization : "Bearer " + JSON.parse(access)
        },

        dataType: 'JSON'
    }).done(function (response) {
        console.log(response);
        var session = response[0].session;
        var semester = response[0].semester;
        document.getElementById("rsession").innerHTML =  "Session:" +" "+  session + "<br>";
        document.getElementById("rsemester").innerHTML =  "Semester:" +" "+  semester + "<br>";
        for(i=0; i<response.length; i++){
           var table = document.getElementById("secondtbody");
           var row = table.insertRow(i);
           var cell1 = row.insertCell(0);
           var cell2 = row.insertCell(1);
           var cell3 = row.insertCell(2);
           var cell4 = row.insertCell(3);
            cell1.innerHTML = response[i].course;
            cell2.innerHTML = response[i].test_score;
            cell3.innerHTML = response[i].exam_score;
            cell4.innerHTML = response[i].grade;
        }   

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
                    $.ajax({
                        url: "https://peak-tutors-ub.herokuapp.com/api/resources/result/",
                        method: "GET",
                    
                        headers : {
                            Authorization : "Bearer " + JSON.parse(access)
                        },
                
                        dataType: 'JSON'
                    }).done(function (response) {
                        console.log(response);
                        var session = response[0].session;
                        var semester = response[0].semester;
                        document.getElementById("rsession").innerHTML =  "Session:" +" "+  session + "<br>";
                        document.getElementById("rsemester").innerHTML =  "Semester:" +" "+  semester + "<br>";
                        for(i=0; i<response.length; i++){
                           var table = document.getElementById("tbody");
                           var row = table.insertRow(i);
                           var cell1 = row.insertCell(0);
                           var cell2 = row.insertCell(1);
                           var cell3 = row.insertCell(2);
                           var cell4 = row.insertCell(3);
                            cell1.innerHTML = response[i].course;
                            cell2.innerHTML = response[i].test_score;
                            cell3.innerHTML = response[i].exam_score;
                            cell4.innerHTML = response[i].grade;  
                        }
                    }).fail(function(error){
                            console.log(error);
                            alert("Couldn't retrieve Results!")
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
            alert("An Error Occurred! ");
        }
    });
};