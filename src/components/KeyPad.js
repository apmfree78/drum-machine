import React from 'react';

//keypad button - reusable component
const KeyPad = ({ playDrumSound, children }) => {
  return (
    <div id='drum-pad'>
      <button
        className='btn btn-primary btn-lg'
        type='submit'
        id={children}
        onClick={() => playDrumSound(children)}>
        {children}
      </button>
    </div>
  );
};

export default KeyPad;
