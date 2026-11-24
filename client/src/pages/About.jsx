import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  Github,
  Linkedin,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const principles = [
  {
    number: "01",
    icon: Target,
    title: "Clarity before complexity",
    description:
      "Break broad career goals into focused topics and smaller milestones you can approach one step at a time.",
  },
  {
    number: "02",
    icon: BookOpenCheck,
    title: "Learning that stays active",
    description:
      "Use curated learning resources and quizzes to revisit important concepts and strengthen what you know.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Progress that compounds",
    description:
      "Track completed milestones, see your learning history, and build momentum as you move forward.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a direction",
    description:
      "Explore career paths and find a roadmap that matches the skills you want to build.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Follow the milestones",
    description:
      "Move through structured sections, work with recommended resources, and mark your progress.",
    icon: BookOpenCheck,
  },
  {
    number: "03",
    title: "Practice and improve",
    description:
      "Use quizzes and your attempt history to review what you have learned and keep improving.",
    icon: TrendingUp,
  },
];

const About = () => {
  return (
    <div className="cc-about">
      <section className="cc-about__hero" aria-labelledby="about-heading">
        <div className="cc-about__hero-copy">
          <span className="cc-about__eyebrow">
            <Sparkles size={14} aria-hidden="true" /> ABOUT THE PLATFORM
          </span>

          <h1 id="about-heading">
            Make your ambition <span>actionable.</span>
          </h1>

          <p className="cc-about__intro">
            CareerCraft is a practical space to explore tech careers,
            understand what to learn next, and keep your progress moving in
            the right direction.
          </p>

          <div className="cc-about__actions">
            <Link to="/dashboard" className="cc-about__primary">
              Explore roadmaps <ArrowUpRight size={17} />
            </Link>
            <Link to="/signup" className="cc-about__secondary">
              Join CareerCraft <ArrowRight size={16} />
            </Link>
          </div>

          <div className="cc-about__proof" aria-label="CareerCraft features">
            <span>
              <CheckCircle2 size={15} /> Structured learning
            </span>
            <i aria-hidden="true" />
            <span>
              <CheckCircle2 size={15} /> Visible progress
            </span>
          </div>
        </div>

        <div className="cc-about__visual">
          <div className="cc-about__visual-orbit cc-about__visual-orbit--one" />
          <div className="cc-about__visual-orbit cc-about__visual-orbit--two" />
          <div className="cc-about__visual-label">
            <span className="cc-about__visual-label-icon">
              <Sparkles size={15} />
            </span>
            <span>
              <strong>Your next chapter</strong>
              <small>One step at a time</small>
            </span>
          </div>
          <img
            src="/about.png"
            alt="Illustration of learning roadmaps, coding, and career growth"
            className="cc-about__illustration"
            fetchPriority="high"
          />
          <div className="cc-about__visual-note">
            <span><CheckCircle2 size={16} /></span>
            <div>
              <strong>Keep moving forward</strong>
              <small>Learn with direction</small>
            </div>
          </div>
        </div>
      </section>

      <section className="cc-about__principles" aria-label="CareerCraft principles">
        {principles.map(({ number, icon: Icon, title, description }) => (
          <article className="cc-about__principle" key={number}>
            <div className="cc-about__principle-top">
              <span className="cc-about__principle-icon">
                <Icon size={20} />
              </span>
              <span className="cc-about__principle-number">{number}</span>
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="cc-about__principle-line" />
          </article>
        ))}
      </section>

      <section className="cc-about__journey" aria-labelledby="about-journey-heading">
        <div className="cc-about__section-heading">
          <span className="cc-about__eyebrow">A SIMPLE WAY FORWARD</span>
          <h2 id="about-journey-heading">
            Turn a big goal into <span>steady progress.</span>
          </h2>
          <p>
            Keep your learning journey organised, practical, and easy to pick
            up again whenever you return.
          </p>
        </div>

        <div className="cc-about__steps">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <article className="cc-about__step" key={number}>
              <div className="cc-about__step-top">
                <span className="cc-about__step-icon"><Icon size={20} /></span>
                <span className="cc-about__step-number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cc-about__maker" aria-labelledby="about-maker-heading">
        <div className="cc-about__maker-copy">
          <span className="cc-about__eyebrow">
            <Sparkles size={14} /> BUILT WITH CURIOSITY
          </span>
          <h2 id="about-maker-heading">
            Made for people who want to <span>keep growing.</span>
          </h2>
          <p>
            CareerCraft brings together structured roadmaps, progress
            tracking, quizzes, and AI-assisted learning support in one focused
            experience.
          </p>
        </div>

        <div className="cc-about__socials" aria-label="Connect with the creator">
          <a
            href="https://github.com/abhishek5703"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} /> GitHub <ArrowUpRight size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/abhishekkumar8983/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <section className="cc-about__final-cta" aria-label="Explore CareerCraft">
        <div className="cc-about__final-cta-icon"><Compass size={22} /></div>
        <div className="cc-about__final-cta-copy">
          <span>READY TO GET STARTED?</span>
          <h2>Your next step starts here.</h2>
          <p>Find a roadmap and turn your learning goal into action.</p>
        </div>
        <Link to="/dashboard" className="cc-about__final-cta-link">
          Explore CareerCraft <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
};

export default About;
