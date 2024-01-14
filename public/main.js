// var tl = gsap.timeline();
// tl.from("header h1, header nav ul li, #accountBtn a, #accountBtn button", {
//     delay: 0.2,
//     duration: 1,
//     y: -200,
//     stagger: 0.2,
//     opacity: 0
// })
// var tl2 = gsap.timeline();
// tl2.from(".content h2, .content p, .content button", {
//     duration: 2,
//     x: -500,
//     stagger: 0.2,
//     opacity: 0
// })
// tl.from(".img img", {
//     duration: 1,
//     scale: 2,
//     opacity: 0,
//     stagger: 0.2,
//     scrub: true
// })
var animetl = gsap.timeline();
gsap.from("#pageTwo #sectionImg", {
  scrollTrigger: {
    trigger: "#pageTwo",
    scroller: "#hero",
    start: "top 600",
    end: "top 200",
    scrub: 3,
  },
  x: 760,
  y: -400,
  scale: 0.3,
});
gsap.from(".mobileContent h4, .mobileContent p, .mobileContent button", {
  scrollTrigger: {
    trigger: "#pageTwo",
    scroller: "#hero",
    start: "top 600",
    end: "top 200",
  },
  duration: 2,
  y: -500,
  stagger: 0.2,
  opacity: 0,
});
gsap.from("#pageTwo .content h2, #pageTwo .content p", {
  scrollTrigger: {
    trigger: "#pageTwo",
    scroller: "#hero",
    start: "top 600",
    end: "top 200",
  },
  duration: 2,  
  scale: 3,
  stagger: 0.2,
  opacity: 0,
});
gsap.from("#pageTwo #mobile", {
  scrollTrigger: {
    trigger: "#pageTwo",
    scroller: "#hero",
    start: "top 650",
    end: "top 200",
    scrub: 5,
  },
  transform: "rotateX(300deg)",
});
