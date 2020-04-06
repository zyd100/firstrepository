/*页面加载时请求并填充数据*/
$(document).ready(function() {
	var data = JSON.parse('$ {product}');
	
	//$("div#wd_personal").attr("userName",JSON.parse('${userName}'));
	$("img.bigImg").css("src", data.product.image[0]);
	for (var i = 1; i < 4; i++) {
		var imgObj = $("div.smallImgDiv").find("img.smallImg").eq(i - 1);
		var product_image = data.product.image[i]; 
		imgObj.css("src", product_image);
	}
	var inforText = $("div.infor_text");
	inforText.find("p.productName").text(data.product.productName);
	inforText.find("p.productName").attr("product_id",data.product.id);
	inforText.find("span.oldPrice").text(data.product.price);
	inforText.find("span.newPrice").text(data.product.shopPrice);
	inforText.find("span#storeCount").text(data.product.quantity);
	//添加商品介绍图片信息
	for (var i = 0; i < data.productImage.length; i++) {
		var imgIntro = data.productImage.image[i];
		var imgIntroHtml = "<img src='" + imgIntro + "'>";
		var $new = $(imgIntroHtml);
		$("div#waresDetail").last().append($new);
	}
});

/* 请求商品评论数据 */
$(document).ready(function() {
	var productId = $("div.infor_text").find("p.productName").attr("product_id");
	var access_url = "${pageContext.request.contextPath }/products/{" + productId + "}/comments/{0}/{10}";
	$.ajax({
		type: "get",
		url: access_url,
		success: function(data) {
			if (JSON.parse(data).success) {
				for (var i = 0; i < JSON.parse(data).data.length; i++) {
					var accessContent = JSON.parse(data).data[i].content;
					var accessDate = JSON.parse(data).data[i].date;
					var accessName = JSON.parse(data).data[i].userName;
					var accessHtml = "<div class='accessView'><div class='accessContent'>" + accessContent +
						"</div><div class='acessDate'>" +
						accessDate + "</div><div id='accessName'>" + accessName + "</div></div>";
					var $new = $(accessHtml);
					$("div#access").prepend($new);
				}
				$("div#wd_paging").attr("page", 1);
			}
		}
	});
});

/*添加事件*/
$(document).ready(function() {
	/* 前往个人中心 */
	$("div#wd_personal").on("click", "a#personal", function() {
		var userName = $("div#wd_personal").attr("userName");
		var search_url = "${pageContext.request.contextPath }/users/{" + userName + "}";
		$.ajax({
			url: search_url,
			type: "get",
			success: function() {

			}
		});
	});

	/* 前往购物车 */
	$("div#wd_personal").on("click", "a#shoppingCart", function() {
		var userName = $("div#wd_personal").attr("userName");
		var search_url = "${pageContext.request.contextPath }/users/{" + userName + "}/carts";
		$.ajax({
			url: search_url,
			type: "get",
			success: function() {

			}
		});
	});

	/* 前往收藏页面 */
	$("div#wd_personal").on("click", "a#collection", function() {
		var userName = $("div#wd_personal").attr("userName");
		var search_url = "${pageContext.request.contextPath }/users/{" + userName + "}/stars";
		$.ajax({
			url: search_url,
			type: "get",
			success: function() {

			}
		});
	});

	/* 退出登录 */
	$("div#wd_personal").on("click", "a#outLogin", function() {
		$.ajax({
			url: "${pageContext.request.contextPath }/users/logout",
			type: "put",
			success: function() {}
		});
	});

	/* 添加商品至购物车 */
	$("div.buyBtns").on("click", "button#addCart", function() {
		var buyCount = $("input#buyCount").val();
		var product_id = $("p.productName").attr("product_id");
		var userName = $("div#wd_personal").attr("userName");
		var cartText = {
			"productId": product_id,
			"quantity": buyCount
		};
		var search_url = "${pageContext.request.contextPath }/users/{" + userName + "}/carts/{" + product_id + "}";
		/* 添加数据 */
		$.ajax({
			url: search_url,
			type: "post",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(cartText),
			success: function(data, status) {
				if (JSON.parse(data).success == true && JSON.parse(data).userName == userName) {
					alert("添加成功");
				}
			}
		});
	});

	/* 添加商品至收藏 */
	$("div.buyBtns").on("click", "button#addCollect", function() {
		var product_id = $("p.productName").attr("product_id");
		var userName = $("div#wd_personal").attr("userName");
		var collectText = {
			"productId": product_id
		};
		var collect_url = "${pageContext.request.contextPath }/users/{" + userName + "}/stars/{" + product_id + "}";
		/* 添加数据 */
		$.ajax({
			url: collect_url,
			type: "post",
			data: collectText,
			success: function(data, status) {
				if (JSON.parse(data).success == true && JSON.parse(data).userName == userName) {
					alert("添加成功");
				}
			}
		});
	});

	/* 立即下单 */
	$("div.buyBtns").on("click", "button#buyBtn", function() {
		/*var buyCount = $("input#buyCount").val();
		var product_id = $("p.productName").attr("product_id");
		var userName = $("div#wd_personal").attr("userName");
		var buyText = {
			"product_id": product_id,
			"buyCount": buyCount
		};
		var order_url = "${pageContext.request.contextPath }/user/" + buyText + "/order/buy";
		$(this).parent().attr("href", order_url);*/
	});
});

