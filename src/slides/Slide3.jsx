import React from 'react';

function Slide3() {
  return (
    <>
      <p className="text-xl mt-0 mb-4">
        Clicking the "Download PDF" button in the footer triggers the PDF generation process.
      </p>
      <p className="text-lg mb-4">
        It uses the <code className="bg-gray-800 text-gray-200 px-1 rounded">jsPDF</code> library's built-in HTML rendering capability (<code className="bg-gray-800 text-gray-200 px-1 rounded">pdf.html()</code>) 
        to directly convert the slide's content into the PDF format.
      </p>
      <p className="text-lg mb-4">
        <span className="font-bold">Note:</span> This process happens entirely in your browser. Complex layouts or CSS might not render with perfect fidelity in the generated PDF, 
        as the quality depends on <code className="bg-gray-800 text-gray-200 px-1 rounded">jsPDF</code>'s ability to accurately interpret the DOM elements and styles.
      </p>
      <p className="text-lg mb-0">Try it out after viewing all slides!</p>
    </>
  );
}

export default Slide3; 