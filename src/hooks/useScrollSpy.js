import { useEffect } from 'react';

export default function useScrollSpy(ids) {
  useEffect(() => {
    const handler = () => {
      let active = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          active = id;
        }
      });
      document.querySelectorAll('nav a').forEach((a) => {
        if (a.getAttribute('href') === `#${active}`) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [ids]);
}
