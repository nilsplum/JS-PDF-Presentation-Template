import React from 'react';

function Slide2() {
  const features = [
    { name: "React Components", description: "Modular UI with Header, Footer, and Slides.", icon: "🧱" },
    { name: "Dynamic Imports", description: "Efficient loading of slide components using `import()`.", icon: "🚀" },
    { name: "State Management", description: "Utilizing `useState` and `useEffect` for interactivity.", icon: "⚙️" },
    { name: "Modern Styling", description: "Tailwind CSS for styling and smooth animations.", icon: "🎨" },
    { name: "Keyboard Navigation", description: "Intuitive slide control with Arrow Keys.", icon: "⌨️" },
    { name: "PDF Generation", description: "Client-side PDF export of your presentation.", icon: "📄" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-5xl font-bold mb-10 text-green-600">Key Features</h1>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-4">{feature.icon}</span>
              <h2 className="text-2xl font-semibold text-green-700">{feature.name}</h2>
            </div>
            <p className="text-gray-600 text-lg">{feature.description}</p>
          </div>
        ))}
      </div>
      <p className="text-xl mt-8 text-gray-700">Easily extendable by adding new slide components!</p>
    </div>
  );
}

export default Slide2; 