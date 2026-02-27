 document.addEventListener('DOMContentLoaded',()=>{

})
	


<!-- swiper------------------------------------------------------------- -->
function visualSwiperEffect1(){
	var swiper = new Swiper('.swiper1', {
      slidesPerView: 1, //보여지는 슬라이드 개수
      spaceBetween: 0, //슬라이드 사이 공간
      loop: true,  // 반복 슬라이드 false 반복만ㄴ
      keyboard: {
        enabled: true,  //키보드 제어
      },
      autoplay: {
        delay: 4000, // 4초마다 슬라이드
        disableOnInteraction: false, //버튼 제어시 멈춤
      },
      navigation: { //이전다음버튼 제어
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
	  speed : 1000
    });
}

function visualSwiperEffect2(){
	var swiper = new Swiper('.swiper2', {
      slidesPerView: 3, //보여지는 슬라이드 개수
      spaceBetween: 70, //슬라이드 사이 공간
      loop: false,
	  freeMode: true,
      keyboard: {
        enabled: true,  //키보드 제어
      },
      autoplay: {
        delay: 3500, // 4초마다 슬라이드
        disableOnInteraction: false, //버튼 제어시 멈춤
      },
	  scrollbar: {
        el: '.swiper-scrollbar',
        hide:false
      },
      navigation: { //이전다음버튼 제어
        nextEl: '.con1_next',
        prevEl: '.con1_prev',
      },
	  speed : 800,
	  breakpoints: {
        
          768: {
            slidesPerView: 2,  //브라우저가 768보다 클 때
            spaceBetween: 15,
          },
        },
    });
}

function visualSwiperEffect3(){
	var swiper = new Swiper('.swiper3', {
      slidesPerView: 3, //보여지는 슬라이드 개수
      spaceBetween: 70, //슬라이드 사이 공간
      loop: true,  // 반복 슬라이드 false 반복만ㄴ
      keyboard: {
        enabled: true,  //키보드 제어
      },
      autoplay: {
        delay: 3000, // 4초마다 슬라이드
        disableOnInteraction: false, //버튼 제어시 멈춤
      },
      navigation: { //이전다음버튼 제어
        nextEl: '.con2_next',
        prevEl: '.con2_prev',
      },
	  speed : 800,
	  breakpoints: {
        
          768: {
            slidesPerView: 1,  //브라우저가 768보다 클 때
            spaceBetween: 50,
          },
        },
    });
}

function visualSwiperEffect4(){
	var swiper = new Swiper('.swiper4', {
      slidesPerView: 1, //보여지는 슬라이드 개수
      spaceBetween: 10, //슬라이드 사이 공간
      loop: false,  // 반복 슬라이드 false 반복만ㄴ
	  scrollbar: {
        el: '.vi_scrollbar',
        hide:false
      },
      autoplay: {
        delay: 4000, // 4초마다 슬라이드
        disableOnInteraction: false, //버튼 제어시 멈춤
      },
	  speed : 800,
    });
}



<!-- swiper end-------------------------------------------------------- -->
function youtubeBack(){
	$(document).ready(function() {
    $('[data-vbg]').youtube_background(); // 실행
  });
}

function colorChangeEffect(){
	const btn = document.querySelectorAll('.vi_ntpv_btn')
	const sc = document.querySelector('.vi_s_icon')
	const visualLi = document.querySelectorAll('.visual_list>li')
	const classes = visualLi[2].classList

	setInterval(colorChange,500 )
	
	function colorChange(){
		if(classes.contains('swiper-slide-active')){
			sc.classList.add('c_black')
			for(const item of btn){
				item.classList.add('c_black')
			}
		}else{
			sc.classList.remove('c_black')
			for(const item of btn){
				item.classList.remove('c_black')
			}
		}
	}
}


