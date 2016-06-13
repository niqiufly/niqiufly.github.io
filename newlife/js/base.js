var $=function(id) {
   return document.getElementById(id);
};
var getElementsByClassName=function(oParent,sClass){
    var aResult=[];
    var aEle=oParent.getElementsByTagName("*");
    for(var i=0;i<aEle.length;i++){
      if(aEle[i].className==sClass){
        aResult.push(aEle[i]);
      }
    }
    return aResult;
};

var get_nextsibling=function (n)
{
  var x=n.nextSibling;
  while (x.nodeType!=1)
   {
     x=x.nextSibling;
   }
  return x;
};

var getEventTarget=function (e) {
  e = e || window.event;
  return e.target || e.srcElement;
};

var validationEmail=function(value){
    var re=/^\w+@[a-z0-9]+\.[a-z]+$/i;
    return re.test(value);
};

var addEvent=function(element,event,fn){
    if(element.addEventListener){
       element.addEventListener(event,fn,false);
   }else if(element.attachEvent){
    element.attachEvent("on"+event,fn);
   }else{
   	element["on"+event]=fn;
   }
};


var createLis=function(arrays){
      var newLi;
      var newLis=[];
      for(var i=0;i<arrays.length;i++){
          newLi=document.createElement("li");
          newLi.innerHTML=arrays[i];
          newLis.push(newLi);
      }
      return newLis;
};

var appendLis=function (fatherId,lis) {
    var lis=createLis(lis);//创建li
    $(fatherId).innerHTML=null;
      for(var i=0;i<lis.length;i++){
        $(fatherId).appendChild(lis[i]);//在页面中添加城市
      } 
}

////////////////////////////////////////////////////
var jsonData=[
               {"province":"北京",
                "cityList":[{"city":"市辖区","townList":["海淀区","昌平区"]},
                            {"city":"县","townList":["密云县","延庆县"]}   
                           ]
               },
               {"province":"安徽",
                "cityList":[{"city":"阜阳市","townList":["临泉县","太阳县"]},
                            {"city":"合肥市","townList":["蜀山区","包河区"]}   
                           ]
               } ,
               {"province":"河南",
                "cityList":[{"city":"郑州市","townList":["中原区","金水区","上街区"]},
                            {"city":"洛阳市","townList":["吉利区","洛龙区","新安区","洛宁区"]}   
                           ]
               }
             ];


var selectP=null,selectC=null,selectT=null;//选择的省市县
var search=$("search");
var inputs=search.getElementsByTagName('input');

addEvent($("province"),"click",function(e){

       inputs[1].setAttribute("value","城市");
       inputs[2].setAttribute("value","县城");
       selectC=null;
       selectT=null;
       var target = getEventTarget(e);
       if(target.nodeName.toLowerCase() === 'li'){
          inputs[0].setAttribute("value",target.innerHTML);
          selectP=inputs[0].getAttribute("value");
       }
       $("province").style.display="none";
       inputs[0].className="";

       var citys=[];//用来存储该省份下的城市
       for(var i in jsonData){
        if(jsonData[i].province==selectP){//判断是否是选中的省份
           for(var j in jsonData[i].cityList){
            citys.push(jsonData[i].cityList[j].city);//相应城市添加到数组中
           }
           break;//结束for循环,提高性能
        }
       }
       appendLis("city",citys);//将城市添加到城市列表中
    });

addEvent($("city"),"click",function(e){
       inputs[2].setAttribute("value","县城");
       selectT=null;
       var target = getEventTarget(e);
       if(target.nodeName.toLowerCase() === 'li'){
          inputs[1].setAttribute("value",target.innerHTML);
          selectC=inputs[1].getAttribute("value");
       }
       $("city").style.display="none";
        inputs[1].className="";

      var towns=[];
       for(var i in jsonData){
        if(jsonData[i].province==selectP){
           for(var j in jsonData[i].cityList){
            if(jsonData[i].cityList[j].city==selectC){
              for(var t=0;t<jsonData[i].cityList[j].townList.length;t++){
                towns.push(jsonData[i].cityList[j].townList[t])
               }
               break; 
            }
           }
        }
       }
       appendLis("town",towns);
    });


