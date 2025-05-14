Startup Command:
chmod +x ./setup.sh && ./setup.sh && chmod +x ./start.sh && ./start.sh

# AI-Powered HTML Presentation Template

This project provides a template for creating HTML-based presentations, designed to simplify the process and enable rapid presentation building, potentially with AI-generated slide content. It features a unified styling mechanism to ensure a consistent look and feel across all slides.

The core idea is that slide content is primarily HTML, making it easy for language models or users to generate. The template then wraps this content with a consistent structure and style.

## Features

-   **Simple Slide Creation**: Slides are React components returning HTML content.
-   **Unified Styling**: A `BaseSlide` component provides default styling (dark theme by default) including background, text colors, title formatting, and a footer.
-   **Dynamic Loading**: Slides are loaded dynamically, making the presentation extensible.
-   **Navigation**: Supports keyboard (arrow keys) and on-screen button navigation.
-   **Sidebar Overview**: A sidebar lists all slides for quick navigation.
-   **Fixed-Layout Scaling**: Slides maintain a 16:9 aspect ratio and scale like an image, preserving layout integrity. Content does not reflow.
-   **PDF Export**: Generates a PDF of the presentation.

## Getting Started

### Prerequisites

-   Node.js and npm (or yarn) installed on your system.

### Startup

1.  **Set up scripts and install dependencies:**
    Open your terminal in the project root directory and run the following command. This will make the setup and start scripts executable, then run the setup script (which installs dependencies like React, jsPDF, etc.), and finally make the start script executable.

    ```bash
    chmod +x ./setup.sh && ./setup.sh && chmod +x ./start.sh && ./start.sh
    ```

2.  **Running the application:**
    Once the setup is complete, the `start.sh` script will automatically run (as part of the command above). If you stop it and want to run it again later:

    ```bash
    ./start.sh
    ```

    The presentation application will then be available at: `http://localhost:3004`

## Working with Slides

### Adding a New Slide

To add a new slide to your presentation, follow these steps:

1.  **Create the Slide Content Component:**
    Create a new `.jsx` file in the `src/slides/` directory (e.g., `src/slides/SlideNew.jsx`). This component should export a default React function that returns the HTML content for your slide.
    The content should be structured as if it's going into the main body of a slide; the title and footer are handled by the `BaseSlide` wrapper.

    *Example `src/slides/SlideNew.jsx`:*
    ```jsx
    // src/slides/SlideNew.jsx
    import React from 'react';

    function SlideNew() {
      return (
        <>
          <h3>This is the Sub-heading for My New Slide</h3>
          <p>This is the first paragraph of my new slide. You can use standard HTML tags.</p>
          <ul>
            <li>Point one</li>
            <li>Point two</li>
          </ul>
          <p>Another paragraph with <code>inline code</code> if needed.</p>
          {/* Add animations by applying CSS classes defined in styles.css */}
          <p className="your-custom-animation-class">Animated text!</p>
        </>
      );
    }

    export default SlideNew;
    ```

2.  **Register the Slide in `Presentation.jsx`:**
    Open the `src/components/Presentation.jsx` file.
    Locate the `slidesData` constant array near the top of the file.
    Add a new object to this array for your new slide. This object needs:
    -   `title`: A string for the slide's title (this will be displayed in the `BaseSlide` header and the sidebar).
    -   `component`: A dynamic import function pointing to your new slide component file.

    *Example: Adding to `slidesData` in `Presentation.jsx`*
    ```javascript
    // src/components/Presentation.jsx

    // ... other imports ...

    const slidesData = [
      {
        title: 'Welcome to the Presentation',
        component: () => import('../slides/Slide1.jsx'),
      },
      {
        title: 'Core Features',
        component: () => import('../slides/Slide2.jsx'),
      },
      {
        title: 'PDF Export Example',
        component: () => import('../slides/Slide3.jsx'),
      },
      // Add your new slide here:
      {
        title: 'My Awesome New Slide', // This is the title
        component: () => import('../slides/SlideNew.jsx') // Path to your new component
      }
    ];

    // ... rest of the Presentation component ...
    ```

    The application will automatically pick up the new slide, add it to the presentation flow, and list it in the sidebar.

