import "./style.scss";
import { FaEnvelope, FaFacebook, FaGithub } from "react-icons/fa";
import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer container-center">
      <div className="width-page">
        <div>
          <p className="p-desc">© BrightEnglish {year}.</p>
        </div>
        <div className="footer-socials">
          <a
            href="https://www.facebook.com/trang.nguyen.974652"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://github.com/Tranggg1210/bright-english"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a href="mailto:nguyenthitrang.ttf@gmail.com">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
