$(document).ready(function (e){
        var access = window.localStorage.getItem('Accesstoken');
  
        $.ajax({
            url: "https://peak-tutors-ub.herokuapp.com/api/resources/courses/",
            method: "GET",
        
            headers : {
                Authorization : "Bearer " + JSON.parse(access)
            },

            dataType: 'JSON'
        }).done(function (response) {
            console.log(response);
            for(i=0; i<response.length; i++){
                var table = document.getElementById("tbody");
                var row = table.insertRow(i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                 cell1.innerHTML = response[i].session;
                 cell2.innerHTML = response[i].semester;
                 cell3.innerHTML = response[i].course;
                 cell4.innerHTML = '<a  id = "set" onclick="allow(this.id)"> <i class="fas fa-trash"></i></a>'
                $("#set").attr('id', response[i].id)
                $('#courselist').append('<div id="border1"></div>');
                $('#border1').append('<span id="session"></span>');
                $('#session').append('<span id="know">SESSION:</span>' + " " + response[i].session +"<br>");
                $('#border1').append('<span id="semester"></span>'); 
                $('#semester').append('<span id="know">SEMESTER:</span>' + " " + response[i].semester  +"<br>");
                $('#border1').append('<span id="course"></span>');
                $('#course').append('<span id="know">COURSE:</span>' + " " + response[i].course  +"<br>");
                $('#border1').append('<div id="center"><i class="fas fa-trash"></i></div>');



                // var x = $('session').append();
                // var y = $('semester').append(response[i].semester);
                // var z = $('session').append(response[i].course);
                // $('#border1').append(x);
                // $('#border1').append(y);
                // $('#border1').append(z);

            }   
            return response;
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
                            url: "https://peak-tutors-ub.herokuapp.com/api/resources/courses/",
                            method: "GET",
                        
                            headers : {
                                Authorization : "Bearer " + JSON.parse(access)
                            },
                
                            dataType: 'JSON'
                        }).done(function (response) {
                            console.log(response);
                            for(i=0; i<response.length; i++){
                                var b = response[i].id;
                                var table = document.getElementById("tbody");
                                var row = table.insertRow(i);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell4 = row.insertCell(3);
                                 cell1.innerHTML = response[i].session;
                                 cell2.innerHTML = response[i].semester;
                                 cell3.innerHTML = response[i].course;
                                 cell4.innerHTML = '<a id = "set" onclick="allow(this.id)"> <i class="fas fa-trash"></i></a>'
                                 $("#set").attr('id', response[i].id)
                                 $('#courselist').append('<div id="border1"></div>');
                                 $('#border1').append(response[i].session);
                             }   
                            
                        }).fail(function(error){
                            console.log(error);
                            alert("Couldn't retrieve courses registered!")
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
                else if(error.status == 404){
                    window.location.href = 'index.html';
                }
                else{
                    alert("An Error Occurred!");
                }

        });
    
       
});
function allow(clicked){
        var ans = confirm("Are you sure you want to Delete this Course?");
        if(ans == true){
            var access = window.localStorage.getItem('Accesstoken');
            var id = clicked;
            $.ajax({
                url: "https://peak-tutors-ub.herokuapp.com/api/resources/courses/" + id,
                method: "DELETE",
            
                headers : {
                    Authorization : "Bearer " + JSON.parse(access)
                },
        
                dataType: 'JSON'
            }).done(function (response) {
                console.log(response);
                var count = 1;
                var timer = setInterval(function () {
                    count--;
                    $('#redirect-count').html(count);
                }, 1000);
    
                setTimeout(function () {
                    clearInterval(timer);
                    window.location.href = 'CourseListnew.html';
                }, 1000);
            }).fail(function(error){
                console.log(error);
                alert("An Error Occurred!");
            })
        }
    
}
function logout(){
    var access = window.localStorage.getItem('Accesstoken');
    $.ajax({
        url: "https://peak-tutors-ub.herokuapp.com/api/accounts/logout/" ,
        method: "POST",
    
        headers : {
            Authorization : "Bearer " + JSON.parse(access)
        },

        dataType: 'JSON'
    }).done(function (response){
        var count = 1;
        var timer = setInterval(function () {
            count--;
            $('#redirect-count').html(count);
        }, 1000);

        setTimeout(function () {
            clearInterval(timer);
            window.location.href = 'index.html';
        }, 1000);
    }).fail(function (error) {
        console.log(error);
        alert("An Error Occurred, Try Again");
    });
    
}
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    //Toggle link
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        //Animate link
    navLinks.forEach((link, index) => {
        if (link.style.animation){
        link.style.animation='';
        }
        else{
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
        }
    
        console.log(index / 7);
    });
    //burger animation
    burger.classList.toggle("bum");


    });
}
navSlide();
