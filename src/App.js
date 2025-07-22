import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import './styles/globals.css';
import './styles/variables.scss';

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setDark(stored === 'dark');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <Router>
      <Header dark={dark} onToggle={() => setDark(!dark)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Education />
        <ContactForm />
        <ChatBot />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
