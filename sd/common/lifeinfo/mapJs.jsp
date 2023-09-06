<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<script>
	var map;
	var mapOptions ;
	var marker;

	var mapJs = (function(){
	    var mapJs = {};

	    mapJs.initMap = function(gpsla, gpslo){
	    	mapOptions = {
			    center: new daum.maps.LatLng(gpsla, gpslo),
			    zoom: 10,
			    minZoom: 1, 							//지도의 최소 줌 레벨
		        zoomControl: true, 				//줌 컨트롤의 표시 여부
		        zoomControlOptions: { 		//줌 컨트롤의 옵션
		            position: daum.maps.ControlPosition.TOPRIGHT
		        },
		        mapTypeControl: true
			};

			map = new daum.maps.Map('map', mapOptions);
			map.setCursor('pointer');

			marker = new daum.maps.Marker({
			    position: new daum.maps.LatLng(gpsla, gpslo),
			    map: map
			});
	    };

	    mapJs.initMapReset = function(gpsla, gpslo){
	    	mapOptions = {
			    center: new daum.maps.LatLng(gpsla, gpslo),
			    zoom: 10,
			    minZoom: 7, 							//지도의 최소 줌 레벨
		        zoomControl: true, 				//줌 컨트롤의 표시 여부
		        zoomControlOptions: { 		//줌 컨트롤의 옵션
		            position: daum.maps.ControlPosition.TOPRIGHT
		        },
		        mapTypeControl: true
			};

			map = new daum.maps.Map('map', mapOptions);
			map.setCursor('pointer');
	    };

	    mapJs.searchAddressToCoordinate = function(address) {
			var gps_la;
			var gps_lo;

		    daum.maps.Service.geocode({ query: address }, function(status, response) {
		        if (status === daum.maps.Service.Status.ERROR) {
		            return alert('Something Wrong!');
		        }

		        if (response.v2.meta.totalCount === 0) {
		            return alert('totalCount' + response.v2.meta.totalCount);
		        }

		        var htmlAddresses = [],
		            item = response.v2.addresses[0],
		            point = new daum.maps.Point(item.x, item.y);

		        if (item.roadAddress) {
		            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
		        }

		        if (item.jibunAddress) {
		            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
		        }

		        if (item.englishAddress) {
		            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
		        }

		        map.setCenter(point);					// 지도 이동
		        marker.setPosition(point);			// 마커 이동

		    });
		};


	    return mapJs;
	})();


	var mapJsPopup = (function(){
	    var mapJsPopup = {};

	    mapJsPopup.initMap = function(gpsla, gpslo){
	    	mapOptions = {
			    center: new daum.maps.LatLng(gpsla, gpslo),
			    zoom: 14,
			    minZoom: 1, 							//지도의 최소 줌 레벨
		        zoomControl: true, 				//줌 컨트롤의 표시 여부
		        zoomControlOptions: { 		//줌 컨트롤의 옵션
		            position: daum.maps.Position.TOP_RIGHT
		        },
		        mapTypeControl: true
			};

			map = new daum.maps.Map('map', mapOptions);
			map.setCursor('pointer');

			marker = new daum.maps.Marker({
			    position: new daum.maps.LatLng(gpsla, gpslo),
			    map: map
			});
	    };

	    mapJsPopup.initMapReset = function(gpsla, gpslo){
	    	mapOptions = {
			    center: new daum.maps.LatLng(gpsla, gpslo),
			    zoom: 14,
			    minZoom: 1, 							//지도의 최소 줌 레벨
		        zoomControl: true, 				//줌 컨트롤의 표시 여부
		        zoomControlOptions: { 		//줌 컨트롤의 옵션
		            position: daum.maps.Position.TOP_RIGHT
		        },
		        mapTypeControl: true
			};

			map = new daum.maps.Map('map', mapOptions);
			map.setCursor('pointer');
	    };

	    mapJsPopup.searchAddressToCoordinate = function(address) {
			var gps_la;
			var gps_lo;

		    daum.maps.Service.geocode({ query: address }, function(status, response) {
		        if (status === daum.maps.Service.Status.ERROR) {
		            return alert('Something Wrong!');
		        }

		        if (response.v2.meta.totalCount === 0) {
		            return alert('totalCount' + response.v2.meta.totalCount);
		        }

		        var htmlAddresses = [],
		            item = response.v2.addresses[0],
		            point = new daum.maps.Point(item.x, item.y);

		        if (item.roadAddress) {
		            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
		        }

		        if (item.jibunAddress) {
		            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
		        }

		        if (item.englishAddress) {
		            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
		        }

		        map.setCenter(point);					// 지도 이동
		        marker.setPosition(point);			// 마커 이동

		    });
		};


	    return mapJsPopup;
	})();

	//----------------------------------
	// 폴리곤 기능 활성화
	//----------------------------------
	var polygon;
	function fn_Polygon(){
		polygon = new daum.maps.Polygon({
			map: map,
			paths: [[]],
			fillColor: '#ff0000',
			fillOpacity: 0.3,
			strokeColor: '#ff0000',
			strokeOpacity: 0.6,
			strokeWeight: 3,
			clickable: true
		});
		daum.maps.Event.addListener(map, 'click', function(e) {
			var point = e.coord;

			// 폴리곤 좌표 폼에 넣기 시작
			var gpsLa = e.coord.lat();
			var gpsLo = e.coord.lng();
			var sumGps = gpsLa + "," + gpsLo;
			var gpsPolygonVal = $("#gpsPolygon").val();
			gpsPolygonVal  = gpsPolygonVal  + "||" + sumGps;
			$("#gpsPolygon").val(gpsPolygonVal);
			// 폴리곤 좌표 폼에 넣기 끝

			var path = polygon.getPaths().getAt(0);
			path.push(point);
		});

		var varHtml = "<a href=\"javascript:fn_Polygon_set();\" class=\"p-button write\">폴리곤 기능 비활성 및 초기화</a>";
		$("#polygonSpan").html(varHtml);
	}

	function fn_Polygon_set(){
		polygon.setMap(null);
		polygon = null;

		var varHtml = "<a href=\"javascript:fn_Polygon();\" class=\"p-button write\">폴리곤 기능 활성</a>";
		$("#polygonSpan").html(varHtml);
	}

	//----------------------------------
	// 마커 위치로 지도 이동
	//----------------------------------
	function scroll_move(num){
		try{
			var object = $("div[id='map']");
			//console.log(object.scrollTop());
			$('body').scrollTop(object.scrollTop() + object.height());
			markerClickIn(num);
		}catch(e){
			//console.log(e);
		}finally{
			num = null;
			object = null;
		}
	}

	//----------------------------------
	// 마커 클릭 이벤트
	//----------------------------------
	function markerClickIn(seq){
		return function(e) {
	        var marker = markers[seq],
	            infoWindow = infoWindows[seq];

			$("button[name=markerName]").each(function(i, e){
			    $(this).removeClass("active");
			});

			var markerActiveCss = "";
	        if (infoWindow.getMap()) {
	        	markerActiveCss = "";
	        	infoWindow.close();
	        } else {
	        	$("#marker"+(eval(seq)+1)).addClass("active");

	        	markerActiveCss = "active";
	        	infoWindow.open(map, marker);
	        }

	        map.panTo(e.coord);
	    }
	}

	//*********************************************************
	// 마커 컨트롤
	// 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
	//*********************************************************
	function getClickHandler(seq) {
		return function(e) {
	        var marker = markers[seq],
	            infoWindow = infoWindows[seq];

			var markerActiveCss = "";
	        if (infoWindow.getMap()) {
	        	markerActiveCss = "";
	        	infoWindowClose(seq);
	        } else {
	        	infoWindowOpen(seq);
	        }
	    }
	}

	//*********************************************************
	// infoWindow Close
	//*********************************************************
	function infoWindowClose(seq){
	        var marker = markers[seq],
	            infoWindow = infoWindows[seq];

			$("button[name=markerName]").each(function(i, e){
			    $(this).removeClass("active");
			});

			// 마커 애니메이션 종료
			mapMarkerAnnDelete();
		   	infoWindow.close();

		   	// Map 중심으로 이동
		   	mapCenterMove(seq);
	}

	//*********************************************************
	// infoWindow Open
	//*********************************************************
	function infoWindowOpen(seq){
        var marker = markers[seq],
            infoWindow = infoWindows[seq];

        // 마커 애니메이션 종료
        mapMarkerAnnDelete();

		$("button[name=markerName]").each(function(i, e){
			$(this).removeClass("active");
		});
		$("#marker"+(eval(seq)+1)).addClass("active");

		marker.setZIndex(100000);
    	marker.setAnimation(daum.maps.Animation.BOUNCE);
		infoWindow.open(map, marker);

		var position = new daum.maps.LatLng(MARKER_SPRITE_POSITION[seq]["GPS_LA"], MARKER_SPRITE_POSITION[seq]["GPS_LO"]);
		map.setCenter(position); // 중심 좌표 이동
		map.panBy(new daum.maps.Point(0, -220)); // 오른쪽 아래로 10 픽셀 이동
	}

	//*********************************************************
	// Map 을 센터로 이동 시킴
	//*********************************************************
	function mapCenterMove(seq){
		var position =  new daum.maps.LatLng(MARKER_SPRITE_POSITION[seq]["GPS_LA"], MARKER_SPRITE_POSITION[seq]["GPS_LO"]);
		map.setCenter(position); // 중심 좌표 이동
	}

	//*********************************************************
	// Marker 애니매이션 삭제 처리
	//*********************************************************
	function mapMarkerAnnDelete(){
		var arrLength = MARKER_SPRITE_POSITION.length;

		for(var i=0;i < arrLength;i++){
			var marker = markers[i],
            	infoWindow = infoWindows[i];

			 if(marker.getZIndex() == 100000){
				 marker.setZIndex(i);
			 	marker.setAnimation(daum.maps.Animation.DROP);
			 }
		}
	}

	function updateMarkers(map, markers) {

	    var mapBounds = map.getBounds();
	    var marker, position;

	    for (var i = 0; i < markers.length; i++) {
	        marker = markers[i]
	        position = marker.getPosition();

	        if (mapBounds.hasLatLng(position)) {
	            showMarker(map, marker);
	            daum.maps.Event.addListener(marker, 'click', getClickHandler(i));
	        } else {
	            hideMarker(map, marker);
	        }
	    }
	}

	function showMarker(map, marker) {

	    if (marker.setMap()) return;
	    marker.setMap(map);
	}

	function hideMarker(map, marker) {
	    if (!marker.setMap()) return;
	    marker.setMap(null);
	}

	function makeAddress(item) {
	    if (!item) {
	        return;
	    }

	    var name = item.name,
	        region = item.region,
	        land = item.land,
	        isRoadAddress = name === 'roadaddr';

	    var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

	    if (hasArea(region.area1)) {
	        sido = region.area1.name;
	    }

	    if (hasArea(region.area2)) {
	        sigugun = region.area2.name;
	    }

	    if (hasArea(region.area3)) {
	        dongmyun = region.area3.name;
	    }

	    if (hasArea(region.area4)) {
	        ri = region.area4.name;
	    }

	    if (land) {
	        if (hasData(land.number1)) {
	            if (hasData(land.type) && land.type === '2') {
	                rest += '산';
	            }

	            rest += land.number1;

	            if (hasData(land.number2)) {
	                rest += ('-' + land.number2);
	            }
	        }

	        if (isRoadAddress === true) {
	            if (checkLastString(dongmyun, '면')) {
	                ri = land.name;
	            } else {
	                dongmyun = land.name;
	                ri = '';
	            }

	            if (hasAddition(land.addition0)) {
	                rest += ' ' + land.addition0.value;
	            }
	        }
	    }

	    return [sido, sigugun, dongmyun, ri, rest].join(' ');
	}

	function hasArea(area) {
	    return !!(area && area.name && area.name !== '');
	}

	function hasData(data) {
	    return !!(data && data !== '');
	}

	function checkLastString (word, lastString) {
	    return new RegExp(lastString + '$').test(word);
	}

	function hasAddition (addition) {
	    return !!(addition && addition.value);
	}

</script>