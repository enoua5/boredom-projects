class PerlinGeneratorHolder
{
  constructor(seed)
  {
    this.stringSeed=seed.toString();
    this.gens={};
  }
  
  addGenerator(name, stretch={x: 1, y: 1})
  {
    let seed=(name+this.stringSeed).hashCode();
    this.gens[name]=new PerlinGenerator(seed, stretch);
  }
  
  getValue(name, x=0.5, y=0.5)
  {
    return this.gens[name].getValue(x, y);
  }
}
class PerlinGenerator
{
  constructor(seed, stretch)
  {
    this.seed=seed;
    stretch.x=stretch.x!=undefined?stretch.x:1;
    stretch.y=stretch.y!=undefined?stretch.y:1;
    stretch.z=stretch.z!=undefined?stretch.z:stretch.x;
    this.stretch=stretch;
  }
  
  getValue(x, y, z=viewZ)
  {
    noise.seed(this.seed);
    return noise.perlin3((x/this.stretch.x)+0.1, (y/this.stretch.y)+0.1, (z/this.stretch.z)+0.1);
  }
}
