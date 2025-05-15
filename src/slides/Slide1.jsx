import React from 'react';

function Slide1() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <h1 className="text-5xl font-bold mb-8 text-blue-600">Welcome to Our Presentation!</h1>
      <p className="text-2xl mt-0 mb-6 text-gray-700">
        Discover a seamless presentation experience powered by modern web technologies.
      </p>
      <p className="text-xl mb-6 text-gray-600">
        Navigate with ease using the on-screen controls or your keyboard's arrow keys.
      </p>
      <div className="mt-4">
        <h2 className="text-3xl font-semibold mb-4 text-blue-500">What's Inside?</h2>
        <ul className="list-none p-0 text-lg text-gray-700 space-y-2">
          <li className="bg-gray-100 p-3 rounded-lg shadow-sm">Slide 1: Welcome! (You are here)</li>
          <li className="bg-gray-100 p-3 rounded-lg shadow-sm">Slide 2: Key Features Explored</li>
          <li className="bg-gray-100 p-3 rounded-lg shadow-sm">Slide 3: Easy PDF Export</li>
        </ul>
      </div>
    </div>
  );
}

export default Slide1; 