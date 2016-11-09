$(function(){
	var $audio=$("#audio");
	var audio=$audio.get(0);
	var play = $("#play");
	var duration = $("#duration")
	var current = $("#current-time")
	var pi = $("#p-i")
	var progress = $("#progress")
	var vi = $("#v-i");
	var volume = $("#volume");
	var meta = $("#meta");
	var next = $("#next")
	var previous = $("#previous")
	var pp=$("#p-p")
	//暂停和播放
	play.on("click", function() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	})
	$(audio).on("play", function() {
		
		play.css({"background":"url(imgs/10.png)","background-size":"cover"});
	})
	$(audio).on("pause", function() {
		
		play.css({"background":"url(imgs/play.png)","background-size":"cover"});
	})
	
	
	//时间变化
	function format(v) {
		v = Math.floor(v);
		var s = v % 60;
		s = (s < 10) ? ("0" + s) : s;
		var m = Math.floor(v / 60);
		return m + ":" + s;
	}
	audio.oncanpaly=function(){
		duration.html(format(audio.duration));
	}
	//播放过程中的变化
	$(audio).on("timeupdate", function() {
		duration.html(format(audio.duration));
		current.html(format(audio.currentTime));
		var left = progress.width() * audio.currentTime / audio.duration;
					
					
		pi.css("left", left);
	})
	//
	$(audio).on("timeupdate", function() {
		duration.html(format(audio.duration));
		current.html(format(audio.currentTime));
		var width = progress.width() * audio.currentTime / audio.duration;
					
					
		pp.css("width", width);
	})
	
	
	//音量拖拽			
		vi.on("click", false);
		vi.on("mousedown", function(e) {
		var r = vi.width() / 2;
		var start = r - e.offsetX;
			$(document).on("mousemove", function(e) {
			var left = e.clientX - volume.position().left + start;
//			console.log(left);
			var v = left / volume.width();
			if (v >= 1 || v <= 0) {
				return;
			}
			audio.volume = v;
			});
			return false;
		})
	$(document).on("mouseup",function(){
		$(document).off("mousemove");
	})
			
			
	//控制声音
	volume.on("click", function(e) {
		audio.volume = e.offsetX / volume.width();
		meta.removeAttr("data-v");
	})
	//静音
	meta.on("click", function() {
		if ($(this).attr("data-v")) {
			audio.volume = $(this).attr("data-v");
			$(this).removeAttr("data-v");
		} else {
			$(this).attr("data-v", audio.volume);
			audio.volume = 0;
			}
		});
	
	
	//进度条拖拽
		pi.on("mousedown",function(e){
//			alert(1)
			var r=pi.width()/2;
			console.log(r)
			var start=r-e.offsetX;
			$(document).on("mousemove",function(e){
				var m=e.clientX;
				var l=m-pi_box.offset().left+start;
				var yin=l/pi_box.width()*audio.duration;
				if(yin>audio.duration||yin<0){
					return;
				}
				audio.currentTime=yin;
			});
			return false;
		});
		pi.on("mouseup",function(){
			$(document).off('mousemove');
		});
	
	
				//left值
	$(audio).on("volumechange", function() {
		vi.css("left", audio.volume * volume.width() - vi.width() / 2)
	});
	
	
	var currentIndex = 1;
	var musics=[
		{
		name: " 她说",
		author: "林俊杰 ",
		src: "music/林俊杰 - 她说.mp3"
		},{
		name: " Sugar",
		author: "Maroon 5 ",
		src: "music/Maroon 5 - Sugar.mp3"
		},{
		name: " 陪你度过漫长岁月",
		author: "陈奕迅 ",
		src: "music/陈奕迅 - 陪你度过漫长岁月.mp3"
		},{
		name: " 红玫瑰",
		author: "陈奕迅 ",
		src: "music/陈奕迅 - 红玫瑰.mp3"
		}];
		
		


		function render() {
			$("#lists").empty();
			$.each(musics, function(i, v) {
				var c = (i === currentIndex) ? 'active' : '';
				
				$('<li class="' + c + '">歌名：<span>' + musics[i].name + '</span><br/>作者：<span>' + musics[i].author + '</span></li>').appendTo('#lists');
				
			});
		};
		$("#lists").on("touchend", "li", function() {
			$("#lists").find("li").removeClass("active");
			$(this).addClass("active");
			currentIndex = $(this).index();
			audio.src = musics[currentIndex].src;
			audio.play();
			
		})
		 render();
		 //下一首
		 next .on('touchend', function() {
			var index =  currentIndex+ 1;
			if (index >= musics.length) {
				index = 0;
			}
			$("#lists").find("li").remove("active");		
			$("#lists").find("li").eq(index).addClass("active");
			audio.src=musics[index].src;
			audio.play();
			currentIndex=index;
		})
//		//上一首
		previous.on("touchend",function(){
			var index =currentIndex-1;
			if(index <=0 ){
				index=2;
			}
			$("#lists").find("li").remove("active");		
			$("#lists").find("li").eq(index).addClass("active");
			audio.src= musics[index].src;
			audio.play();
			currentIndex=index;
		})
		
		$("#footer .center").on("touchend",function(){
			$("#music").css("display","block").animate({
				"top":"0",
				"opactiy":"1"
			},1000)
		})
		$("#close").on("touchend",function(){
			$("#music").css("display","none").animate({
				"top":"100%",
				"opactiy":"0"
			},500);
		})

})