import React, { useState, useEffect } from 'react';
import KeyPad from './KeyPad';
import Controls from './Controls';
import { drumSounds, soundLookup } from '../drum-data';
// import QuoteBox from "./QuoteBox";

const App = () => {
  /*  useState hooks...
    sounds: drumSounds, //object containing all drum sound data
    currentSound: {}, //current sound that was played
    trackIndex: soundLookup, //key value index to quickly look up drum sound by track and letter
    power: true, //on/off switch
    track: 0, //which track is being displayed, 0 or 1
    volume: 20, //volume level going form 0 to 100 (max)
  }; */
  const [sounds, setSounds] = useState(drumSounds);
  const [currentSound, setCurrentSound] = useState({});
  const [trackIndex, setTrackIndex] = useState(soundLookup);
  const [power, setPower] = useState(true);
  const [track, setTrack] = useState(0);
  const [volume, setVolume] = useState(20);

  //function that takes button the button input 'index'
  //and then plays corresponding sound
  const playDrumSound = (index) => {
    if (!power) return;

    //extract current drum sounds
    const _currentSound = sounds[trackIndex[track][index]];
    //playing drum beta
    const drumbeat = new Audio();
    //assigning drumsound file
    drumbeat.src = _currentSound.file;
    //setting volume
    drumbeat.volume = volume / 100;
    drumbeat.play();

    //setting state
    setCurrentSound(_currentSound);
  };

  //switch power on and off
  const switchPower = () => {
    let _power = power;

    //if power on turn off, else turn on
    _power ? (_power = 0) : (_power = 1);
    //setting state
    setPower(_power);
  };

  //switch between the 2 tracks
  const switchTrack = () => {
    let _track = track;

    //if track is set to 0 set to 1 and vis versa
    _track === 0 ? (_track = 1) : (_track = 0);
    //setting state
    setTrack(_track);
  };

  //reading slider and setting volume level
  const setVolumeLevel = (event) => {
    let _volume = event.currentTarget.value;
    //set state
    setVolume(_volume);
  };

  //handling keyboard events
  useEffect(() => {
    //adding event listenor to catch keystrokes and
    //play drumbeat if matche with certain letters

    const keyHandler = (event) => {
      const letter = event.key.toUpperCase();
      const keys = 'QWEASDZSCX';
      if (keys.includes(letter)) playDrumSound(letter);
    };

    //listening for event
    window.addEventListener('keydown', keyHandler);

    //clearing event
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  });

  return (
    <div
      id='drum-machine'
      className='container d-flex align-items-center justify-content-center'>
      <div id='display' className='d-flex'>
        <div className='flex-row'>
          <KeyPad playDrumSound={playDrumSound}>W</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>E</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>Q</KeyPad>
        </div>
        <div className='flex-row'>
          <KeyPad playDrumSound={playDrumSound}>A</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>S</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>D</KeyPad>
        </div>
        <div className='flex-row'>
          <KeyPad playDrumSound={playDrumSound}>Z</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>X</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>C</KeyPad>
        </div>
      </div>
      <div id='controls'>
        <Controls
          volume={volume}
          switchPower={switchPower}
          switchTrack={switchTrack}
          setVolume={setVolumeLevel}
          currentSound={currentSound}
        />
      </div>
    </div> //id='drum-machine'
  );
};

export default App;
