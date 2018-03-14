class Scale
{
  static get Tuning()
  {
    return /*enum*/{EQUAL: 0, PYTHAG: 1, HARMONIC: 2, ANTI_HARMONIC: 3, RANDOM: 4};
  }

  constructor(tones=12, fundamental=440, tuning=this.constructor.Tuning.EQUAL)
  {
    function refitToOctave(n)
    {
      return n/(2**(Math.floor(Math.log2(n))));
    }
    function getEqualRatios(tones)
    {
      let scale=[];
      for(let i=0; i<tones; i++)
        scale.push(2**(i/tones));
      return scale;
    }
    function getPythagRatios(tones)
    {
      let scale=[];
      for(let i=0; i<tones; i++)
        scale.push(refitToOctave((3/2)**i));
      return scale;
    }
    function getHarmonicRatios(tones)
    {
      let scale=[];
      for(let i=1; scale.length<tones; i+=2)
        scale.push(refitToOctave(i));
      return scale;
    }
    function getAntiHarmonicRatios(tones)
    {
      let scale=[1];
      for(let i=3; scale.length<tones; i+=2)
        scale.push((1-(refitToOctave(i)-1))+1);
      return scale;
    }
    function getRandomRatios(tones)
    {
      let scale=[];
      for(let i=0; i<tones; i++)
        scale.push(Math.random()+1);
      return scale;
    }
    
    this.scale=[];
    
    switch(tuning)
    {
      case this.constructor.Tuning.EQUAL:
        this.scale=getEqualRatios(tones);
        break;
      case this.constructor.Tuning.PYTHAG:
        this.scale=getPythagRatios(tones);
        break;
      case this.constructor.Tuning.HARMONIC:
        this.scale=getHarmonicRatios(tones);
        break;
      case this.constructor.Tuning.ANTI_HARMONIC:
        this.scale=getAntiHarmonicRatios(tones);
        break;
      case this.constructor.Tuning.RANDOM:
        this.scale=getRandomRatios(tones);
        break;
    }
  
    this.scale=this.scale.sort((a,b)=>(a-b));
    this.scale=this.scale.map(n=>n*fundamental);
  }
  
  getFreq(index)
  {
    if(!isFinite(index))
      throw new Error(`Note index "${index}" is not within the octave`);
    if(isNaN(index))
      throw new Error("Parameter must be an integer");
      
    let l=this.scale.length;
    return this.scale[Math.floor(((index%l)+l)%l)]*(2**Math.floor(index/l));
  }
  getFreqByOctave(octave, index=0)
  {
    if(index<0 || index>=this.scale.length || !isFinite(index))
      throw new Error(`Note index "${index}" is not within the octave`);
    if(isNaN(octave) || isNaN(index))
      throw new Error("Parameters must be integers");
      
    return this.getFreq((octave*this.scale.length)+index);
  }
  get tones()
  {
    return this.scale.length;
  }
}
