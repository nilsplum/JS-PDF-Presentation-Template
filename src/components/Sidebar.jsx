import React from 'react';

function Sidebar({ slides, currentSlideIndex, onSlideSelect, isDownloading }) {
  return (
    <aside className="sidebar">
      <h3>Slides</h3>
      <ul className="sidebar-list">
        {slides.map((slide, index) => (
          <li
            key={index}
            className={`sidebar-item ${index === currentSlideIndex ? 'sidebar-item-active' : ''}`}
            onClick={() => !isDownloading && onSlideSelect(index)}
            // Prevent clicking during PDF download
            style={{ cursor: isDownloading ? 'not-allowed' : 'pointer' }}
          >
            {index + 1}. {slide.title || `Slide ${index + 1}`}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar; 