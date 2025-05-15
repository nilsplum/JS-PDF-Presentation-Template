import React from 'react';

function Slide3() {
  return (
    <>
      <p className="mt-0 text-lg">
        Clicking the "Download PDF" button in the footer triggers the PDF generation process.
      </p>
      <p className="text-lg">
        It uses the <code className="bg-gray-700 text-gray-300 px-1 rounded">jsPDF</code> library's built-in HTML rendering capability (<code className="bg-gray-700 text-gray-300 px-1 rounded">pdf.html()</code>) 
        to directly convert the slide's content into the PDF format.
      </p>
      <p className="text-lg">
        <strong className="font-semibold">Note:</strong> This process happens entirely in your browser. Complex layouts or CSS might not render with perfect fidelity in the generated PDF, 
        as the quality depends on <code className="bg-gray-700 text-gray-300 px-1 rounded">jsPDF</code>'s ability to accurately interpret the DOM elements and styles.
      </p>
      <p className="mb-0 text-lg">Try it out after viewing all slides!</p>
    </>
  );
}

export default Slide3; 