addEvent($("town"),"click",function(e){
       var target = getEventTarget(e);
       if(target.nodeName.toLowerCase() === 'li'){
          inputs[2].setAttribute("value",target.innerHTML);
          selectT=inputs[2].getAttribute("value");
       }
       $("town").style.display="none";
        inputs[2].className="";
    });


//选择省市县时，点击input会出现选择项和相应的样式
var clickInput=function(){
    for(var i=0;i<inputs.length;i++){
     inputs[i].index=i;
     addEvent(inputs[i],'click',function(){

             if(this.index==0){//点击input选择省份时，添加省份选项
                 var provinces=[];
                 for(var i in jsonData){
                  provinces.push(jsonData[i].province);//得到省份
                 }
                 var lis=createLis(provinces);//创建li
                 $("province").innerHTML=null;
                 for(var i=0;i<lis.length;i++){
                  $("province").appendChild(lis[i]);//在页面中添加省份
                 }  
            }

            if(this.index==1&&!selectP){//选择城市时判断有木有选择上级省份
              alert("请先选择省份");
              return false;
            }
             if(this.index==2&&!selectC){//选择县城时判断有木有选择上级城市
              alert("请先选择城市");
              return false;
            }

            if(get_nextsibling(this).style.display=="block"){
               return;
            }else{
               this.className="show";
               get_nextsibling(this).style.display="block";
               get_nextsibling(this).className="show";
            }
      });
    };
};
clickInput();

//点击其他地方，省市县div块消失
setTimeout(
        function(){
           document.onmousedown=function(e){
             var e_tar=getEventTarget(e);

             if(e_tar.parentNode.id=="province"||e_tar.parentNode.id=="city"||e_tar.parentNode.id=="town")
             {                          
                 return;
             }
             else
             {
                $("province").style.display="none";
                $("city").style.display="none";
                $("town").style.display="none";
                 inputs[0].className="";
                 inputs[1].className="";
                 inputs[2].className="";
             };
              document.body.onclick=null;
           }
             },500);
//搜索省市县  城市活动时  对省市县值进行验证
addEvent($("search_activity"),"click",function(){
  if(selectP&&selectC&&selectT){
    alert(selectP+"; "+selectC+"; "+selectT);
    return true;
  }

  var hint=" 请选择： ";
  if(!selectP){
    hint+=" 省份 ";
  }
  if(!selectC){
    hint+=" 城市 ";
  }
  if(!selectT){
    hint+=" 县城 ";
  }
  alert(hint);
});


//邮箱验证
addEvent($("email"),"focus",function(){
  if(this.value=="someone@email.com"){
    this.value="";
  }
});
addEvent($("email"),"blur",function(){
  if(this.value==""){
    this.value="someone@email.com";
  }else if(!validationEmail(this.value)){
   alert("邮箱输入错误，请重新输入！！！");
  }
});



//新世界banner滑动效果
var spans=$("slide").getElementsByTagName("span");
var divs=$("new_life").getElementsByClassName("life_show");
var txts=$("text_intro").getElementsByClassName("text_intro");

var slideFun=function(tags){
  for(var i=0;i<tags.length;i++){
    tags[i].index=i;
    addEvent(tags[i],"mouseover",function(){
       for(var j=0;j<tags.length;j++){
        tags[j].className="";
        divs[j].style.display="none";
        txts[j].style.display="none";
       }
        this.className="active";
        divs[this.index].style.display="block";
        txts[this.index].style.display="block";
        divs[this.index].className="slide_active life_show";
        txts[this.index].className="slide_active text_intro";
    });
  }
};
slideFun(spans);


