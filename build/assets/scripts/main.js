$(document).ready(function () {
    $('.hero .hero__slider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: false,
      arrows: true,
      slidesToScroll: 1,
      prevArrow: $('.hero .arrows__btn--left'),
      nextArrow: $('.hero .arrows__btn--right')
    });
});