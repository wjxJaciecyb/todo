$(function() {
	var $audio = $("#audio");
	var audio = $audio.get(0);
	var next = $("#next")
	var previous = $("#previous")
	var currentIndex = 1;
	var musics = [{
		name: " 她说",
		author: "林俊杰 ",
		src: "music/林俊杰 - 她说.mp3"
	}, {
		name: " Sugar",
		author: "Maroon 5 ",
		src: "music/Maroon 5 - Sugar.mp3"
	}, {
		name: " 陪你度过漫长岁月",
		author: "陈奕迅 ",
		src: "music/陈奕迅 - 陪你度过漫长岁月.mp3"
	}, {
		name: " 红玫瑰",
		author: "陈奕迅 ",
		src: "music/陈奕迅 - 红玫瑰.mp3"
	}];
	//渲染
	function render() {
		$('#music-list').empty();
		$.each(musics, function(e, v) {
			var a = (e === currentIndex) ? 'active' : '';
			$('<li class="' + a + '"><span>' + musics[e].name + '</span><span>' + musics[e].author + '</span></li>').appendTo('#music-list');
		});
	}

	$("#music-list").on("touchend", "li", function() {
		$("#music-list").find("li").removeClass("active");
		$(this).addClass("active");
		currentIndex = $(this).index();
		audio.src = musics[currentIndex].src;
		audio.play();
	})
	render();


	//增加
	$("#music-list").on('touchend', '.delete', function() {
		var li = $(this).closest('li');
		var index = li.index();
		musics.splice(index, 1);
		if (index === currentIndex) {
			if (musics[currentIndex]) {
				audio.src = musics[currentIndex].src;
			} else {
				audio.src = '';
			}
		} else if (index > currentIndex) {
			//不操心
		} else if (index < currentIndex) {
			currentIndex -= 1;
		}
		render();
		return false;
	});

	//添加歌曲
	$("#add").on('touchend', 'li', function() {
		var d = $(this).attr('data-v');
		musics.push(JSON.parse(d));
		render();
	});

	//////////////////////////////////////////////////////////
	$audio.on('volumechange', function() {

	});
	$audio.on('loadstart', function() {
		$("#name").html("歌曲名:" + musics[currentIndex].name + "");
	});
	$audio.on('progress', function() {

	});
	$audio.on('canplay', function() {
//		audio.play();
	});
	$audio.on('play', function() {

	});
	$audio.on('pause', function() {

	});
	$audio.on('ended', next);

	$audio.on('timeupdate', function() {

	});
})