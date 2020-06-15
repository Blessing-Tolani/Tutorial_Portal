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
        $('#profilebtn').removeAttr('disabled');
        alert("Ooops! An Error Occurred");
    });
});




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
    
