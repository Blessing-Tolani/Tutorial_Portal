
function homepage(){
    document.getElementById("item3a").style.display = "block";
    document.getElementById("item3b").style.display = "none";
    document.getElementById("item3c").style.display = "none";
};
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
        var Department = response.the_department;
        var Faculty = response.the_faculty;
        var MatricNo = response.matric_no;

        document.getElementById("text").innerHTML =  LastName +" "+ FirstName;
        document.getElementById("mat").innerHTML = "MATRIC NO" + "<br>" + MatricNo;
        document.getElementById("depart").innerHTML = "DEPARTMENT" + "<br>" + Department;
        document.getElementById("fat").innerHTML = "FACULTY" + "<br>" + Faculty;
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
                        var Department = response.the_department;
                        var Faculty = response.the_faculty;
                        var MatricNo = response.matric_no;
                
                        document.getElementById("text").innerHTML =  LastName +" "+ FirstName;
                        document.getElementById("mat").innerHTML = "MATRIC NO" + "<br>" + MatricNo;
                        document.getElementById("depart").innerHTML = "DEPARTMENT" + "<br>" + Department;
                        document.getElementById("fat").innerHTML = "FACULTY" + "<br>" + Faculty;
                    }).fail(function(error){
                        console.log(error);
                        alert("Couldn't retrieve details!")
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
              
                alert("Ooops! An Error Occurred");
            }
       
    });
        
   

});

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
    
