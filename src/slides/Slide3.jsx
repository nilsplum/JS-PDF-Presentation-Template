import React from 'react';

function Slide3() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
      <h1 className="text-5xl font-bold mb-8">Export to PDF</h1>
      <div className="max-w-2xl">
        <p className="text-2xl mt-0 mb-6">
          Easily save your presentation as a PDF document directly from your browser!
        </p>
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-semibold mb-3 text-indigo-200">How it Works:</h2>
          <p className="text-lg mb-4 text-indigo-100">
            The "Download PDF" button utilizes the <code className="bg-gray-800 text-gray-100 px-2 py-1 rounded">jsPDF</code> library. 
            It captures the current slide's content using its <code className="bg-gray-800 text-gray-100 px-2 py-1 rounded">html()</code> method 
            and converts it into a downloadable PDF file.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-purple-200">Important Note:</h3>
          <p className="text-lg text-purple-100">
            This client-side rendering is powerful, but complex CSS or layouts might have minor differences in the PDF. 
            The fidelity depends on <code className="bg-gray-800 text-gray-100 px-2 py-1 rounded">jsPDF</code>'s HTML interpretation capabilities.
          </p>
        </div>
        <p className="text-xl mt-8 font-medium">Go ahead, give it a try after reviewing all slides!</p>
      </div>
    </div>
  );
}

export default Slide3; 