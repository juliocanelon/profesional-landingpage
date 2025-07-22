import React from 'react';
import { education } from '../data/education';
import SectionTitle from './SectionTitle';

function Education() {
  return (
    <section id="educacion" className="py-5">
      <div className="container">
        <SectionTitle title="Educación" />
        <ul className="list-unstyled timeline">
          {education.map((item) => (
            <li key={item} className="mb-2">{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Education;
