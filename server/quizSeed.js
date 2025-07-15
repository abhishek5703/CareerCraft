import mongoose from "mongoose";
import dotenv from "dotenv";
import QuizQuestion from "./models/QuizQuestion.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to MongoDB");

const roadmapIds = [
  "6874e356c45a3e21b1dea339",        // Product Management
  "6874e356c45a3e21b1dea365", // Technical Writing
  "6874e356c45a3e21b1dea374",    // Developer Relations
  "6874e356c45a3e21b1dea383"    // Data Engineering
];

// 25 MCQs for Product Management
const pmQuestions = [
  // Foundations of Product Thinking
  { roadmapId: roadmapIds[0], section: "Foundations of Product Thinking", question: "Which role is primarily tasked with defining product vision and strategy?", options: ["UX Designer", "Product Manager", "QA Tester", "Business Analyst"], answer: "Product Manager" },
  { roadmapId: roadmapIds[0], section: "Foundations of Product Thinking", question: "Product-market fit means:", options: ["Rapid growth", "Customers strongly demand and use the product", "High advertising spend", "Low churn"], answer: "Customers strongly demand and use the product" },
  { roadmapId: roadmapIds[0], section: "Foundations of Product Thinking", question: "A typical stage not in the product lifecycle is:", options: ["Ideation", "Prototype", "Abandonment", "Maturity"], answer: "Abandonment" },
  { roadmapId: roadmapIds[0], section: "Foundations of Product Thinking", question: "What is a common market research method?", options: ["Random selection", "User interviews", "Ignoring competitors", "Guesswork"], answer: "User interviews" },
  { roadmapId: roadmapIds[0], section: "Foundations of Product Thinking", question: "The RICE model is used for:", options: ["User feedback collection", "Prioritizing features and problems", "Design wireframes", "Bug tracking"], answer: "Prioritizing features and problems" },
  { roadmapId: roadmapIds[0], section: "Foundations of Product Thinking", question: "Which is NOT a common product metric?", options: ["Engagement", "Retention", "NPS", "Battery life"], answer: "Battery life" },
  { roadmapId: roadmapIds[0], section: "Foundations of Product Thinking", question: "A PRD should include:", options: ["Server locations", "Clear requirements and user stories", "Team salaries", "Advertising plans"], answer: "Clear requirements and user stories" },

  // Execution & Communication
  { roadmapId: roadmapIds[0], section: "Execution & Communication", question: "A 'sprint' is part of which methodology?", options: ["Waterfall", "Design Sprint", "Agile/Scrum", "Six Sigma"], answer: "Agile/Scrum" },
  { roadmapId: roadmapIds[0], section: "Execution & Communication", question: "The primary tool for managing a product backlog is:", options: ["Notepad", "Jira", "Paint", "Word"], answer: "Jira" },
  { roadmapId: roadmapIds[0], section: "Execution & Communication", question: "Good PMs bridge collaboration between:", options: ["Accountants and HR", "Designers and Engineers", "Legal and Administration", "Security and Networking"], answer: "Designers and Engineers" },
  { roadmapId: roadmapIds[0], section: "Execution & Communication", question: "What aids clear stakeholder communication?", options: ["Frequent, focused updates", "Annual reports only", "Vague memos", "Unplanned calls"], answer: "Frequent, focused updates" },
  { roadmapId: roadmapIds[0], section: "Execution & Communication", question: "A go-to-market strategy involves:", options: ["Internal HR policies", "Coordinating product launch and marketing", "Writing source code", "Patent filing"], answer: "Coordinating product launch and marketing" },
  { roadmapId: roadmapIds[0], section: "Execution & Communication", question: "Trello is an example of:", options: ["Graphics software", "PM tool for boards/checklists", "Spreadsheet editor", "Presentation tool"], answer: "PM tool for boards/checklists" },

  // Product Strategy
  { roadmapId: roadmapIds[0], section: "Product Strategy", question: "A product's vision articulates:", options: ["UI layouts", "The long-term purpose", "Pricing tiers", "Feature list"], answer: "The long-term purpose" },
  { roadmapId: roadmapIds[0], section: "Product Strategy", question: "North Star Metric helps product teams to:", options: ["Focus on one goal driving sustained growth", "Increase code coverage", "Speed up hiring", "Reduce server downtime"], answer: "Focus on one goal driving sustained growth" },
  { roadmapId: roadmapIds[0], section: "Product Strategy", question: "The business model canvas is used to:", options: ["Sketch UI", "Plan product features", "Map out revenue and business viability", "Optimize SQL queries"], answer: "Map out revenue and business viability" },
  { roadmapId: roadmapIds[0], section: "Product Strategy", question: "An MVP is:", options: ["Most Valuable Player", "Minimum Viable Product", "Maximum Value Proposition", "Main Vendor Payment"], answer: "Minimum Viable Product" },
  { roadmapId: roadmapIds[0], section: "Product Strategy", question: "Which is key to competitive analysis?", options: ["Studying market trends and players", "Budgeting server time", "Writing contracts", "API stability"], answer: "Studying market trends and players" },
  { roadmapId: roadmapIds[0], section: "Product Strategy", question: "OKR stands for:", options: ["Open Knowledge Reporting", "Objectives and Key Results", "Operational KPI Reporting", "Official Kanban Registration"], answer: "Objectives and Key Results" },

  // User-Centered Design
  { roadmapId: roadmapIds[0], section: "User-Centered Design", question: "User personas are created for:", options: ["Building team resumes", "Profiling typical users for better design decisions", "Shipping estimates", "List of features"], answer: "Profiling typical users for better design decisions" },
  { roadmapId: roadmapIds[0], section: "User-Centered Design", question: "Journey maps help PMs by:", options: ["Visualizing user flow and pain points", "Mapping sales territories", "Growing team size", "Fixing bugs"], answer: "Visualizing user flow and pain points" },
  { roadmapId: roadmapIds[0], section: "User-Centered Design", question: "Wireframes are:", options: ["Advanced UI animations", "Rough layout mockups", "Payment models", "Feature docs"], answer: "Rough layout mockups" },
  { roadmapId: roadmapIds[0], section: "User-Centered Design", question: "Usability testing validates:", options: ["Design assumptions and product usability", "Team organization", "Monetization streams", "Bug priorities"], answer: "Design assumptions and product usability" },
  { roadmapId: roadmapIds[0], section: "User-Centered Design", question: "Accessibility in product means:", options: ["All users, including those with disabilities, can use the product", "Higher pricing", "Faster animations", "Data encryption"], answer: "All users, including those with disabilities, can use the product" },

  // Data & Experimentation
  { roadmapId: roadmapIds[0], section: "Data & Experimentation", question: "Mixpanel and Amplitude are used for:", options: ["Product analytics and user tracking", "Cloud storage", "Team chat", "Bug tracking"], answer: "Product analytics and user tracking" },
  { roadmapId: roadmapIds[0], section: "Data & Experimentation", question: "Conversion funnel analysis helps with:", options: ["Visualizing user drop-offs", "Server health", "UI color selection", "API speed"], answer: "Visualizing user drop-offs" },
  { roadmapId: roadmapIds[0], section: "Data & Experimentation", question: "A/B testing is crucial to:", options: ["Validate changes before rollout", "Hiring managers", "Legal compliance", "Burn rate analysis"], answer: "Validate changes before rollout" },
  { roadmapId: roadmapIds[0], section: "Data & Experimentation", question: "A 'cohort' in user analytics refers to:", options: ["Billing plans", "A group of users with shared characteristics", "Feature set", "API group"], answer: "A group of users with shared characteristics" },

  // Career Development for PMs
  { roadmapId: roadmapIds[0], section: "Career Development for PMs", question: "Which is a common entry-level PM certification?", options: ["PMC", "AWS SAA", "PMP", "Agile Coach"], answer: "PMC" }
];

