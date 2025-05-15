import React from 'react';

function Slide1() {
  return (
    <>
      <p className="mt-0 text-lg">
        This is a simple presentation tool built with React and Vite.
      </p>
      <p className="text-lg">
        You can navigate using the buttons beside the slide or the arrow keys.
      </p>
      <ul className="list-disc list-inside mb-0 text-lg">
        <li>Slide 1: Introduction (You are here)</li>
        <li>Slide 2: Features</li>
        <li>Slide 3: PDF Export</li>
      </ul>
    </>
  );
}

export default Slide1; 