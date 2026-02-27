 document.addEventListener('DOMContentLoaded',()=>{
	pageSelector()//메인 페이지 외에는 실행되지않게 조건을 걸어줌(페이지마다 따로 js를 넣어주면 되는거지만 헤더에 전부 들어있는 형태라 사용)
})
function pageSelector(){
	const pN = document.querySelector('.pageNumbering')
	let number = pN.offsetWidth

	if(number==1){
		visualSetting() //메인 비주얼 높이 디스플레이에 맞게 세팅
		bgCircleEffect() //배경 원 생성, 움직임	
		onlyPcEffect() //pc에만 줄 효과
		swiperEffect() //이미지 롤링
		toggleEffect() //정지 재생버튼
		outLineSetting() //아웃라인 전체 높이 세팅
	}
}
function onlyPcEffect(){
	let wW = window.innerWidth
	if(wW>769){
		sec2HoverEffect() //웹진 호버효과 
	}
}

function outLineSetting(){
	const bg = document.querySelector('.bg-outline')
	const bgG = document.querySelector('.bg-gradient')

	init()
	window.addEventListener('resize',init)

	function init(){
		let wH = window.innerHeight
		gsap.set(bg,{height:wH})
		gsap.set(bgG,{height:wH})

	}
}

function visualSetting(){
	const vi = document.querySelector('.visual-text')
	
	init()
	window.addEventListener('resize',init)

	function init(){
		let wH = window.innerHeight;
		gsap.set(vi,{height:wH})

		
		
		let winWidth = window.innerWidth; /*main 영역 높이*/
		if(winWidth<500){
			gsap.set(vi,{height:wH+150})
		}
		else
		if(winWidth<769){
			gsap.set(vi,{height:wH+300})
		}
	}
}
function swiperEffect(){
	sec1Swiper()
	sec2Swiper()
}

function sec1Swiper(){
	var swiper = new Swiper('.sec1-swiper', {
      slidesPerView: 4, //보여지는 슬라이드 개수
      spaceBetween: 170, //swiper-slide에 각각 margin-right를 준다.
      loop: true,
	  freeMode: false,
      keyboard: {
        enabled: true,  //키보드 제어
      },
      autoplay: {
        delay: 3000, // 4초마다 슬라이드
        disableOnInteraction: false, //버튼 제어시 멈춤
      },
      navigation: { //이전다음버튼 제어
        nextEl: '.sec1_next',
        prevEl: '.sec1_prev',
      },
	  speed : 1000,
	  breakpoints: {
		  500: {
            slidesPerView: 1,  //브라우저가 768보다 클 때
            spaceBetween: -100, // 양 옆에 이미지를 조금씩 보이게 하려고 준 수치입니다.
          },
		  620: {
            slidesPerView: 1,  //브라우저가 768보다 클 때
            spaceBetween: -200, // 양 옆에 이미지를 조금씩 보이게 하려고 준 수치입니다.
          },
          768: {
            slidesPerView: 1,  //브라우저가 768보다 클 때
            spaceBetween: -250, // 양 옆에 이미지를 조금씩 보이게 하려고 준 수치입니다.
          },
		  900: {
		    slidesPerView: 1,  //브라우저가 768보다 클 때
			spaceBetween: -400
		  },
		  1300: {
			slidesPerView: 1,  //브라우저가 768보다 클 때
			spaceBetween: -600
		  },
        },
    });
	 autoplay()

      function autoplay(){
          $('.sec1_stop').click(function(){
              swiper.autoplay.stop();
          });
          
          $('.sec1_start').click(function(){
              swiper.autoplay.start();
          });
          
          
      }
}
function sec2Swiper(){
	var swiper = new Swiper('.sec2-swiper', {
      slidesPerView: 4, //보여지는 슬라이드 개수
      spaceBetween: 200, //슬라이드 사이 공간
      loop: true,
	  freeMode: false,
      keyboard: {
        enabled: true,  //키보드 제어
      },
      autoplay: {
        delay: 3000, // 4초마다 슬라이드
        disableOnInteraction: false, //버튼 제어시 멈춤
      },
      navigation: { //이전다음버튼 제어
        nextEl: '.sec2_next',
        prevEl: '.sec2_prev',
      },
	  speed : 1000,
	  centeredSlides: true,
	  breakpoints: { // PSD에 나온대로 가운데 출력 + 양 옆에 잘린 이미지 구현을 하려했으나 너비 문제로 분기점을 많이 두었는데 혹시 효율적인 코드가 있다면 교체 바랍니다.
        
		  500: {
            slidesPerView: 1, 
            spaceBetween: -150,
          },
		  650: {
            slidesPerView: 1,  
            spaceBetween: -250,
          },

          768: {
            slidesPerView: 1,
            spaceBetween: -350,
          },
		  800: {
			slidesPerView: 1,
            spaceBetween: -300,
		  },
		 1000: {
			slidesPerView: 2,
           spaceBetween: 50,
		  },
		  //1180: {
		//	slidesPerView: 3,
         //   spaceBetween: -50,
		  //},
		  1280: {
			slidesPerView: 3,
           spaceBetween: 100,
		  },
		 // 1580: {
		//	slidesPerView: 3,
         //   spaceBetween: -200,
		 // },
		 // 3000: {
	//		slidesPerView: 3,
     //       spaceBetween: -500,
	//	  }
        },
    });
	 autoplay()

      function autoplay(){
          $('.sec2_stop').click(function(){
              swiper.autoplay.stop();
          });
          
          $('.sec2_start').click(function(){
              swiper.autoplay.start();
          });
          
          
      }
}

