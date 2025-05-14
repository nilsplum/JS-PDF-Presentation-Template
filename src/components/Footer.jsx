import React from 'react';

function Footer({ currentSlideIndex, totalSlides, onDownloadPDF, isDownloading }) {
  const currentPage = currentSlideIndex + 1;

  return (
    <footer className="presentation-footer">
      <div className="footer-counter">
        {totalSlides > 0 && (
          <span>Slide {currentPage} of {totalSlides}</span>
        )}
      </div>
      <div className="footer-download">
        {totalSlides > 0 && (
            <button onClick={onDownloadPDF} disabled={isDownloading}>
            {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
        )}
      </div>
    </footer>
  );
}

export default Footer; 