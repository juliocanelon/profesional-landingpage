import React from 'react';

function ThemeToggle({ dark, onToggle }) {
  return (
    <button className="btn btn-link" onClick={onToggle} aria-label="Toggle theme">
      {dark ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
}

export default ThemeToggle;
