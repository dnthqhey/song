 document.addEventListener('DOMContentLoaded',()=>{
	pageSelector3()//해당 페이지 외에는 실행되지않게 조건을 걸어줌(페이지마다 따로 js를 넣어주면 되는거지만 헤더에 전부 들어있는 형태라 사용)
})
function pageSelector3(){
	const pN = document.querySelector('.pageNumbering')
	let number = pN.offsetWidth

	if(number==3){
		viewSectionSetting()//비주얼단 세팅
		SubOnlyPcEffect() //pc에만 줄 효과
		outLineSetting() //아웃라인 전체 높이 세팅
		aboutScrollEvnetEffect()//about 스크롤 이벤트
		aboutSwiperEffect()
		aboutCircleEffect()//circle animation
		titleShowEffect()
	}
}

function SubOnlyPcEffect(){
	let wW = window.innerWidth
	if(wW>769){
	
	}
}

function viewSectionSetting(){
	const vs = document.querySelector('.view-section')
	const teamLi = document.querySelectorAll('.teams_list li')
	init()
	window.addEventListener('resize',init)
	
	function init(){
		let wH = window.innerHeight;
		gsap.set(vs,{height:wH})

		for(const item of teamLi){//팀 섹션 원 높이 자동변경
			let tOH = item.offsetWidth
			gsap.set(item,{height:tOH})			
		}
	}
}
function aboutScrollEvnetEffect(){
	const view = document.querySelector(".view-section")
	const viInner = document.querySelector(".view-section .content_inner")
	const tree = document.querySelector(".vs-tree_wrap")
	const tw = document.querySelector(".vs-text_wrap")
	const st = document.querySelector(".vs-slide-txt")
	const tp0 = document.querySelector(".vst-op0")
	initEvent()

	 function initEvent(){
		window.addEventListener('scroll',aboutScrollEvent)
	 }

	 function aboutScrollEvent(){
		const trT = 50
		const twT = 60
		const stL = 200

		let sH = window.pageYOffset
		//console.log(sH)
		let trNum
		let twNum
		let stNum 
		let viInnerNum = (sH-600)/6
		let viewNum = sH-3000
		
		
		let wW = window.innerWidth

		if(wW<=769){
			trNum = sH/20
			twNum = sH/18
			stNum = sH/7
		}else
		{	
			trNum = sH/30
			twNum = sH/23
			stNum = sH/10
		}

		let trSt = trT-trNum
		let twSt = twT-twNum

		
		if(sH<=200){
			gsap.to(viInner,{ top: 0,duration:0.01 })
		}	
		if(sH<=3000){
			gsap.to(tree,{ top: trT-trNum+'%', ease: Power0.easeNone,duration:0.01 })
			gsap.to(tw,{ top: twT-twNum+'%',ease: Power0.easeNone,duration:0.01 })				
			//gsap.to(st,{ opacity:0}) 
			if(twSt<=40){
				gsap.to(tp0,{ top:0, opacity:1,duration:0.3  })
			}else{
			gsap.to(tp0,{ top:0, opacity:0.1,duration:0.3 })

			}
				
		}
		if(600<sH && sH<=3200){
			//gsap.to(viInner,{ top: 0-viInnerNum+'%', ease: Power0.easeNone,duration:0.01 })
			gsap.to(st,{ left: stL-stNum+'%',ease: Power0.easeNone,duration:0.01,opacity:1 })
			gsap.to(view,{ top:0,duration:0.01})
		}
		if(sH>3200){
			//gsap.to(st,{ left: -stL+'%',ease: Power0.easeNone,duration:0.1,opacity:1 })
			gsap.to(view,{ top:-100+'%',duration:0.01 })
			//gsap.to(st,{ opacity:0}) 
		}
	 }
}

function aboutSwiperEffect(){
	awardsSwiper()
}

function awardsSwiper(){
	var swiper = new Swiper('.awards-slide', {
      slidesPerView: 2, //보여지는 슬라이드 개수
      spaceBetween: 50, //슬라이드 사이 공간
      loop: false,
	  centeredSlides: false,
	  slideToClickedSlide : true, 
	  freeMode: true,
	  mousewheel: true,
	  //slidesOffsetBefore:1,
      keyboard: {
        enabled: true,  //키보드 제어
      },
      navigation: { //이전다음버튼 제어
        nextEl: '.awards_next',
        prevEl: '.awards_prev',
      },
	  pagination: {
          el: '.swiper-pagination',
          type: "fraction"
        },
	  //speed : 1000,
	  breakpoints: {
        
         768: {
            slidesPerView: 1,  //브라우저가 768보다 클 때
            spaceBetween: 30,
          },
        },
    });
}
function aboutCircleEffect(){
	const t = document.querySelector('.teams')
	const c = document.querySelectorAll('.team-cir')
	let tH = t.offsetTop
	let sH
	let wH = window.innerHeight
	let activeH = tH-(wH/2)

	initEvent()

	function initEvent(){
		window.addEventListener('scroll',cirDashEffect)
	}

	function cirDashEffect(){
		sH = window.pageYOffset
		if(sH>=activeH){
			for(const item of c){
				item.classList.add('cir-activate')
			}
		}
	}
}
function titleShowEffect(){
	const h = document.querySelector('.history')
	const a = document.querySelector('.awards')
	const t = document.querySelector('.teams')
	const c = document.querySelector('.contact')
	const hTit = document.querySelector('.history h3>span')
	const aTit = document.querySelector('.awards h3>span')
	const tTit = document.querySelector('.teams h3>span')
	const cTit = document.querySelector('.contact h3>span')
	const hL = document.querySelector('.hs-list_container')

	let hH = h.offsetTop
	let aH = a.offsetTop
	let tH = t.offsetTop
	let cH = c.offsetTop

	let sH
	let wH = window.innerHeight
	console.log(hH)
	let hActiveH = hH-(wH-200)
	let aActiveH = aH-(wH-200)
	let tActiveH = tH-(wH-200)
	let cActiveH = cH-(wH-200)

	initEvent()

	function initEvent(){
		window.addEventListener('scroll',cirDashEffect)
	}

	function cirDashEffect(){
		sH = window.pageYOffset
		if(sH>=cActiveH){
			cTit.classList.add('tit-activate')
		}else
		if(sH>=tActiveH){
			tTit.classList.add('tit-activate')
		}else
		if(sH>=aActiveH){
			aTit.classList.add('tit-activate')
		}else
		if(sH>=(hActiveH+300)){
			hL.classList.add('hL-activate')
		}else
		if(sH>=hActiveH){
			hTit.classList.add('tit-activate')
		}
		
		
		
	}
}