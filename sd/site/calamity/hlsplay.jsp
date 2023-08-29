<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!doctype html>

<html>

<head>

<meta charset="utf-8">

<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">

<title>브라우저에서 m3u8 확장자를 가진 영상을 재생하기</title>

</head>



<body>

<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<%--<script src="./videojs/hls.js@latest"></script> --%>

<video id="video"></video>

<script>

if(Hls.isSupported()) {
	console.log("Hls.isSupported");
    var video = document.getElementById('video');

    var hls = new Hls();

    hls.loadSource('https://cctvsec.ktict.co.kr/8234/S2YwWZ0otWJhxvsJFZxWLBftXtjvJLBEq9rdZxSU9H5j0ZFWXXAx7LBS2xZpUE6cJ6YGZb/pQAR+7jfJ41435HJ3j5WTir1FH5r41ZE84f0='); // 동영상경로

    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED,function() {

        video.play();

    });

}

// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.

// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.

// This is using the built-in support of the plain video element, without using hls.js.

    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    console.log("application/vnd.apple.mpegurl");
    video.src = 'https://cctvsec.ktict.co.kr/8234/S2YwWZ0otWJhxvsJFZxWLBftXtjvJLBEq9rdZxSU9H5j0ZFWXXAx7LBS2xZpUE6cJ6YGZb/pQAR+7jfJ41435HJ3j5WTir1FH5r41ZE84f0='; // 동영상경로

    video.addEventListener('canplay',function() {

        video.play();

    });

}

</script>



</html>