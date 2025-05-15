import React from 'react';

function Slide3() {
  return (
    <>
      <p style={{ marginTop: 0 }}>
        Clicking the "Download PDF" button in the footer triggers the PDF generation process.
      </p>
      <p>
        It uses the <code>jsPDF</code> library's built-in HTML rendering capability (<code>pdf.html()</code>) 
        to directly convert the slide's content into the PDF format.
      </p>
      <p>
        <strong>Note:</strong> This process happens entirely in your browser. Complex layouts or CSS might not render with perfect fidelity in the generated PDF, 
        as the quality depends on <code>jsPDF</code>'s ability to accurately interpret the DOM elements and styles.
      </p>
      <p style={{ marginBottom: 0 }}>Try it out after viewing all slides!</p>
    </>
  );
}

export default Slide3; 