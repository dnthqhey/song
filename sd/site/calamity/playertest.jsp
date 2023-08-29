<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>My Video</title>
    <link href="https://vjs.zencdn.net/7.7.6/video-js.css" rel="stylesheet" />
    <!-- For IE8 (for Video.js versions prior to v7)
    <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
    -->
  </head>
  <body>
   <h1>My Video</h1>
   <video-js id="my_video_1" class="vjs-default-skin" controls preload="auto" width="640" height="268">
    <source src="https://cctvsec.ktict.co.kr/8068/usOvX1TQRRnbaXe1qKl9FIrjP5P64gGT6beF9xrFaa9jhRy69Z3Iu95aJAwfNYRs1d2LHt93e0NYOul+1nxYZJYtyGVaHpjJeTHgg80kH0Q=" type="application/x-mpegURL">
   </video-js>
   <!--This is for Video.js by itself -->
   <script src="https://unpkg.com/video.js/dist/video.js"></script>
   <!--This is for HLS compatibility with all major browsers-->
   <script src = "https://unpkg.com/browse/@videojs/http-streaming@1.13.3/dist/videojs-http-streaming.min.js"></script>
   <script>
    var player = videojs('my_video_1');
   </script>
  </body>
</html>