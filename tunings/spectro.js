function drawLine(ctx, x1, y1, x2, y2)
{
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
function drawSpectroCanvas()
{
  //get dom veriables
  let canvas=document.getElementById("canvas");
  let ctx=canvas.getContext('2d');
  let tones=Math.max(parseInt(document.getElementById("tones").value), 1);
  
  //get the x positions of each note of each scale
  let scales={
    "Equal temperment": new Scale(tones, 1, Scale.Tuning.EQUAL).scale.map(
      (n=>((n-1)*canvas.width))
    ),
    "Pythagorean": new Scale(tones, 1, Scale.Tuning.PYTHAG).scale.map(
      (n=>((n-1)*canvas.width))
    ),
    "Harmonic": new Scale(tones, 1, Scale.Tuning.HARMONIC).scale.map(
      (n=>((n-1)*canvas.width))
    ),
    "Anti-harmonic": new Scale(tones, 1, Scale.Tuning.ANTI_HARMONIC).scale.map(
      (n=>((n-1)*canvas.width))
    ),
    "Random": new Scale(tones, 1, Scale.Tuning.RANDOM).scale.map(
      (n=>((n-1)*canvas.width))
    )
  };
  
  //draw it all
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //draw the labels
  ctx.font="12px Arial";
  ctx.textBaseline="Bottom";
  let i=0;
  for(let l in scales)
    ctx.fillText(l, 5, ((i++)*100)+20);
  //draw the notes
  i=0;
  for(let s of Object.values(scales))
  {
    for(let n of s)
      drawLine(ctx, n, (i*100)+30, n, (i*100)+100);
    i++;
  }
    
}
