import React from 'react';

function Header({ title }) {
  return (
    <header className="presentation-header">
      <h1>{title || 'Presentation'}</h1>
    </header>
  );
}

export default Header; 