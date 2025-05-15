Startup Command:
chmod +x ./setup.sh && ./setup.sh && chmod +x ./start.sh && ./start.sh

# AI-Powered HTML Presentation Template

This project provides a template for creating HTML-based presentations, designed to simplify the process and enable rapid presentation building, potentially with AI-generated slide content. It features a unified styling mechanism to ensure a consistent look and feel across all slides.

The core idea is that slide content is primarily HTML, making it easy for language models or users to generate. The template then wraps this content with a consistent structure and style.

## Features

-   **Simple Slide Creation**: Slides are React components returning HTML content.
-   **Unified Styling**: A `BaseSlide` component provides default styling (dark theme by default) including background, text colors, title formatting, and a footer.
-   **Tailwind CSS Integration**: Utility classes from Tailwind CSS are available for styling content within slides.
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
    The content should be structured as if it's going into the main body of a slide. The slide title is handled by the `BaseSlide` wrapper, and the common footer for all slides is now defined globally in `src/components/Presentation.jsx`. You can use standard HTML tags and apply styling using Tailwind CSS utility classes directly on your elements.
    **Note on Spacing**: The `BaseSlide` component provides a default padding around the main content area. To ensure your slide content sits neatly within this padding without extra gaps, it's recommended to make the first root-level element in your slide component have `marginTop: 0` (or `mt-0` with Tailwind) and the last root-level element have `marginBottom: 0` (or `mb-0` with Tailwind) using inline styles or Tailwind classes. See the example below.

    *Example `src/slides/SlideNew.jsx` (using Tailwind for margins):*
    ```jsx
    // src/slides/SlideNew.jsx
    import React from 'react';

    function SlideNew() {
      return (
        <>
          <h3 className="mt-0 text-xl font-semibold">This is My New Slide</h3>
          <p>This is the first paragraph, styled with Tailwind if desired.</p>
          <ul className="list-disc list-inside">
            <li>Point one</li>
            <li>Point two</li>
          </ul>
          {/* Add animations by applying CSS classes defined in styles.css */}
          <p className="your-custom-animation-class">Animated text!</p>
          <p className="mb-0">Another paragraph with <code className="bg-gray-200 text-gray-800 px-1 rounded">inline code</code> if needed.</p>
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

### Changing the Theme (Default Slide Appearance)

The default visual theme for all slides (e.g., background color, text color, title color) is centralized in the `src/components/BaseSlide.jsx` component. The common footer content for all slides is defined in `src/components/Presentation.jsx` (see the `globalFooterContent` constant).

To change the default visual theme (excluding the footer content):

1.  **Open `src/components/BaseSlide.jsx`**.
2.  Locate the function signature for `BaseSlide`. You will see default props like:
    ```javascript
    function BaseSlide({ 
      title, 
      children, 
      footerContent = <p>© 2024 Presentation App</p>, // Default footer (now primarily a fallback, global footer is in Presentation.jsx)
      backgroundColor = "#121212", // Default dark background
      titleColor = "#ffffff",      // Default white title
      textColor = "#ffffff"        // Default white text
    }) {
      // ...
    }
    ```
3.  **Modify the default values** for props like `backgroundColor`, `titleColor`, and `textColor` in `BaseSlide.jsx`.
    To customize the global footer content, edit the `globalFooterContent` constant in `src/components/Presentation.jsx`.

    *Example of changing theme colors in `BaseSlide.jsx`:*
    ```javascript
    function BaseSlide({ 
      title, 
      children, 
      footerContent, // This will be provided by Presentation.jsx
      backgroundColor = "#F0F0F0", // Light gray background
      titleColor = "#333333",      // Dark text title
      textColor = "#555555"        // Dark gray text
    }) {
      // ...
    }
    ```

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