function hexcolorMain(){this.version='1.0';w=360;h=480;sliderTp=65;sliderLt=20;sliderHt=430;sliderMin=0;sliderMax=255;var s='';s+='<div style="position:relative; width:'+w+'px; height:'+h+'px; margin:auto; display:block; border: 2px solid blue; background-color: white; ">';s+='<canvas id="canvasId" width="'+w+'" height="'+h+'" style="z-index:1;"></canvas>';clrs=['red','green','blue'];for(var i=0;i<3;i++){s+='<div style="position:absolute; left:20px; top:'+(30+i*50)+'px; display: block;  text-align: center; background-color: rgba(255,255,255,0.4); padding: 4px 5px 0 5px; border-radius: 10px; " >';s+='<input type="range" id="clr'+i+'"  value="0" min="'+sliderMin+'" max="'+sliderMax+'" step="1" style="z-index:2;  width:256px; height:17px; border: none;" oninput="updateClr('+i+')" onchange="updateClr('+i+')" />';s+='</div>';s+='<div style="position:absolute; left:293px; top:'+(34+i*50)+'px; height: 20px; width:62px; display: block; text-align: center; color:white; background-color:'+clrs[i]+';  border-radius: 10px; font: 16px Arial; " >'+clrs[i]+'</div>';s+='<div id="lbl'+i+'" style="position:absolute; left:20px; top:'+(10+i*50)+'px; width:70px; height: 20px; display: block; text-align: center; background-color: cornsilk; padding: 4px 5px 0 5px; border-radius: 10px; font: 16px Arial; " ></div>';}
var vs=[['hex','Hexadecimal',180],['dec','Decimal',215]];for(i=0;i<vs.length;i++){var v=vs[i];s+='<div style="position: absolute; left:5px; top:'+v[2]+'px; display: block; margin: 2px 30px 2px 0; text-align: center;" >';s+='<div id="'+v[0]+'Lbl" style="display: inline-block; margin: 0 10px 0 0; width:150px; font: 20px arial; color: black; text-align: right;">'+v[1]+':</div>';s+='<input type="text" id="'+v[0]+'Val" style="color: #0000ff; background-color: #eeffee; text-align:center; font-size: 14pt; width:110px; border-radius: 10px; " value="'+v[2]+'" onKeyUp="numChg('+i+')" />';s+='</div>';}
s+='<div style="position:absolute; left:5px; bottom:3px;">';s+='<button id="randBtn" style="z-index:2;" class="togglebtn"  onclick="randBtn()" >Random</button>';s+='<button id="chgBtn" onclick="toggleChg()" style="z-index:2;" class="togglebtn lo" >Changing</button>';s+='</div>';s+='<div id="copyrt" style="position:absolute; right:3px; bottom:3px; font: 10px Arial; font-weight: bold; color: white; ">Vasu Dev  v'+this.version+'</div>';s+='</div>';document.write(s);el=document.getElementById('canvasId');ratio=1.5;el.width=w*ratio;el.height=h*ratio;el.style.width=w+"px";el.style.height=h+"px";g=el.getContext("2d");g.setTransform(ratio,0,0,ratio,0,0);chgQ=false;chgClr=null;chgFrame=0;document.getElementById("hexVal").value='2F329F';numChg(0);}
function numChg(n){if(n==0){var div=document.getElementById("hexVal");hex=div.value;hex=hex.replace(/[^0-9a-fA-F]+/g,'');div.value=hex;var rr=hex2dec(hex.substr(0,2));var gg=hex2dec(hex.substr(2,2));var bb=hex2dec(hex.substr(4,2));updateBoxes([rr,gg,bb],false,true);}
if(n==1){var dec=document.getElementById("decVal").value;rr=Math.floor(dec/65536);dec-=rr*65536;gg=Math.floor(dec/256);dec-=gg*256;bb=dec;rr=Math.min(rr,255);updateBoxes([rr,gg,bb],true,false);}
updateSliders([rr,gg,bb]);}
function onKey(ev){var keyCode=ev.keyCode;if(keyCode==38||keyCode==40){ev.preventDefault();var div=document.getElementById("r1");var c=div.value;if(keyCode==38)c++;if(keyCode==40)c--;c=Math.max(-40,Math.min(c,105));div.value=c;updateTemp();}}
function updateClr(n){var rr=document.getElementById("clr0").value;var gg=document.getElementById("clr1").value;var bb=document.getElementById("clr2").value;updateBoxes([rr,gg,bb],true,true);}
function updateBoxes(clrs,doHexQ,doDecQ){var dec=(clrs[0]*256+clrs[1]*1)*256+clrs[2]*1;var hex=dec2hex(clrs[0])+dec2hex(clrs[1])+dec2hex(clrs[2]);var invhex=getContrastYIQ(hex);for(var i=0;i<3;i++){updateLbl("lbl"+i,clrs[i]);}
if(doHexQ)document.getElementById('hexVal').value=hex.toUpperCase();document.getElementById('hexLbl').style.color=invhex;if(doDecQ)document.getElementById('decVal').value=dec;document.getElementById('decLbl').style.color=invhex;g.clearRect(0,0,el.width,el.height);g.fillStyle='#'+hex;g.rect(0,170,el.width,el.height);g.fill();}
function updateLbl(id,val){var div=document.getElementById(id);div.innerHTML=val+' = '+dec2hex(val).toUpperCase();div.style.left=val+"px";}
function updateSliders(clrs){for(var i=0;i<3;i++){document.getElementById("clr"+i).value=clrs[i];}}
function randBtn(){var clr=new Clr();clr.rand();updateBoxes(clr.clrs,true,true);updateSliders(clr.clrs);}
function toggleChg(){chgQ=!chgQ;toggleBtn("chgBtn",chgQ);if(chgQ){var rr=document.getElementById("clr0").value;var gg=document.getElementById("clr1").value;var bb=document.getElementById("clr2").value;chgClr=new Clr(rr,gg,bb);doChg()}else{chgClr=null;}}
function toggleBtn(btn,onq){if(onq){document.getElementById(btn).classList.add("hi");document.getElementById(btn).classList.remove("lo");}else{document.getElementById(btn).classList.add("lo");document.getElementById(btn).classList.remove("hi");}}
function doChg(){if(chgClr!=null){chgFrame++;if(chgFrame>2){chgFrame=0;chgClr.randChg();updateBoxes(chgClr.clrs,true,true);updateSliders(chgClr.clrs);}
requestAnimationFrame(doChg);}}
function Clr(rr,gg,bb){this.clrs=[rr<<0,gg<<0,bb<<0];this.dirs=[1,1,1];}
Clr.prototype.rand=function(){for(var i=0;i<3;i++){this.clrs[i]=(Math.random()*256)<<0;}};Clr.prototype.randChg=function(){for(var i=0;i<3;i++){if(Math.random()<0.01)this.dirs[i]*=-1;if(this.clrs[i]>=255)this.dirs[i]=-1;if(this.clrs[i]<=0)this.dirs[i]=1;this.clrs[i]+=this.dirs[i];}};function dec2hex(dec){var hex=Number(dec).toString(16);if(hex.length<2){hex="0"+hex;}
return hex;}
function hex2dec(hex){var dec=parseInt(hex,16);if(isNaN(dec))dec=0;return dec;}
function getContrastYIQ(hex){var rr=hex2dec(hex.substr(0,2));var gg=hex2dec(hex.substr(2,2));var bb=hex2dec(hex.substr(4,2));var yiq=((rr*299)+(gg*587)+(bb*114))/1000;return(yiq>=128)?'black':'white';}
