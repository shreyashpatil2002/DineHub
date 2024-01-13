var tl = gsap.timeline();
tl.from("header h1, header nav ul li, #accountBtn a, #accountBtn button", {
    delay: 0.2,
    duration: 1,
    y: -200,
    stagger: 0.2,
    opacity: 0
})
var tl2 = gsap.timeline();
tl2.from(".content h2, .content p, .content button", {
    duration: 2,
    x: -500,
    stagger: 0.2,
    opacity: 0
})
tl.from(".img img", {
    duration: 1,
    scale: 2,
    opacity: 0,
    stagger: 0.2,
    scrub: true
})
