// Skills icons
import htmlIcon from "../assets/sanity-content/skills/html.svg";
import cssIcon from "../assets/sanity-content/skills/css.svg";
import scssIcon from "../assets/sanity-content/skills/scss.svg";
import javascriptIcon from "../assets/sanity-content/skills/javascript.svg";
import typescriptIcon from "../assets/sanity-content/skills/typescript.png";
import reactIcon from "../assets/sanity-content/skills/react.svg";
import nodejsIcon from "../assets/sanity-content/skills/nodejs.png";
import nextjsIcon from "../assets/sanity-content/skills/nextjs.png";
import tailwindIcon from "../assets/sanity-content/skills/tailwind.svg";
import postgresqlIcon from "../assets/sanity-content/skills/postgresql.png";
import figmaIcon from "../assets/sanity-content/skills/figma.svg";
import javaIcon from "../assets/sanity-content/skills/java.svg";
import gitIcon from "../assets/sanity-content/skills/git.svg";
import supabaseIcon from "../assets/sanity-content/skills/supabase.svg";
import firebaseIcon from "../assets/sanity-content/skills/firebase.svg";

// Project images
import portfolioThumb from "../assets/sanity-content/projects/portfolio-thumb.webp";
import portfolioTool1 from "../assets/sanity-content/projects/portfolio-tool-1.svg";
import portfolioTool2 from "../assets/sanity-content/projects/portfolio-tool-2.svg";
import jobsiteThumb from "../assets/sanity-content/projects/jobsite-thumb.webp";
import jobsiteTool1 from "../assets/sanity-content/projects/jobsite-tool-1.png";
import jobsiteTool2 from "../assets/sanity-content/projects/jobsite-tool-2.png";
import jobsiteTool3 from "../assets/sanity-content/projects/jobsite-tool-3.svg";
import jobsiteTool4 from "../assets/sanity-content/projects/jobsite-tool-4.svg";
import jobsiteTool5 from "../assets/sanity-content/projects/jobsite-tool-5.png";
const queryEngineThumb = "/QueryEngine_Thumb.png";
const queryEngineArticle1 = "/699e489ed786af9bc27a0dea--statuesque-swan-265767.netlify.app_.png";
const queryEngineArticle2 = "/699e489ed786af9bc27a0dea--statuesque-swan-265767.netlify.app_ (2).png";
import pythonIcon from "../assets/sanity-content/skills/python.svg";
import plotlyIcon from "../assets/sanity-content/skills/plotly.svg";
import geminiIcon from "../assets/sanity-content/skills/gemini.svg";

export const skills = [
  { name: "HTML", icon: htmlIcon, order: 1 },
  { name: "CSS", icon: cssIcon, order: 2 },
  { name: "SCSS", icon: scssIcon, order: 3 },
  { name: "Javascript", icon: javascriptIcon, order: 4 },
  { name: "TypeScript", icon: typescriptIcon, order: 5 },
  { name: "React", icon: reactIcon, order: 6 },
  { name: "NodeJS", icon: nodejsIcon, order: 7 },
  { name: "NextJS", icon: nextjsIcon, order: 8 },
  { name: "Tailwind", icon: tailwindIcon, order: 9 },
  { name: "PostgreSQL", icon: postgresqlIcon, order: 10 },
  { name: "Figma", icon: figmaIcon, order: 11 },
  { name: "Java", icon: javaIcon, order: 12 },
  { name: "Git", icon: gitIcon, order: 13 },
  { name: "Supabase", icon: supabaseIcon, order: 14 },
  { name: "Firebase", icon: firebaseIcon, order: 15 },
];

