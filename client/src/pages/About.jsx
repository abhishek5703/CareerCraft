import { ArrowUpRight, BookOpenCheck, Github, Linkedin, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="about-copy">
        <span className="section-kicker">ABOUT THE PLATFORM</span>
        <h1>Make your ambition <span>actionable.</span></h1>
        <p>CareerCraft is a practical space to explore tech careers, understand what to learn next, and keep your progress moving in the right direction.</p>
        <div className="about-actions"><Link to="/dashboard" className="btn-primary">Explore roadmaps <ArrowUpRight size={17} /></Link><Link to="/signup" className="btn-text-link">Join CareerCraft <ArrowUpRight size={16} /></Link></div>
      </div>
      <div className="about-visual"><img src="/about.png" alt="CareerCraft learning and career growth illustration" loading="lazy" /></div>
    </section>

    <section className="about-principles">
      <div className="about-principle"><span><Target size={20} /></span><div><h3>Clarity before complexity</h3><p>Break down broad career goals into topics and smaller milestones you can approach one by one.</p></div></div>
      <div className="about-principle"><span><BookOpenCheck size={20} /></span><div><h3>Learning that stays active</h3><p>Use curated resources and quizzes to revisit concepts and strengthen what you have learned.</p></div></div>
      <div className="about-principle"><span><TrendingUp size={20} /></span><div><h3>Progress that compounds</h3><p>Keep track of completed steps and use your learning history to stay motivated.</p></div></div>
    </section>

    <section className="about-maker-card">
      <div><span className="section-kicker">BUILT WITH CURIOSITY</span><h2>Made for people who want to keep growing.</h2><p>CareerCraft brings together structured roadmaps, progress tracking, quizzes, and AI-assisted learning support in one focused experience.</p></div>
      <div className="about-socials"><a href="https://github.com/abhishek5703" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/abhishekkumar8983/" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} /></a></div>
    </section>
  </div>
);

export default About;