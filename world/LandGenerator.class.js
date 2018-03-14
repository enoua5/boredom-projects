class LandGenerator
{
  constructor(ctx, generator)
  {
    this.ctx=ctx;

    let seed=prompt("enter seed:");
    seed=seed?seed:0;
    this.rand=new PerlinGeneratorHolder(seed);
    
    this.rand.addGenerator("height", {x: 500});
    
    this.rand.addGenerator("cave", {x:40, y:40});
    
    this.color={
      air: "#000010",
      water:"#4080ff",
      stone:"#888888",
      cave:"#00000080",
    };
    
    this.SEA=0.5;
    
    this.BLOCK_SIZE=6;
    
    this.HEIGHT_PASSES=6;
    
    this.CAVE_PASSES=3;
    this.CAVE_CUTOFF=0.15;
  }
  
  drawView(viewX)
  {
    let w=canvas.width;
    let h=canvas.height;
      
    this.ctx.fillStyle=this.color.air;
    this.ctx.fillRect(0, 0, w, h);
    
    this.createSea(w, h);
    
    let currZ=viewZ;
    for(let l=0; l<2; l++)
    {
      let heights=new Array(Math.floor(w/this.BLOCK_SIZE));
      let caves=new Array(Math.floor(w/this.BLOCK_SIZE));
      
      this.createHeights(w, h, heights);
      this.createCaves(w, h, heights, caves);
      
      this.ctx.globalAlpha=0.2;
      viewZ+=SLICE_SPEED;
    }
    this.ctx.globalAlpha=1;
    viewZ=currZ;
  }
  
  //creation functions
  createSea(w, h)
  {
    this.drawSea(w, h);
  }
  createHeights(w, h, heights)
  {
    for(let x=0; x<heights.length; x++)
    {
      let height=0;
      for(let p=0; p<this.HEIGHT_PASSES; p++)
      {
        height+=(2**-p)*this.rand.getValue("height",
          ((x*this.BLOCK_SIZE)+viewX)*(2**p));
      }
      //height=height**2;
      height*=h/2;
      height+=h/3;
      height/=this.BLOCK_SIZE;
      heights[x]=Math.round(height);
    }
    this.drawHeights(w, h, heights);
  }
  createCaves(w, h, heights, caves)
  {
    for(let x=0; x<caves.length; x++)
    {
      caves[x]=new Array(Math.floor(h/this.BLOCK_SIZE));
      for(let y=0; y<caves[x].length; y++)
      {
        if(y>heights[x])
        {
          caves[x][y]=false;
          continue;
        }
        let caviness=0;
        for(let p=0; p<this.CAVE_PASSES; p++)
          caviness+=(2**-p)*Math.abs(this.rand.getValue("cave",
            ((x*this.BLOCK_SIZE)+viewX)*(2**p), y*this.BLOCK_SIZE));
        caves[x][y]=caviness<this.CAVE_CUTOFF;
      }
    }
    this.drawCaves(w, h, caves);
  }
  
  //draw functions
  drawSea(w, h)
  {
    this.ctx.fillStyle=this.color.water;
    this.ctx.fillRect(0, h-(h*this.SEA), w, h*this.SEA);
  }
  drawHeights(w, h, heights)
  {
    this.ctx.fillStyle=this.color.stone;
    for(let x=0; x<w; x++)
      this.ctx.fillRect(x*this.BLOCK_SIZE, h-(heights[x]*this.BLOCK_SIZE),
        this.BLOCK_SIZE, heights[x]*this.BLOCK_SIZE);
  }
  drawCaves(w, h, caves)
  {
    this.ctx.fillStyle=this.color.cave;
    for(let x=0; x<caves.length; x++)
    for(let y=0; y<caves[x].length; y++)
      if(caves[x][y])
        this.ctx.fillRect(x*this.BLOCK_SIZE, h-(y*this.BLOCK_SIZE),
          this.BLOCK_SIZE, this.BLOCK_SIZE);
  }
}
