import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Rocket,
  Sparkles,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="cc-footer">
      <div className="cc-footer__inner">
        <div className="cc-footer__grid">
          <div className="cc-footer__brand-block">
            <Link to="/" className="cc-footer__brand" aria-label="CareerCraft home">
              <span className="cc-footer__logo"><Rocket size={21} /></span>
              <span className="cc-footer__brand-name">Career<span>Craft</span></span>
            </Link>

            <p className="cc-footer__description">
              Build skills with direction. Turn your career goals into a clear,
              achievable learning journey.
            </p>

            <div className="cc-footer__socials" aria-label="Social links">
              <a href="https://github.com/abhishek5703" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                <Github size={19} />
              </a>
              <a href="https://www.linkedin.com/in/abhishekkumar8983/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin size={19} />
              </a>
            </div>
          </div>

          <nav className="cc-footer__column" aria-label="Platform links">
            <h3>Platform</h3>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Explore roadmaps</Link>
            <Link to="/profile">Your profile</Link>
            <Link to="/about">About CareerCraft</Link>
          </nav>

          <nav className="cc-footer__column" aria-label="Getting started links">
            <h3>Get started</h3>
            <Link to="/signup">Create an account <ArrowUpRight size={14} /></Link>
            <Link to="/login">Sign in</Link>
            <Link to="/dashboard">Find your roadmap</Link>
            <Link to="/about">How CareerCraft works</Link>
          </nav>

          <div className="cc-footer__feature">
            <span className="cc-footer__feature-icon"><Sparkles size={19} /></span>
            <span className="cc-footer__feature-label">YOUR NEXT CHAPTER</span>
            <h3>Your future starts with one step.</h3>
            <p>Choose a path, build new skills, track your progress, and keep moving forward.</p>
            <Link to="/dashboard" className="cc-footer__cta">
              Find your path <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="cc-footer__bottom">
          <p>© {year} <strong>CareerCraft.</strong> All rights reserved.</p>
          <div className="cc-footer__bottom-right">
            <span>Learn with purpose.</span>
            <span className="cc-footer__separator" aria-hidden="true">·</span>
            <span>Grow with confidence.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;