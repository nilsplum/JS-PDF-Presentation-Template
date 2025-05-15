import React from 'react';

function Slide2() {
  return (
    <>
      <p style={{ marginTop: 0 }}>This application demonstrates several key concepts:</p>
      <ul>
        <li>React Components (Header, Footer, Slides)</li>
        <li>Dynamic Component Loading using <code>import()</code></li>
        <li>State Management (<code>useState</code>, <code>useEffect</code>)</li>
        <li>CSS Styling and Simple Animations</li>
        <li>Keyboard Navigation (Arrow Keys)</li>
        <li>Client-side PDF Generation</li>
      </ul>
      <p style={{ marginBottom: 0 }}>The structure allows easy addition/removal of slides via <code>slidesConfig.js</code>.</p>
    </>
  );
}

export default Slide2; 