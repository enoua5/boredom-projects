var scales={
  equal: new Scale(12, 220, Scale.Tuning.EQUAL),
  pythag: new Scale(12, 220, Scale.Tuning.PYTHAG),
  harmonic: new Scale(12, 220, Scale.Tuning.HARMONIC),
  antiHarmonic: new Scale(12, 220, Scale.Tuning.ANTI_HARMONIC),
  random: new Scale(12, 220, Scale.Tuning.RANDOM)
};
const NOTES=24+9; //two octaves + 9 notes
var player=new AudioPlayer(NOTES);
function setPlayerToScale(scale)
{
  for(i=0; i<NOTES; i++)
    player.setFreq(i, scale.getFreq(i));
}
setPlayerToScale(scales.equal);
var keys={
  90:  0, //Z: A1
  83:  1, //S: A#1
  88:  2, //X: B1
  67:  3, //C: C1
  70:  4, //F: C#1
  86:  5, //V: D1
  71:  6, //G: D#1
  66:  7, //B: E1
  78:  8, //N: F1
  74:  9, //J: F#1
  77: 10, //M: G1
  75: 11, //K: G#1
 188: 12, //<: A2
  76: 13, //L: A#2
 190: 14, //>: B2
 191: 15, //?: C2
 222: 16, //": C#2
  
  81: 12, //Q: A2
  49: 13, //1: A#2
  87: 14, //W: B2
  69: 15, //E: C2
  51: 16, //3: C#2
  82: 17, //R: D2
  52: 18, //4: D#2
  84: 19, //T: E2
  89: 20, //Y: F2
  54: 21, //6: F#2
  85: 22, //U: G2
  55: 23, //7: G#2
  73: 24, //I: A3
  56: 25, //8: A#3
  79: 26, //O: B3
  80: 27, //P: C3
  48: 28, //0: C#3
 219: 29, //{: D3
 189: 30, //_: D#3
 221: 31, //}: E3
 220: 32  //|: F3
}

heldKeys=[]
window.addEventListener("keydown", function(e){
  let k=e.keyCode;
  if(keys[k]!=undefined)
    heldKeys[keys[k]]=true;
});
window.addEventListener("keyup", function(e){
  let k=e.keyCode;
  if(keys[k]!=undefined)
    heldKeys[keys[k]]=false;
});
setInterval(function(){
  for(let k of Object.keys(keys).map((x)=>parseInt(x)))
    player.setGain(keys[k], heldKeys[keys[k]]?1:0)
},20);


function drawKeyboard()
{
  let canvas=document.getElementById("keyboard");
  let ctx=canvas.getContext('2d');
  
  //draw the keyboard
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle="#000000";
  ctx.textBaseline="bottom"
  ctx.textAlign="center";
  
  let sharps=[1,4,6,9,11];
  let sharpsToDraw=[];
  let chars="ZSXCFVGBNJMKQ1WE3R4TY6U7I8OP0[-]\\"
  let x=0;
  for(let i=0; i<NOTES; i++)
  {
    if(sharps.indexOf(i%12)>=0)//the note is a sharp
      sharpsToDraw.push({x:x,i:i});//we'll draw them over the white notes
    else
    {
      if(player.getGain(i))
        ctx.fillStyle="#00ffff";
      else
        ctx.fillStyle="#ffffff";
      ctx.fillRect(x, 0, 30, 100);
      ctx.strokeRect(x, 0, 30, 100);
      
      //draw the hotkey thingy
      ctx.fillStyle="#000000";
      let c=chars[i];
      ctx.fillText(c, x+15, 100);
      
      x+=30;
    }
  }
  for(let s of sharpsToDraw)
  {
    if(player.getGain(s.i))
      ctx.fillStyle="#00ffff"
    else
      ctx.fillStyle="#000000";
    ctx.fillRect(s.x-10, 0, 20, 50);
    ctx.strokeRect(s.x-10, 0, 20, 50);
    
    //draw the hotkey thingy
    ctx.fillStyle="#ff0000";
    let c=chars[s.i];
    ctx.fillText(c, s.x, 50);
  }
}
