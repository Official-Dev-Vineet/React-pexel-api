import { useState, useEffect } from 'react';
import {FaArrowUp} from 'react-icons/fa';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed ${
        isVisible ? 'show' : ''}`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Go to top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
};

export default GoToTopButton;
