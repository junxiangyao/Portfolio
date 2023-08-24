console.log('Hello World!')

// function menuToggle () {
//   const x = document.getElementById('myNavtoggle')
//   if (x.className === 'navtoggle') {
//     x.className += ' responsive'
//   } else {
//     x.className = 'navtoggle'
//   }
// }


/***********************
    Smooth Animation
 ***********************/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let boolean = true;

/****************
    Side Nav
 ****************/
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

let path = window.location.pathname;
let page = path.split("/").pop();
let onCaseStudy = false;
const caseStudyName = ["emergencycall.html","creativitylab.html","coalfire.html","vrdataviz.html","coffeechat.html","cookwith.html","airetail.html","cybersense.html"]
// console.log( page );
for(let i = 0; i < caseStudyName.length; ++i){
  if(page === caseStudyName[i]){
    onCaseStudy = true;
    break;
  }
}
console.log( onCaseStudy );
if(onCaseStudy){
  window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;
  let width=window.innerWidth;
  // console.log(width);
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
}




// /***********************
//     Modal
//  ***********************/
//    // Get the modal
//    var modal = document.getElementById("myModal");
//
//    // Get the image and insert it inside the modal - use its "alt" text as a caption
//    let imgs = document.querySelectorAll(".IMG");
//    console.log(imgs);
//    var modalImg = document.getElementById("img01");
//    var captionText = document.getElementById("caption");
//
//    imgs.forEach(function(i) {
//      i.onmousedown = function() {
//        console.log("!!");
//        modal.style.display = "block";
//        modalImg.src = this.src;
//        captionText.innerHTML = this.alt;
//      };
//    })
//
//    // Get the <span> element that closes the modal
//    var span = document.getElementsByClassName("close")[0];
//
//    // When the user clicks on <span> (x), close the modal
//    span.onclick = function() {
//      modal.style.display = "none";
//    }