function sec2HoverEffect(){ //웹진파트 두 이미지 사이즈가 동일하지않고 겹쳐있어서 css로는 제어가 힘들어 js로 hover효과를 줌
	if(window.innerWidth>768){
		const slide = document.querySelectorAll('.sec2 .swiper-slide')
		const imgPc = document.querySelectorAll('.sec2-img_pc')
		const imgM = document.querySelectorAll('.sec2-img_m')

		initEvent()

		function initEvent(){
			for(const item of slide){	
				item.addEventListener('mouseenter',hoverIn)
			}
			for(const item of slide){
				item.addEventListener('mouseleave',hoverOut)
			}
		}
	}
	function hoverIn(){
			hoverActivate(this)
	}
	function hoverOut(){
			hoverInActivate(this)
	}
	function hoverActivate(hover){
		gsap.to(hover.children[0].children[0],{opacity:0,duration:0.1})
		gsap.to(hover.children[0].children[1],{opacity:1,duration:0.1})
	}
	function hoverInActivate(hover){
		gsap.to(hover.children[0].children[0],{opacity:1,duration:0.1})
		gsap.to(hover.children[0].children[1],{opacity:0,duration:0.1})
	}
}

function bgCircleEffect(){
	const visual = document.querySelector('.visual')
	const sec1 = document.querySelector('.sec1')
	const sec2 = document.querySelector('.sec2')
	
	
	let viH = visual.offsetHeight
	let s1H = sec1.offsetHeight
	let s2H = sec2.offsetHeight
	let wW = 1920

	/*init()//원 생성 함수
	initEvent()//원 움직임 함수

	function init(){
		const ctype1 = document.createElement('div')//원 생성
		ctype1.classList.add('bg-cir')//클래스 추가
		gsap.set(ctype1,{ width:18, height: 18, border:'solid 1px #4d98f0',top:125/viH*100+'%',left:507/wW*100+'%'})//style 및 위치값
		const ctype2 = document.createElement('div')
		ctype2.classList.add('bg-cir')
		gsap.set(ctype2,{ width:14, height: 14, background:'#cb88ea',top:115/viH*100+'%',left:1565/wW*100+'%'})
		const ctype3 = document.createElement('div')
		ctype3.classList.add('bg-cir')
		gsap.set(ctype3,{ width:24, height: 24, background:'#e73930',top:240/viH*100+'%',left:926/wW*100+'%'})
		const ctype4 = document.createElement('div')
		ctype4.classList.add('bg-cir')
		gsap.set(ctype4,{ width:10, height: 10, background:'#11a89e',top:585/viH*100+'%',left:1375/wW*100+'%'})
		const ctype5 = document.createElement('div')
		ctype5.classList.add('bg-cir')
		gsap.set(ctype5,{ width:25, height: 25, border:'solid 1px #eba757',top:773/viH*100+'%',left:120/wW*100+'%'})
		const ctype6 = document.createElement('div')
		ctype6.classList.add('bg-cir')
		gsap.set(ctype6,{ width:28, height: 28, background:'#d3d655',top:757/viH*100+'%',left:746/wW*100+'%'})
		const ctype7 = document.createElement('div')
		ctype7.classList.add('bg-cir')
		gsap.set(ctype7,{ width:10, height: 10, background:'#fdb950',top:943/viH*100+'%',left:534/wW*100+'%'})
		const ctype8 = document.createElement('div')
		ctype8.classList.add('bg-cir')
		gsap.set(ctype8,{ width:17, height: 17,  background:'#e73930',top:-26/s1H*100+'%',left:294/wW*100+'%'})
		const ctype9 = document.createElement('div')
		ctype9.classList.add('bg-cir')
		gsap.set(ctype9,{ width:17, height: 17,  background:'#e73930',top:42/s1H*100+'%',left:1605/wW*100+'%'})
		const ctype10 = document.createElement('div')
		ctype10.classList.add('bg-cir')
		gsap.set(ctype10,{ width:7, height: 7,  background:'#ffd75f',top:72/s1H*100+'%',left:1373/wW*100+'%'})
		const ctype11 = document.createElement('div')
		ctype11.classList.add('bg-cir')
		gsap.set(ctype11,{ width:11, height: 11,  background:'#ffbea1',top:106/s1H*100+'%',left:511/wW*100+'%'})
		const ctype12 = document.createElement('div')
		ctype12.classList.add('bg-cir')
		gsap.set(ctype12,{ width:11, height: 11,  background:'#ade730',top:713/s1H*100+'%',left:643/wW*100+'%'})
		const ctype13 = document.createElement('div')
		ctype13.classList.add('bg-cir')
		gsap.set(ctype13,{ width:12, height: 12,  background:'#30e1e7',top:(s1H+6)/s1H*100+'%',left:294/wW*100+'%'})
		const ctype14 = document.createElement('div')
		ctype14.classList.add('bg-cir')
		gsap.set(ctype14,{ width:17, height: 17,  background:'#e3067e7',top:783/s1H*100+'%',left:1496/wW*100+'%'})
		const ctype15 = document.createElement('div')
		ctype15.classList.add('bg-cir')
		gsap.set(ctype15,{ width:40, height: 40, border:'solid 1px #e73930',top:-110/s2H*100+'%',left:649/wW*100+'%'})
		const ctype16 = document.createElement('div')
		ctype16.classList.add('bg-cir')
		gsap.set(ctype16,{ width:17, height: 17, border:'solid 1px #88db51',top:-57/s2H*100+'%',left:1622/wW*100+'%'})
		const ctype17 = document.createElement('div')
		ctype17.classList.add('bg-cir')
		gsap.set(ctype17,{ width:11, height: 11, border:'solid 1px #ffbea1',top:100/s2H*100+'%',left:500/wW*100+'%'})
		const ctype18 = document.createElement('div')
		ctype18.classList.add('bg-cir')
		gsap.set(ctype18,{ width:10, height: 10, border:'solid 1px #bd5fff',top:90/s2H*100+'%',left:1231/wW*100+'%'})
		const ctype19 = document.createElement('div')
		ctype19.classList.add('bg-cir')
		gsap.set(ctype19,{ width:14, height: 14, border:'solid 1px #ade730',top:747/s2H*100+'%',left:576/wW*100+'%'})
		const ctype20 = document.createElement('div')
		ctype20.classList.add('bg-cir')
		gsap.set(ctype20,{ width:20, height: 20, border:'solid 1px #3064e7',top:707/s2H*100+'%',left:1312/wW*100+'%'})
		const ctype21 = document.createElement('div')
		ctype21.classList.add('bg-cir')
		gsap.set(ctype21,{ width:12, height: 12, border:'solid 1px #30E1E7',top:(s2H+69)/s2H*100+'%',left:766/wW*100+'%'})

		//원을 섹션에 맞게 추가
		visual.append(ctype1);visual.append(ctype2);visual.append(ctype3);visual.append(ctype4);visual.append(ctype5);visual.append(ctype6);visual.append(ctype7)
		sec1.append(ctype8);sec1.append(ctype9);sec1.append(ctype10);sec1.append(ctype11);sec1.append(ctype12);sec1.append(ctype13);sec1.append(ctype14);
		sec2.append(ctype15);sec2.append(ctype16);sec2.append(ctype17);sec2.append(ctype18);sec2.append(ctype19);sec2.append(ctype20);sec2.append(ctype21);
	}

	function initEvent(){
		const cir = document.querySelectorAll('.bg-cir')

		let wW = window.innerWidth
		if(wW>769){//pc에서만 움직임 적용
			setInterval( positionRandom,800)//랜덤한 뱡향 움직임 효과
		}

		for(const item of cir){
			item.addEventListener('click',cirRemoveEffect)
		}

		function positionRandom(){
			for(let i=0;i<cir.length;i++){
				gsap.to(cir[i],{
							 y: gsap.utils.random(-15, 15),
							 x: gsap.utils.random(-15, 15),
							duration: gsap.utils.random(1,2),
							ease: 'Power0.easeOut',onComplete:()=>{isMoving=false}
				})
		    }
		}

		function cirRemoveEffect(){
			cirRemove(this)
		}
		function cirRemove(c){
			gsap.to(c,{transform:'scale(0)',duration:0.2})
		}
	}*/
}

function toggleEffect(){
	const sp1 = document.querySelector('.sec1_stop')
	const st1 = document.querySelector('.sec1_start')
	const sp2 = document.querySelector('.sec2_stop')
	const st2 = document.querySelector('.sec2_start')

	sp1.addEventListener('click',stShow1)
	st1.addEventListener('click',spShow1)

	sp2.addEventListener('click',stShow2)
	st2.addEventListener('click',spShow2)
	
	function stShow1(){
		gsap.set(sp1,{display:'none'})
		gsap.set(st1,{display:'block'})
	}
	function spShow1(){
		gsap.set(st1,{display:'none'})
		gsap.set(sp1,{display:'block'})
	}
	function stShow2(){
		gsap.set(sp2,{display:'none'})
		gsap.set(st2,{display:'block'})
	}
	function spShow2(){
		gsap.set(st2,{display:'none'})
		gsap.set(sp2,{display:'block'})
	}
}



