const R = (title, url, type, description, tags = []) => ({ title, url, type, description, tags });

export const resourceCatalog = [
  R("MDN Web Docs", "https://developer.mozilla.org/", "Official Docs", "Authoritative web platform documentation and practical guides.", ["html", "css", "javascript", "web", "dom", "http", "api"]),
  R("JavaScript.info", "https://javascript.info/", "Guide", "Deep JavaScript lessons from fundamentals to advanced topics.", ["javascript", "js", "async", "promises", "closures"]),
  R("React Documentation", "https://react.dev/learn", "Official Docs", "Modern React learning path and component patterns.", ["react", "frontend", "javascript", "jsx"]),
  R("Node.js Learn", "https://nodejs.org/en/learn", "Official Docs", "Official Node.js learning material for runtime and server-side JavaScript.", ["node", "nodejs", "backend", "javascript"]),
  R("Express Documentation", "https://expressjs.com/", "Official Docs", "Official Express documentation for routing, middleware and APIs.", ["express", "node", "backend", "api", "rest"]),
  R("MongoDB University", "https://learn.mongodb.com/", "Course", "Free MongoDB courses covering CRUD, aggregation and indexing.", ["mongodb", "mongo", "database", "nosql"]),
  R("SQLBolt", "https://sqlbolt.com/", "Practice", "Interactive SQL lessons and exercises.", ["sql", "mysql", "database", "queries"]),
  R("PostgreSQL Tutorial", "https://www.postgresql.org/docs/current/tutorial.html", "Official Docs", "Official PostgreSQL tutorial and relational database fundamentals.", ["sql", "postgresql", "database"]),
  R("LeetCode", "https://leetcode.com/", "Practice", "Coding problems for algorithms and interview preparation.", ["dsa", "algorithms", "data structures", "leetcode", "coding"]),
  R("NeetCode", "https://neetcode.io/roadmap", "Practice", "Curated interview patterns and DSA roadmap.", ["dsa", "algorithms", "interview", "leetcode"]),
  R("GeeksforGeeks", "https://www.geeksforgeeks.org/", "Reference", "Broad CS reference for DSA, OS, DBMS and networking.", ["dsa", "os", "dbms", "cn", "computer networks", "algorithms"]),
  R("CS50x", "https://cs50.harvard.edu/x/", "Course", "Harvard's introductory computer science course.", ["computer science", "c", "algorithms", "programming"]),
  R("roadmap.sh", "https://roadmap.sh/", "Roadmap", "Community-maintained roadmaps for engineering careers.", ["roadmap", "career", "sde", "frontend", "backend", "devops"]),
  R("Full Stack Open", "https://fullstackopen.com/en/", "Course", "Hands-on full-stack course focused on React, Node and testing.", ["full stack", "react", "node", "javascript", "testing"]),
  R("freeCodeCamp", "https://www.freecodecamp.org/learn/", "Course", "Free project-based curriculum for web, data and more.", ["web", "javascript", "python", "data", "frontend", "backend"]),
  R("Frontend Mentor", "https://www.frontendmentor.io/", "Practice", "Realistic frontend projects for portfolio-ready UI skills.", ["frontend", "html", "css", "react", "ui"]),
  R("GitHub Skills", "https://skills.github.com/", "Hands-on", "Interactive exercises for GitHub, pull requests and Actions.", ["git", "github", "devops", "ci/cd"]),
  R("Git Documentation", "https://git-scm.com/docs", "Official Docs", "Official Git reference and command documentation.", ["git", "github", "version control"]),
  R("TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html", "Official Docs", "Official TypeScript handbook.", ["typescript", "javascript", "frontend", "backend"]),
  R("Python Documentation", "https://docs.python.org/3/tutorial/", "Official Docs", "Official Python tutorial and language documentation.", ["python", "programming"]),
  R("NumPy Learn", "https://numpy.org/learn/", "Guide", "Official NumPy learning resources.", ["python", "numpy", "data science"]),
  R("pandas Getting Started", "https://pandas.pydata.org/docs/getting_started/index.html", "Official Docs", "Official pandas guides for tabular data analysis.", ["python", "pandas", "data science", "data analysis"]),
  R("scikit-learn User Guide", "https://scikit-learn.org/stable/user_guide.html", "Official Docs", "Machine learning models, preprocessing and evaluation.", ["python", "machine learning", "ml", "scikit-learn"]),
  R("PyTorch Tutorials", "https://pytorch.org/tutorials/", "Official Docs", "Official deep learning tutorials for PyTorch.", ["pytorch", "deep learning", "ai", "machine learning"]),
  R("TensorFlow Learn", "https://www.tensorflow.org/learn", "Official Docs", "Official TensorFlow tutorials and learning paths.", ["tensorflow", "deep learning", "ai", "machine learning"]),
  R("Hugging Face Course", "https://huggingface.co/learn", "Course", "Practical NLP and transformer learning resources.", ["ai", "nlp", "transformers", "machine learning"]),
  R("AWS Skill Builder", "https://skillbuilder.aws/", "Course", "AWS learning paths, labs and exam preparation.", ["aws", "cloud", "devops", "cloud computing"]),
  R("AWS Architecture Center", "https://aws.amazon.com/architecture/", "Official Docs", "Reference architectures and AWS best practices.", ["aws", "cloud", "architecture", "system design"]),
  R("Docker Get Started", "https://docs.docker.com/get-started/", "Official Docs", "Official Docker learning path for containers.", ["docker", "devops", "containers"]),
  R("Kubernetes Basics", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "Official Docs", "Hands-on Kubernetes basics.", ["kubernetes", "devops", "containers", "cloud"]),
  R("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "Security", "Standard web application security risks and mitigations.", ["security", "cybersecurity", "owasp", "web security"]),
  R("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "Hands-on", "Free interactive web security labs.", ["security", "cybersecurity", "web security"]),
  R("NIST Cybersecurity Framework", "https://www.nist.gov/cyberframework", "Reference", "Widely used cybersecurity framework.", ["cybersecurity", "security", "nist"]),
  R("Computer Networking Lectures", "https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm", "Lectures", "University-style networking lectures and materials.", ["networking", "computer networks", "tcp", "ip", "http"]),
  R("OSTEP", "https://pages.cs.wisc.edu/~remzi/OSTEP/", "Book", "Free operating systems book covering processes, memory and concurrency.", ["os", "operating systems", "process", "memory"]),
  R("MIT OpenCourseWare", "https://ocw.mit.edu/", "Course Library", "Open university courses across computer science and engineering.", ["computer science", "engineering", "algorithms", "systems"]),
  R("Designing Data-Intensive Applications", "https://dataintensive.net/", "Book", "Reference for distributed systems, databases and scalability.", ["system design", "distributed systems", "database", "scalability"]),
  R("Figma Learn", "https://help.figma.com/hc/en-us/categories/360002051613-Learn-design", "Official Guides", "Official Figma learning resources.", ["ui", "ux", "figma", "design"]),
  R("Nielsen Norman Group", "https://www.nngroup.com/articles/", "Reference", "Research-backed usability and UX guidance.", ["ui", "ux", "usability", "design"]),
  R("Product School Resources", "https://productschool.com/resources", "Reference", "Product management articles and frameworks.", ["product", "product management", "roadmap", "strategy"]),
  R("Atlassian Agile Coach", "https://www.atlassian.com/agile", "Guide", "Practical Agile and Scrum guidance.", ["agile", "scrum", "product", "project management"]),
  R("Write the Docs", "https://www.writethedocs.org/guide/", "Guide", "Guide to professional technical documentation.", ["technical writing", "documentation", "writing"]),
  R("Godot Docs", "https://docs.godotengine.org/en/stable/", "Official Docs", "Official Godot engine documentation.", ["game development", "godot", "games"]),
  R("Unity Learn", "https://learn.unity.com/", "Course", "Hands-on Unity learning pathways.", ["unity", "game development", "games"]),
  R("Solidity Docs", "https://docs.soliditylang.org/en/latest/", "Official Docs", "Official Solidity documentation for smart contracts.", ["blockchain", "solidity", "ethereum", "smart contracts"]),
  R("Ethereum Developer Docs", "https://ethereum.org/developers/docs/", "Official Docs", "Official Ethereum developer documentation.", ["blockchain", "ethereum", "web3", "smart contracts"]),
  R("Google Technical Writing", "https://developers.google.com/tech-writing", "Course", "Practical lessons on clear technical writing.", ["technical writing", "documentation", "writing"]),
];

const normalize = (value = "") => value.toLowerCase().replace(/[^a-z0-9+#. ]/g, " ");

export const recommendResources = ({ title = "", description = "", category = "", existing = [] } = {}) => {
  const text = normalize(`${title} ${description} ${category}`);
  const scored = resourceCatalog
    .map((resource) => {
      let score = 0;
      for (const tag of resource.tags) {
        const normalizedTag = normalize(tag);
        if (text.includes(normalizedTag)) score += 4;
        else if (normalizedTag.split(" ").some((token) => token.length > 2 && text.includes(token))) score += 1;
      }
      return { resource, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ resource }) => resource);

  const originals = (existing || []).filter(Boolean).map((url) => ({
    title: url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0],
    url,
    type: "Existing",
    description: "Original resource retained from the roadmap.",
    tags: [],
  }));

  const seen = new Set();
  return [...scored, ...originals].filter((item) => {
    const key = item.url.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 6);
};
