let tl = gsap.timeline();
tl.from("header", {
  duration: 1,
  y: "-100%",
  opacity: 0,
});
tl.from("#pageOne .container .content", {
  duration: 1,
  y: "50",
  opacity: 0,
});
tl.from("#pageOne .container .img", {
  duration: 1,
  scale: 0.5,
  opacity: 0,
  ease: "bounce",
});
gsap.from(
  "#pageTwo .container .content span, #pageTwo .container .content img, #pageTwo .container .content h2, #pageTwo .container .content h5, #pageTwo .container .content p, #pageTwo .container .content button",
  {
    scrollTrigger: {
      trigger: "#pageTwo",
      scroller: "#hero",
      start: "20% center",
    },
    duration: 1,
    x: "-150",
    opacity: 0,
    stagger: 0.5,
  }
);
gsap.from(
  "#pageTwo .container .img img",
  {
    scrollTrigger: {
      trigger: "#pageTwo",
      scroller: "#hero",
      start: "20% center",
    },
    duration: 1,
    y: "150",
    opacity: 0,
    stagger: 0.5,
  }
);
gsap.from(
  "#pageThree .container .content span, #pageThree .container .content img, #pageThree .container .content h2, #pageThree .container .content h4, #pageThree .container .content p, #pageThree .container .content button",
  {
    scrollTrigger: {
      trigger: "#pageThree",
      scroller: "#hero",
      start: "20% center",
    },
    duration: 1,
    y: "-150",
    opacity: 0,
    stagger: 0.5,
  }
);
gsap.from(
  "#pageThree .container .img img",
  {
    scrollTrigger: {
      trigger: "#pageThree",
      scroller: "#hero",
      start: "20% center",
    },
    duration: 1,
    y: "150",
    opacity: 0,
    stagger: 0.5,
  }
);
gsap.from(
  "#pageFour .container .content span, #pageFour .container .content img, #pageFour .container .content h2, #pageFour .container .content p",
  {
    scrollTrigger: {
      trigger: "#pageFour",
      scroller: "#hero",
      start: "20% center",
    },
    duration: 1,
    y: "-150",
    opacity: 0,
    stagger: 0.5,
  }
);
gsap.from("#pageFour .container .testimonials .testimonial", {
  scrollTrigger: {
    trigger: "#pageFour",
    scroller: "#hero",
    start: "20% center",
  },
  x: "150",
  opacity: 0,
  stagger: 0.5,
}); 
gsap.from("#pageFive .cards .card", {
  scrollTrigger: {
    trigger: "#pageFive",
    scroller: "#hero",
    start: "20% center",
  },
  y: "-150",
  opacity: 0,
  stagger: 0.8,
}); 
gsap.from("#pageSix .container", {
  scrollTrigger: {
    trigger: "#pageSix",
    scroller: "#hero",
    start: "center center",
    scrub: 2,
    pin: true,
  },
  scale: 2,
}); 