export const projects = [
  {
    title: "Portfolio",
    projectLink: "https://sawyerdiamond.xyz/",
    codeLink: "https://github.com/SawyerDiamond/portfolioCS",
    description: "Elegant portfolio built from scratch.",
    imgUrl: portfolioThumb,
    images: [portfolioTool1, portfolioTool2],
    showDescription: true,
    detailedDescription: `
      <h2>How it came together</h2>
      <p>
        I started this from a blank <span class="tech-chip"><img src="${reactIcon}" alt="React" />React</span> project
        and basically figured out the design as I went. No mockup, no Figma file, just vibes
        and a lot of tweaking in the browser.
      </p>

      <img src="${portfolioThumb}" alt="Portfolio preview" class="inline-img" />

      <h3>Styling</h3>
      <p>
        All the styles are in <span class="tech-chip"><img src="${scssIcon}" alt="SCSS" />SCSS</span>
        with a custom variable system for colors, which made swapping between theme iterations a lot
        less painful. Each background layer (primary, secondary, tertiary) is a separate class tied to
        a CSS variable, so I could experiment with the palette without hunting through component files.
      </p>

      <h3>Animations</h3>
      <p>
        Framer Motion handles most of the animations. I pulled the scroll-triggered entry config into
        a shared <code>useMotionAnimation</code> hook pretty early on once I realized I was copying the
        same props into every section. Saved a lot of repeat code.
      </p>

      <h3>Layout</h3>
      <p>
        The project grid is pure <span class="tech-chip"><img src="${cssIcon}" alt="CSS" />CSS</span>
        named-area grid. I wanted to avoid any JS-driven layout logic for something that
        <code>grid-template-areas</code> handles perfectly well on its own.
      </p>

      <h3>Deployment</h3>
      <p>
        Pushed automatically to GitHub Pages on every merge to <code>main</code> via a
        <span class="tech-chip"><img src="${gitIcon}" alt="Git" />GitHub Actions</span>
        workflow. Pretty simple setup, zero servers to worry about.
      </p>
    `,
  },
  {
    title: "Jobsite",
    codeLink: "https://github.com/SawyerDiamond/jobsite",
    description:
      "A modern internship application hub to get your career kickstarted. ",
    imgUrl: jobsiteThumb,
    showDescription: false,
    images: [
      jobsiteTool1,
      jobsiteTool2,
      jobsiteTool3,
      jobsiteTool4,
      jobsiteTool5,
    ],
    detailedDescription: `
      <h2>The Problem Space</h2>
      <p>Finding an internship can be a daunting, fragmented experience. Jobsite is a unified platform created to centralize and simplify the search for modern tech internships.</p>
      
      <h3>User Experience First</h3>
      <img src="${jobsiteThumb}" alt="Jobsite Dashboard" />
      <p>We prioritized an intuitive dashboard that lets students sort, track, and apply to roles with minimal friction. The entire flow features soft UI queues, micro-interactions, and instant feedback.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Real-time application tracking</li>
        <li>Streamlined search mechanics</li>
        <li>Responsive, mobile-friendly interface</li>
      </ul>
      <img src="${jobsiteThumb}" alt="Jobsite Search" />
    `,
  },
  {
    title: "Query Engine",
    projectLink:
      "https://699e489ed786af9bc27a0dea--statuesque-swan-265767.netlify.app",
    description:
      "An AI-powered SQL interface translating natural language to optimized queries.",
    imgUrl: queryEngineThumb,
    images: [geminiIcon, pythonIcon, typescriptIcon, reactIcon, plotlyIcon],
    showDescription: true,
    detailedDescription: `
      <h2>The Vision</h2>
      <p>
        Building a bridge between business intent and database execution. <strong>Query Engine</strong> allows users to extract complex insights without needing to write or understand SQL.
      </p>
      
      <h3>Natural Language to SQL</h3>
      <p>
        Powered by an advanced AI backend using the <span class="tech-chip"><img src="${geminiIcon}" alt="Gemini" />Gemini API</span>, user prompts are parsed and translated into optimized, context-aware SQL queries in real-time. 
      </p>
      <img src="${queryEngineArticle1}" alt="Natural Language Interface" class="inline-img" />

      <h3>Full-Featured Editor</h3>
      <p>
        A robust editor provides syntax highlighting, auto-optimization, and intelligent schema-aware autocomplete, making it perfect for both technical and non-technical users. Built with <span class="tech-chip"><img src="${typescriptIcon}" alt="TypeScript" />TypeScript</span>, <span class="tech-chip"><img src="${reactIcon}" alt="React" />React</span>, and <span class="tech-chip"><img src="${pythonIcon}" alt="Python" />Python</span>.
      </p>
      <img src="${queryEngineArticle2}" alt="SQL Code Editor" class="inline-img" />

      <h3>Dynamic Visualizations</h3>
      <p>
        Raw data is instantly transformed into interactive charts and graphs using <span class="tech-chip"><img src="${plotlyIcon}" alt="Plotly" />Plotly</span>, allowing for seamless exploration and export.
      </p>
    `,
  },
];
