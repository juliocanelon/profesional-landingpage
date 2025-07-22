import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { projects } from '../data/projects';
import SectionTitle from './SectionTitle';

function Portfolio() {
  return (
    <section id="portafolio" className="py-5 bg-light">
      <div className="container">
        <SectionTitle title="Portafolio" />
        <div className="row">
          {projects.map((p) => (
            <div key={p.title} className="col-lg-4 col-md-6 mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{p.role}</Card.Subtitle>
                  <Card.Text>{p.description}</Card.Text>
                  <p><strong>Tecnologías:</strong> {p.tech}</p>
                </Card.Body>
                <Card.Footer>
                  {p.links.github && (
                    <Button variant="primary" size="sm" href={p.links.github} className="me-2">GitHub</Button>
                  )}
                  {p.links.demo && (
                    <Button variant="success" size="sm" href={p.links.demo}>Demo</Button>
                  )}
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
