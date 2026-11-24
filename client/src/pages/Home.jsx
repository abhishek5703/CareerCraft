import { ArrowRight, ArrowUpRight, BookOpenCheck, BrainCircuit, CheckCircle2, Compass, LineChart, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: <Compass size={21} />,
    title: "A path, not a guess",
    description: "Follow curated roadmaps that break ambitious career goals into focused, manageable steps.",
    tone: "violet",
  },
  {
    icon: <LineChart size={21} />,
    title: "Progress you can see",
    description: "Mark milestones as you learn and keep your momentum visible from one session to the next.",
    tone: "blue",
  },
  {
    icon: <BrainCircuit size={21} />,
    title: "Learn by doing",
    description: "Reinforce what you study with knowledge checks, quiz history, and roadmap-aware guidance.",
    tone: "mint",
  },
];

const Home = () => {
  const { token, user } = useAuth();
  const primaryHref = token ? "/dashboard" : "/signup";

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-container">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR CAREER, WITH A CLEARER DIRECTION</div>
            <h1>
              Build the skills.
              <br />
              <span className="hero-title-accent">Shape your future.</span>
            </h1>
            <p className="hero-description">
              Your next career move starts with a plan. Explore structured tech roadmaps, learn one step at a time, and see how far you’ve come.
            </p>
            <div className="hero-actions">
              <Link to={primaryHref} className="btn-primary hero-primary">
                {token ? "Continue learning" : "Start your journey"}
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/about" className="btn-text-link">Discover CareerCraft <ArrowRight size={16} /></Link>
            </div>
            <div className="hero-proof">
              <div className="proof-icon-stack" aria-hidden="true">
                <span><BookOpenCheck size={15} /></span>
                <span><Target size={15} /></span>
                <span><CheckCircle2 size={15} /></span>
              </div>
              <div><strong>Learn with structure</strong><small>Roadmaps · Milestones · Quizzes</small></div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          >
            <div className="hero-visual-glow" />
            <div className="hero-image-card">
              <div className="visual-topline"><span><Sparkles size={14} /> CareerCraft planner</span><span className="visual-live-dot">●</span></div>
              <img src="/hero-illustration.png" alt="A learner building their career skills" />
              <div className="visual-caption"><span className="visual-caption-icon"><Target size={17} /></span><div><strong>Progress starts here</strong><small>Small steps. Bigger possibilities.</small></div></div>
            </div>
            <div className="floating-card floating-card-top">
              <span className="floating-icon floating-icon-purple"><BookOpenCheck size={17} /></span>
              <div><strong>One step at a time</strong><small>Stay focused on what matters</small></div>
            </div>
            <div className="floating-card floating-card-bottom">
              <span className="floating-icon floating-icon-green"><CheckCircle2 size={18} /></span>
              <div><strong>Keep your momentum</strong><small>Every milestone counts</small></div>
            </div>
            <div className="visual-sparkle sparkle-one">✦</div>
            <div className="visual-sparkle sparkle-two">✧</div>
          </motion.div>
        </div>
        <div className="hero-bottom-line"><span>PLAN WITH PURPOSE</span><i /><span>LEARN WITH CONFIDENCE</span><i /><span>GROW AT YOUR PACE</span></div>
      </section>

      <section className="home-section features-section">
        <div className="section-heading">
          <span className="section-kicker">A BETTER WAY TO MOVE FORWARD</span>
          <h2>Turn career ambition into <span>real progress.</span></h2>
          <p>Everything you need to make learning feel clearer, more focused, and more rewarding.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.article
              className="feature-card"
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.42 }}
            >
              <span className={`feature-icon tone-${feature.tone}`}>{feature.icon}</span>
              <span className="feature-number">0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-line" />
            </motion.article>
          ))}
        </div>
      </section>

      <section className="home-section journey-section">
        <div className="journey-heading">
          <div><span className="section-kicker">YOUR LEARNING JOURNEY</span><h2>Clear steps. <span>Steady growth.</span></h2></div>
          <p>Build a learning rhythm that works for you. No guesswork, just a practical next step.</p>
        </div>
        <div className="journey-steps">
          <article className="journey-step"><span className="journey-step-count">01</span><div className="journey-step-icon"><Compass size={20} /></div><h3>Choose your direction</h3><p>Find a roadmap that matches the career you want to explore.</p></article>
          <article className="journey-step"><span className="journey-step-count">02</span><div className="journey-step-icon"><BookOpenCheck size={20} /></div><h3>Build your foundation</h3><p>Move through topics and practical resources at your own pace.</p></article>
          <article className="journey-step"><span className="journey-step-count">03</span><div className="journey-step-icon"><LineChart size={20} /></div><h3>Track your growth</h3><p>Complete milestones and test your understanding with quizzes.</p></article>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="home-cta-card">
          <div className="cta-decoration cta-decoration-one" /><div className="cta-decoration cta-decoration-two" />
          <div className="cta-content">
            <span className="cta-kicker"><Sparkles size={14} /> MAKE YOUR NEXT MOVE COUNT</span>
            <h2>{user?.name ? `Ready for your next step, ${user.name.split(" ")[0]}?` : "Your future is built one step at a time."}</h2>
            <p>Pick a direction, make a start, and let your progress add up.</p>
            <Link to={primaryHref} className="btn-light">{token ? "Open your dashboard" : "Create your free account"}<ArrowUpRight size={17} /></Link>
          </div>
          <div className="cta-mark"><Target size={76} strokeWidth={1.15} /></div>
        </div>
      </section>
    </div>
  );
};

export default Home;