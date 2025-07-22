import React from 'react';
import { skills } from '../data/skills';
import SectionTitle from './SectionTitle';

function Skills() {
  return (
    <section id="habilidades" className="py-5">
      <div className="container">
        <SectionTitle title="Habilidades" />
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} className="mb-3">
            <h5 className="text-capitalize">{cat.replace(/([A-Z])/g, ' $1')}</h5>
            {items.map((skill) => (
              <span key={skill} className="badge bg-success me-1 mb-1">
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
