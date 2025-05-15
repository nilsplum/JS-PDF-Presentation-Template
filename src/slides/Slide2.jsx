import React from 'react';

function Slide2() {
  return (
    <>
      <p className="text-xl mt-0 mb-4">This application demonstrates several key concepts:</p>
      <ul className="list-disc ml-6 mb-4 space-y-2">
        <li className="text-base">React Components (Header, Footer, Slides)</li>
        <li className="text-base">Dynamic Component Loading using <code className="bg-gray-800 text-gray-200 px-1 rounded">import()</code></li>
        <li className="text-base">State Management (<code className="bg-gray-800 text-gray-200 px-1 rounded">useState</code>, <code className="bg-gray-800 text-gray-200 px-1 rounded">useEffect</code>)</li>
        <li className="text-base">CSS Styling and Simple Animations</li>
        <li className="text-base">Keyboard Navigation (Arrow Keys)</li>
        <li className="text-base">Client-side PDF Generation</li>
      </ul>
      <p className="text-lg mb-0">The structure allows easy addition/removal of slides.</p>
    </>
  );
}

export default Slide2; 