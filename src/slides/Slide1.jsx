import React from 'react';

function Slide1() {
  return (
    <>
      <p style={{ marginTop: 0 }}>
        This is a simple presentation tool built with React and Vite.
      </p>
      <p>
        You can navigate using the buttons beside the slide or the arrow keys.
      </p>
      <ul style={{ marginBottom: 0 }}>
        <li>Slide 1: Introduction (You are here)</li>
        <li>Slide 2: Features</li>
        <li>Slide 3: PDF Export</li>
      </ul>
    </> 
  );
}

export default Slide1; 