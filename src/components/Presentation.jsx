import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import BaseSlide from './BaseSlide';
// import slideConfig from '../slidesConfig'; // Removed
import jsPDF from 'jspdf';
// html2canvas import is already removed if we are using jsPDF.html()

// Define slide data directly in Presentation.jsx
const slidesData = [
  {
    title: 'Welcome to the Presentation',
    component: () => import('../slides/Slide1.jsx'),
    // No styling props here, BaseSlide defaults will be used
  },
  {
    title: 'Core Features',
    component: () => import('../slides/Slide2.jsx'),
  },
  {
    title: 'PDF Export Example',
    component: () => import('../slides/Slide3.jsx'),
  }
];

function Presentation() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [LoadedSlideComponents, setLoadedSlideComponents] = useState([]);
  const [isLoadingSlides, setIsLoadingSlides] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const slideRefs = useRef([]); 
  const slideContainerRef = useRef(null);

  useEffect(() => {
    async function loadSlides() {
      setIsLoadingSlides(true);
      const loadedComponents = [];
      slideRefs.current = []; 
      // Use the new slidesData array
      for (const slide of slidesData) { 
        try {
          const module = await slide.component();
          loadedComponents.push(module.default || module);
          slideRefs.current.push(React.createRef()); 
        } catch (error) {
          console.error("Error loading slide:", slide.title, error);
          loadedComponents.push(() => <div>Error loading slide: {slide.title}</div>);
          slideRefs.current.push(React.createRef());
        }
      }
      setLoadedSlideComponents(loadedComponents);
      setIsLoadingSlides(false);
    }
    loadSlides();
  }, []); 

  useEffect(() => {
    const handleResize = () => {
      const container = slideContainerRef.current;
      if (!container) return;
      const slides = container.querySelectorAll('.slide-active');
      slides.forEach(slide => {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const slideWidth = 1024; 
        const slideHeight = 576;  
        const scale = Math.min(
          containerWidth / slideWidth,
          containerHeight / slideHeight
        ) * 0.95; 
        slide.style.transform = `translate(-50%, -50%) scale(${scale})`;
        slide.style.transformOrigin = 'center center';
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentSlideIndex, isLoadingSlides, LoadedSlideComponents.length]);

  const handleNext = useCallback(() => {
    if (isDownloading) return;
    setCurrentSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, LoadedSlideComponents.length - 1)
    );
  }, [LoadedSlideComponents.length, isDownloading]);

  const handlePrev = useCallback(() => {
    if (isDownloading) return;
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, [isDownloading]);

  const handleSlideSelect = useCallback((index) => {
    if (isDownloading) return;
    if (index >= 0 && index < LoadedSlideComponents.length) {
      setCurrentSlideIndex(index);
    }
  }, [LoadedSlideComponents.length, isDownloading]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isDownloading) return;
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev, isDownloading]);

  const handleDownloadPDF = async () => {
    if (isDownloading || LoadedSlideComponents.length === 0) return;
    setIsDownloading(true);
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1024, 576]
    });
    try {
      const originalIndex = currentSlideIndex;
      for (let i = 0; i < LoadedSlideComponents.length; i++) {
        setCurrentSlideIndex(i);
        await new Promise(resolve => setTimeout(resolve, 400)); 
        const slideElement = document.getElementById(`slide-${i}`);
        if (!slideElement) {
          console.error(`Slide element slide-${i} not found!`);
          continue;
        }
        const originalTransform = slideElement.style.transform;
        const originalPosition = slideElement.style.position;
        const originalTop = slideElement.style.top;
        const originalLeft = slideElement.style.left;
        const originalWidth = slideElement.style.width;
        const originalHeight = slideElement.style.height;
        slideElement.style.transform = 'none';
        slideElement.style.position = 'static';
        slideElement.style.top = '0';
        slideElement.style.left = '0';
        slideElement.style.width = '1024px';
        slideElement.style.height = '576px';
        if (i > 0) {
          pdf.addPage([1024, 576], 'landscape');
        }
        await pdf.html(slideElement, {
          x: 0, y: 0, width: 1024, height: 576, 
          windowWidth: 1024, windowHeight: 576, autoPaging: false,
        });
        slideElement.style.transform = originalTransform;
        slideElement.style.position = originalPosition;
        slideElement.style.top = originalTop;
        slideElement.style.left = originalLeft;
        slideElement.style.width = originalWidth;
        slideElement.style.height = originalHeight;
      }
      pdf.save('presentation.pdf');
      setCurrentSlideIndex(originalIndex);
    } catch (error) {
      console.error("Error generating PDF with jsPDF.html():", error);
      alert("Failed to generate PDF. The content might be too complex for the direct HTML renderer. Check console.");
    } finally {
      setIsDownloading(false);
    }
  };

  const CurrentSlideComponent = LoadedSlideComponents[currentSlideIndex];
  // Get current slide data (for title) from the new slidesData array
  const currentSlideDisplayData = slidesData[currentSlideIndex]; 

  return (
    <div className="presentation-layout">
      <Sidebar
        // Pass slidesData to Sidebar
        slides={slidesData} 
        currentSlideIndex={currentSlideIndex}
        onSlideSelect={handleSlideSelect}
        isDownloading={isDownloading}
      />
      <div className="presentation-content">
        {/* Use title from currentSlideDisplayData */}
        <Header title={currentSlideDisplayData?.title || 'Loading...'} /> 

        <main className="slide-viewport" aria-live="polite">
          {/* ... (Navigation buttons remain unchanged) ... */}
           {!isLoadingSlides && LoadedSlideComponents.length > 0 && (
            <>
              <button
                className="slide-nav-button slide-nav-prev"
                onClick={handlePrev}
                disabled={currentSlideIndex <= 0 || isDownloading}
                aria-label="Previous Slide"
              >
                &larr;
              </button>
              <button
                className="slide-nav-button slide-nav-next"
                onClick={handleNext}
                disabled={currentSlideIndex >= LoadedSlideComponents.length - 1 || isDownloading}
                aria-label="Next Slide"
              >
                &rarr;
              </button>
            </>
          )}
          <div className="slide-container" ref={slideContainerRef}>
            {isLoadingSlides ? (
              <div className="slide-loading">Loading slides...</div>
            ) : CurrentSlideComponent ? (
              LoadedSlideComponents.map((SlideComponent, index) => {
                // Get slide-specific data (title) for BaseSlide
                const slideDisplayData = slidesData[index] || {};
                
                return (
                  <div
                    key={index}
                    id={`slide-${index}`}
                    className={index === currentSlideIndex ? 'slide-active slide-scaling' : 'slide-inactive'}
                    style={{ 
                      display: index === currentSlideIndex ? 'block' : 'none',
                      width: '1024px',
                      height: '576px',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    ref={slideRefs.current[index]}
                  >
                    {index === currentSlideIndex && (
                      // BaseSlide now uses its internal defaults for styling props
                      // Only pass the specific title for this slide
                      <BaseSlide
                        title={slideDisplayData.title || `Slide ${index + 1}`}
                        // footerText, backgroundColor, titleColor, textColor are NOT passed
                        // They will come from BaseSlide's defaultProps
                      >
                        <SlideComponent />
                      </BaseSlide>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="slide-error">Slide content could not be loaded.</div>
            )}
          </div>
        </main>

        <Footer
          currentSlideIndex={currentSlideIndex}
          totalSlides={LoadedSlideComponents.length} // Corrected to use LoadedSlideComponents.length
          onDownloadPDF={handleDownloadPDF}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  );
}

export default Presentation; 