import React from 'react';

/**
 * BaseSlide serves as a template for all slides in the presentation.
 * It provides consistent styling and structure while allowing individual
 * slides to focus only on their unique content.
 */
function BaseSlide({ 
  title, 
  children, 
  footerText = "© 2023 Presentation App", 
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
    
    // Header/title area
    header: {
      padding: '15px 20px',
      borderBottom: `2px solid ${backgroundColor === "#121212" ? "#333" : "#e0e0e0"}`,
      flexShrink: 0, // Prevent the header from shrinking
      position: 'relative', // Fixed position relative to container
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
      position: 'relative', // Fixed position for content
      flex: 1,
      padding: '0 20px 10px',
      overflow: 'hidden', // Cut off content that exceeds dimensions
      // No flexible layout - content should scale as a whole
      zIndex: 1,
    },
    
    // Footer area
    footer: {
      borderTop: `1px solid ${backgroundColor === "#121212" ? "#333" : "#e0e0e0"}`,
      padding: '8px 20px',
      fontSize: '0.9rem', // Fixed size
      color: backgroundColor === "#121212" ? "#aaa" : "#777",
      textAlign: 'center',
      flexShrink: 0, // Prevent the footer from shrinking
      position: 'relative', // Fixed position relative to container
      zIndex: 2, // Ensure footer is on top
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
      
      {/* Slide Footer */}
      <div className="base-slide-footer" style={baseSlideStyles.footer}>
        {footerText}
      </div>
    </div>
  );
}

export default BaseSlide; 