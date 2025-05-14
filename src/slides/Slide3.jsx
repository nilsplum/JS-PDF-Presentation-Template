import React from 'react';

function Slide3() {
  return (
    <>
      <p>
        Clicking the "Download PDF" button in the footer triggers the PDF generation process.
      </p>
      <p>
        It uses the <code>html2canvas</code> library to capture each slide as an image and the <code>jspdf</code>
        library to compile these images into a single, multi-page PDF document.
      </p>
      <p>
        <strong>Note:</strong> This process happens entirely in your browser. Complex layouts or animations might not render perfectly in the generated PDF.
        The quality depends on <code>html2canvas</code>'s ability to accurately render the DOM elements.
      </p>
      <p>Try it out after viewing all slides!</p>
    </>
  );
}

export default Slide3; 