### Animating Slide Content

-   **CSS Animations**: You can add animations to elements within your slide components using CSS.
    1.  Define your animation keyframes and classes in `src/styles.css`.
        ```css
        /* In src/styles.css */
        .your-custom-animation-class {
          animation: slideInFromLeft 1s ease-out forwards;
          opacity: 0; /* Start hidden if needed */
        }

        @keyframes slideInFromLeft {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        ```
    2.  Apply the CSS class to the desired HTML element within your slide component's JSX (e.g., `<p className="your-custom-animation-class">Animated!</p>`).
-   **Inline Styles for Animation**: You can use inline `style` attributes for simple JavaScript-driven animation properties if needed, though CSS classes are generally preferred for animations. `Slide1.jsx` shows an example of using `animationDelay` via inline styles.

### Changing the Theme (Default Slide Appearance)

The default visual theme for all slides (e.g., background color, text color, title color, default footer text) is centralized in the `src/components/BaseSlide.jsx` component.

To change the default theme:

1.  **Open `src/components/BaseSlide.jsx`**.
2.  Locate the function signature for `BaseSlide`. You will see default props like:
    ```javascript
    function BaseSlide({ 
      title, 
      children, 
      footerText = "© 2023 Presentation App", 
      backgroundColor = "#121212", // Default dark background
      titleColor = "#ffffff",      // Default white title
      textColor = "#ffffff"        // Default white text
    }) {
      // ...
    }
    ```
3.  **Modify the default values** for these props. For instance, to change to a light theme by default:
    ```javascript
    function BaseSlide({ 
      title, 
      children, 
      footerText = "My Company Presentation", 
      backgroundColor = "#F0F0F0", // Light gray background
      titleColor = "#333333",      // Dark text title
      textColor = "#555555"        // Dark gray text
    }) {
      // ...
    }
    ```
4.  The `baseSlideStyles` object within `BaseSlide.jsx` also defines structural styles (padding, borders). You can adjust these as well. For example, the border colors for the header and footer are conditionally set based on `backgroundColor`. You might need to adjust these conditional styles if you change the `backgroundColor` significantly.

    ```javascript
    // Example of conditional border in BaseSlide.jsx
    header: {
      // ...
      borderBottom: `2px solid ${backgroundColor === "#121212" ? "#333" : "#e0e0e0"}`,
      // ...
    },
    footer: {
      // ...
      color: backgroundColor === "#121212" ? "#aaa" : "#777",
      // ...
    }
    ```
    If you set a new default `backgroundColor` (e.g., `#F0F0F0`), you might update these conditions or simplify them if you only plan to use one theme.

These changes in `BaseSlide.jsx` will apply to all slides by default, providing a unified look and feel.

## PDF Export Mechanism

The presentation includes a "Download PDF" button. Here's how it works:

1.  **Trigger**: Clicking the button calls the `handleDownloadPDF` function in `src/components/Presentation.jsx`.
2.  **Library**: It uses the `jsPDF` library.
3.  **Process**:
    *   The function iterates through each slide defined in the `slidesData` array.
    *   For each slide, it temporarily brings that slide into view and applies styles to ensure it's rendered at a fixed, unscaled size (1024x576 pixels). This is important for consistent capture.
    *   It then uses the `pdf.html(slideElement, options)` method from `jsPDF`. This method attempts to directly convert the HTML DOM structure of the slide into PDF vector commands.
    *   **No Canvas Intermediate**: This approach aims to avoid using `html2canvas` (or similar rasterization libraries) to create an image first. Instead, `jsPDF`'s internal HTML renderer tries to interpret the HTML and CSS.
    *   **Vector vs. Raster**: This can result in high-definition text (as text is drawn as vector paths in the PDF). However, the fidelity of complex CSS (layouts, unsupported styles) can be a limitation. Simpler CSS generally yields better results.
    *   After capturing the HTML of a slide, its original display styles (for scaling and centering) are restored.
    *   A new page is added to the PDF for each subsequent slide.
4.  **Output**: Once all slides are processed, `pdf.save('presentation.pdf')` is called to trigger the download of the multi-page PDF.
5.  **Color and Styling**: The PDF generation attempts to respect the slide's background colors, text colors, and other styles as defined in `BaseSlide.jsx` and the individual slide components, within the limits of `jsPDF`'s HTML rendering capabilities.

