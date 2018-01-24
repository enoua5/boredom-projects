class AudioPlayer
{
  constructor(chanels=0, waves=[], freqs=[], gains=[])
  {
    this.ac=new AudioContext();
    this.os=[];
    this.gs=[];
    for(let i=0; i<chanels; i++)
    {
      let f=(freqs[i]==undefined)?0:freqs[i];
      let g=(gains[i]==undefined)?0:gains[i];
      let w=(waves[i]==undefined)?"sine":waves[i];
      
      let on=this.ac.createOscillator();
      let gn=this.ac.createGain();
      
      on.type=w;
      on.frequency.value=f;
      gn.gain.value=g;
      
      on.connect(gn);
      gn.connect(this.ac.destination);
      on.start();
      
      this.os.push(on);
      this.gs.push(gn);
    }
  }
  
  addChanel(wave, freq, gain)
  {
    let on=this.ac.createOscillator();
    let gn=this.ac.createGain();
    
    on.type=wave;
    on.frequency.value=freq;
    gn.gain.value=gain;
    
    on.connect(gn);
    gn.connect(this.ac.destination);
    on.start();
    
    this.os.push(on);
    this.gs.push(gn);
    
    //returns the position in the array
    return this.os.length-1;
  }
  
  getFreq(chanel)
  {
    return this.os[chanel].frequency.value;
  }
  setFreq(chanel, value)
  {
    this.os[chanel].frequency.value=value;
  }
  
  getGain(chanel)
  {
    return this.gs[chanel].gain.value;
  }
  setGain(chanel, value)
  {
    this.gs[chanel].gain.value=value;
  }
  
  getWave(chanel)
  {
    return this.os[chanel].type;
  }
  setWave(chanel, value)
  {
    this.os[chanel].type=value;
  }
}
