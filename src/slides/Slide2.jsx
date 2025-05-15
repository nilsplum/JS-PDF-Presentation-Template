import React from 'react';

function Slide2() {
  return (
    <>
      <p className="mt-0 text-lg">This application demonstrates several key concepts:</p>
      <ul className="list-disc list-inside space-y-1 text-lg">
        <li>React Components (Header, Footer, Slides)</li>
        <li>Dynamic Component Loading using <code className="bg-gray-700 text-gray-300 px-1 rounded">import()</code></li>
        <li>State Management (<code className="bg-gray-700 text-gray-300 px-1 rounded">useState</code>, <code className="bg-gray-700 text-gray-300 px-1 rounded">useEffect</code>)</li>
        <li>CSS Styling and Simple Animations</li>
        <li>Keyboard Navigation (Arrow Keys)</li>
        <li>Client-side PDF Generation</li>
      </ul>
      <p className="mb-0 text-lg">The structure allows easy addition/removal of slides via <code>slidesData</code> in Presentation.jsx.</p>
    </>
  );
}

export default Slide2; 