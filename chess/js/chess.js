
var chess=document.getElementById("chess");
var context=chess.getContext("2d");
var me=true;//me 代表黑棋子 我
var chessBoard=[];
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
      chessBoard[i][j]=0;
	}
}
var over=false;//true时游戏结束
//赢法数组  三维数组
var win=[];

var myWin=[];
var computerWin=[];

for(var i=0;i<15;i++){
	win[i]=[];
	for(var j=0;j<15;j++){
     win[i][j]=[];
	}
}


var count=0;
for(var i=0;i<15;i++){
   for(var j=0;j<11;j++){
     for(var k=0;k<5;k++){
       win[i][j+k][count]=true;
     }
     count++;
   }
}
for(var i=0;i<15;i++){
   for(var j=0;j<11;j++){
     for(var k=0;k<5;k++){
       win[j+k][i][count]=true;
     }
     count++;
   }
}

for(var i=0;i<11;i++){
   for(var j=0;j<11;j++){
     for(var k=0;k<5;k++){
       win[i+k][j+k][count]=true;
     }
     count++;
   }
}
for(var i=0;i<11;i++){
   for(var j=14;j>3;j--){
     for(var k=0;k<5;k++){
       win[i+k][j-k][count]=true;
     }
     count++;
   }
}

//alert(count);  //572
for(var i=0;i<count;i++){
   myWin[i]=0;
   computerWin[i]=0;
}






context.strokeStyle="#bfbfbf";//线的颜色

var logo=new Image();
logo.src="images/logo.png";
logo.onload=function(){//图片加载完成时
	context.drawImage(logo,0,0,450,450);//先画image
	drawChessBoard();//再画横竖线

	/*oneStep(0,0,true);//起始点画一个黑棋子
	oneStep(14,14,false);//斜对角终点画一个白棋子*/
};


/*context.moveTo(0, 0);//起点
context.lineTo(450, 450);//终点
context.stroke();//画线*/

var drawChessBoard=function()
{
	for(var i=0;i<15;i++)
 {
	context.moveTo(15,15+30*i);//画横线  y值一样,每多画一行y加30
	context.lineTo(15+30*14,15+30*i);//起点x,终点x都为为定值
	context.stroke();

	context.moveTo(15+30*i,15);//画竖线 x值一样,每多画一竖x加30
	context.lineTo(15+30*i,15+30*14);//起点y,终点y都为定值
	context.stroke();
 }
};
//第i列0~14，第j行0~14   me代表我即黑棋子
var oneStep=function(i,j,me){
	context.beginPath();

	//圆心x,圆心y,半径,起始位置,结束位置    
	context.arc(15+i*30,15+30*j,13,0,2*Math.PI);
	//15+i*30,15+30*j  圆心正好是横竖线的交叉点
    //2*Math.PI代表画整个圆  0.5*Math.PI代表画1/4个圆

    context.closePath();


    //给圆添加渐变
    var gradient=context.createRadialGradient(
        15+i*30+2,15+30*j+2,13,
        15+i*30+2,15+30*j+2,0
    	);
    //(圆心x1,圆心y1,半径r1,圆心x2,圆心y2,半径r2);
    //15+i*30+2,15+30*j+2  渐变圆心正好偏离圆心2px
    //渐变要有俩个圆，这样才能从这个圆的颜色到那个圆的颜色进行过渡，就会有渐变的效果

    if(me){//黑棋子
      gradient.addColorStop(0,"#0a0a0a");//第一个圆的颜色
      gradient.addColorStop(1,"#636766");//第二个圆的颜色
      //有了这俩个圆的不同颜色，才会有渐变效果，如果颜色一样则没有渐变效果
    }else{//白棋子
      gradient.addColorStop(0,"#d1d1d1");//第一个圆的颜色
      gradient.addColorStop(1,"#f9f9f9");//第二个圆的颜色
    }
    
    context.fillStyle=gradient;//设置填充的渐变颜色
    context.fill();//填充


};

chess.onclick=function(e){
	if(over){
		return
	}
  if(!me){
     return
  }
   var e=e||window.event;
   var x=e.offsetX;//鼠标距离canvas左边的距离
   var y=e.offsetY;//鼠标距离canvas顶部的距离
   var i=Math.floor(x/30);
   var j=Math.floor(y/30);
   


	  if(chessBoard[i][j]==0){
	  	oneStep(i,j,me);
	    chessBoard[i][j]=1;
	  	
          for(var k=0;k<count;k++){
           if(win[i][j][k]){
             myWin[k]++;
             computerWin[k]=6;
             if(myWin[k]==5){
                window.alert("you win");
                over=true;
             }
           }
         }	
        
      if(!over){
       me=!me;
       computerAI();
      }


	  }
};

var computerAI=function(){
    var myScore=[];
    var max=0;
    var u=0,v=0;
    var computerScore=[];
    for(var i=0;i<15;i++){
       myScore[i]=[];
       computerScore[i]=[];
       for(var j=0;j<15;j++){
          myScore[i][j]=0;
          computerScore[i][j]=0;
       }
    }

    for(var i=0;i<15;i++){
     for(var j=0;j<15;j++){
      if(chessBoard[i][j]==0){
        for(var k=0;k<count;k++){
        if(win[i][j][k]){
          if(myWin[k]==1){
            myScore[i][j]+=200;
          }else if(myWin[k]==2){
            myScore[i][j]+=400;
          }else if(myWin[k]==3){
            myScore[i][j]+=2000;
          }else if(myWin[k]==4){
            myScore[i][j]+=10000;
          }

                         if(computerWin[k]==1)
                         {
                          computerScore[i][j]+=220;
                         }else if(computerWin[k]==2)
                        {
                         computerScore[i][j]+=420;
                        }else if(computerWin[k]==3)
                        {
                          computerScore[i][j]+=2100;
                        }else if(computerWin[k]==4)
                        {
                          computerScore[i][j]+=20000;
                        }
        }
      }
    }
            if(myScore[i][j]>max)
           {
              max=myScore[i][j];
              u=i;
              v=j;
           }else if(myScore[i][j]==max)
           {
              if(computerScore[i][j]>computerScore[u][v])
              {
              u=i;
              v=j;
              }
           }

                    if(computerScore[i][j]>max)
                    {
                      max=computerScore[i][j];
                      u=i;
                      v=j;
                    }else if(computerScore[i][j]==max)
                      {
                        if(myScore[i][j]>myScore[u][v])
                        {
                          u=i;
                          v=j;
                        }
                      }
     }
   }
 

      oneStep(u,v,false);
      chessBoard[u][v]=2;
      for(var k=0;k<count;k++){
             if(win[u][v][k]){
               computerWin[k]++;
               myWin[k]=6;
               if(computerWin[k]==5){
                  window.alert("计算机 win");
                  over=true;
               }
             }
           }  

      if(!over){
         me=!me;
         //computerAI();
    }
}