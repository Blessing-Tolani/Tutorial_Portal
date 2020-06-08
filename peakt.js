const hamburger = document.querySelector(".hamburger");
const navlinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', () => {
  //Toggle Nav
  navlinks.classList.toggle("open");
  //Animate links
  links.forEach((link,index) => {
    if(link.style.animation){
      link.style.animation=''
    }
    else{
      link.style.animation = `navLinkFade 2s ease forwards ${index / 7}s`
    }
  
});
  //burger animation
  hamburger.classList.toggle("bum");

});

$(document).ready(function () {
    $("#signup-btn").on('click', showSignup);
    $("#signup-form").on('submit', validate);
  });
function showSignup (){
    $("#item3a").hide();
    $("#item3b").show();
}
function hideSignup (){
    $("#item3a").show();
    $("#item3b").hide();
 }
 function validate (e) {
    e.preventDefault();
    var pass = $("#password").val();
    var confpass = $("#password2").val();
  
    if (pass !== confpass) {
      alert("Passcode don't match: Kindly re-enter the Confirm Passcode");
      return false;
    }
 
    $("#login-form").append("<div id='countdown'>Account successfully created, redirecting to Login page in <b id='redirect-count'>5</b></div>");
    var count = 5;
    var timer = setInterval(function () {
        count--;
        $('#redirect-count').html(count);
    }, 1000);

    setTimeout(function () {
        clearInterval(timer);
        hideSignup();
        $('#countdown').remove();
    }, 5000);
 }