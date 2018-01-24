class StringAudio
{
  constructor(audioPlayer)
  {
    this.ap=audioPlayer;
    //key to array location 
    this.locs={};
    //holds all the audio files
    this.audios=[];
    //list of all notes
    this.notes=[];
    let n=55;
    for(let i=0; i<256; i++)
    {
      this.notes.push(n);
      n*=2**(1/48);
    }
  }
  
  add(key, value)
  {
    let location=this.ap.addChanel("sine",0,0);
    this.locs[key]=location;
    this.audios[location]=value;
  }
  
  loop(key)
  {
    let self=this;
    this.start(key, function(){self.loop(key)});
  }
  start(key, callback=function(){})
  {
    let location=this.locs[key];
    let self=this;
    //let str=this.audios[location];
    let index=0;
    let play=function()
    {
      //moved for faster corruption
      let str=self.audios[location];
      //get the waveform
      let waveID=str.charCodeAt(1)>>6;
      let wave=["sine","square","sawtooth","triangle"][waveID];
      //get the pitch and volume
      let note=str.substring((index+1)*2, (index+2)*2);
      let freq=note.charCodeAt(0);
      let gain=note.charCodeAt(1);
      //update the player
      self.ap.setWave(location, wave);
      self.ap.setFreq(location, self.notes[freq]);
      self.ap.setGain(location, gain/255);
      //and on to the next note!
      index++;
      if(index<(str.length/2)-1)
      {
        //figure out the time until the next sample
        let speed=str.charCodeAt(0);
        //beats per minute
        let bpm=(0b111111&speed)*4; //only looking at the last 6
        //samples per beat
        let spb=(0b11000000&speed)>>6; //see above
        spb=(2**spb);
        //samples per minute
        let spm=bpm*spb;
        //samples per second
        let sps=spm/60;
        //milliseconds per sample
        let mps=(sps**-1)*1000;
        setTimeout(play, mps);
      }
      else
      {
        self.ap.setGain(location,0);
        console.log(callback)
        callback();
      }
    }
    play();
  }
}
