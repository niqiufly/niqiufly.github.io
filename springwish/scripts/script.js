window.onload=function (){
    var page1=document.getElementById("page1");
    var page2=document.getElementById("page2");
    var page3=document.getElementById("page3");

	var music=document.getElementById("music");
	var audio=document.getElementsByTagName("audio")[0];
   
    //当音乐停止时，光盘自动停止旋转效果
    audio.addEventListener("ended",function(event){
        music.setAttribute("class","");
        //music.style.animationPlayState="paused";
        //music.style.webkitAnimationPlayState="paused";
    },false);
    //点击音乐图标 音乐暂停或播放
	music.onclick=function (){//电脑点击
		if(audio.paused){
            audio.play();
            this.setAttribute("class","play");
            //this.style.animationPlayState="running";  不兼容
            //this.style.webkitAnimationPlayState="running";
		}else{
            audio.pause();
            this.setAttribute("class","");
            //this.style.animationPlayState="paused";
            //this.style.webkitAnimationPlayState="paused";
		}
	}
    //手机触屏 音乐暂停或播放
	music.addEventListener("touchstart",function(event){
        if(audio.paused){
            audio.play();
            this.setAttribute("class","play");
            //this.style.animationPlayState="running";  不兼容
            //this.style.webkitAnimationPlayState="running";
		}else{
            audio.pause();
            this.setAttribute("class","");
            //this.style.animationPlayState="paused";
            //this.style.webkitAnimationPlayState="paused";
		}
	},false);

	//点击屏幕，开启好运2016   click 电脑点击;touchstart 手机触屏
	page1.addEventListener("click",function(event){
        page1.style.display="none";
        page2.style.display="block";
        page3.style.display="block";
        page3.style.top    ="100%";

        setTimeout(function(){
        	page2.setAttribute("class","page fadeOut");
        	page3.setAttribute("class","page fadeIn");
        },5500);

	},false)
}