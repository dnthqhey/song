 document.addEventListener('DOMContentLoaded',()=>{
	scrollEventEffect()
})

function scrollEventEffect(){
	const scB = document.querySelector('.sc-top')
	const h = document.querySelector('#header')

	var lastScrollTop = 0;
	var delta = 5;
	var hH = h.offsetHeight;
	var didScroll;
	
	init()
	initEvent()
	
	function init(){
		window.onscroll = function(e) {//스코롤중인지 확인하는 함수
			didScroll = true;
		};
	}

	function initEvent(){
		window.addEventListener('scroll',scrollEffect)
		setInterval(function(){//0.25초마다 스크롤중인지 확인하는 하고 함수 실행
			if(didScroll==true){
				headerHide();
				didScroll = false;
			}
		}, 250);
	}
	
	function scrollEffect(){
		let wH = window.pageYOffset;
		if(wH<400){
			//gsap.to(h,{top:0, duration:0.5})
			gsap.to(scB,{opacity:0, pointerEvents:'none', duration:0.3})
		}else
		if(wH>=400){
			gsap.to(scB,{opacity:1, pointerEvents:'auto', duration:0.3})
		}

		scB.addEventListener('click',scrollTop)
		
		function scrollTop(){
			 window.scrollTo({top: 0, behavior:'smooth'});
			 
		}
	}

	function headerHide(){
	
		var nowScrollTop = window.scrollY;
		if(Math.abs(lastScrollTop - nowScrollTop) <= delta){
			return;
		}
		if(nowScrollTop > lastScrollTop && nowScrollTop > hH){
        //Scroll down
        gsap.to(h,{top:-100, duration:0.3})

		}else
    	if(nowScrollTop <= lastScrollTop && nowScrollTop > hH){
        //Scroll up
			if(window.innerWidth<=769){
				gsap.to(h,{top:0, background:'rgba(255,255,255,0.7)',duration:0.3})
			}else {
				gsap.to(h,{top:-30, background:'rgba(255,255,255,0.7)',paddingBottom:20,duration:0.3})
			}
        }else
		if(nowScrollTop <100){
		//ScrollTop
			gsap.to(h,{top:0,background:'rgba(255,255,255,0)',paddingBottom:0, duration:0.5})
		}    
    lastScrollTop = nowScrollTop;
	}
}

	