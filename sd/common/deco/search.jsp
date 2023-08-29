<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>


				<section class="search clearfix">
					<h2 class="skip">통합검색</h2>
					<div class="serach_wrap">

						<jsp:include page="/common/deco/search_form.jsp"/>

					</div>
					<div class="popular_keyword clearfix">
						<h3 class="title">인기검색어</h3>
						<div id="popular_keyword_con" class="list clearfix"></div>
						<div class="control">
							<button type="button" class="prev ir">이전</button>
							<button type="button" class="next ir">다음</button>
						</div>
					</div>
				</section><!--//search-->

				<script>
				$(document).ready(function() {
					var target		= "popword";
					var range		= "D";
					var collection  = "_ALL_";
					var datatype   = "xml";

					$.ajax({
						type: "POST",
						url: "/search/popword/popword.jsp",
						dataType: 'xml',
						data: { "target" : target, "range" : range, "collection" : collection , "datatype" : datatype },
						success: function(xml) {
							//console.log(xml);
							var str = '';
							$(xml).find("Query").each(function() {
								str += '<div class="slide"><a href="#n" onclick="javascript:doKeyword(\'' + $(this).text() + '\');">'+$(this).text()+', </a></div>';
							});
							$("#popular_keyword_con").html(str);
							//인기검색어 롤링
							var popularSlick =$('#popular_keyword_con');
							popularSlick.slick({
								autoplay : false,
								dots:false,
								prevArrow : $('.popular_keyword .control .prev'),
								nextArrow : $('.popular_keyword .control .next'),
								pauseOnDotsHover : true,
								swipe:false,
								draggable:false,
								slidesToShow: 4,
								slidesToScroll: 1,
								variableWidth:true
							});
					  	},
						error:function(request,status,error){
					  		console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
						}
					});
				});
				</script>