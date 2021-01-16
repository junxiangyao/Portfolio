console.log('Hello World!')

function menuToggle () {
  const x = document.getElementById('myNavtoggle')
  if (x.className === 'navtoggle') {
    x.className += ' responsive'
  } else {
    x.className = 'navtoggle'
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let mainNavLinks = document.querySelectorAll("#side ul li a");
let side = document.querySelectorAll("#side");
let mainSections = document.querySelectorAll("main section");
// document.body.scrollHeight

let lastId;
let cur = [];

// This should probably be throttled.
// Especially because it triggers during smooth scrolling.
// https://lodash.com/docs/4.17.10#throttle
// You could do like...
// window.addEventListener("scroll", () => {
//    _.throttle(doThatStuff, 100);
// });
// Only not doing it here to keep this Pen dependency-free.

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;
  let width=window.innerWidth;
  console.log(width);
  if (fromTop < 600){
    side[0].style.display = "none";
  }else{
    if(width>1024){
      side[0].style.display = "block";
      if(fromTop < 640){
        side[0].classList.remove("show");
      }else{
        side[0].classList.add("show");
      }
    }else{
      side[0].style.display = "none";
    }

    // if(width>=1024){
    // }
  }

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop - 10 <= fromTop &&
      section.offsetTop + section.offsetHeight - 70 > fromTop
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });

});
