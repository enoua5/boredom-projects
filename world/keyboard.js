var k=[];
var lastKeyResp=Date.now();
window.addEventListener("keydown", (e)=>{
  k[e.keyCode]=true;
  if(Date.now()>lastKeyResp+100)
  {
    lastKeyResp=Date.now();
    panAndDraw();
  }
});
window.addEventListener("keyup", (e)=>{
  k[e.keyCode]=false;
});
