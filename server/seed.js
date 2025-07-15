import mongoose from "mongoose";
import dotenv from "dotenv";
import Roadmap from "./models/Roadmap.js";

dotenv.config();

const sampleRoadmaps = [
  {
    title: "Web Development",
    category: "Development",
    sections: [
      {
        title: "Frontend",
        steps: [
          {
            title: "Learn HTML & CSS",
            description: "Understand basic webpage structure and styling.",
            resources: [
              "https://developer.mozilla.org/en-US/docs/Web/HTML",
              "https://www.freecodecamp.org/learn/responsive-web-design/"
            ]
          },
          {
            title: "JavaScript Basics",
            description: "Understand syntax, variables, functions, and DOM.",
            resources: [
              "https://javascript.info/",
              "https://www.codecademy.com/learn/introduction-to-javascript"
            ]
          },
          {
            title: "Responsive Design & Flexbox/Grid",
            description: "Build layouts that work on all screen sizes.",
            resources: [
              "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
              "https://css-tricks.com/snippets/css/complete-guide-grid/"
            ]
          },
          {
            title: "Frontend Framework - React",
            description: "Learn components, props, hooks, and routing.",
            resources: [
              "https://reactjs.org/docs/getting-started.html",
              "https://www.freecodecamp.org/learn/front-end-development-libraries/react/"
            ]
          },
          {
            title: "State Management",
            description: "Understand local state, context API, and Redux basics.",
            resources: [
              "https://react.dev/learn/passing-data-deeply-with-context",
              "https://redux.js.org/introduction/getting-started"
            ]
          }
        ]
      },
      {
        title: "Backend",
        steps: [
          {
            title: "Node.js & Express.js",
            description: "Create backend servers and APIs.",
            resources: [
              "https://nodejs.dev/en/learn/",
              "https://expressjs.com/en/starter/installing.html"
            ]
          },
          {
            title: "MongoDB & Mongoose",
            description: "NoSQL database setup and querying.",
            resources: [
              "https://www.mongodb.com/docs/manual/tutorial/getting-started/",
              "https://mongoosejs.com/docs/"
            ]
          },
          {
            title: "RESTful API Design",
            description: "Design routes and controllers for CRUD operations.",
            resources: [
              "https://restfulapi.net/",
              "https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/"
            ]
          },
          {
            title: "Authentication (JWT)",
            description: "Login, Signup, and protected routes.",
            resources: [
              "https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs",
              "https://blog.logrocket.com/jwt-authentication-best-practices/"
            ]
          }
        ]
      },
      {
        title: "APIs",
        steps: [
          {
            title: "Working with REST APIs",
            description: "Fetch and manipulate external APIs using Axios/Fetch.",
            resources: [
              "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
              "https://axios-http.com/docs/intro"
            ]
          },
          {
            title: "GraphQL Basics",
            description: "Understand GraphQL queries, mutations, and schemas.",
            resources: [
              "https://graphql.org/learn/",
              "https://www.apollographql.com/docs/"
            ]
          }
        ]
      },
      {
        title: "Version Control",
        steps: [
          {
            title: "Git & GitHub",
            description: "Track code changes, use branches, and collaborate.",
            resources: [
              "https://git-scm.com/doc",
              "https://www.freecodecamp.org/learn/git/"
            ]
          },
          {
            title: "Git Best Practices",
            description: "Meaningful commits, feature branching, PRs.",
            resources: [
              "https://www.atlassian.com/git/tutorials/comparing-workflows",
              "https://www.conventionalcommits.org/en/v1.0.0/"
            ]
          }
        ]
      },
      {
        title: "DevOps & Deployment",
        steps: [
          {
            title: "Hosting with Vercel / Netlify",
            description: "Deploy static and frontend apps.",
            resources: [
              "https://vercel.com/docs",
              "https://docs.netlify.com/"
            ]
          },
          {
            title: "Deploy Backend to Render / Railway",
            description: "Deploy full stack apps online.",
            resources: [
              "https://render.com/docs/deploy-node-express-app",
              "https://docs.railway.app/"
            ]
          },
          {
            title: "CI/CD Basics",
            description: "Understand automated testing and deployment pipelines.",
            resources: [
              "https://circleci.com/docs/",
              "https://docs.github.com/en/actions"
            ]
          }
        ]
      },
      {
        title: "Testing",
        steps: [
          {
            title: "Unit Testing with Jest",
            description: "Test individual components and logic.",
            resources: [
              "https://jestjs.io/docs/getting-started",
              "https://www.freecodecamp.org/news/how-to-start-unit-testing-javascript/"
            ]
          },
          {
            title: "Integration Testing",
            description: "Test interactions between components or APIs.",
            resources: [
              "https://testing-library.com/docs/react-testing-library/intro/",
              "https://www.cypress.io/"
            ]
          }
        ]
      },
      {
        title: "Best Practices",
        steps: [
          {
            title: "Folder Structure & Clean Code",
            description: "Write modular, maintainable code.",
            resources: [
              "https://medium.com/@trekhleb/javascript-clean-code-best-practices-2022-5b3ee5c23127",
              "https://dev.to/ziishaned/clean-code-javascript-ultimate-guide-2020-4c36"
            ]
          },
          {
            title: "Web Security Basics",
            description: "Protect against XSS, CSRF, and other common attacks.",
            resources: [
              "https://owasp.org/www-project-top-ten/",
              "https://developer.mozilla.org/en-US/docs/Web/Security"
            ]
          },
          {
            title: "Performance Optimization",
            description: "Optimize page load speed, reduce bundle size, lazy loading.",
            resources: [
              "https://web.dev/fast/",
              "https://www.smashingmagazine.com/2021/09/front-end-performance-2021-free-pdf-checklist/"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Data Science",
    category: "Data",
    sections: [
      {
        title: "Programming & Tools",
        steps: [
          {
            title: "Learn Python",
            description: "Master syntax, data types, control flow, and functions.",
            resources: [
              "https://www.learnpython.org/",
              "https://docs.python.org/3/tutorial/"
            ]
          },
          {
            title: "Working with Jupyter Notebooks",
            description: "Use Jupyter for interactive data analysis and visualization.",
            resources: [
              "https://jupyter.org/",
              "https://realpython.com/jupyter-notebook-introduction/"
            ]
          },
          {
            title: "Data Handling with Pandas",
            description: "DataFrames, filtering, merging, and groupby operations.",
            resources: [
              "https://pandas.pydata.org/docs/",
              "https://www.kaggle.com/learn/pandas"
            ]
          },
          {
            title: "Numerical Computing with NumPy",
            description: "Work with arrays, broadcasting, and vectorized operations.",
            resources: [
              "https://numpy.org/doc/",
              "https://www.freecodecamp.org/news/numpy-tutorial/"
            ]
          },
          {
            title: "Data Visualization (Matplotlib & Seaborn)",
            description: "Create charts, plots, and heatmaps.",
            resources: [
              "https://seaborn.pydata.org/tutorial.html",
              "https://matplotlib.org/stable/tutorials/index.html"
            ]
          },
          {
            title: "Exploratory Data Analysis (EDA)",
            description: "Clean, explore, and summarize data insights.",
            resources: [
              "https://www.datacamp.com/courses/exploratory-data-analysis-in-python",
              "https://www.kaggle.com/learn/data-cleaning"
            ]
          }
        ]
      },
      {
        title: "Statistics & Mathematics",
        steps: [
          {
            title: "Descriptive Statistics",
            description: "Understand mean, median, mode, variance, and standard deviation.",
            resources: [
              "https://www.khanacademy.org/math/statistics-probability",
              "https://www.datacamp.com/courses/statistics-fundamentals"
            ]
          },
          {
            title: "Probability Theory",
            description: "Learn probability rules, Bayes’ theorem, and distributions.",
            resources: [
              "https://seeing-theory.brown.edu/",
              "https://www.khanacademy.org/math/statistics-probability/probability-library"
            ]
          },
          {
            title: "Inferential Statistics",
            description: "Confidence intervals, hypothesis testing, p-values.",
            resources: [
              "https://towardsdatascience.com/inferential-statistics-explained-245d8f7e8b01",
              "https://www.statisticshowto.com/probability-and-statistics/"
            ]
          },
          {
            title: "Linear Algebra Essentials",
            description: "Matrices, vectors, dot products, and eigenvalues.",
            resources: [
              "https://www.3blue1brown.com/lessons/linear-algebra",
              "https://www.khanacademy.org/math/linear-algebra"
            ]
          },
          {
            title: "Calculus Basics",
            description: "Understand derivatives, gradients, and optimization.",
            resources: [
              "https://www.khanacademy.org/math/calculus-1",
              "https://betterexplained.com/calculus/"
            ]
          },
          {
            title: "Applied Statistics in Python",
            description: "Use SciPy and statsmodels for statistical analysis.",
            resources: [
              "https://docs.scipy.org/doc/scipy/reference/stats.html",
              "https://www.statsmodels.org/stable/index.html"
            ]
          }
        ]
      },
      {
        title: "Machine Learning",
        steps: [
          {
            title: "Supervised Learning",
            description: "Linear regression, classification, decision trees.",
            resources: [
              "https://scikit-learn.org/stable/supervised_learning.html",
              "https://www.coursera.org/learn/machine-learning"
            ]
          },
          {
            title: "Unsupervised Learning",
            description: "Clustering, PCA, anomaly detection.",
            resources: [
              "https://scikit-learn.org/stable/modules/clustering.html",
              "https://towardsdatascience.com/an-intro-to-pca-70a9f60b5a33"
            ]
          },
          {
            title: "Model Evaluation",
            description: "Accuracy, precision, recall, F1-score, ROC-AUC.",
            resources: [
              "https://scikit-learn.org/stable/modules/model_evaluation.html",
              "https://towardsdatascience.com/classification-metrics-43e5f1f857f6"
            ]
          },
          {
            title: "Feature Engineering",
            description: "Create, scale, and transform features for better models.",
            resources: [
              "https://towardsdatascience.com/feature-engineering-for-machine-learning-3a5e293a5114",
              "https://scikit-learn.org/stable/modules/preprocessing.html"
            ]
          },
          {
            title: "Model Selection & Tuning",
            description: "Hyperparameter tuning, GridSearchCV, and pipelines.",
            resources: [
              "https://scikit-learn.org/stable/modules/grid_search.html",
              "https://www.analyticsvidhya.com/blog/2021/06/hyperparameter-tuning/"
            ]
          },
          {
            title: "Model Deployment with Flask",
            description: "Deploy ML models using Flask REST APIs.",
            resources: [
              "https://realpython.com/python-machine-learning-flask/",
              "https://www.analyticsvidhya.com/blog/2021/05/how-to-deploy-machine-learning-model-using-flask/"
            ]
          }
        ]
      },
      {
        title: "Deep Learning",
        steps: [
          {
            title: "Introduction to Neural Networks",
            description: "Understand perceptrons, layers, and activation functions.",
            resources: [
              "https://www.youtube.com/watch?v=aircAruvnKk",
              "https://www.tensorflow.org/learn"
            ]
          },
          {
            title: "Training Deep Networks",
            description: "Backpropagation, optimization, loss functions.",
            resources: [
              "https://cs231n.github.io/optimization-1/",
              "https://keras.io/guides/training_with_built_in_methods/"
            ]
          },
          {
            title: "Convolutional Neural Networks (CNNs)",
            description: "Image processing with Conv layers and pooling.",
            resources: [
              "https://www.analyticsvidhya.com/blog/2021/05/convolutional-neural-network-cnn/",
              "https://cs231n.github.io/convolutional-networks/"
            ]
          },
          {
            title: "Recurrent Neural Networks (RNNs)",
            description: "Understand sequence models and LSTM/GRUs.",
            resources: [
              "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
              "https://www.tensorflow.org/text/tutorials/text_classification_rnn"
            ]
          },
          {
            title: "Using TensorFlow and Keras",
            description: "Build and train models using popular deep learning libraries.",
            resources: [
              "https://keras.io/getting_started/",
              "https://www.tensorflow.org/tutorials"
            ]
          },
          {
            title: "Transfer Learning",
            description: "Use pre-trained models for image/text tasks.",
            resources: [
              "https://www.tensorflow.org/tutorials/images/transfer_learning",
              "https://towardsdatascience.com/transfer-learning"
            ]
          }
        ]
      },
      {
        title: "Data Engineering & Deployment",
        steps: [
          {
            title: "Databases & SQL",
            description: "Store, retrieve, and manage structured data.",
            resources: [
              "https://www.kaggle.com/learn/intro-to-sql",
              "https://www.w3schools.com/sql/"
            ]
          },
          {
            title: "Big Data Basics",
            description: "Understand Hadoop, Spark, and distributed systems.",
            resources: [
              "https://spark.apache.org/",
              "https://hadoop.apache.org/"
            ]
          },
          {
            title: "ETL & Data Pipelines",
            description: "Extract, transform, and load data using tools like Airflow.",
            resources: [
              "https://airflow.apache.org/docs/",
              "https://towardsdatascience.com/etl-pipelines-with-airflow"
            ]
          },
          {
            title: "Cloud Platforms (AWS/GCP)",
            description: "Use cloud storage, compute, and ML services.",
            resources: [
              "https://cloud.google.com/products/ai",
              "https://aws.amazon.com/machine-learning/"
            ]
          },
          {
            title: "Model Deployment (Docker/FastAPI)",
            description: "Deploy production-ready models via containers or APIs.",
            resources: [
              "https://fastapi.tiangolo.com/",
              "https://www.docker.com/resources/what-container/"
            ]
          },
          {
            title: "MLOps Fundamentals",
            description: "Automate model monitoring, retraining, and CI/CD.",
            resources: [
              "https://ml-ops.org/",
              "https://azure.microsoft.com/en-in/solutions/machine-learning-operations/"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Mobile App Development",
    category: "Development",
    sections: [
      {
        title: "Foundations & UI",
        steps: [
          {
            title: "React Native Setup",
            description: "Install Expo CLI or React Native CLI.",
            resources: [
              "https://reactnative.dev/docs/environment-setup",
              "https://docs.expo.dev/get-started/installation/"
            ]
          },
          {
            title: "JSX & Core Components",
            description: "Use components like View, Text, Image, TextInput, etc.",
            resources: [
              "https://reactnative.dev/docs/components-and-apis",
              "https://reactnative.dev/docs/text"
            ]
          },
          {
            title: "Flexbox Layout",
            description: "Build mobile-first layouts using Flexbox.",
            resources: [
              "https://reactnative.dev/docs/flexbox",
              "https://blog.logrocket.com/understanding-flexbox-layout-react-native/"
            ]
          },
          {
            title: "Styling & Themes",
            description: "Style components with StyleSheet, themes, and libraries.",
            resources: [
              "https://reactnative.dev/docs/style",
              "https://github.com/vitalets/react-native-extended-stylesheet"
            ]
          },
          {
            title: "Custom Components",
            description: "Create and reuse functional components.",
            resources: [
              "https://www.digitalocean.com/community/tutorials/react-react-native-components",
              "https://www.reactnative.express/"
            ]
          },
          {
            title: "Icon Libraries",
            description: "Use vector icons and community packages.",
            resources: [
              "https://github.com/oblador/react-native-vector-icons",
              "https://icons.expo.fyi/"
            ]
          }
        ]
      },
      {
        title: "Navigation & State Management",
        steps: [
          {
            title: "React Navigation Basics",
            description: "Implement Stack, Tab, and Drawer navigators.",
            resources: [
              "https://reactnavigation.org/docs/getting-started",
              "https://reactnavigation.org/docs/stack-navigator/"
            ]
          },
          {
            title: "Navigation Parameters & Deep Linking",
            description: "Pass data between screens and handle links.",
            resources: [
              "https://reactnavigation.org/docs/params/",
              "https://reactnavigation.org/docs/deep-linking/"
            ]
          },
          {
            title: "Context API for State",
            description: "Manage local app state with React Context.",
            resources: [
              "https://reactjs.org/docs/context.html",
              "https://blog.logrocket.com/global-state-react-without-redux/"
            ]
          },
          {
            title: "Redux Basics",
            description: "Global state management with Redux.",
            resources: [
              "https://redux.js.org/introduction/getting-started",
              "https://react-redux.js.org/introduction/quick-start"
            ]
          },
          {
            title: "Async Storage Integration",
            description: "Persist state using AsyncStorage.",
            resources: [
              "https://react-native-async-storage.github.io/async-storage/",
              "https://blog.logrocket.com/using-asyncstorage-react-native/"
            ]
          },
          {
            title: "Authentication Flow",
            description: "Handle login/signup, tokens, and protected screens.",
            resources: [
              "https://reactnavigation.org/docs/auth-flow/",
              "https://www.freecodecamp.org/news/react-native-authentication/"
            ]
          }
        ]
      },
      {
        title: "APIs, Data & Integration",
        steps: [
          {
            title: "Fetch API & Axios",
            description: "Call backend APIs using Fetch or Axios.",
            resources: [
              "https://reactnative.dev/docs/network",
              "https://axios-http.com/docs/intro"
            ]
          },
          {
            title: "Form Handling & Validation",
            description: "Use libraries like Formik and Yup.",
            resources: [
              "https://formik.org/docs/overview",
              "https://github.com/jquense/yup"
            ]
          },
          {
            title: "Image Upload & File Handling",
            description: "Upload files from device to backend.",
            resources: [
              "https://github.com/react-native-image-picker/react-native-image-picker",
              "https://docs.expo.dev/versions/latest/sdk/imagepicker/"
            ]
          },
          {
            title: "Offline Functionality",
            description: "Implement caching, local DB with Realm/SQLite.",
            resources: [
              "https://www.mongodb.com/docs/realm/sdk/react-native/",
              "https://docs.expo.dev/versions/latest/sdk/sqlite/"
            ]
          },
          {
            title: "Push Notifications",
            description: "Send and receive notifications using Firebase or Expo.",
            resources: [
              "https://docs.expo.dev/push-notifications/overview/",
              "https://rnfirebase.io/messaging/usage"
            ]
          },
          {
            title: "Geolocation & Maps",
            description: "Use maps, GPS and location-based features.",
            resources: [
              "https://docs.expo.dev/versions/latest/sdk/location/",
              "https://reactnative.dev/docs/permissionsandroid"
            ]
          }
        ]
      },
      {
        title: "Testing & Debugging",
        steps: [
          {
            title: "Using React Native Debugger",
            description: "Inspect network requests, Redux state, and console logs.",
            resources: [
              "https://github.com/jhen0409/react-native-debugger",
              "https://reactnative.dev/docs/debugging"
            ]
          },
          {
            title: "Unit Testing with Jest",
            description: "Test components and logic with Jest.",
            resources: [
              "https://jestjs.io/docs/tutorial-react-native",
              "https://reactnative.dev/docs/testing-overview"
            ]
          },
          {
            title: "Component Testing with Testing Library",
            description: "Test interactions using react-native-testing-library.",
            resources: [
              "https://callstack.github.io/react-native-testing-library/",
              "https://testing-library.com/docs/react-native-testing-library/intro/"
            ]
          },
          {
            title: "Crash & Bug Monitoring",
            description: "Use Sentry or Firebase Crashlytics.",
            resources: [
              "https://docs.sentry.io/platforms/react-native/",
              "https://rnfirebase.io/crashlytics/usage"
            ]
          },
          {
            title: "Performance Monitoring",
            description: "Detect bottlenecks and optimize rendering.",
            resources: [
              "https://reactnative.dev/docs/performance",
              "https://blog.logrocket.com/improve-react-native-performance/"
            ]
          },
          {
            title: "Accessibility Testing",
            description: "Make apps accessible to all users.",
            resources: [
              "https://reactnative.dev/docs/accessibility",
              "https://blog.expo.dev/how-to-make-your-react-native-app-accessible-957d803f41e1"
            ]
          }
        ]
      },
      {
        title: "Deployment & DevOps",
        steps: [
          {
            title: "Build with Expo or EAS",
            description: "Use EAS Build or classic workflow.",
            resources: [
              "https://docs.expo.dev/build/introduction/",
              "https://docs.expo.dev/development/building-standalone-apps/"
            ]
          },
          {
            title: "App Signing & Versioning",
            description: "Handle Android Keystore, iOS provisioning, and app versions.",
            resources: [
              "https://docs.expo.dev/distribution/app-signing/",
              "https://developer.apple.com/documentation/xcode/configuring-app-versions"
            ]
          },
          {
            title: "Play Store & App Store Deployment",
            description: "Publish apps to Android and iOS stores.",
            resources: [
              "https://docs.expo.dev/distribution/play-store/",
              "https://docs.expo.dev/distribution/app-store/"
            ]
          },
          {
            title: "CI/CD for Mobile Apps",
            description: "Automate builds and deployments with GitHub Actions/Fastlane.",
            resources: [
              "https://docs.github.com/en/actions",
              "https://docs.fastlane.tools/"
            ]
          },
          {
            title: "Over-the-Air (OTA) Updates",
            description: "Push instant updates using Expo Updates.",
            resources: [
              "https://docs.expo.dev/versions/latest/sdk/updates/",
              "https://blog.expo.dev/announcing-expo-updates"
            ]
          },
          {
            title: "Monitoring & User Feedback",
            description: "Track usage and collect feedback post-launch.",
            resources: [
              "https://expo.dev/analytics",
              "https://www.instabug.com/react-native"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "UI/UX Design",
    category: "Design",
    sections: [
      {
        title: "Design Foundations",
        steps: [
          {
            title: "Principles of Design",
            description: "Understand visual hierarchy, alignment, proximity, and contrast.",
            resources: [
              "https://lawsofux.com/",
              "https://www.interaction-design.org/literature/topics/design-principles"
            ]
          },
          {
            title: "Color Theory",
            description: "Learn color psychology and how to choose palettes.",
            resources: [
              "https://www.canva.com/colors/color-wheel/",
              "https://www.smashingmagazine.com/2010/02/color-theory-for-designer/"
            ]
          },
          {
            title: "Typography",
            description: "Understand font pairing, readability, and hierarchy.",
            resources: [
              "https://www.typewolf.com/",
              "https://material.io/design/typography/"
            ]
          },
          {
            title: "Grid Systems & Spacing",
            description: "Use grids to layout elements with consistency.",
            resources: [
              "https://uxdesign.cc/grid-systems-explained-5f9f5a3f0de7",
              "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout"
            ]
          },
          {
            title: "Figma Basics",
            description: "Design wireframes and mockups in Figma.",
            resources: [
              "https://www.figma.com/resources/learn-design/",
              "https://www.youtube.com/watch?v=FTFaQWZBqQ8"
            ]
          },
          {
            title: "Mobile vs Desktop Design",
            description: "Understand differences in spacing, interactivity, and layout.",
            resources: [
              "https://uxplanet.org/responsive-design-best-practices-3d3c4e09f7a0",
              "https://www.smashingmagazine.com/2018/02/mobile-desktop-user-experience/"
            ]
          }
        ]
      },
      {
        title: "UX Research & Process",
        steps: [
          {
            title: "User Research",
            description: "Conduct interviews, surveys, and competitor analysis.",
            resources: [
              "https://www.nngroup.com/articles/user-research-methods/",
              "https://www.coursera.org/learn/user-research"
            ]
          },
          {
            title: "Personas & Journey Mapping",
            description: "Create personas and understand user behavior.",
            resources: [
              "https://www.interaction-design.org/literature/article/personas-why-and-how-you-should-use-them",
              "https://uxpressia.com/"
            ]
          },
          {
            title: "Information Architecture",
            description: "Organize content in a clear and logical way.",
            resources: [
              "https://www.nngroup.com/articles/information-architecture-ia/",
              "https://uxdesign.cc/information-architecture-basics-for-designers-b5d43df62e20"
            ]
          },
          {
            title: "Wireframing",
            description: "Create low-fidelity structures for layouts.",
            resources: [
              "https://careerfoundry.com/en/blog/ux-design/what-is-wireframing/",
              "https://www.figma.com/templates/wireframe-kits/"
            ]
          },
          {
            title: "Prototyping",
            description: "Build interactive mockups and test flows.",
            resources: [
              "https://www.figma.com/prototyping/",
              "https://uxdesign.cc/a-complete-guide-to-prototyping-54fe3ac486b8"
            ]
          },
          {
            title: "User Testing & Feedback",
            description: "Conduct usability testing to validate designs.",
            resources: [
              "https://www.smashingmagazine.com/2018/01/guide-usability-testing/",
              "https://www.optimalworkshop.com/"
            ]
          }
        ]
      },
      {
        title: "UI Design Tools",
        steps: [
          {
            title: "Advanced Figma Techniques",
            description: "Use auto-layout, components, variants, and design systems.",
            resources: [
              "https://www.figma.com/blog/autolayout/",
              "https://www.figma.com/blog/components-variants/"
            ]
          },
          {
            title: "Adobe XD Basics",
            description: "Learn layout and prototyping in Adobe XD.",
            resources: [
              "https://helpx.adobe.com/xd/tutorials.html",
              "https://www.youtube.com/watch?v=68w2VwalD5w"
            ]
          },
          {
            title: "Design Systems & Tokens",
            description: "Create reusable styles and components for consistency.",
            resources: [
              "https://uxdesign.cc/guide-to-design-systems-2e2d07c71b74",
              "https://www.designsystems.com/"
            ]
          },
          {
            title: "Design Handoff with Zeplin / Figma",
            description: "Prepare designs for developer handoff.",
            resources: [
              "https://zeplin.io/",
              "https://www.figma.com/developers/"
            ]
          },
          {
            title: "Plugin Workflow",
            description: "Speed up design with Figma/XD plugins.",
            resources: [
              "https://www.figma.com/community/plugins",
              "https://xd.adobe.com/ideas/process/ui-design/best-adobe-xd-plugins/"
            ]
          },
          {
            title: "Version Control in Design",
            description: "Manage design file versions and team collaboration.",
            resources: [
              "https://uxdesign.cc/version-control-for-designers-f57e05cbe2a5",
              "https://www.invisionapp.com/inside-design/version-control/"
            ]
          }
        ]
      },
      {
        title: "UX Writing & Accessibility",
        steps: [
          {
            title: "UX Writing Principles",
            description: "Write helpful microcopy and button text.",
            resources: [
              "https://www.nngroup.com/articles/ux-writing/",
              "https://uxplanet.org/ux-writing-quick-start-guide-413cebf7d0e1"
            ]
          },
          {
            title: "Writing Error Messages",
            description: "Craft clear and actionable feedback for users.",
            resources: [
              "https://www.nngroup.com/articles/error-message-guidelines/",
              "https://uxdesign.cc/writing-error-messages-707cdfe5fa69"
            ]
          },
          {
            title: "Content Hierarchy",
            description: "Organize labels, headers, and copy for clarity.",
            resources: [
              "https://www.contentdesign.london/",
              "https://uxdesign.cc/creating-a-content-hierarchy-3123cba9aeff"
            ]
          },
          {
            title: "WCAG & Accessibility Basics",
            description: "Design inclusive interfaces for all users.",
            resources: [
              "https://www.w3.org/WAI/standards-guidelines/wcag/",
              "https://uxdesign.cc/accessibility-ux-design-a3783b486b8f"
            ]
          },
          {
            title: "Color Accessibility",
            description: "Ensure contrast and visibility for all users.",
            resources: [
              "https://webaim.org/resources/contrastchecker/",
              "https://coolors.co/contrast-checker/112a46-acc8e5"
            ]
          },
          {
            title: "Screen Reader Testing",
            description: "Test designs using screen reader technology.",
            resources: [
              "https://dequeuniversity.com/screenreaders/",
              "https://www.smashingmagazine.com/2021/07/complete-guide-accessibility-testing/"
            ]
          }
        ]
      },
      {
        title: "Portfolio & Case Studies",
        steps: [
          {
            title: "Build a Design Portfolio",
            description: "Showcase your work and design process.",
            resources: [
              "https://www.interaction-design.org/literature/article/how-to-create-a-killer-ux-portfolio",
              "https://uxdesign.cc/ux-portfolio-guide"
            ]
          },
          {
            title: "Writing Case Studies",
            description: "Document your challenges, process, and outcomes.",
            resources: [
              "https://bootcamp.uxdesign.cc/how-to-write-a-case-study-that-gets-you-hired-bb72a361f74c",
              "https://careerfoundry.com/en/blog/ux-design/how-to-write-a-case-study-ux/"
            ]
          },
          {
            title: "Personal Branding for Designers",
            description: "Build your online presence and design identity.",
            resources: [
              "https://www.uxfol.io/blog/personal-branding-for-ux-designers/",
              "https://dribbble.com/resources/personal-branding-designers"
            ]
          },
          {
            title: "Presenting Your Work",
            description: "Create impactful visual storytelling.",
            resources: [
              "https://www.smashingmagazine.com/2018/01/presenting-design-work-stakeholders/",
              "https://uxplanet.org/how-to-present-design-work-7b8873a58d6d"
            ]
          },
          {
            title: "Hosting Your Portfolio",
            description: "Publish using platforms like Behance, Notion, or custom sites.",
            resources: [
              "https://www.behance.net/",
              "https://www.notion.so/"
            ]
          },
          {
            title: "Get Feedback from Mentors",
            description: "Join communities for design reviews and mentorship.",
            resources: [
              "https://www.reddit.com/r/UXDesign/",
              "https://designership.org/"
            ]
          }
        ]
      },
      {
        title: "Collaboration & Handoff",
        steps: [
          {
            title: "Working with Developers",
            description: "Communicate design intent clearly for implementation.",
            resources: [
              "https://uxdesign.cc/design-handoff-guide-ec1e2d85d2f0",
              "https://www.smashingmagazine.com/2020/09/design-handoff-developers/"
            ]
          },
          {
            title: "Agile & Design Sprints",
            description: "Learn design's role in product development workflows.",
            resources: [
              "https://www.gv.com/sprint/",
              "https://www.atlassian.com/agile/scrum/design-sprints"
            ]
          },
          {
            title: "Design Review Process",
            description: "Get feedback, iterate, and present in meetings.",
            resources: [
              "https://uxdesign.cc/design-reviews-b2b098965b45",
              "https://www.invisionapp.com/inside-design/structure-design-review/"
            ]
          },
          {
            title: "Developer Handoff in Figma",
            description: "Use Figma inspect and design specs efficiently.",
            resources: [
              "https://www.figma.com/developers/",
              "https://help.figma.com/hc/en-us/articles/360041051154-Prepare-designs-for-developer-handoff"
            ]
          },
          {
            title: "Using Jira or Trello for Design Tasks",
            description: "Track progress, tasks, and bugs.",
            resources: [
              "https://www.atlassian.com/software/jira",
              "https://trello.com/en/guide"
            ]
          },
          {
            title: "Cross-functional Collaboration",
            description: "Work with product, dev, and marketing teams.",
            resources: [
              "https://www.figma.com/blog/cross-functional-teams/",
              "https://www.invisionapp.com/inside-design/cross-functional-design-team/"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Cybersecurity",
    category: "Security",
    sections: [
      {
        title: "Foundations",
        steps: [
          {
            title: "Cybersecurity Basics",
            description: "Understand CIA triad, threat types, and security models.",
            resources: [
              "https://www.khanacademy.org/computing/computer-science/informationsecurity",
              "https://www.coursera.org/learn/intro-cyber-security"
            ]
          },
          {
            title: "Networking Essentials",
            description: "Learn about TCP/IP, ports, DNS, VPNs, and NAT.",
            resources: [
              "https://www.geeksforgeeks.org/computer-network-tutorials/",
              "https://roadmap.sh/networking"
            ]
          },
          {
            title: "Operating Systems (Linux)",
            description: "Learn terminal commands, permissions, file systems.",
            resources: [
              "https://linuxjourney.com/",
              "https://overapi.com/linux"
            ]
          },
          {
            title: "Encryption & Hashing",
            description: "Symmetric, asymmetric encryption, hashing algorithms.",
            resources: [
              "https://www.geeksforgeeks.org/cryptography-introduction/",
              "https://www.cloudflare.com/learning/ssl/how-does-ssl-work/"
            ]
          },
          {
            title: "Common Attacks",
            description: "Understand SQLi, XSS, MITM, CSRF, phishing, etc.",
            resources: [
              "https://owasp.org/www-project-top-ten/",
              "https://portswigger.net/web-security"
            ]
          },
          {
            title: "Security Tools Overview",
            description: "Explore tools like Nmap, Wireshark, Nikto, Metasploit.",
            resources: [
              "https://nmap.org/book/inst-windows.html",
              "https://www.kali.org/tools/"
            ]
          }
        ]
      },
      {
        title: "Ethical Hacking & Practice",
        steps: [
          {
            title: "Kali Linux Setup",
            description: "Install and explore Kali tools for pen-testing.",
            resources: [
              "https://docs.kali.org/introduction/what-is-kali-linux",
              "https://www.youtube.com/watch?v=m4nhz8-VQes"
            ]
          },
          {
            title: "Penetration Testing Basics",
            description: "Learn reconnaissance, scanning, exploitation.",
            resources: [
              "https://www.geeksforgeeks.org/penetration-testing/",
              "https://www.hackingarticles.in/"
            ]
          },
          {
            title: "Burp Suite Usage",
            description: "Perform web app security testing.",
            resources: [
              "https://portswigger.net/burp/documentation",
              "https://www.youtube.com/watch?v=HrDjRy3zfjI"
            ]
          },
          {
            title: "Capture The Flag (CTF)",
            description: "Practice skills on TryHackMe, HackTheBox, etc.",
            resources: [
              "https://tryhackme.com/",
              "https://www.hackthebox.com/"
            ]
          },
          {
            title: "Exploitation Techniques",
            description: "Learn buffer overflows, privilege escalation, etc.",
            resources: [
              "https://book.hacktricks.xyz/",
              "https://github.com/swisskyrepo/PayloadsAllTheThings"
            ]
          },
          {
            title: "Pentest Reporting",
            description: "Document findings and provide mitigation steps.",
            resources: [
              "https://github.com/juliocesarfort/public-pentesting-reports",
              "https://www.sans.org/white-papers/36722/"
            ]
          }
        ]
      },
      {
        title: "Web & Application Security",
        steps: [
          {
            title: "OWASP Top 10",
            description: "Learn most common web vulnerabilities.",
            resources: [
              "https://owasp.org/www-project-top-ten/",
              "https://owasp.org/www-project-cheat-sheets/"
            ]
          },
          {
            title: "Cross-Site Scripting (XSS)",
            description: "Understand reflected, stored, and DOM-based XSS.",
            resources: [
              "https://portswigger.net/web-security/cross-site-scripting",
              "https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html"
            ]
          },
          {
            title: "SQL Injection",
            description: "Learn to detect and exploit SQLi vulnerabilities.",
            resources: [
              "https://portswigger.net/web-security/sql-injection",
              "https://www.w3schools.com/sql/sql_injection.asp"
            ]
          },
          {
            title: "Broken Authentication",
            description: "Bypass login pages and test session management.",
            resources: [
              "https://owasp.org/www-community/attacks/Authentication_and_Session_Management_Attacks",
              "https://portswigger.net/web-security/authentication"
            ]
          },
          {
            title: "Security Headers",
            description: "Use HTTP headers to improve security posture.",
            resources: [
              "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers",
              "https://owasp.org/www-project-secure-headers/"
            ]
          },
          {
            title: "Content Security Policy (CSP)",
            description: "Prevent XSS using CSP headers.",
            resources: [
              "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
              "https://content-security-policy.com/"
            ]
          }
        ]
      },
      {
        title: "Cloud & Network Security",
        steps: [
          {
            title: "Cloud Security Basics",
            description: "Understand AWS IAM, VPC, and shared responsibility.",
            resources: [
              "https://aws.amazon.com/security/",
              "https://www.coursera.org/learn/aws-cloud-security"
            ]
          },
          {
            title: "Secure Cloud Storage",
            description: "Encrypt and manage S3 buckets securely.",
            resources: [
              "https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html",
              "https://cloud.google.com/security"
            ]
          },
          {
            title: "Network Segmentation",
            description: "Design isolated environments using subnets, firewalls.",
            resources: [
              "https://docs.microsoft.com/en-us/security/zero-trust/network-segmentation",
              "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-segmentation.html"
            ]
          },
          {
            title: "Firewalls & IDS/IPS",
            description: "Monitor and filter network traffic.",
            resources: [
              "https://www.cloudflare.com/learning/ddos/what-is-a-firewall/",
              "https://www.imperva.com/learn/application-security/intrusion-prevention-system-ips/"
            ]
          },
          {
            title: "Zero Trust Architecture",
            description: "Implement 'never trust, always verify' models.",
            resources: [
              "https://www.cloudflare.com/learning/security/glossary/what-is-zero-trust/",
              "https://www.paloaltonetworks.com/cyberpedia/what-is-a-zero-trust-architecture"
            ]
          },
          {
            title: "VPNs & Tunneling Protocols",
            description: "Understand VPN types and secure remote access.",
            resources: [
              "https://www.cloudflare.com/learning/network-layer/what-is-a-vpn/",
              "https://openvpn.net/"
            ]
          }
        ]
      },
      {
        title: "Incident Response & Forensics",
        steps: [
          {
            title: "Incident Response Lifecycle",
            description: "Preparation, detection, containment, eradication, recovery.",
            resources: [
              "https://www.cisa.gov/resources-tools/resources/incident-response",
              "https://www.sans.org/white-papers/1746/"
            ]
          },
          {
            title: "Log Analysis",
            description: "Use logs to detect and analyze incidents.",
            resources: [
              "https://www.varonis.com/blog/log-analysis",
              "https://docs.graylog.org/"
            ]
          },
          {
            title: "SIEM Tools (Splunk, ELK)",
            description: "Monitor, analyze, and visualize security data.",
            resources: [
              "https://www.splunk.com/",
              "https://www.elastic.co/what-is/elk-stack"
            ]
          },
          {
            title: "Digital Forensics",
            description: "Acquire and analyze evidence from systems.",
            resources: [
              "https://www.sans.org/white-papers/dfir/",
              "https://www.cybrary.it/course/digital-forensics"
            ]
          },
          {
            title: "Memory & Disk Analysis",
            description: "Extract artifacts from system memory and drives.",
            resources: [
              "https://www.sleuthkit.org/autopsy/",
              "https://www.volatilityfoundation.org/"
            ]
          },
          {
            title: "Threat Intelligence",
            description: "Use feeds to understand attacker TTPs.",
            resources: [
              "https://attack.mitre.org/",
              "https://www.mandiant.com/resources"
            ]
          }
        ]
      },
      {
        title: "Certifications & Career",
        steps: [
          {
            title: "CompTIA Security+",
            description: "Start with foundational cybersecurity certification.",
            resources: [
              "https://www.comptia.org/certifications/security",
              "https://www.udemy.com/course/comptia-security-certification-sy0-601/"
            ]
          },
          {
            title: "Certified Ethical Hacker (CEH)",
            description: "Learn ethical hacking tools and methodologies.",
            resources: [
              "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
              "https://www.udemy.com/course/certified-ethical-hacker/"
            ]
          },
          {
            title: "OSCP (Offensive Security)",
            description: "Learn real-world penetration testing.",
            resources: [
              "https://www.offensive-security.com/pwk-oscp/",
              "https://www.youtube.com/watch?v=7-8nG9R8YHo"
            ]
          },
          {
            title: "CISSP",
            description: "Get certified in advanced security management.",
            resources: [
              "https://www.isc2.org/certifications/CISSP",
              "https://www.udemy.com/course/cissp-certification-introduction/"
            ]
          },
          {
            title: "Bug Bounty & Responsible Disclosure",
            description: "Report bugs via platforms like HackerOne or Bugcrowd.",
            resources: [
              "https://www.hackerone.com/",
              "https://www.bugcrowd.com/"
            ]
          },
          {
            title: "Build a Cybersecurity Portfolio",
            description: "Document labs, reports, and projects for jobs.",
            resources: [
              "https://infosecwriteups.com/",
              "https://github.com/nahamsec/Resources-for-Beginner-Bug-Bounty-Hunters"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Cloud & DevOps",
    category: "Infrastructure",
    sections: [
      {
        title: "Cloud Fundamentals",
        steps: [
          {
            title: "Cloud Computing Basics",
            description: "Understand IaaS, PaaS, SaaS, public/private/hybrid cloud.",
            resources: [
              "https://www.ibm.com/cloud/learn/cloud-computing",
              "https://azure.microsoft.com/en-us/overview/what-is-cloud-computing/"
            ]
          },
          {
            title: "AWS Essentials",
            description: "Intro to EC2, S3, IAM, Lambda.",
            resources: [
              "https://aws.amazon.com/training/",
              "https://learn.microsoft.com/en-us/training/paths/aws-fundamentals/"
            ]
          },
          {
            title: "GCP / Azure Overview",
            description: "Understand the key differences across providers.",
            resources: [
              "https://cloud.google.com/docs",
              "https://learn.microsoft.com/en-us/training/azure/"
            ]
          },
          {
            title: "Virtual Machines & Storage",
            description: "Provision compute instances and cloud storage.",
            resources: [
              "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
              "https://cloud.google.com/compute/docs/instances"
            ]
          },
          {
            title: "Cloud CLI Tools",
            description: "Use AWS CLI, gcloud CLI, Azure CLI.",
            resources: [
              "https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html",
              "https://cloud.google.com/sdk/docs/install"
            ]
          },
          {
            title: "Identity & Access Management (IAM)",
            description: "Use roles, policies, and least privilege principle.",
            resources: [
              "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
              "https://cloud.google.com/iam/docs"
            ]
          }
        ]
      },
      {
        title: "DevOps Practices",
        steps: [
          {
            title: "Version Control (Git)",
            description: "Use Git and GitHub for code collaboration.",
            resources: [
              "https://www.freecodecamp.org/learn/git/",
              "https://git-scm.com/book/en/v2"
            ]
          },
          {
            title: "CI/CD Concepts",
            description: "Understand pipelines, triggers, testing, deployments.",
            resources: [
              "https://www.redhat.com/en/topics/devops/what-is-ci-cd",
              "https://www.freecodecamp.org/news/ci-cd-pipeline-explained/"
            ]
          },
          {
            title: "GitHub Actions / Jenkins",
            description: "Automate builds and tests.",
            resources: [
              "https://docs.github.com/en/actions",
              "https://www.jenkins.io/doc/"
            ]
          },
          {
            title: "Infrastructure as Code (IaC)",
            description: "Manage infrastructure using Terraform or CloudFormation.",
            resources: [
              "https://developer.hashicorp.com/terraform/docs",
              "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html"
            ]
          },
          {
            title: "Docker Basics",
            description: "Build, run, and manage containers.",
            resources: [
              "https://docs.docker.com/get-started/",
              "https://docker-curriculum.com/"
            ]
          },
          {
            title: "Kubernetes Essentials",
            description: "Orchestrate containers using kubectl, pods, services.",
            resources: [
              "https://kubernetes.io/docs/tutorials/",
              "https://www.udemy.com/course/kubernetes-for-the-absolute-beginners/"
            ]
          }
        ]
      },
      {
        title: "Monitoring & Logging",
        steps: [
          {
            title: "Monitoring Concepts",
            description: "Understand metrics, alerts, uptime, and observability.",
            resources: [
              "https://www.datadoghq.com/observability/",
              "https://aws.amazon.com/cloudwatch/"
            ]
          },
          {
            title: "Prometheus Basics",
            description: "Scrape metrics and build custom exporters.",
            resources: [
              "https://prometheus.io/docs/introduction/overview/",
              "https://www.robustperception.io/"
            ]
          },
          {
            title: "Grafana Dashboards",
            description: "Create visual dashboards for metrics.",
            resources: [
              "https://grafana.com/docs/grafana/latest/",
              "https://www.youtube.com/watch?v=sKNZMtoSHN4"
            ]
          },
          {
            title: "Logging with ELK Stack",
            description: "Use Elasticsearch, Logstash, and Kibana.",
            resources: [
              "https://www.elastic.co/what-is/elk-stack",
              "https://logz.io/learn/complete-guide-elk-stack/"
            ]
          },
          {
            title: "Tracing & APM Tools",
            description: "Use Jaeger, OpenTelemetry for distributed tracing.",
            resources: [
              "https://opentelemetry.io/docs/",
              "https://www.jaegertracing.io/"
            ]
          },
          {
            title: "Cloud Native Logging",
            description: "Use CloudWatch, Stackdriver, or Azure Monitor.",
            resources: [
              "https://cloud.google.com/logging",
              "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview"
            ]
          }
        ]
      },
      {
        title: "Security & Compliance",
        steps: [
          {
            title: "Cloud Security Basics",
            description: "Learn the shared responsibility model.",
            resources: [
              "https://aws.amazon.com/compliance/shared-responsibility-model/",
              "https://cloud.google.com/security"
            ]
          },
          {
            title: "Secrets Management",
            description: "Store and rotate secrets using Vault or AWS Secrets Manager.",
            resources: [
              "https://developer.hashicorp.com/vault/docs",
              "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
            ]
          },
          {
            title: "Security Groups & Firewalls",
            description: "Control traffic using rules and network ACLs.",
            resources: [
              "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html",
              "https://cloud.google.com/vpc/docs/firewalls"
            ]
          },
          {
            title: "Identity Federation & SSO",
            description: "Use IAM roles, SAML, and OAuth.",
            resources: [
              "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html",
              "https://cloud.google.com/identity/"
            ]
          },
          {
            title: "Auditing & Compliance Tools",
            description: "Use AWS Config, Azure Policy, or GCP Security Command Center.",
            resources: [
              "https://docs.aws.amazon.com/config/latest/developerguide/",
              "https://cloud.google.com/security-command-center/docs"
            ]
          },
          {
            title: "DevSecOps Practices",
            description: "Integrate security in CI/CD workflows.",
            resources: [
              "https://snyk.io/learn/devsecops/",
              "https://www.redhat.com/en/topics/devops/what-is-devsecops"
            ]
          }
        ]
      },
      {
        title: "Advanced Cloud Services",
        steps: [
          {
            title: "Serverless Computing",
            description: "Use AWS Lambda, GCP Cloud Functions, Azure Functions.",
            resources: [
              "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
              "https://cloud.google.com/functions"
            ]
          },
          {
            title: "Managed Databases",
            description: "Use RDS, DynamoDB, Firebase, Firestore, CosmosDB.",
            resources: [
              "https://aws.amazon.com/rds/",
              "https://firebase.google.com/docs/firestore"
            ]
          },
          {
            title: "Event-Driven Architecture",
            description: "Design apps with queues, topics, events, and triggers.",
            resources: [
              "https://aws.amazon.com/eventbridge/",
              "https://cloud.google.com/eventarc"
            ]
          },
          {
            title: "Hybrid Cloud & Multi-Cloud",
            description: "Use tools like Anthos, Azure Arc, and HashiCorp Consul.",
            resources: [
              "https://cloud.google.com/anthos",
              "https://learn.microsoft.com/en-us/azure/azure-arc/"
            ]
          },
          {
            title: "Autoscaling & Load Balancing",
            description: "Scale apps efficiently with traffic demands.",
            resources: [
              "https://docs.aws.amazon.com/autoscaling/",
              "https://cloud.google.com/load-balancing"
            ]
          },
          {
            title: "Cloud Cost Optimization",
            description: "Monitor and reduce costs using budgets, spot instances.",
            resources: [
              "https://aws.amazon.com/aws-cost-management/",
              "https://cloud.google.com/billing/docs/how-to/cost-optimization"
            ]
          }
        ]
      },
      {
        title: "Certifications & Projects",
        steps: [
          {
            title: "AWS Cloud Practitioner & Solutions Architect",
            description: "Start with foundational and associate certifications.",
            resources: [
              "https://aws.amazon.com/certification/certified-cloud-practitioner/",
              "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
            ]
          },
          {
            title: "Azure / GCP Certifications",
            description: "Get certified in Azure Fundamentals, GCP ACE, etc.",
            resources: [
              "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
              "https://cloud.google.com/certification/cloud-digital-leader"
            ]
          },
          {
            title: "Terraform Projects",
            description: "Create IaC setups with reusable modules.",
            resources: [
              "https://www.terraform.io/language/modules",
              "https://github.com/antonbabenko/terraform-best-practices"
            ]
          },
          {
            title: "CI/CD Pipeline Project",
            description: "Automate testing and deployment on push.",
            resources: [
              "https://github.com/marketplace/actions/deploy-to-aws",
              "https://www.jenkins.io/doc/pipeline/tour/getting-started/"
            ]
          },
          {
            title: "Monitoring & Alerting Project",
            description: "Create dashboards and alerts using Grafana and Prometheus.",
            resources: [
              "https://grafana.com/docs/grafana/latest/dashboards/",
              "https://prometheus.io/docs/alerting/latest/overview/"
            ]
          },
          {
            title: "Contribute to Open Source DevOps Tools",
            description: "Gain experience and network by contributing.",
            resources: [
              "https://github.com/topics/devops",
              "https://opensource.guide/how-to-contribute/"
            ]
          }
        ]
      }
    ]
  },

  {
    title: "AI & Machine Learning Engineer",
    category: "AI",
    sections: [
      {
        title: "Mathematics & Foundations",
        steps: [
          {
            title: "Linear Algebra",
            description: "Vectors, matrices, operations, and eigenvalues.",
            resources: [
              "https://www.khanacademy.org/math/linear-algebra",
              "https://cs231n.github.io/linear-algebra/"
            ]
          },
          {
            title: "Probability & Statistics",
            description: "Distributions, Bayes' theorem, statistical testing.",
            resources: [
              "https://www.khanacademy.org/math/statistics-probability",
              "https://www.statlect.com/"
            ]
          },
          {
            title: "Calculus for ML",
            description: "Derivatives, gradients, chain rule.",
            resources: [
              "https://www.khanacademy.org/math/calculus-1",
              "https://towardsdatascience.com/calculus-for-machine-learning-8f8385e0d4b7"
            ]
          },
          {
            title: "Python for Data Science",
            description: "Learn NumPy, Pandas, Matplotlib for data manipulation.",
            resources: [
              "https://www.learnpython.org/",
              "https://www.kaggle.com/learn/python"
            ]
          },
          {
            title: "Jupyter Notebooks & Environments",
            description: "Setup and run Python notebooks for experiments.",
            resources: [
              "https://jupyter.org/",
              "https://realpython.com/jupyter-notebook-introduction/"
            ]
          },
          {
            title: "Version Control (Git)",
            description: "Track code changes and manage experiments.",
            resources: [
              "https://git-scm.com/book/en/v2",
              "https://www.freecodecamp.org/learn/git/"
            ]
          }
        ]
      },
      {
        title: "Machine Learning Core",
        steps: [
          {
            title: "Supervised Learning",
            description: "Linear regression, decision trees, SVM, KNN.",
            resources: [
              "https://scikit-learn.org/stable/supervised_learning.html",
              "https://www.coursera.org/learn/machine-learning"
            ]
          },
          {
            title: "Unsupervised Learning",
            description: "Clustering, dimensionality reduction, PCA.",
            resources: [
              "https://scikit-learn.org/stable/unsupervised_learning.html",
              "https://www.geeksforgeeks.org/ml-unsupervised-learning/"
            ]
          },
          {
            title: "Model Evaluation",
            description: "Train/test split, cross-validation, confusion matrix.",
            resources: [
              "https://scikit-learn.org/stable/modules/model_evaluation.html",
              "https://towardsdatascience.com/evaluation-metrics-for-classification-9288739a5e12"
            ]
          },
          {
            title: "Feature Engineering",
            description: "Data preprocessing, scaling, encoding.",
            resources: [
              "https://machinelearningmastery.com/discover-feature-engineering-how-to-engineer-features-and-how-to-get-good-at-it/",
              "https://www.analyticsvidhya.com/blog/2020/10/what-is-feature-engineering/"
            ]
          },
          {
            title: "ML Libraries",
            description: "Learn Scikit-learn, XGBoost, LightGBM.",
            resources: [
              "https://scikit-learn.org/stable/",
              "https://xgboost.readthedocs.io/"
            ]
          },
          {
            title: "End-to-End Projects",
            description: "Work on real datasets and submit to Kaggle.",
            resources: [
              "https://www.kaggle.com/",
              "https://data.world/"
            ]
          }
        ]
      },
      {
        title: "Deep Learning",
        steps: [
          {
            title: "Neural Networks Basics",
            description: "Understand neurons, activation functions, and architecture.",
            resources: [
              "https://www.deeplearning.ai/short-courses/neural-networks/",
              "https://cs231n.github.io/neural-networks-1/"
            ]
          },
          {
            title: "TensorFlow & Keras",
            description: "Build and train models using Keras API.",
            resources: [
              "https://www.tensorflow.org/tutorials",
              "https://keras.io/getting_started/"
            ]
          },
          {
            title: "Convolutional Neural Networks (CNNs)",
            description: "Image recognition and classification using CNNs.",
            resources: [
              "https://cs231n.github.io/convolutional-networks/",
              "https://www.tensorflow.org/tutorials/images/cnn"
            ]
          },
          {
            title: "Recurrent Neural Networks (RNNs)",
            description: "Work with sequences, time series, and LSTMs.",
            resources: [
              "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
              "https://www.tensorflow.org/tutorials/text/text_classification_rnn"
            ]
          },
          {
            title: "Transfer Learning",
            description: "Use pre-trained models for new tasks.",
            resources: [
              "https://keras.io/guides/transfer_learning/",
              "https://www.tensorflow.org/hub/tutorials/tf2_image_retraining"
            ]
          },
          {
            title: "Model Deployment",
            description: "Export and serve models with Flask, FastAPI, or TensorFlow Serving.",
            resources: [
              "https://www.analyticsvidhya.com/blog/2021/05/how-to-deploy-machine-learning-model-using-flask/",
              "https://www.tensorflow.org/tfx/serving/serving_basic"
            ]
          }
        ]
      },
      {
        title: "Natural Language Processing (NLP)",
        steps: [
          {
            title: "Text Preprocessing",
            description: "Tokenization, stemming, stop word removal.",
            resources: [
              "https://www.nltk.org/",
              "https://realpython.com/nltk-nlp-python/"
            ]
          },
          {
            title: "Bag of Words & TF-IDF",
            description: "Convert text to numeric form for ML models.",
            resources: [
              "https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction",
              "https://www.geeksforgeeks.org/tf-idf-model/"
            ]
          },
          {
            title: "Word Embeddings",
            description: "Use Word2Vec, GloVe, and FastText.",
            resources: [
              "https://radimrehurek.com/gensim/models/word2vec.html",
              "https://nlp.stanford.edu/projects/glove/"
            ]
          },
          {
            title: "Text Classification",
            description: "Spam detection, sentiment analysis using ML/DL.",
            resources: [
              "https://www.tensorflow.org/tutorials/keras/text_classification",
              "https://www.kaggle.com/datasets"
            ]
          },
          {
            title: "Transformers & BERT",
            description: "Use transformer models for contextual understanding.",
            resources: [
              "https://huggingface.co/transformers/",
              "https://jalammar.github.io/illustrated-bert/"
            ]
          },
          {
            title: "NLP Projects",
            description: "Build a chatbot, Q&A system, or summarizer.",
            resources: [
              "https://github.com/huggingface/notebooks",
              "https://towardsdatascience.com/tagged/nlp-project"
            ]
          }
        ]
      },
      {
        title: "Computer Vision",
        steps: [
          {
            title: "Image Preprocessing",
            description: "Resizing, normalization, augmentation techniques.",
            resources: [
              "https://www.tensorflow.org/tutorials/images/data_augmentation",
              "https://docs.opencv.org/"
            ]
          },
          {
            title: "Object Detection",
            description: "YOLO, SSD, Haar cascades for locating objects.",
            resources: [
              "https://pjreddie.com/darknet/yolo/",
              "https://opencv.org/"
            ]
          },
          {
            title: "Image Segmentation",
            description: "Semantic & instance segmentation (UNet, Mask-RCNN).",
            resources: [
              "https://www.tensorflow.org/tutorials/images/segmentation",
              "https://github.com/matterport/Mask_RCNN"
            ]
          },
          {
            title: "Facial Recognition",
            description: "Build a face detection and recognition model.",
            resources: [
              "https://www.learnopencv.com/",
              "https://github.com/ageitgey/face_recognition"
            ]
          },
          {
            title: "GANs (Generative Adversarial Networks)",
            description: "Generate new data using GANs.",
            resources: [
              "https://towardsdatascience.com/gans-explained-8d8a408d4f5e",
              "https://www.tensorflow.org/tutorials/generative/dcgan"
            ]
          },
          {
            title: "CV Projects",
            description: "OCR, real-time object detection, or medical imaging.",
            resources: [
              "https://paperswithcode.com/task/object-detection",
              "https://www.kaggle.com/search?q=computer+vision"
            ]
          }
        ]
      },
      {
        title: "Career & Specializations",
        steps: [
          {
            title: "MLOps Basics",
            description: "Track models, automate pipelines using MLFlow or DVC.",
            resources: [
              "https://mlflow.org/docs/latest/index.html",
              "https://dvc.org/doc"
            ]
          },
          {
            title: "AI Ethics & Bias",
            description: "Understand fairness, interpretability, and responsible AI.",
            resources: [
              "https://ethics.fast.ai/",
              "https://www.ibm.com/cloud/learn/responsible-ai"
            ]
          },
          {
            title: "AutoML",
            description: "Use AutoKeras, H2O.ai, and Google AutoML tools.",
            resources: [
              "https://autokeras.com/",
              "https://www.kaggle.com/code/ryanholbrook/intro-to-automl"
            ]
          },
          {
            title: "AI Career Paths",
            description: "Explore roles: ML Engineer, Data Scientist, Researcher.",
            resources: [
              "https://www.springboard.com/blog/data-science/machine-learning-careers/",
              "https://www.analyticsvidhya.com/blog/2022/01/how-to-become-a-machine-learning-engineer/"
            ]
          },
          {
            title: "Competitions & Practice",
            description: "Join Kaggle, DrivenData, Zindi, and AIcrowd.",
            resources: [
              "https://www.kaggle.com/competitions",
              "https://zindi.africa/"
            ]
          },
          {
            title: "Certifications & Courses",
            description: "DeepLearning.ai, TensorFlow Developer, MLE by Google.",
            resources: [
              "https://www.coursera.org/professional-certificates/tensorflow-in-practice",
              "https://developers.google.com/machine-learning/crash-course"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Blockchain Developer",
    category: "Web3",
    sections: [
      {
        title: "Foundations of Blockchain",
        steps: [
          {
            title: "Blockchain Basics",
            description: "Learn about decentralization, blocks, and consensus mechanisms.",
            resources: [
              "https://www.ibm.com/topics/what-is-blockchain",
              "https://www.geeksforgeeks.org/introduction-to-blockchain-technology/"
            ]
          },
          {
            title: "Cryptography Essentials",
            description: "Understand hashing, digital signatures, public/private keys.",
            resources: [
              "https://crypto101.io/",
              "https://www.geeksforgeeks.org/cryptographic-hash-functions/"
            ]
          },
          {
            title: "Distributed Ledger Technology",
            description: "Understand how ledgers are shared and updated across nodes.",
            resources: [
              "https://www.investopedia.com/terms/d/distributed-ledger.asp",
              "https://consensys.net/blockchain-explained/distributed-ledger-technology/"
            ]
          },
          {
            title: "Smart Contracts Introduction",
            description: "Learn how smart contracts work on blockchain.",
            resources: [
              "https://ethereum.org/en/developers/docs/smart-contracts/",
              "https://www.ibm.com/topics/smart-contracts"
            ]
          },
          {
            title: "Ethereum Basics",
            description: "Study Ethereum's architecture, gas, accounts, and transactions.",
            resources: [
              "https://ethereum.org/en/developers/docs/intro-to-ethereum/",
              "https://learn.figment.io/network-documentation/ethereum"
            ]
          },
          {
            title: "Development Environment Setup",
            description: "Install Node.js, MetaMask, and frameworks like Hardhat or Truffle.",
            resources: [
              "https://hardhat.org/getting-started/",
              "https://trufflesuite.com/docs/truffle/quickstart/"
            ]
          }
        ]
      },
      {
        title: "Smart Contract & Solidity Development",
        steps: [
          {
            title: "Solidity Language Basics",
            description: "Understand data types, functions, constructors, and visibility.",
            resources: [
              "https://docs.soliditylang.org/",
              "https://cryptozombies.io/"
            ]
          },
          {
            title: "Inheritance & Modifiers",
            description: "Use modifiers, abstract contracts, and interfaces.",
            resources: [
              "https://soliditylang.org/docs/inheritance.html",
              "https://solidity-by-example.org/inheritance/"
            ]
          },
          {
            title: "Events & Logging",
            description: "Emit events and listen to them in the frontend.",
            resources: [
              "https://solidity-by-example.org/event/",
              "https://docs.ethers.io/v5/api/contract/contract/#Contract--events"
            ]
          },
          {
            title: "Smart Contract Security",
            description: "Learn about reentrancy, overflow, denial of service.",
            resources: [
              "https://consensys.github.io/smart-contract-best-practices/",
              "https://github.com/crytic/not-so-smart-contracts"
            ]
          },
          {
            title: "Unit Testing with Hardhat",
            description: "Test contracts using Mocha, Chai, Waffle.",
            resources: [
              "https://hardhat.org/guides/testting-contracts.html",
              "https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts"
            ]
          },
          {
            title: "Deploying to Ethereum",
            description: "Deploy to testnets and mainnet using Hardhat, Remix, or Alchemy.",
            resources: [
              "https://remix.ethereum.org/",
              "https://docs.alchemy.com/"
            ]
          }
        ]
      },
      {
        title: "dApp Development",
        steps: [
          {
            title: "Web3.js & Ethers.js Basics",
            description: "Connect smart contracts to your React frontend.",
            resources: [
              "https://web3js.readthedocs.io/",
              "https://docs.ethers.org/v5/"
            ]
          },
          {
            title: "Wallet Integration",
            description: "Connect MetaMask and handle wallet events.",
            resources: [
              "https://docs.metamask.io/guide/",
              "https://docs.walletconnect.com/"
            ]
          },
          {
            title: "React + Solidity Integration",
            description: "Build full-stack dApps using React and Hardhat.",
            resources: [
              "https://ethereum.org/en/developers/tutorials/build-a-full-stack-dapp/",
              "https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13"
            ]
          },
          {
            title: "State Management in dApps",
            description: "Use Zustand, Redux, or Context API for managing blockchain state.",
            resources: [
              "https://zustand-demo.pmnd.rs/",
              "https://redux.js.org/introduction/getting-started"
            ]
          },
          {
            title: "Frontend Design for dApps",
            description: "Make web3 apps user-friendly using libraries like Tailwind or Chakra UI.",
            resources: [
              "https://tailwindcss.com/docs",
              "https://chakra-ui.com/docs/components"
            ]
          },
          {
            title: "IPFS & Decentralized Storage",
            description: "Store and retrieve data using IPFS.",
            resources: [
              "https://docs.ipfs.tech/",
              "https://infura.io/docs/ipfs"
            ]
          }
        ]
      },
      {
        title: "Advanced Blockchain Topics",
        steps: [
          {
            title: "Gas Optimization",
            description: "Learn how to write efficient and low-cost contracts.",
            resources: [
              "https://ethereum.org/en/developers/docs/gas/",
              "https://docs.soliditylang.org/en/latest/internals/optimizer.html"
            ]
          },
          {
            title: "Oracles & Chainlink",
            description: "Integrate external data using Chainlink oracles.",
            resources: [
              "https://docs.chain.link/",
              "https://blog.chain.link/what-is-a-blockchain-oracle/"
            ]
          },
          {
            title: "Multisig Wallets",
            description: "Build contracts that require multiple signatures.",
            resources: [
              "https://docs.gnosis.io/safe/docs/",
              "https://ethereum.org/en/developers/tutorials/multisig-wallet/"
            ]
          },
          {
            title: "Token Standards (ERC-20, ERC-721, ERC-1155)",
            description: "Create fungible and non-fungible tokens.",
            resources: [
              "https://eips.ethereum.org/EIPS/eip-20",
              "https://eips.ethereum.org/EIPS/eip-721"
            ]
          },
          {
            title: "Layer 2 Scaling",
            description: "Explore Polygon, Optimism, Arbitrum.",
            resources: [
              "https://ethereum.org/en/layer-2/",
              "https://blog.polygon.technology/"
            ]
          },
          {
            title: "Zero-Knowledge Proofs (zk-SNARKs)",
            description: "Understand privacy-preserving computation.",
            resources: [
              "https://zokrates.github.io/introduction.html",
              "https://ethereum.org/en/developers/docs/scaling/zk-rollups/"
            ]
          }
        ]
      },
      {
        title: "Web3 Ecosystem & Tools",
        steps: [
          {
            title: "DAOs (Decentralized Autonomous Organizations)",
            description: "Understand how decentralized communities operate.",
            resources: [
              "https://ethereum.org/en/dao/",
              "https://mirror.xyz/0x03e8c856ff759b6cfb5e4c7ecf6f31a0fc1241c8/HDlaUO6WVmCzQ_9l7Jf7T4eG9Iu4Ard5o8_QPzL5QkE"
            ]
          },
          {
            title: "DeFi (Decentralized Finance)",
            description: "Lend, borrow, trade using smart contracts.",
            resources: [
              "https://www.investopedia.com/decentralized-finance-defi-5113835",
              "https://defiprime.com/"
            ]
          },
          {
            title: "NFT Platforms",
            description: "Understand how marketplaces like OpenSea work.",
            resources: [
              "https://docs.opensea.io/docs/2-adding-new-nfts",
              "https://ethereum.org/en/nft/"
            ]
          },
          {
            title: "Web3 Identity & ENS",
            description: "Use ENS (Ethereum Name Service) for decentralized identity.",
            resources: [
              "https://docs.ens.domains/",
              "https://login.xyz/"
            ]
          },
          {
            title: "The Graph Protocol",
            description: "Query blockchain data using subgraphs.",
            resources: [
              "https://thegraph.com/docs/en/developers/",
              "https://blog.thegraph.com/"
            ]
          },
          {
            title: "Web3 Libraries & SDKs",
            description: "Use Moralis, Thirdweb, Alchemy for rapid development.",
            resources: [
              "https://moralis.io/",
              "https://portal.thirdweb.com/"
            ]
          }
        ]
      },
      {
        title: "Practice, Projects & Careers",
        steps: [
          {
            title: "Contribute to Open Source",
            description: "Join web3 GitHub projects and make PRs.",
            resources: [
              "https://github.com/ethereum",
              "https://github.com/soliditylabs"
            ]
          },
          {
            title: "Build Your Own Token",
            description: "Create and launch your own ERC-20 or NFT project.",
            resources: [
              "https://ethereum.org/en/developers/tutorials/create-and-deploy-your-own-erc20-token/",
              "https://docs.openzeppelin.com/contracts/4.x/erc721"
            ]
          },
          {
            title: "Participate in Hackathons",
            description: "Join ETHGlobal, Encode Club, or Devfolio events.",
            resources: [
              "https://ethglobal.com/",
              "https://devfolio.co/"
            ]
          },
          {
            title: "Create Developer Portfolio",
            description: "Showcase your blockchain projects publicly.",
            resources: [
              "https://www.producthunt.com/",
              "https://showwcase.com/"
            ]
          },
          {
            title: "Web3 Jobs & Internships",
            description: "Apply to web3 companies via job boards.",
            resources: [
              "https://web3.career/",
              "https://cryptojobslist.com/"
            ]
          },
          {
            title: "Certifications",
            description: "Get certified in Blockchain Development or Solidity.",
            resources: [
              "https://academy.ivanontech.com/",
              "https://www.blockchain-council.org/"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Game Development",
    category: "Game Dev",
    sections: [
      {
        title: "Programming & Logic",
        steps: [
          {
            title: "Programming Fundamentals",
            description: "Master variables, loops, conditionals, and functions.",
            resources: [
              "https://www.codecademy.com/learn/learn-c-sharp",
              "https://www.learncs.org/"
            ]
          },
          {
            title: "Object-Oriented Programming",
            description: "Learn about classes, objects, inheritance, and encapsulation.",
            resources: [
              "https://www.geeksforgeeks.org/object-oriented-programming-in-c-sharp/",
              "https://www.c-sharpcorner.com/UploadFile/mahesh/object-oriented-programming-concepts-in-C-Sharp/"
            ]
          },
          {
            title: "Math for Games",
            description: "Understand vectors, matrices, trigonometry, and physics basics.",
            resources: [
              "https://www.khanacademy.org/math/trigonometry",
              "https://www.gamedev.net/tutorials/programming/math-and-physics/"
            ]
          },
          {
            title: "Game Loops & Event Handling",
            description: "Understand how games run in real-time and manage inputs.",
            resources: [
              "https://gameprogrammingpatterns.com/game-loop.html",
              "https://dev.to/daviddao/the-game-loop-in-games-5fhb"
            ]
          },
          {
            title: "Data Structures in Games",
            description: "Learn arrays, lists, stacks, trees, and how games use them.",
            resources: [
              "https://www.toptal.com/game/video-game-data-structures",
              "https://www.geeksforgeeks.org/data-structures/"
            ]
          },
          {
            title: "Design Patterns in Games",
            description: "Apply patterns like Singleton, Factory, and Observer.",
            resources: [
              "https://gameprogrammingpatterns.com/contents.html",
              "https://refactoring.guru/design-patterns"
            ]
          }
        ]
      },
      {
        title: "Game Engines & Development",
        steps: [
          {
            title: "Choosing a Game Engine",
            description: "Pick Unity (C#), Unreal Engine (C++), or Godot (GDScript).",
            resources: [
              "https://unity.com/learn",
              "https://docs.unrealengine.com/",
              "https://docs.godotengine.org/en/stable/"
            ]
          },
          {
            title: "Unity Basics",
            description: "Learn Scenes, GameObjects, components, and scripting in Unity.",
            resources: [
              "https://learn.unity.com/",
              "https://www.youtube.com/watch?v=IlKaB1etrik"
            ]
          },
          {
            title: "2D vs 3D Game Development",
            description: "Understand cameras, physics, and rendering differences.",
            resources: [
              "https://learn.unity.com/project/2d-ufo-tutorial",
              "https://www.gamedeveloper.com/design/2d-vs-3d-game-design-deciding-which-way-to-go"
            ]
          },
          {
            title: "Animations & Transitions",
            description: "Use Unity Animator or Unreal Blueprints for smooth animations.",
            resources: [
              "https://docs.unity3d.com/Manual/AnimationSection.html",
              "https://docs.unrealengine.com/en-US/AnimatingObjects/Sequencer/index.html"
            ]
          },
          {
            title: "UI & HUD Design",
            description: "Create health bars, menus, and in-game controls.",
            resources: [
              "https://learn.unity.com/tutorial/ui-canvas",
              "https://docs.unrealengine.com/en-US/InteractiveExperiences/UMG/"
            ]
          },
          {
            title: "Sound, Music & Effects",
            description: "Integrate SFX, music loops, and use audio mixers.",
            resources: [
              "https://docs.unity3d.com/Manual/Audio.html",
              "https://www.youtube.com/playlist?list=PLxN4E629pPnJxT2yCz3Q2iK7W3D5hfs2C"
            ]
          }
        ]
      },
      {
        title: "Design & User Experience",
        steps: [
          {
            title: "Game Design Principles",
            description: "Learn about challenge, reward, feedback loops, and progression.",
            resources: [
              "https://www.gamedesigning.org/learn/game-design-theory/",
              "https://www.youtube.com/watch?v=0yEyTCWJvFc"
            ]
          },
          {
            title: "Level Design",
            description: "Create engaging and balanced game levels.",
            resources: [
              "https://gamedevelopment.tutsplus.com/series/level-design-for-games--cms-794",
              "https://www.gamedeveloper.com/design/level-design-101"
            ]
          },
          {
            title: "Character Design",
            description: "Design characters with unique traits and abilities.",
            resources: [
              "https://www.polygon.com/2015/4/29/8513343/game-character-design-tips",
              "https://conceptartempire.com/game-character-design/"
            ]
          },
          {
            title: "User Experience & Feedback",
            description: "Improve UX with sound cues, haptics, and tutorial flows.",
            resources: [
              "https://uxdesign.cc/ux-for-games-b7b2fefaa7fe",
              "https://www.gamasutra.com/view/feature/134923/the_ux_of_game_ui.php"
            ]
          },
          {
            title: "Accessibility in Games",
            description: "Design games for players with different abilities.",
            resources: [
              "https://www.w3.org/WAI/gamification/",
              "https://gameaccessibilityguidelines.com/"
            ]
          }
        ]
      },
      {
        title: "Physics, AI & Scripting",
        steps: [
          {
            title: "Collision Detection",
            description: "Learn box colliders, raycasting, and rigidbodies.",
            resources: [
              "https://docs.unity3d.com/Manual/CollidersOverview.html",
              "https://learn.unity.com/tutorial/physics-colliders-and-triggers"
            ]
          },
          {
            title: "Game Physics",
            description: "Add realistic motion, gravity, and force to objects.",
            resources: [
              "https://docs.unity3d.com/Manual/PhysicsSection.html",
              "https://www.gamedevelopment.blog/unity-physics/"
            ]
          },
          {
            title: "Basic AI for Games",
            description: "Implement AI movement, pathfinding, and decision trees.",
            resources: [
              "https://www.raywenderlich.com/29638-introduction-to-unity-ai",
              "https://learn.unity.com/project/basic-game-ai"
            ]
          },
          {
            title: "Advanced AI Concepts",
            description: "Explore FSMs, behavior trees, and reinforcement learning.",
            resources: [
              "https://docs.unity3d.com/Packages/com.unity.ai.planner@0.2/manual/index.html",
              "https://learn.unity.com/project/ai-planner"
            ]
          },
          {
            title: "Cutscenes & Scripting Events",
            description: "Use Timeline, Sequencer, or Blueprint scripting.",
            resources: [
              "https://docs.unity3d.com/Manual/TimelineSection.html",
              "https://docs.unrealengine.com/en-US/Cinematics/Sequencer/Overview/"
            ]
          }
        ]
      },
      {
        title: "Multiplayer & Monetization",
        steps: [
          {
            title: "Multiplayer Game Types",
            description: "Understand local, LAN, and online multiplayer architectures.",
            resources: [
              "https://docs.unity3d.com/Manual/UNet.html",
              "https://www.unrealengine.com/en-US/online-subsystem"
            ]
          },
          {
            title: "Networking in Unity/Unreal",
            description: "Sync player states, handle latency and data transfer.",
            resources: [
              "https://docs-multiplayer.unity3d.com/",
              "https://docs.unrealengine.com/en-US/InteractiveExperiences/Networking/"
            ]
          },
          {
            title: "Leaderboards & Achievements",
            description: "Track scores and implement cloud save features.",
            resources: [
              "https://playfab.com/",
              "https://firebase.google.com/docs/guides"
            ]
          },
          {
            title: "In-App Purchases & Ads",
            description: "Integrate monetization strategies safely.",
            resources: [
              "https://unityads.unity3d.com/help/unity/integration-guide-unity",
              "https://developer.android.com/google/play/billing"
            ]
          },
          {
            title: "Game Publishing",
            description: "Build and publish your game to stores.",
            resources: [
              "https://developer.android.com/games",
              "https://learn.unity.com/tutorial/publishing-your-game"
            ]
          }
        ]
      },
      {
        title: "Career, Practice & Portfolio",
        steps: [
          {
            title: "Game Jams & Challenges",
            description: "Join online events like Ludum Dare or GMTK Game Jam.",
            resources: [
              "https://itch.io/jams",
              "https://ldjam.com/"
            ]
          },
          {
            title: "Open Source Contribution",
            description: "Contribute to game engine extensions or asset libraries.",
            resources: [
              "https://github.com/godotengine/godot",
              "https://github.com/Unity-Technologies/"
            ]
          },
          {
            title: "Build a Game Portfolio",
            description: "Showcase playable demos, GitHub links, and trailers.",
            resources: [
              "https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/building-a-game-programming-portfolio-r4243/",
              "https://itch.io/"
            ]
          },
          {
            title: "Internships & Entry Jobs",
            description: "Apply for junior dev roles and internships in gaming studios.",
            resources: [
              "https://hitmarker.net/",
              "https://www.gamejobs.co/"
            ]
          },
          {
            title: "Continuous Learning",
            description: "Follow YouTubers, blogs, and industry news.",
            resources: [
              "https://www.gamedeveloper.com/",
              "https://www.youtube.com/c/Brackeys"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Product Management",
    category: "Management",
    sections: [
      {
        title: "Foundations of Product Thinking",
        steps: [
          {
            title: "What is Product Management?",
            description: "Understand the role of a PM in tech, business, and UX.",
            resources: [
              "https://www.atlassian.com/agile/product-management",
              "https://www.productplan.com/learn/product-management/"
            ]
          },
          {
            title: "Product-Market Fit",
            description: "Identify problems worth solving and validate demand.",
            resources: [
              "https://a16z.com/2017/02/18/12-things-about-product-market-fit/",
              "https://www.ycombinator.com/library/4A-product-market-fit"
            ]
          },
          {
            title: "Understanding the Product Lifecycle",
            description: "Learn about ideation, development, launch, and maturity stages.",
            resources: [
              "https://www.productboard.com/blog/product-lifecycle/",
              "https://www.productplan.com/glossary/product-lifecycle/"
            ]
          },
          {
            title: "Customer & Market Research",
            description: "Conduct interviews, competitor analysis, and surveys.",
            resources: [
              "https://www.nngroup.com/articles/user-research-methods/",
              "https://www.aha.io/roadmapping/guide/market-research"
            ]
          },
          {
            title: "Problem Solving & Prioritization",
            description: "Define problems clearly and prioritize based on impact.",
            resources: [
              "https://www.intercom.com/blog/rice-scoring-model-prioritization/",
              "https://airfocus.com/glossary/what-is-prioritization/"
            ]
          },
          {
            title: "Metrics & KPIs",
            description: "Track engagement, retention, NPS, and business goals.",
            resources: [
              "https://amplitude.com/blog/product-metrics",
              "https://www.productplan.com/blog/product-management-metrics/"
            ]
          },
          {
            title: "Writing a PRD (Product Requirements Document)",
            description: "Define features, user stories, and edge cases clearly.",
            resources: [
              "https://www.productboard.com/blog/how-to-write-a-product-requirements-document-prd/",
              "https://www.aha.io/roadmapping/guide/templates/product-requirements-document-template"
            ]
          }
        ]
      },
      {
        title: "Execution & Communication",
        steps: [
          {
            title: "Agile & Scrum Basics",
            description: "Understand Agile ceremonies and how to work with development teams.",
            resources: [
              "https://www.scrum.org/resources/what-is-scrum",
              "https://www.atlassian.com/agile/scrum"
            ]
          },
          {
            title: "Backlog Management & Roadmapping",
            description: "Create, groom, and maintain a feature backlog.",
            resources: [
              "https://www.atlassian.com/agile/product-management/backlogs",
              "https://www.productplan.com/roadmap-examples/"
            ]
          },
          {
            title: "Working with Designers and Engineers",
            description: "Facilitate collaboration and align product vision.",
            resources: [
              "https://www.productboard.com/blog/product-managers-work-with-designers/",
              "https://www.atlassian.com/blog/productivity/product-manager-engineer-collaboration"
            ]
          },
          {
            title: "Stakeholder Communication",
            description: "Keep stakeholders aligned through updates and feedback loops.",
            resources: [
              "https://www.productboard.com/blog/stakeholder-management-product-management/",
              "https://www.productplan.com/blog/stakeholder-communication/"
            ]
          },
          {
            title: "Go-to-Market Strategy",
            description: "Work with marketing and sales to launch products.",
            resources: [
              "https://www.productplan.com/glossary/go-to-market-strategy/",
              "https://www.saasworthy.com/blog/how-to-build-a-go-to-market-strategy"
            ]
          },
          {
            title: "Tools for PMs",
            description: "Use tools like Jira, Trello, Notion, Confluence, Productboard.",
            resources: [
              "https://zapier.com/blog/product-management-tools/",
              "https://www.productboard.com/blog/product-management-tools/"
            ]
          }
        ]
      },
      {
        title: "Product Strategy",
        steps: [
          {
            title: "Vision, Mission, and Strategy",
            description: "Define the long-term purpose and how to get there.",
            resources: [
              "https://www.productplan.com/glossary/product-strategy/",
              "https://www.mindtheproduct.com/what-is-product-strategy/"
            ]
          },
          {
            title: "North Star Metric",
            description: "Focus teams around a unifying goal that drives impact.",
            resources: [
              "https://amplitude.com/blog/north-star-metric",
              "https://www.product-led.com/blog/north-star-metric"
            ]
          },
          {
            title: "Business Models & Revenue Streams",
            description: "Align product strategy with business viability.",
            resources: [
              "https://www.strategyzer.com/canvas/business-model-canvas",
              "https://www.saastr.com/saas-metrics-2-0/"
            ]
          },
          {
            title: "Product-Market Fit Strategy",
            description: "Iterate MVPs and features toward validation.",
            resources: [
              "https://leanstack.com/what-is-product-market-fit",
              "https://www.ycombinator.com/library/4A-product-market-fit"
            ]
          },
          {
            title: "Competitive Analysis",
            description: "Study market players, trends, and white spaces.",
            resources: [
              "https://www.productplan.com/glossary/competitive-analysis/",
              "https://www.aha.io/roadmapping/guide/strategic-planning/competitive-analysis"
            ]
          },
          {
            title: "OKRs for Product Teams",
            description: "Set Objectives & Key Results to track outcomes.",
            resources: [
              "https://www.whatmatters.com/",
              "https://www.perdoo.com/resources/okr-examples/product/"
            ]
          }
        ]
      },
      {
        title: "User-Centered Design",
        steps: [
          {
            title: "User Personas",
            description: "Build realistic profiles based on user behavior.",
            resources: [
              "https://uxpressia.com/",
              "https://www.interaction-design.org/literature/article/personas-why-and-how-you-should-use-them"
            ]
          },
          {
            title: "User Journey Mapping",
            description: "Visualize user flow to identify friction points.",
            resources: [
              "https://uxplanet.org/journey-mapping-101-483923d7537e",
              "https://www.nngroup.com/articles/customer-journey-mapping/"
            ]
          },
          {
            title: "Wireframing & Prototyping",
            description: "Create mockups with tools like Figma or Balsamiq.",
            resources: [
              "https://www.figma.com/prototyping/",
              "https://careerfoundry.com/en/blog/ux-design/what-is-wireframing/"
            ]
          },
          {
            title: "Usability Testing",
            description: "Test prototypes with real users to validate assumptions.",
            resources: [
              "https://www.smashingmagazine.com/2018/01/guide-usability-testing/",
              "https://www.nngroup.com/articles/usability-testing-101/"
            ]
          },
          {
            title: "Accessibility Basics",
            description: "Design inclusive products for all users.",
            resources: [
              "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
              "https://webaim.org/intro/"
            ]
          },
          {
            title: "Design Systems",
            description: "Use component libraries like Material UI or Tailwind for consistency.",
            resources: [
              "https://material.io/design",
              "https://designsystemsrepo.com/"
            ]
          }
        ]
      },
      {
        title: "Data & Experimentation",
        steps: [
          {
            title: "Intro to Product Analytics",
            description: "Track product usage with tools like Mixpanel or Amplitude.",
            resources: [
              "https://amplitude.com/",
              "https://mixpanel.com/guide/product/"
            ]
          },
          {
            title: "Defining Metrics & Funnels",
            description: "Build conversion funnels and engagement dashboards.",
            resources: [
              "https://databox.com/funnel-metrics",
              "https://www.optimizely.com/optimization-glossary/conversion-funnel/"
            ]
          },
          {
            title: "A/B Testing",
            description: "Run experiments to validate changes before rollout.",
            resources: [
              "https://vwo.com/ab-testing/",
              "https://www.optimizely.com/optimization-glossary/ab-testing/"
            ]
          },
          {
            title: "Cohort & Retention Analysis",
            description: "Understand churn and retention behavior over time.",
            resources: [
              "https://mixpanel.com/blog/cohort-analysis/",
              "https://amplitude.com/blog/retention-analysis"
            ]
          },
          {
            title: "Data-Driven Decision Making",
            description: "Use insights and trends to influence the roadmap.",
            resources: [
              "https://www.productplan.com/blog/data-driven-product-management/",
              "https://www.aha.io/roadmapping/guide/analytics/data-driven-decision-making"
            ]
          },
          {
            title: "Dashboards & Reporting",
            description: "Communicate results via tools like Looker, Tableau, or Power BI.",
            resources: [
              "https://www.tableau.com/",
              "https://looker.com/learn"
            ]
          }
        ]
      },
      {
        title: "Career Development for PMs",
        steps: [
          {
            title: "PM Career Paths",
            description: "Understand IC vs. management roles and career ladders.",
            resources: [
              "https://www.felixmizrahi.com/blog/product-management-career-paths",
              "https://www.productschool.com/blog/product-career/product-manager-career-path/"
            ]
          },
          {
            title: "Interview Preparation",
            description: "Practice case studies, estimation, strategy, and behavioral rounds.",
            resources: [
              "https://www.tryexponent.com/product-management-interview-questions",
              "https://www.productmanagementexercises.com/"
            ]
          },
          {
            title: "Resume & Portfolio",
            description: "Showcase product impact and decision-making in case studies.",
            resources: [
              "https://www.productschool.com/blog/product-career/how-to-create-product-manager-resume/",
              "https://www.productplan.com/blog/product-management-portfolio/"
            ]
          },
          {
            title: "Books Every PM Should Read",
            description: "Grow mindset with essential product reads.",
            resources: [
              "https://www.productschool.com/blog/product-career/top-books-product-managers/",
              "https://www.sachinrekhi.com/my-favorite-books-on-product-management"
            ]
          },
          {
            title: "PM Communities & Networking",
            description: "Join events and groups to stay current in the field.",
            resources: [
              "https://www.mindtheproduct.com/",
              "https://www.productcoalition.com/"
            ]
          },
          {
            title: "Certifications & Courses",
            description: "Gain credibility with programs like PMC, CSPO, or Reforge.",
            resources: [
              "https://www.productschool.com/certifications/",
              "https://www.scrumalliance.org/get-certified"
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Technical Writing",
    "category": "Communication",
    "sections": [
      {
        "title": "Writing Foundations",
        "steps": [
          {
            "title": "Understanding Technical Writing",
            "description": "What it is, where it's used, and career paths.",
            "resources": [
              "https://www.instructionalsolutions.com/blog/technical-writing",
              "https://www.writingassist.com/newsroom/what-is-technical-writing/"
            ]
          },
          {
            "title": "Grammar & Style Guides",
            "description": "Improve writing clarity, tone, and grammar.",
            "resources": [
              "https://www.grammarly.com/blog/technical-writing/",
              "https://developers.google.com/style"
            ]
          },
          {
            "title": "Structuring Technical Documents",
            "description": "Learn to organize manuals, guides, and docs effectively.",
            "resources": [
              "https://www.coursera.org/learn/technical-writing",
              "https://www.udemy.com/course/technical-writing-and-editing/"
            ]
          },
          {
            "title": "Audience Analysis",
            "description": "Tailor documentation based on user type and technical skill.",
            "resources": [
              "https://techwhirl.com/audience-analysis-for-technical-writers/",
              "https://www.instructionalsolutions.com/blog/identify-audience-business-writing"
            ]
          },
          {
            "title": "Information Architecture",
            "description": "Present content in navigable, logical formats.",
            "resources": [
              "https://www.torok.com/technical-writing/information-architecture.htm",
              "https://www.interaction-design.org/literature/topics/information-architecture"
            ]
          },
          {
            "title": "Technical Writing Tools",
            "description": "Explore tools like Grammarly, Hemingway, MS Word, and Google Docs.",
            "resources": [
              "https://www.technicalwriterhq.com/tools/",
              "https://clickhelp.com/clickhelp-technical-writing-blog/5-essential-technical-writing-tools/"
            ]
          }
        ]
      },
      {
        "title": "Documentation & Publishing",
        "steps": [
          {
            "title": "Markdown & HTML Basics",
            "description": "Format technical documents using Markdown/HTML.",
            "resources": [
              "https://www.markdownguide.org/",
              "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML"
            ]
          },
          {
            "title": "Writing API Documentation",
            "description": "Document RESTful APIs using Swagger, Postman, etc.",
            "resources": [
              "https://idratherbewriting.com/learnapidoc/",
              "https://www.postman.com/api-documentation-tool/"
            ]
          },
          {
            "title": "Version Control with Git",
            "description": "Collaborate on documentation projects with Git.",
            "resources": [
              "https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91/",
              "https://git-scm.com/doc"
            ]
          },
          {
            "title": "Using Static Site Generators",
            "description": "Publish documentation using Docusaurus, Hugo, or MkDocs.",
            "resources": [
              "https://docusaurus.io/docs/",
              "https://www.mkdocs.org/"
            ]
          },
          {
            "title": "Open Source Contributions",
            "description": "Write and edit documentation for open-source projects.",
            "resources": [
              "https://opensource.guide/how-to-contribute/",
              "https://github.com/firstcontributions/first-contributions"
            ]
          },
          {
            "title": "Portfolio & Freelancing",
            "description": "Build a writer portfolio and explore freelance opportunities.",
            "resources": [
              "https://technicalwriterhq.com/portfolio/",
              "https://www.upwork.com/resources/become-technical-writer"
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Developer Relations (DevRel)",
    "category": "Community",
    "sections": [
      {
        "title": "Foundations of DevRel",
        "steps": [
          {
            "title": "What is DevRel?",
            "description": "Understand the role of DevRel in companies and the community.",
            "resources": [
              "https://www.hoopy.io/devrel/",
              "https://developerrelations.com/what-is-devrel"
            ]
          },
          {
            "title": "Developer Advocacy vs Evangelism",
            "description": "Differentiate between roles and goals in DevRel.",
            "resources": [
              "https://dev.to/devrelcollective/advocacy-vs-evangelism-vs-advancement-vs-community-roles-1gb2",
              "https://www.thedx.dev/blog/advocate-vs-evangelist"
            ]
          },
          {
            "title": "Understanding Developer Needs",
            "description": "Learn how to gather, synthesize, and share developer feedback.",
            "resources": [
              "https://developerexperience.io/articles/devrel-feedback-loop",
              "https://orbit.love/blog/how-to-collect-developer-feedback"
            ]
          },
          {
            "title": "Empathy & Communication",
            "description": "Become a bridge between developers and product teams.",
            "resources": [
              "https://developerrelations.com/devrel/empathy-in-developer-relations",
              "https://devrel.net/strategy/building-relationships-through-empathy"
            ]
          },
          {
            "title": "Community Building",
            "description": "Grow and support developer communities around your product.",
            "resources": [
              "https://orbit.love/",
              "https://www.commonroom.io/"
            ]
          },
          {
            "title": "Understanding Open Source Ecosystems",
            "description": "Collaborate, contribute, and advocate for OSS projects.",
            "resources": [
              "https://opensource.guide/how-to-contribute/",
              "https://github.com/firstcontributions/first-contributions"
            ]
          }
        ]
      },
      {
        "title": "Skills & Tools for DevRel",
        "steps": [
          {
            "title": "Public Speaking & Conferences",
            "description": "Learn to speak confidently at meetups, webinars, and conferences.",
            "resources": [
              "https://speaking.io/",
              "https://www.toastmasters.org/"
            ]
          },
          {
            "title": "Creating Technical Content",
            "description": "Write blogs, tutorials, and guides that help developers.",
            "resources": [
              "https://www.writethedocs.org/guide/writing/",
              "https://www.hashnode.com/"
            ]
          },
          {
            "title": "Streaming & Video Creation",
            "description": "Create developer-focused YouTube videos or livestreams.",
            "resources": [
              "https://www.youtube.com/c/GoogleDevelopers",
              "https://obsproject.com/"
            ]
          },
          {
            "title": "Developer Tooling & SDKs",
            "description": "Understand your company's tech stack and write sample apps.",
            "resources": [
              "https://docs.github.com/en/rest",
              "https://stripe.com/docs"
            ]
          },
          {
            "title": "Metrics & Impact Tracking",
            "description": "Measure community growth, content reach, and engagement.",
            "resources": [
              "https://orbit.love/developer-relations-metrics",
              "https://devrel.net/metrics/10-devrel-metrics-to-track"
            ]
          },
          {
            "title": "Portfolio & Career Growth",
            "description": "Build your personal brand and showcase your DevRel work.",
            "resources": [
              "https://career.devrelcollective.fun/",
              "https://developerrelations.com/career/how-to-get-into-devrel"
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Data Engineering",
    "category": "Big Data",
    "sections": [
      {
        "title": "Core Skills & Foundations",
        "steps": [
          {
            "title": "SQL for Data Analysis",
            "description": "Master SELECT, JOIN, GROUP BY, and analytical queries.",
            "resources": [
              "https://mode.com/sql-tutorial/",
              "https://www.khanacademy.org/computing/computer-programming/sql"
            ]
          },
          {
            "title": "Python for Data Engineers",
            "description": "Use Python for scripting, data cleaning, and automation.",
            "resources": [
              "https://www.learnpython.org/",
              "https://realpython.com/python-data-cleaning-numpy-pandas/"
            ]
          },
          {
            "title": "Data Modeling",
            "description": "Understand star schema, snowflake schema, and normalization.",
            "resources": [
              "https://www.guru99.com/data-warehouse-schema.html",
              "https://mode.com/sql-tutorial/sql-data-modeling/"
            ]
          },
          {
            "title": "Databases (SQL & NoSQL)",
            "description": "Learn PostgreSQL, MySQL, MongoDB, and Redis.",
            "resources": [
              "https://www.mongodb.com/docs/manual/",
              "https://www.postgresqltutorial.com/"
            ]
          },
          {
            "title": "Version Control with Git",
            "description": "Track data pipeline scripts and collaborate with teams.",
            "resources": [
              "https://git-scm.com/doc",
              "https://www.freecodecamp.org/news/git-and-github-crash-course/"
            ]
          },
          {
            "title": "Basic Data Structures & Algorithms",
            "description": "Understand how arrays, hashes, trees, and graphs are used in data flows.",
            "resources": [
              "https://www.geeksforgeeks.org/data-structures/",
              "https://www.educative.io/courses/grokking-the-coding-interview"
            ]
          }
        ]
      },
      {
        "title": "Data Pipelines & Big Data Tools",
        "steps": [
          {
            "title": "ETL vs ELT Concepts",
            "description": "Understand extract-transform-load workflows and architecture.",
            "resources": [
              "https://www.integrate.io/blog/etl-vs-elt/",
              "https://www.geeksforgeeks.org/what-is-etl-process-in-data-warehouse/"
            ]
          },
          {
            "title": "Apache Airflow",
            "description": "Build and schedule data workflows using DAGs.",
            "resources": [
              "https://airflow.apache.org/docs/apache-airflow/stable/index.html",
              "https://towardsdatascience.com/apache-airflow-a-beginners-guide-4f2ec9e2d0ec"
            ]
          },
          {
            "title": "Apache Spark",
            "description": "Perform distributed data processing at scale.",
            "resources": [
              "https://spark.apache.org/docs/latest/",
              "https://databricks.com/spark/getting-started-with-apache-spark"
            ]
          },
          {
            "title": "Cloud Data Warehousing",
            "description": "Explore Redshift, Snowflake, and BigQuery.",
            "resources": [
              "https://cloud.google.com/bigquery/docs",
              "https://docs.snowflake.com/en/"
            ]
          },
          {
            "title": "Data Lake Architecture",
            "description": "Work with unstructured data using S3, Azure Data Lake, etc.",
            "resources": [
              "https://aws.amazon.com/big-data/datalakes-and-analytics/what-is-a-data-lake/",
              "https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction"
            ]
          },
          {
            "title": "Real-time Data Streaming",
            "description": "Use Kafka, Flink, or Kinesis for real-time processing.",
            "resources": [
              "https://kafka.apache.org/documentation/",
              "https://flink.apache.org/what-is-flink.html"
            ]
          }
        ]
      }
    ]
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB. Seeding data...");
    await Roadmap.deleteMany(); // Clear existing
    await Roadmap.insertMany(sampleRoadmaps);
    console.log("Seeding complete!");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
