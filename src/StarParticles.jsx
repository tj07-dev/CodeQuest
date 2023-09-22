import { useEffect } from "react";

const StarParticles = () => {
  useEffect(() => {
    const numStars = 100; // Adjust the number of stars

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "stars";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      document.body.appendChild(star);
    }

    return () => {
      // Clean up stars when the component unmounts
      const stars = document.querySelectorAll(".stars");
      stars.forEach((star) => {
        document.body.removeChild(star);
      });
    };
  }, []);

  return <div className="star-particles"></div>;
};

export default StarParticles;