// 25 MCQs for Technical Writing
const techWritingQuestions = [
  // Writing Foundations
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "Technical writing is mainly for:", options: ["Poetry", "Explaining technical topics clearly", "Selling fashion", "All of the above"], answer: "Explaining technical topics clearly" },
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "A style guide ensures:", options: ["Inconsistent wording", "Consistent tone and grammar", "Faster typing", "Better diagrams"], answer: "Consistent tone and grammar" },
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "Technical documents should be structured to:", options: ["Entertain", "Inform and guide the reader", "Sell products", "Recruit employees"], answer: "Inform and guide the reader" },
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "Audience analysis helps by:", options: ["Choosing cat memes", "Tailoring docs to user skill levels", "Hiring more writers", "Inserting more jokes"], answer: "Tailoring docs to user skill levels" },
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "Information architecture in docs means:", options: ["Server hardware", "Logical content organization", "Spreadsheet formulas", "Animated charts"], answer: "Logical content organization" },
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "Which is NOT a common tech writing tool?", options: ["Grammarly", "Hemingway", "Photoshop", "Google Docs"], answer: "Photoshop" },

  // Documentation & Publishing
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "Markdown is used for:", options: ["Formatting technical docs", "Sending SMS", "Code compiling", "Image compression"], answer: "Formatting technical docs" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "Swagger and Postman are mainly for:", options: ["Writing marketing slides", "Documenting APIs", "Running Linux shells", "SEO optimization"], answer: "Documenting APIs" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "Which version control tool allows collaboration on docs?", options: ["Photos", "Xcode", "Git", "Figma"], answer: "Git" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "Docusaurus and MkDocs help to:", options: ["Monitor servers", "Publish documentation as websites", "Automate hiring", "Stream videos"], answer: "Publish documentation as websites" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "Open source contributions in writing means:", options: ["Writing open-source docs/resources", "Building an API", "Uploading on YouTube", "Coding a mobile app"], answer: "Writing open-source docs/resources" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "A writer portfolio is important to:", options: ["Monitor bugs", "Showcase writing skill and experience", "Reduce project cost", "Manage servers"], answer: "Showcase writing skill and experience" },

  // More coverage across topics
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "Technical editing should focus on:", options: ["Perfect grammar and clarity", "Maximum word count", "All passive voice", "Adding jokes"], answer: "Perfect grammar and clarity" },
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "A technical writer should always:", options: ["Skip user input", "Consider reader needs", "Use only long sentences", "Be vague"], answer: "Consider reader needs" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "Contributing docs to open source projects helps writers:", options: ["Gain experience, learn tools, and network", "Learn React", "Draw icons", "Play games"], answer: "Gain experience, learn tools, and network" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "HTML is mainly used for:", options: ["Writing poems", "Structuring web documents", "Making databases", "Hosting Docker"], answer: "Structuring web documents" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "Which platform helps writers find freelance jobs?", options: ["Upwork", "TestFlight", "Snapchat", "Heroku"], answer: "Upwork" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "REST API documentation commonly includes:", options: ["Endpoints, methods, and parameters", "Line breaks", "Font kerning", "User personas"], answer: "Endpoints, methods, and parameters" },
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "A good README typically includes:", options: ["Installation, usage, and contribution guidelines", "No instructions", "Sales scripts", "GIFs only"], answer: "Installation, usage, and contribution guidelines" },
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "Career paths for technical writers include:", options: ["Editing, freelance, content lead", "Doctor", "Pilot", "Actor"], answer: "Editing, freelance, content lead" },
  { roadmapId: roadmapIds[1], section: "Writing Foundations", question: "The purpose of audience personas in docs is:", options: ["Guide tone and technical depth", "Finance tracking", "UI design", "Deployment"], answer: "Guide tone and technical depth" },

  // Fill remainder for 25
  { roadmapId: roadmapIds[1], section: "Documentation & Publishing", question: "Portfolio sites for writers often feature:", options: ["Sample docs, bio, contact info", "SQL scripts", "Audio files", "Python wheels"], answer: "Sample docs, bio, contact info" }
];

