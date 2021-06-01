window.addEventListener("resize", function() {
		"use strict"; window.location.reload(); 
	});

	document.addEventListener("DOMContentLoaded", function(){
        
		// make it as accordion for smaller screens
		if (window.innerWidth < 992) {

			// close all inner dropdowns when parent is closed
			document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
				everydropdown.addEventListener('hidden.bs.dropdown', function () {
					// after dropdown is hidden, then find all submenus
					  this.querySelectorAll('.submenu').forEach(function(everysubmenu){
					  	// hide every submenu as well
					  	everysubmenu.style.display = 'none';
					  });
				})
			});
			
			document.querySelectorAll('.dropdown-menu a').forEach(function(element){

				element.addEventListener('click', function (e) {
		
				  	let nextEl = this.nextElementSibling;

				  	if(nextEl && nextEl.classList.contains('submenu')) {	

				  		// prevent opening link if link needs to open dropdown
				  		e.preventDefault();

				  		if(nextEl.style.display == 'block'){

				  			nextEl.style.display = 'none';

				  		} else {

				  			nextEl.style.display = 'block';
                              
				  		}

				  	}
				});
			})
		}
		// end if innerWidth

	}); 
	// DOMContentLoaded  end





	var swiper = new Swiper(".mySwiper", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        }
      });



	  var swiper = new Swiper(".digitalinitiatives", {
        slidesPerView: 4,
        spaceBetween: 30,
       
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },

		  breakpoints: {
			340: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			768: {
			  slidesPerView: 2,
			  spaceBetween: 40,
			},
			1024: {
			  slidesPerView: 4,
			  spaceBetween: 50,
			},
		  }

      });











	  var swiper = new Swiper(".alumigallery", {
        slidesPerView: 4,
        spaceBetween: 30,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },

		  breakpoints: {
			340: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			768: {
			  slidesPerView: 2,
			  spaceBetween: 40,
			},
			1024: {
			  slidesPerView: 4,
			  spaceBetween: 50,
			},
		  }

      });



	  


	  var swiper = new Swiper(".galleryphotos", {
        slidesPerView: 2,
        spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination1",
			clickable: true,
		  },
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },

		  breakpoints: {
			340: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			768: {
			  slidesPerView: 1,
			  spaceBetween: 40,
			},
			1024: {
			  slidesPerView: 2,
			  spaceBetween: 50,
			},
		  }

      });




	  var swiper = new Swiper(".universityslider", {
        slidesPerView: 1,
        spaceBetween: 0,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		  },
		  

		  breakpoints: {
			340: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			768: {
			  slidesPerView: 1,
			  spaceBetween: 40,
			},
			1024: {
			  slidesPerView: 1,
			  spaceBetween: 50,
			},
		  }

      });






  
  
	var slide = document.querySelectorAll(".sliderwrapper > div");
	var leftimg = document.querySelectorAll(".sliderwrapper > div > .leftimg");
	var righttext = document.querySelectorAll(".sliderwrapper > div > .righttext");

	var tl = gsap.timeline({repeat:-1});
	
	
	
	
	tl.set(slide,{display:"none"})
	tl.set(leftimg,{display:"none"})
	tl.set(righttext,{display:"none"})

	slide.forEach(function(slides, element) {
		
		//console.log();

		tl.from(slide[element], {duration:1, display:"block",  autoAlpha:0})

		tl.from(leftimg[element], {duration:1, display:"block", x:"-200px", autoAlpha:0})

		tl.from(righttext[element], {duration:1, display:"block", x:"200px", autoAlpha:0})

		tl.to(slide[element], {duration:1, display:"none",  autoAlpha:0}, "+=2")

	  } )
	

	
	tl.play();







	
    
function swapStyleSheet(kk){

	document.getElementById("theme").setAttribute("href", kk);

	}
  
  
	function initate() {

		var defaultstyle = document.getElementById("defaultstyle");
		var green = document.getElementById("green");
		var purple = document.getElementById("purple");
		var black = document.getElementById("black");
	
		defaultstyle.onclick = function () { swapStyleSheet("css/default.css") };
		green.onclick = function () { swapStyleSheet("css/green.css"); };
		purple.onclick = function () { swapStyleSheet("css/purple.css"); };
		black.onclick = function () { swapStyleSheet("css/black.css"); };

	}
	
	window.onload = initate;
		  




	 /* this changes font size of */
  
	 var originalSize = $('div').css('font-size');
	 // reset
	 $(".resetMe").click(function(){
	 $('div').css('font-size', originalSize); 
 
	 });
 
	 // Increase Font Size
	 $(".increase").click(function(){
	 var currentSize = $('div').css('font-size');
	 var currentSize = parseFloat(currentSize)*1.2;
	 $('div').css('font-size', currentSize);
 
	 return false;
	 });
 
	 // Decrease Font Size
	 $(".decrease").click(function(){
	 var currentFontSize = $('div').css('font-size');
	 var currentSize = $('div').css('font-size');
	 var currentSize = parseFloat(currentSize)*0.8;
	 $('div').css('font-size', currentSize);
 
	 return false;
	 });




	

	






	