/* 评论翻页事件 */
$(document).ready(function() {
	/* 向前翻页 */
	$("div#access nav").on("click", "li.prevPage a", function() {
		var productId = $("div.infor_text").find("p.productName").attr("product_id");
		var nowPage = $("div#wd_paging").attr("page");
		if (nowPage == 1) {
			alert("已经是第一页了~");
			return;
		}
		var prev_url = "${pageContext.request.contextPath }/products/{" + productId + "}/comments/" + (--nowPage - 1) +
			"/10";
		$.ajax({
			type: "get",
			url: prev_url,
			success: function(data) {
				if (JSON.parse(data).success) {
					$("div#access").find("div.accessView").remove();
					for (var i = 0; i < JSON.parse(data).data.length; i++) {
						var accessContent = JSON.parse(data).data[i].content;
						var accessDate = JSON.parse(data).data[i].date;
						var accessName = JSON.parse(data).data[i].userName;
						var accessHtml = "<div class='accessView'><div class='accessContent'>" + accessContent +
							"</div><div class='acessDate'>" +
							accessDate + "</div><div id='accessName'>" + accessName + "</div></div>";
						var $new = $(accessHtml);
						$("div#access").prepend($new);
					}
					$("div#wd_paging").attr("page", nowPage);
				}
			}
		});
	});

	/* 向后翻页 */
	$("div#access nav").on("click", "li.nextPage a", function() {
		var productId = $("div.infor_text").find("p.productName").attr("product_id");
		var nowPage = $("div#wd_paging").attr("page");
		var next_url = "${pageContext.request.contextPath }/products/{" + productId + "}/comments/" + (++nowPage - 1) +
			"/10";
		$.ajax({
			type: "get",
			url: next_url,
			success: function(data) {
				if (JSON.parse(data).success) {
					$("div#access").find("div.accessView").remove();
					for (var i = 0; i < JSON.parse(data).data.length; i++) {
						var accessContent = JSON.parse(data).data[i].content;
						var accessDate = JSON.parse(data).data[i].date;
						var accessName = JSON.parse(data).data[i].userName;
						var accessHtml = "<div class='accessView'><div class='accessContent'>" + accessContent +
							"</div><div class='acessDate'>" +
							accessDate + "</div><div id='accessName'>" + accessName + "</div></div>";
						var $new = $(accessHtml);
						$("div#access").prepend($new);
					}
					$("div#wd_paging").attr("page", nowPage);
				} else {
					alert("已经是最后一页了~");
					$("div#wd_paging").attr("page", (--nowPage));
				}
			}
		});
	});
});

/*图片展示实现*/
$(document).ready(function() {
	/* 商品信息图片鼠标悬停事件 */
	$("img.smallImg").mouseover(function() {
		var bigImageURL = $(this).attr("bigImageUrl");
		$("img.bigImg").attr("src", bigImageURL);
	});

	/* 图片加载事件 */
	$("img.bigImg").load(
		function() {
			$("img.smallImg").each(function() {
				var bigImageURL = $(this).attr("bigImageUrl");
				img = new Image();
				img.src = bigImageURL;

				img.onload = function() {
					console.log(bigImageURL);
					$("div.img4load").append($(img));
				};
			});
		}
	);
});

/*设置页面框架元素高度*/
$(document).ready(function() {
	//原始最低宽度1170  底部120	底部边距100   左右1020
	//评价150一个	标题50	遍历图像
	var len = 0;
	var obj = $("div.introImage").children("img");
	obj.each(function() {
		len += $(this).height();
	});
	$("#wd_center_intro").height(eval(len + 100));
	$("#wd_left").height(eval(len + 870));
	$("#wd_center").height(eval(len + 870));
	$("#wd_right").height(eval(len + 870));
	$("#wd_container").height(eval(len + 1150));

	var accessNum = parseInt(len / 150) - 1;
	var count = 1;
	$("div.introAccess").children("div.accessView").each(function() {
		if (count > accessNum) {
			$(this).css("display", "none");
		}
		count++;
	});
});