// 25 MCQs for Developer Relations (DevRel)
const devRelQuestions = [
  // Foundations of DevRel
  { roadmapId: roadmapIds[2], section: "Foundations of DevRel", question: "DevRel stands for:", options: ["Dev Rent Leasing", "Developer Relations", "Development Reports", "Device Release"], answer: "Developer Relations" },
  { roadmapId: roadmapIds[2], section: "Foundations of DevRel", question: "Developer Advocacy is focused on:", options: ["Recruiting only", "Championing developer needs inside/outside the company", "Marketing alone", "Budgeting"], answer: "Championing developer needs inside/outside the company" },
  { roadmapId: roadmapIds[2], section: "Foundations of DevRel", question: "Community building in tech means:", options: ["Forming and supporting groups of developers around a product", "Purchasing servers", "Hiring PMs", "Writing only blogs"], answer: "Forming and supporting groups of developers around a product" },
  { roadmapId: roadmapIds[2], section: "Foundations of DevRel", question: "Open Source Ecosystem participation means:", options: ["Contributing and collaborating on open projects", "Creating YouTube ads", "Improving RAM speed", "Buying printers"], answer: "Contributing and collaborating on open projects" },
  { roadmapId: roadmapIds[2], section: "Foundations of DevRel", question: "Which is key to developer empathy?", options: ["Understanding needs and clear communication", "Ignoring feedback", "Sending surveys only", "Hiring engineers"], answer: "Understanding needs and clear communication" },

  // Skills & Tools for DevRel
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "A main goal of public speaking for DevRel is:", options: ["Entertainment", "Knowledge sharing and building trust", "Singing", "Ad campaigns"], answer: "Knowledge sharing and building trust" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "Technical content creation commonly includes:", options: ["Videos & tutorials", "Gaming walkthroughs", "UI design", "CDN configs"], answer: "Videos & tutorials" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "Metrics for DevRel often track:", options: ["Community growth and reach", "RAM usage", "Server response times", "Weekend logins"], answer: "Community growth and reach" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "Portfolio for DevRel roles should showcase:", options: ["Talks, blogs, open-source work", "HW schematics", "Bank statements", "Beta keys"], answer: "Talks, blogs, open-source work" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "What is an advocacy vs evangelism key difference?", options: ["Internal vs external focus on developer needs", "Programming language", "Salary only", "Content creation"], answer: "Internal vs external focus on developer needs" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "A sample app or demo is often used to:", options: ["Showcase product integration", "Speed up deployments", "Reduce risk", "Document code"], answer: "Showcase product integration" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "Engagement platforms for communities include:", options: ["Discord, Slack", "Bank websites", "Payroll tools", "Shipping APIs"], answer: "Discord, Slack" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "Open source metrics can include:", options: ["PR count, issue count, stars", "Electricity usage", "Stack Overflow", "Coffee consumption"], answer: "PR count, issue count, stars" },
  // More for 25
  { roadmapId: roadmapIds[2], section: "Foundations of DevRel", question: "Developer feedback loops benefit product by:", options: ["Improving features and fixing bugs efficiently", "Lowering prices", "Reducing code", "Longer meetings"], answer: "Improving features and fixing bugs efficiently" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "Livestream tools for developer content include:", options: ["OBS Studio", "Excel", "Final Cut", "AutoCAD"], answer: "OBS Studio" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "A DevRel conference talk is useful for:", options: ["Knowledge sharing and community networking", "Sponsoring only", "Database optimization", "Origin tracing"], answer: "Knowledge sharing and community networking" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "Technical writing in DevRel often includes:", options: ["Guides, blog posts, documentation", "Grocery lists", "Payroll docs", "Gantt charts"], answer: "Guides, blog posts, documentation" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "SDK documentation is important for:", options: ["Integrating with and maximizing use of the product", "Test reporting", "Team management", "Graphics rendering"], answer: "Integrating with and maximizing use of the product" },
  { roadmapId: roadmapIds[2], section: "Skills & Tools for DevRel", question: "Community impact is tracked by:", options: ["Engagement, number of contributions, event attendance", "Temperature", "Disk space", "Wage growth"], answer: "Engagement, number of contributions, event attendance" },
  { roadmapId: roadmapIds[2], section: "Foundations of DevRel", question: "A key result of open source involvement is:", options: ["Growing developer reputation and practical skills", "Winning medals", "Getting coupons", "Buying stock"], answer: "Growing developer reputation and practical skills" }
];

