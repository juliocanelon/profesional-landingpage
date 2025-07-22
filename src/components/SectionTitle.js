import React from 'react';

function SectionTitle({ title }) {
  return (
    <h2 className="my-4 text-center" id={title.toLowerCase().replace(/\s+/g, '-')}>{title}</h2>
  );
}

export default SectionTitle;
