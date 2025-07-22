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
          {projects.map((p, index) => {
            const isFeatured = index < 3;
            return (
              <div key={p.title} className="col-lg-4 col-md-6 mb-4">
                <Card
                  className="h-100"
                  bg={isFeatured ? 'primary' : undefined}
                  text={isFeatured ? 'white' : undefined}
                >
                  <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Subtitle className="mb-2">
                      {p.role}
                    </Card.Subtitle>
                    <Card.Text>{p.description}</Card.Text>
                    <Card.Text>
                      <strong>Fecha:</strong> {p.date}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer
                    className={isFeatured ? 'bg-primary border-primary' : undefined}
                  >
                    <p className={isFeatured ? 'text-white' : undefined}>
                      <strong>Tecnologías:</strong> {p.tech}
                    </p>
                    {p.links.github && (
                      <Button
                        variant={isFeatured ? 'light' : 'primary'}
                        size="sm"
                        href={p.links.github}
                        target="_blank"
                        className="me-2"
                      >
                        +Info
                      </Button>
                    )}
                    {p.links.demo && (
                      <Button
                        variant={isFeatured ? 'light' : 'success'}
                        size="sm"
                        href={p.links.demo}
                      >
                        Demo
                      </Button>
                    )}
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
