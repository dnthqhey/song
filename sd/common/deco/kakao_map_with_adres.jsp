<%@ page language="java" pageEncoding="UTF-8"%>


		<c:set var="DAUM_API_KEY"><%=kr.co.hanshinit.NeoCMS.cmm.util.PropResource.getString("daum.map.apiKey")%></c:set>
		<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${DAUM_API_KEY}&libraries=services"></script>

		<c:if test="${param.useMap eq 'Y'}">
		<script>
		// 지도출력
		function reloadMap(){
			$("#<c:out value="${param.mapId}"/>").width($('#display_latlng').width());
		}

		var map;
		var marker;
		var imageSize = new daum.maps.Size(43, 43);

		$( window ).resize(function() {
			reloadMap();
		});

		function moveMapPosition(lat, lng){
			var pos = new daum.maps.LatLng(lat,lng);
			map.setCenter(pos);
			marker.setPosition(pos);
		}

		$( document ).ready(function() {
			reloadMap();

			<c:choose>
				<c:when test="${not empty param.la and not empty param.lo}">
				var defaultLaLo = new daum.maps.LatLng(<c:out value="${param.la}"/>, <c:out value="${param.lo}"/>);
				</c:when>
				<c:otherwise>
				var defaultLaLo = new daum.maps.LatLng(37.5634225092469, 127.036964999975);
				</c:otherwise>
			</c:choose>

			map = new daum.maps.Map(document.getElementById('<c:out value="${param.mapId}"/>'), {
		        level: 2,
		        center: defaultLaLo,
		    });

			marker = new daum.maps.Marker({
	            position: defaultLaLo,
	            map: map
	        });


			var aroundMapTypeControl = new daum.maps.MapTypeControl();
			var aroundMapZoomControl = new daum.maps.ZoomControl();
			map.addControl(aroundMapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
			map.addControl(aroundMapZoomControl, daum.maps.ControlPosition.RIGHT);

		    daum.maps.event.addListener(map, 'click', function(e) {
		    	marker.setPosition(e.latLng);
		    	//console.log(marker.getPosition().getLat() + "," + marker.getPosition().getLng());

		    	$('#<c:out value="${param.laId}"/>').val(marker.getPosition().getLat());
		    	$('#<c:out value="${param.loId}"/>').val(marker.getPosition().getLng());
		    });

		    <c:if test="${param.useCodeAddress eq 'Y' and not empty paramm.detailAdresId }">
		    $('#<c:out value="${param.detailAdresId}"/>').on('change', function() {
		    	codeAddress();
		    });
		    </c:if>
		});
		</script>
		</c:if>

		<c:if test="${param.useCodeAddress eq 'Y' and not empty param.laId and not empty param.loId}">
		<script>
		function codeAddress() {
			var geocoder = new daum.maps.services.Geocoder();
			var adres = jQuery("#<c:out value="${param.adresId}"/>").val()<c:if test="${not empty param.detailAdresId}"> + " " + jQuery("#<c:out value="${param.detailAdresId}"/>").val()</c:if>;
			if(adres !== "") {
				geocoder.addressSearch(adres, function(result, status) {
					// 정상적으로 검색이 완료됐으면
				    if (status === daum.maps.services.Status.OK) {
				    	//console.log(result);
				    	for(i=0, n = result.length; i < n; i++) {
				    		//if(confirm(result[i].address_name + '이 맞습니까?')) {
								jQuery("#<c:out value="${param.laId}"/>").val(result[i].y);
								jQuery("#<c:out value="${param.loId}"/>").val(result[i].x);
								moveMapPosition(result[i].y, result[i].x);
								break;
							//}
				    	}
					}
				    else {
					  alert("주소가 올바르지 않은 것 같습니다.(" + status + ")");
					}
				});
			}
		}
		</script>
		</c:if>

		<script>
		function findDoro(){
			var pop = window.open("/common/doro/jusoPopup.jsp","pop","width=570,height=420, scrollbars=yes, resizable=yes");
		}


		function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo){
			<c:if test="${not empty param.zipId}">
			$('#<c:out value="${param.zipId}"/>').val(zipNo);
			</c:if>

			var adres = roadAddrPart1 + " " + roadAddrPart2;
			//<c:if test="${empty param.zipId}"> adres = "[" + zipNo + "]" + adres;</c:if>
			<c:if test="${empty param.detailAdresId}"> adres = adres + " " + addrDetail;</c:if>

			$('#adres').val(adres);

			<c:if test="${not empty param.detailAdresId}">
			$('#<c:out value="${param.detailAdresId}"/>').val(addrDetail);
			</c:if>

			<c:if test="${param.useCodeAddress eq 'Y' and not empty param.laId and not empty param.loId}">
			codeAddress();
			</c:if>
		}
		</c:if>
		</script>