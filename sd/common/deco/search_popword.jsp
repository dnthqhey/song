<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
			<div class="popular">
                <div class="wrap">
					<script src="/search/ark/js/beta.fix.js"></script>
					<%--<script src="/search/ark/js/ark.js"></script>--%>
					<script>
					function doKeyword(kwd) {
						$('#search_query').val(kwd);
						$('#search').submit();
					}

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
								$(xml).find("Query").each(function(index, element) {
									str += '<div class="popular_item"><a class="popular_anchor" href="#n" onclick="javascript:doKeyword(\'' + $(this).text() + '\');"><span class="popular_info"><span class="popular_ranking">' + (index + 1) + '</span><span class="popular_keyword">'+$(this).text()+'</span></span></a></div>';
								});
								$("#popular_list").html(str);
						  	},
							error:function(request,status,error){
						  		console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
							}
						});
					});
					</script>
                    <div class="popular_content">
                        <h2 class="popular_title"><span>HOT</span>인기검색어</h2>
                        <div class="popular_panel">
                            <div id="popular_list" class="popular_list">
                            </div>
                            <div class="popular_hide">
                                <button type="button" class="popular_button">닫기</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>