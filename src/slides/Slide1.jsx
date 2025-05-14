import React from 'react';

function Slide1() {
  return (
    <>
      <p className="slide1-fade-in-text">
        This is a simple presentation tool built with React and Vite.
      </p>
      <p className="slide1-fade-in-text" style={{ animationDelay: '0.8s' }}>
        You can navigate using the buttons beside the slide or the arrow keys.
      </p>
      <ul>
        <li className="slide1-fade-in-text" style={{ animationDelay: '1.1s' }}>Slide 1: Introduction (You are here)</li>
        <li className="slide1-fade-in-text" style={{ animationDelay: '1.4s' }}>Slide 2: Features</li>
        <li className="slide1-fade-in-text" style={{ animationDelay: '1.7s' }}>Slide 3: PDF Export</li>
      </ul>
    </>
  );
}

export default Slide1; 