import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const [isFooterSticky, setIsFooterSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollable = window.innerHeight < document.body.scrollHeight;

      setIsFooterSticky(!isScrollable);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`bg-gray-800 text-gray-300 py-4 px-6 flex items-center justify-between `}>
      <div className="text-sm">&copy; Farhad Lafarie. All rights reserved.</div>
      <div className="flex space-x-4">
        <a
          href="https://github.com/LAFARIE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
        <a
          href="https://www.linkedin.com/in/farhad-lafarie/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a
          href="https://www.instagram.com/farhad.xd/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
        <a
          href="https://x.com/FLafarie"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faXTwitter} size="lg" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