// 25 MCQs for Data Engineering
const dataEngQuestions = [
  // Core Skills & Foundations
  { roadmapId: roadmapIds[3], section: "Core Skills & Foundations", question: "SELECT is used in SQL for:", options: ["Adding rows", "Selecting data", "Formatting queries", "User login"], answer: "Selecting data" },
  { roadmapId: roadmapIds[3], section: "Core Skills & Foundations", question: "JOIN in SQL combines data from:", options: ["One table", "Multiple tables", "Files", "Emails"], answer: "Multiple tables" },
  { roadmapId: roadmapIds[3], section: "Core Skills & Foundations", question: "Python is popular for data engineering because:", options: ["Quick scripts, data processing, automation", "Mobile app building", "Graphic design", "Game development"], answer: "Quick scripts, data processing, automation" },
  { roadmapId: roadmapIds[3], section: "Core Skills & Foundations", question: "Star schema is a:", options: ["Programming paradigm", "Data warehouse model", "Storage medium", "Regular polygon"], answer: "Data warehouse model" },
  { roadmapId: roadmapIds[3], section: "Core Skills & Foundations", question: "Normalization in databases improves:", options: ["Redundancy", "Storage cost", "Data consistency and efficiency", "Screen resolution"], answer: "Data consistency and efficiency" },
  { roadmapId: roadmapIds[3], section: "Core Skills & Foundations", question: "NoSQL database used for flexible structure is:", options: ["MongoDB", "MySQL", "Oracle", "SQL Server"], answer: "MongoDB" },
  { roadmapId: roadmapIds[3], section: "Core Skills & Foundations", question: "Version control for data pipelines helps in:", options: ["Collaborating and tracking changes", "Data encryption", "Schema visualization", "ML training"], answer: "Collaborating and tracking changes" },
  { roadmapId: roadmapIds[3], section: "Core Skills & Foundations", question: "A hash data structure is best for:", options: ["Indexing by unique keys", "Sorting data", "Generating random numbers", "Image compression"], answer: "Indexing by unique keys" },

  // Data Pipelines & Big Data Tools
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "ETL refers to:", options: ["Extract, Transform, Load", "Execute, Track, Label", "Evaluate, Test, Loop", "Encrypt, Tokenize, Launch"], answer: "Extract, Transform, Load" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "ELT differs from ETL in that:", options: ["Transform step comes after load", "It uses smaller files", "It’s for audio", "Larger SQL databases only"], answer: "Transform step comes after load" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "DAGs in Airflow are:", options: ["Directed Acyclic Graphs (workflow structure)", "Database indexes", "Virtual machines", "Quick charts"], answer: "Directed Acyclic Graphs (workflow structure)" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "Apache Spark is mainly for:", options: ["Distributed data processing", "Web hosting", "HTML parsing", "PDF reading"], answer: "Distributed data processing" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "Redshift and BigQuery are examples of:", options: ["Cloud Data Warehouses", "Text editors", "Charting libraries", "App stores"], answer: "Cloud Data Warehouses" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "Data lakes are used to store:", options: ["Structured, semi-structured, and unstructured data", "Websites only", "Icons", "App binaries"], answer: "Structured, semi-structured, and unstructured data" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "Kafka is popular for:", options: ["Real-time data streaming", "UI animations", "Unit tests", "Presentation slides"], answer: "Real-time data streaming" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "Batch processing is NOT ideal for:", options: ["Real-time analytics", "Large ETL jobs", "Periodic data loads", "Nightly reporting"], answer: "Real-time analytics" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "Cloud Data Warehouse benefits include:", options: ["Easy scaling, managed storage, fast queries", "Manual backups", "Handwritten reports", "Limited capacity"], answer: "Easy scaling, managed storage, fast queries" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "A UDF (User Defined Function) in Spark is:", options: ["Custom transformation logic", "Unit test format", "Upload function", "Undo Fix"], answer: "Custom transformation logic" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "Delta Lake is:", options: ["A storage layer for reliable lake operations", "Geography software", "Mobile app", "Testing library"], answer: "A storage layer for reliable lake operations" },
  { roadmapId: roadmapIds[3], section: "Data Pipelines & Big Data Tools", question: "Data pipeline orchestration includes:", options: ["Scheduling and monitoring tasks", "Only making charts", "Buying servers", "Cryptography"], answer: "Scheduling and monitoring tasks" }
];

// ---------- Insert/Update loop for all roadmaps ----------
const allRoadmapsQuizData = [
  pmQuestions,
  techWritingQuestions,
  devRelQuestions,
  dataEngQuestions
];

let totalInserted = 0;
let totalUpdated = 0;

for (let i = 0; i < allRoadmapsQuizData.length; i++) {
  const roadmapQuestions = allRoadmapsQuizData[i];
  let inserted = 0;
  let updated = 0;

  for (const q of roadmapQuestions) {
    const existing = await QuizQuestion.findOne({ roadmapId: q.roadmapId, question: q.question });
    if (existing) {
      existing.options = q.options;
      existing.answer = q.answer;
      existing.section = q.section;
      await existing.save();
      updated++;
    } else {
      await QuizQuestion.create(q);
      inserted++;
    }
  }
  console.log(`📝 Roadmap ${i + 1} (${roadmapIds[i]}): Inserted ${inserted}, Updated ${updated} questions.`);
  totalInserted += inserted;
  totalUpdated += updated;
}

console.log(`🎯 Batch operation complete. Inserted: ${totalInserted}, Updated: ${totalUpdated}`);
await mongoose.disconnect();
console.log("🔌 Disconnected from MongoDB.");

process.exit();
