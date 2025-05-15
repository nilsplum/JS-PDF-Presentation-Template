import React from 'react';

/**
 * BaseSlide serves as a template for all slides in the presentation.
 * It provides consistent styling and structure while allowing individual
 * slides to focus only on their unique content.
 */
function BaseSlide({
  title,
  children,
  currentSlideIndexActual, // New prop: 0-indexed current slide
  totalSlides,             // New prop: total number of slides
  footerText = "© 2024 Presentation App", // New prop for footer text
  backgroundColor = "#121212", // Dark background by default
  titleColor = "#ffffff", // White title by default
  textColor = "#ffffff" // White text by default
}) {
  const baseSlideStyles = {
    // Container for the entire slide content
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      backgroundColor: backgroundColor,
      position: 'relative',
      color: textColor,
      overflow: 'hidden', // Prevent any overflow
    },
    
    // Header/title area - modified for PDF compatibility
    header: {
      padding: '15px 20px',
      borderBottom: `2px solid ${backgroundColor === "#121212" ? "#333" : "#e0e0e0"}`,
      width: '100%',
      boxSizing: 'border-box',
      height: '60px', // Fixed height for consistency
      display: 'flex',
      alignItems: 'center',
      position: 'absolute', // Changed from relative to absolute
      top: 0,
      left: 0,
      zIndex: 2, // Ensure header is on top
    },
    
    title: {
      margin: 0,
      color: titleColor,
      fontSize: '1.8rem', // Fixed size instead of responsive
      whiteSpace: 'nowrap', // Prevent title from wrapping
      overflow: 'hidden', // Cut off overflow
      textOverflow: 'ellipsis', // Add ellipsis if title is too long
    },
    
    // Main content area where children will be rendered
    content: {
      marginTop: '60px', // Match header height
      marginBottom: '40px', // Match footer height
      flex: 1,
      padding: '50px',
      position: 'relative', // Changed from relative
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      zIndex: 1,
      boxSizing: 'border-box',
      height: 'calc(100% - 100px)', // 100px accounts for header (60px) + footer (40px)
    },
    
    // Footer area - modified for PDF compatibility
    footer: {
      width: '100%',
      boxSizing: 'border-box',
      borderTop: `1px solid ${backgroundColor === "#121212" ? "#333" : "#e0e0e0"}`,
      padding: '8px 20px',
      fontSize: '0.9rem',
      color: backgroundColor === "#121212" ? "#aaa" : "#777",
      height: '40px', // Fixed height for consistency
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute', // Changed from relative to absolute
      bottom: 0,
      left: 0,
      zIndex: 2,
    }
  };

  return (
    <div className="base-slide" style={baseSlideStyles.container}>
      {/* Slide Header */}
      <div className="base-slide-header" style={baseSlideStyles.header}>
        <h2 className="base-slide-title" style={baseSlideStyles.title}>{title}</h2>
      </div>
      
      {/* Slide Content - Children components */}
      <div className="base-slide-content" style={baseSlideStyles.content}>
        <div className="fixed-scale-content">
          {children}
        </div>
      </div>
      
      {/* Slide Footer - Unified structure */}
      <div className="base-slide-footer" style={baseSlideStyles.footer}>
        <span>{footerText}</span>
        {typeof currentSlideIndexActual === 'number' && typeof totalSlides === 'number' && totalSlides > 0 && (
          <span>
            Slide {currentSlideIndexActual + 1} / {totalSlides}
          </span>
        )}
      </div>
    </div>
  );
}

export default BaseSlide; 