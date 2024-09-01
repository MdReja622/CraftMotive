
(function ($) {
	"use strict";

	var windowOn = $(window);

	////////////////////////////////////////////////////
	// 01. PreLoader Js	

	$('.preloader__logo img').addClass('logo-blink');

	(function () {
		function id(v) { return document.getElementById(v); }
		function loadbar() {
			var ovrl = id("loading"),
				prog = id("tp-loading-line"),
				img = document.images,
				c = 0,
				tot = img.length;
			if (tot == 0) return doneLoading();

			function imgLoaded() {
				c += 1;
				var perc = ((100 / tot * c) << 0) + "%";
				prog.style.width = perc;

				if (c === tot) return doneLoading();
			}
			function doneLoading() {

				setTimeout(function () {
					$("#loading").fadeOut(500);
				}, 100);
			}
			for (var i = 0; i < tot; i++) {
				var tImg = new Image();
				tImg.onload = imgLoaded;
				tImg.onerror = imgLoaded;
				tImg.src = img[i].src;
			}
		}
		document.addEventListener('DOMContentLoaded', loadbar, false);
	}());





	$('.newsletter-popups, .newsletter-overlays').addClass('opened');

	$(".newsletter-close-btn").on("click", function () {
		$(".newsletter-popup").removeClass("opened");
		$(".newsletter-overlay").removeClass("opened");
	});

	////////////////////////////////////////////////////
	// 03. Offcanvas Js
	$(".offcanvas-open-btn").on("click", function () {
		$(".offcanvas__area").addClass("offcanvas-opened");
		$(".offcanvas__full").addClass("offcanvas-full-opened");
		$(".body-overlay").addClass("opened");
	});

	$(".offcanvas-close-btn").on("click", function () {
		$(".offcanvas__area").removeClass("offcanvas-opened");
		$(".offcanvas__full").removeClass("offcanvas-full-opened");
		$(".body-overlay").removeClass("opened");
	});

	////////////////////////////////////////////////////
	// 03. Offcanvas Js
	$(".cartmini-open-btn").on("click", function () {
		$(".cartmini__area").addClass("cartmini-opened");
		$(".body-overlay").addClass("opened");
	});


	$(".cartmini-close-btn").on("click", function () {
		$(".cartmini__area").removeClass("cartmini-opened");
		$(".body-overlay").removeClass("opened");
	});




	////////////////////////////////////////////////////
	// 03. Search Js
	$(".search-open-btn").on("click", function () {
		$(".search__popup").addClass("search-opened");
	});


	$(".search-close-btn").on("click", function () {
		$(".search__popup").removeClass("search-opened");
	});

	$(".job-form-open-btn").on("click", function () {
		$(".job__form").slideToggle("job__form");
	});


	// for header
	if ($("#tp-header-lang-toggle").length > 0) {
		window.addEventListener('click', function (e) {

			if (document.getElementById('tp-header-lang-toggle').contains(e.target)) {
				$(".tp-lang-list").toggleClass("tp-lang-list-open");
			}
			else {
				$(".tp-lang-list").removeClass("tp-lang-list-open");
			}
		});
	}

	// for footer
	if ($("#tp-footer-lang-toggle").length > 0) {
		window.addEventListener('click', function (e) {

			if (document.getElementById('tp-footer-lang-toggle').contains(e.target)) {
				$(".tp-lang-list-2").toggleClass("tp-lang-list-open-2");
			}
			else {
				$(".tp-lang-list-2").removeClass("tp-lang-list-open-2");
			}
		});
	}

	////////////////////////////////////////////////////
	// 04. Body overlay Js
	$(".body-overlay").on("click", function () {
		$(".offcanvas__area").removeClass("offcanvas-opened");
		$(".offcanvas__full").removeClass("offcanvas-full-opened");
		$(".cartmini__area").removeClass("cartmini-opened");
		$(".body-overlay").removeClass("opened");
	});



	function smoothSctollTop() {
		$('.smooth a').on('click', function (event) {
			var target = $(this.getAttribute('href'));
			if (target.length) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 150
				}, 1000);
			}
		});
	}
	smoothSctollTop();



	////////////////////////////////////////////////////
	// 06. Sticky Header Js
	windowOn.on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 100) {
			$("#header-sticky").removeClass("header-sticky");
		} else {
			$("#header-sticky").addClass("header-sticky");
		}
	});

	var btn = $('#back_to_top');
	var btn_wrapper = $('.back-to-top-wrapper');

	windowOn.scroll(function () {
		if (windowOn.scrollTop() > 300) {
			btn_wrapper.addClass('back-to-top-btn-show');
		} else {
			btn_wrapper.removeClass('back-to-top-btn-show');
		}
	});

	btn.on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, '300');
	});




	////////////////////////////////////////////////////
	// 07. Data CSS Js
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});
	$("[data-color]").each(function () {
		$(this).css("color", $(this).attr("data-color"));
	});




	var tp_rtl = localStorage.getItem('tp_dir');
	let rtl_setting = tp_rtl == 'rtl' ? true : false;


	////////////////////////////////////////////////////
	// 08. Hero slider__active Slider Js


	// Initialize Swiper with Auto-Slide Change and Smooth Creative Mode
	var swiper = new Swiper('.rs__hero__slider', {
		loop: true,
		speed: 1000, // Transition speed
		autoplay: {
			delay: 5000, // 5 seconds delay
			disableOnInteraction: false, // Keep autoplay even after user interaction
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.rs_hero_slider_next',
			prevEl: '.rs_hero_slider_prev',
		},
		effect: 'creative',
		creativeEffect: {
			prev: {
				shadow: true,
				translate: ['-20%', 0, -1],
			},
			next: {
				translate: ['100%', 0, 0],
			},
		},
		on: {
			slideChangeTransitionStart: function () {
				// Reset animation on previous slide content
				var previousSlide = document.querySelector('.swiper-slide-prev .rs__hero_content');
				if (previousSlide) {
					previousSlide.classList.remove('animate__animated', 'animate__fadeInUp');
					previousSlide.style.opacity = 0;

					// Force reflow to reset animation
					void previousSlide.offsetWidth; // Trigger reflow
				}

				// Trigger animation for the active slide content
				var activeSlide = document.querySelector('.swiper-slide-active .rs__hero_content');
				if (activeSlide) {
					activeSlide.classList.add('animate__animated', 'animate__fadeInUp');
					activeSlide.style.opacity = 1;
				}
			}
		}

	});






	/////////////////////////////////////////
	// Team Slider activatin

	var TeamSwiper = new Swiper('.rs_team_slider', {
		loop: true,
		speed: 500, // Transition speed
		slidesPerView: 4,

		spaceBetween: 30,
		autoplay: {
			delay: 5000, // 5 seconds delay
			disableOnInteraction: false, // Keep autoplay even after user interaction
		},
		navigation: {
			nextEl: '.rs_team_slider_next',
			prevEl: '.rs_team_slider_prev',
		},
	});








	/////////////////////////////////////////
	// counterUp //////////////////////

	$(document).ready(function () {
		$('.counter').counterUp({
			delay: 1,
			time: 300
		});
	});

	// Initialize WOW.js for on-scroll animations
	new WOW({
		boxClass: 'wow',
		animateClass: 'animate__animated',
	}).init();

	// /////////////////////////////
	// niceSelect 

	$('.rs_portfolio_sort-select').niceSelect();


	////////////////////////////////////
	// Initialize MixItUp 

	var mixer = mixitup('.rs_portfolio_grid', {
		selectors: {
			target: '.rs_portfolio_item'
		},
		// Add other configuration options if needed
	});

	// Handle the change event on the select element
	$('.rs_portfolio_sort-select').on('change', function () {
		var sortValue = $(this).find('option:selected').data('sort');

		// Apply sorting based on the selected option
		mixer.sort(sortValue);
	});





	////////////////////////////////////
	// Initialize testimonail 

	var testimonialInfo = new Swiper('.rs_testimonial_info', {
		spaceBetween: 10,
		loop: true,
		lazy: true,
		loopedSlides: 4,
		navigation: {
			nextEl: '.rs_testi_next',
			prevEl: '.rs_testi_prev',
		},


	});

	var testimonialThumb = new Swiper('.rs_testimonial_thumb_slider', {
		centeredSlides: true,
		slidesPerView: 'auto',
		loop: false,
		speed: 1000,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		loopedSlides: 4,

	});
	testimonialInfo.controller.control = testimonialThumb;
	testimonialThumb.controller.control = testimonialInfo;







})(jQuery);