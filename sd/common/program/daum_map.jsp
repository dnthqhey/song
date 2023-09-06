<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="daumMapClientId"><spring:message code="cctv.daum.clientId" text=""/></c:set>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>다음지도 좌표얻기</title>
<script type="text/javascript" src="/common/js/jquery-1.12.4.min.js"></script>
</head>
<body>
<h1 class="subHeader">다음지도위경도</h1>
<div id="map" style="width:90%;height:470px;margin:10px;padding:10px;"></div>
<div id="display_latlng" style="width:90%;text-align:center">
	<label for="i_latlng">위경도</label> : <input id="i_latlng" value="" size="40"/>
	<label for="i_lat">위도</label> : <input id="i_lat" value="" size="20"/>
	<label for="i_lng">경도</label> : <input id="i_lng" value="" size="20"/>
</div>

<c:set var="DAUM_API_KEY"><%=kr.co.hanshinit.NeoCMS.cmm.util.PropResource.getString("daum.map.apiKey")%></c:set>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${DAUM_API_KEY}"></script>
<script>
function reloadMap(){
	$("#map").width($('#display_latlng').width());
}

var map;
var imageSize = new daum.maps.Size(43, 43);

$( window ).resize(function() {
	reloadMap();
});

function moveMapPosition(lat, lng){
	map.setCenter(new daum.maps.LatLng(lat,lng));
	map.setLevel(1);
}

$( document ).ready(function() {
	reloadMap();

	map = new daum.maps.Map(document.getElementById('map'), {
        level: 2,
        center: new daum.maps.LatLng(36.30622786511115, 127.5718111548219),
    });

	var aroundMapTypeControl = new daum.maps.MapTypeControl();
	var aroundMapZoomControl = new daum.maps.ZoomControl();
	map.addControl(aroundMapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
	map.addControl(aroundMapZoomControl, daum.maps.ControlPosition.RIGHT);

    daum.maps.event.addListener(map, 'click', function(e) {
		var marker = new daum.maps.Marker({
            position: e.latLng,
            map: map
        });

		$('#i_lng').val(marker.getPosition().getLng());
		$('#i_lat').val(marker.getPosition().getLat());
		$('#i_latlng').val(marker.getPosition().getLat() + ',' + marker.getPosition().getLng());

		(function(map, marker) {
			daum.maps.event.addListener(marker, 'click', function(e) {
				if(confirm("마커를 삭제하시겠습니까?")){
					marker.setMap(null);
				}
			});
		})(map, marker);
    });
});

</script>
</body>
</html>