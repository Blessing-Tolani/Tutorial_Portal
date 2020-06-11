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

