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







	  var initPhotoSwipeFromDOM = function(gallerySelector) {

		// parse slide data (url, title, size ...) from DOM elements 
		// (children of gallerySelector)
		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				linkEl,
				size,
				item;
	
			for(var i = 0; i < numNodes; i++) {
	
				figureEl = thumbElements[i]; // <figure> element
	
				// include only element nodes 
				if(figureEl.nodeType !== 1) {
					continue;
				}
	
				linkEl = figureEl.children[0]; // <a> element
	
				size = linkEl.getAttribute('data-size').split('x');
	
				// create slide object
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};
	
	
	
				if(figureEl.children.length > 1) {
					// <figcaption> content
					item.title = figureEl.children[1].innerHTML; 
				}
	
				if(linkEl.children.length > 0) {
					// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.children[0].getAttribute('src');
				} 
	
				item.el = figureEl; // save link to element for getThumbBoundsFn
				items.push(item);
			}
	
			return items;
		};
	
		// find nearest parent element
		var closest = function closest(el, fn) {
			return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};
	
		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
	
			var eTarget = e.target || e.srcElement;
	
			// find root element of slide
			var clickedListItem = closest(eTarget, function(el) {
				return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
			});
	
			if(!clickedListItem) {
				return;
			}
	
			// find index of clicked item by looping through all child nodes
			// alternatively, you may define index via data- attribute
			var clickedGallery = clickedListItem.parentNode,
				childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;
	
			for (var i = 0; i < numChildNodes; i++) {
				if(childNodes[i].nodeType !== 1) { 
					continue; 
				}
	
				if(childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}
	
	
	
			if(index >= 0) {
				// open PhotoSwipe if valid index found
				openPhotoSwipe( index, clickedGallery );
			}
			return false;
		};
	
		// parse picture index and gallery index from URL (#&pid=1&gid=2)
		var photoswipeParseHash = function() {
			var hash = window.location.hash.substring(1),
			params = {};
	
			if(hash.length < 5) {
				return params;
			}
	
			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');  
				if(pair.length < 2) {
					continue;
				}           
				params[pair[0]] = pair[1];
			}
	
			if(params.gid) {
				params.gid = parseInt(params.gid, 10);
			}
	
			return params;
		};
	
		var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;
	
			items = parseThumbnailElements(galleryElement);
	
			// define options (if needed)
			options = {
	
				// define gallery index (for URL)
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),
	
				getThumbBoundsFn: function(index) {
					// See Options -> getThumbBoundsFn section of documentation for more info
					var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect(); 
	
					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				}
	
			};
	
			// PhotoSwipe opened from URL
			if(fromURL) {
				if(options.galleryPIDs) {
					// parse real index when custom PIDs are used 
					// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
					for(var j = 0; j < items.length; j++) {
						if(items[j].pid == index) {
							options.index = j;
							break;
						}
					}
				} else {
					// in URL indexes start from 1
					options.index = parseInt(index, 10) - 1;
				}
			} else {
				options.index = parseInt(index, 10);
			}
	
			// exit if index not found
			if( isNaN(options.index) ) {
				return;
			}
	
			if(disableAnimation) {
				options.showAnimationDuration = 0;
			}
	
			// Pass data to PhotoSwipe and initialize it
			gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};
	
		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll( gallerySelector );
	
		for(var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			galleryElements[i].onclick = onThumbnailsClick;
		}
	
		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();
		if(hashData.pid && hashData.gid) {
			openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
		}
	};
	
	// execute above function
	initPhotoSwipeFromDOM('.my-gallery');

  
  
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




	

	






	