**Note on PDF Quality**: The quality and accuracy of the PDF's appearance (especially regarding CSS styling) are highly dependent on how well `jsPDF`'s internal HTML renderer can interpret your slide's HTML and CSS. For very complex slides, some visual discrepancies might occur compared to the browser view.

## Project Structure Overview

-   `public/`: Static assets.
-   `src/`:
    -   `components/`:
        -   `BaseSlide.jsx`: The template providing default styling for all slides.
        -   `Footer.jsx`: The main application footer (slide count, PDF download).
        -   `Header.jsx`: The main application header (displays current slide title from `Presentation.jsx`).
        -   `Presentation.jsx`: The core component that manages slide loading, navigation, state, PDF generation, and contains the `slidesData` array.
        -   `Sidebar.jsx`: Renders the list of slides for navigation.
    -   `slides/`: Contains individual slide content components (e.g., `Slide1.jsx`).
    -   `App.jsx`: The root React component.
    -   `main.jsx`: The entry point for the React application.
    -   `index.css`: Minimal global styles/resets from Vite.
    -   `styles.css`: Custom global styles for the presentation layout, animations, and specific slide element styling.
-   `index.html`: The main HTML page.
-   `package.json`: Project dependencies and scripts.
-   `setup.sh`: Script to install dependencies.
-   `start.sh`: Script to run the development server.
-   `vite.config.js`: Vite configuration.
-   `README.md`: This file.

## Project Structure

-   `/`: Root directory containing configuration (`package.json`, `vite.config.js`), startup scripts (`setup.sh`, `start.sh`), and the entry HTML (`index.html`).
-   `public/`: Static assets (if any).
-   `src/`: Contains the React application code.
    -   `main.jsx`: The main entry point for the React application.
    -   `App.jsx`: The root component, usually renders the `Presentation` component.
    -   `index.css`: Minimal global styles/resets.
    -   `styles.css`: Custom global styles for the presentation layout.
    -   `components/`: Shared React components.
        -   `Header.jsx`: The presentation header.
        -   `Footer.jsx`: The presentation footer (with navigation and PDF download).
        -   `Presentation.jsx`: The main container managing slide loading, state, and navigation.
    -   `slides/`: Individual slide components.
        -   `Slide1.jsx`, `Slide2.jsx`, etc.: Each file exports a React component representing a single slide.
    -   `slidesConfig.js`: Configuration file listing the slides to include in the presentation and their metadata (like title).

## How Slides Work

-   Each slide is a standard React component located in `src/slides/`.
-   A slide component should return JSX defining its content and structure (HTML, CSS classes).
-   You can include CSS or JavaScript-based animations directly within a slide component or use global styles.
-   The order and inclusion of slides are managed in `src/slidesConfig.js`.

## Adding New Slides

1.  **Create a new Slide Component:** Create a new file in `src/slides/`, for example, `SlideNew.jsx`.
    ```jsx
    // src/slides/SlideNew.jsx
    import React from 'react';

    function SlideNew() {
      return (
        <div>
          <h2>My New Slide Title</h2>
          <p>This is the content of the new slide.</p>
        </div>
      );
    }

    export default SlideNew;
    ```
2.  **Update Configuration:** Open `src/slidesConfig.js` and add an entry for your new slide, including its title and a dynamic import for the component.
    ```javascript
    // src/slidesConfig.js
    const slides = [
      // ... existing slides ...
      {
        title: 'New Slide Title',
        // Use dynamic import to load the component only when needed
        component: () => import('./slides/SlideNew.jsx')
      }
    ];

    export default slides;
    ```

The `Presentation` component will automatically pick up the new slide from the configuration.

## PDF Download

-   Click the "Download PDF" button in the footer.
-   The application uses `html2canvas` to capture an image of each slide and `jspdf` to compile these images into a single multi-page PDF.
-   The PDF will be named `presentation.pdf` and should start downloading automatically.
-   Note: PDF generation happens entirely in the browser. Complex CSS or animations might not render perfectly in the PDF. 