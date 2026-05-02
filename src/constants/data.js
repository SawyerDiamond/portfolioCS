// Icons used in project descriptions only
import cssIcon from "../assets/skills/css.svg";
import scssIcon from "../assets/skills/scss.svg";
import typescriptIcon from "../assets/skills/typescript.png";
import reactIcon from "../assets/skills/react.svg";
import vueIcon from "../assets/skills/vue.svg";
import awsIcon from "../assets/skills/aws.svg";
import mapboxIcon from "../assets/skills/mapbox.svg";
import gitIcon from "../assets/skills/git.svg";
import pythonIcon from "../assets/skills/python.svg";
import plotlyIcon from "../assets/skills/plotly.svg";
import geminiIcon from "../assets/skills/gemini.svg";
import tailwindIcon from "../assets/skills/tailwind.svg";

// Project images
import portfolioThumb from "../assets/projects/portfolio-thumb.png";
import portfolioTool1 from "../assets/projects/portfolio-tool-1.svg";
import portfolioTool2 from "../assets/projects/portfolio-tool-2.svg";
import jobsiteThumb from "../assets/projects/jobsite-thumb.webp";
import jobsiteTool1 from "../assets/projects/jobsite-tool-1.png";
import jobsiteTool2 from "../assets/projects/jobsite-tool-2.png";
import jobsiteTool3 from "../assets/projects/jobsite-tool-3.svg";
import jobsiteTool4 from "../assets/projects/jobsite-tool-4.svg";
import jobsiteTool5 from "../assets/projects/jobsite-tool-5.png";
import mappingAmericaThumb from "../assets/MappingAmerica/mapping-america-thumb.png";
import mappingAmericaMap from "../assets/MappingAmerica/map-view.png";
import mappingAmericaDetail from "../assets/MappingAmerica/detail-view.png";
import mappingAmericaSubmit from "../assets/MappingAmerica/submission-flow.png";
import mappingAmericaSS1 from "../assets/MappingAmerica/screenshot-2026-04-30-23-50-02.png";
import mappingAmericaSS2 from "../assets/MappingAmerica/screenshot-2026-04-30-23-50-11.png";
import mappingAmericaSS3 from "../assets/MappingAmerica/screenshot-2026-04-30-23-53-40.png";
import queryEngineThumb from "../assets/queryEngine/query-engine-square.png";
import editorView from "../assets/queryEngine/editor-view.png";
import schemaBrowser from "../assets/queryEngine/schema-browser.png";
import dataViz from "../assets/queryEngine/data-viz.png";
import queryHistory from "../assets/queryEngine/query-history.png";

import {
  Python,
  Java,
  Go,
  Postgresql,
  _React as ReactDI,
  _Vue as VueDI,
  NextjsIcon,
  NuxtIcon,
  TailwindIcon,
  GitIcon,
  DockerIcon,
  Figma,
  Vitest,
  CursorIcon,
  GoogleCloud,
  FirebaseIcon,
} from "@dev.icons/react";

import ilsLogo from "../assets/logos/ils_logo.png";
import gmuLogo from "../assets/logos/gmu_logo.png";
import gwuLogo from "../assets/logos/gwu_logo.png";

const DV = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";
const D = "https://cdn.jsdelivr.net/gh/xandemon/developer-icons/icons/";

export const skillGroups = [
  {
    label: "Web",
    items: [
      { name: "HTML", src: `${DV}html5/html5-original.svg` },
      { name: "CSS", src: `${DV}css3/css3-original.svg` },
      { name: "Tailwind", Icon: TailwindIcon },
      { name: "JavaScript", src: `${DV}javascript/javascript-original.svg`, rounded: true },
      { name: "TypeScript", src: `${DV}typescript/typescript-original.svg`, rounded: true },
    ],
  },
  {
    label: "Languages",
    items: [
      { name: "Python", Icon: Python },
      { name: "Java", Icon: Java },
      { name: "Kotlin", src: `${DV}kotlin/kotlin-original.svg`, small: true },
      { name: "Go", Icon: Go },
      { name: "SQL", Icon: Postgresql },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React", Icon: ReactDI },
      { name: "Vue", Icon: VueDI },
      { name: "Next.js", Icon: NextjsIcon },
      { name: "Nuxt.js", Icon: NuxtIcon },
      { name: "Node.js", src: `${DV}nodejs/nodejs-original.svg` },
    ],
  },
  {
    label: "Tooling",
    items: [
      { name: "Three.js", src: `${D}threejs-light.svg` },
      { name: "Git", Icon: GitIcon },
      { name: "Figma", Icon: Figma },
      { name: "Vitest", Icon: Vitest },
      { name: "Cursor", Icon: CursorIcon },
    ],
  },
  {
    label: "Cloud",
    items: [
      { name: "AWS", src: `${DV}amazonwebservices/amazonwebservices-plain-wordmark.svg` },
      { name: "Google Cloud", Icon: GoogleCloud },
      { name: "Firebase", Icon: FirebaseIcon },
      { name: "Docker", Icon: DockerIcon },
      { name: "Elastic", src: `${DV}elasticsearch/elasticsearch-original.svg`, small: true },
    ],
  },
];

export const workHistory = [
  {
    period: "Feb 2025 — Present",
    title: "Software Developer",
    company: "Integrated Lifecycle Solutions",
    location: "Reston, VA",
    description:
      "Built SaaS dashboards in Vue/Nuxt.js with Elasticsearch APIs, shipped Go REST APIs, and an AI-powered semantic vector search service. Built a reusable Storybook component library and used Elastic APM telemetry to improve dashboard usability.",
    logo: ilsLogo,
  },
  {
    period: "Aug — Dec 2024",
    title: "Frontend Developer Intern",
    company: "GMU Legal Systems Policy Lab",
    location: "Fairfax, VA",
    description:
      "Shipped features in TypeScript/React/Next.js, built Node.js data pipelines, and integrated Firebase and Vertex AI across 2000+ bills. Ran user research with stakeholders and iterated on Figma prototypes to refine interface workflows.",
    logo: gmuLogo,
  },
  {
    period: "Expected December 2026",
    title: "Bachelor's in Computer Science & Interaction Design",
    company: "George Washington University",
    location: "Washington, DC",
    description:
      "Coursework in Algorithms, Software Engineering, Database Systems, Human-Centered Design, and Computer Systems. Focus on the intersection of technical depth and user-centered product thinking.",
    logo: gwuLogo,
    isEducation: true,
  },
];

export const projects = [
  {
    title: "Mapping America",
    projectLink: "https://gwhatchet.com/2026/04/23/corcoran-students-commemorate-americas-250th-year-with-interactive-art-exhibit/",
    description: "An interactive museum kiosk for the 'American Made' exhibit at the Corcoran School of the Arts & Design.",
    imgUrl: mappingAmericaThumb,
    images: [vueIcon, mapboxIcon, awsIcon, typescriptIcon],
    showDescription: true,
    detailedDescription: `
      <h2>The Exhibition</h2>
      <p>
        Commissioned for the <strong>"American Made"</strong> exhibition at the Corcoran School of the Arts & Design, <em>Mapping America</em> is a participatory digital installation commemorating the United States' 250th anniversary. The exhibit frames the nation as an "unfinished story," inviting visitors to move beyond passive observation and contribute their own perspectives to the national narrative.
      </p>

      <h3>Interactive Storytelling</h3>
      <p>
        The kiosk features a massive touchscreen interface where visitors can explore a geo-located collection of community-submitted memories. I designed the interaction to be visceral and intuitive: visitors can spin the globe, dive into specific regions, and open "memory pins" that reveal personal photos and stories from across the 50 states and US territories. Built with <span class="tech-chip"><img src="${vueIcon}" alt="Vue" />Vue 3</span> and <span class="tech-chip"><img src="${mapboxIcon}" alt="Mapbox" />Mapbox GL JS</span> for a seamless 60fps experience.
      </p>
      <img src="${mappingAmericaMap}" alt="Mapping America Interactive Globe" class="inline-img" />

      <h3>The "Human" Backend</h3>
      <p>
        To bridge the gap between the gallery floor and the digital world, I built a dual-app ecosystem using <span class="tech-chip"><img src="${typescriptIcon}" alt="TypeScript" />TypeScript</span>. Visitors use their own devices to scan a QR code at the kiosk, which launches a mobile submission flow. 
      </p>

      <p>
        The mobile experience is a lightweight <span class="tech-chip"><img src="${vueIcon}" alt="Vue" />Vue</span> application designed for speed and accessibility. It guides users through capturing a photo and sharing their story, featuring a minimal, high-contrast UI that mirrors the kiosk's aesthetic while being optimized for one-handed use on the move.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; margin: 1.25rem 0; width: 100%;">
        <img src="${mappingAmericaSS1}" alt="Mobile App Screenshot 1" class="inline-img" style="margin: 0; width: 100%; height: auto;" />
        <img src="${mappingAmericaSS2}" alt="Mobile App Screenshot 2" class="inline-img" style="margin: 0; width: 100%; height: auto;" />
        <img src="${mappingAmericaSS3}" alt="Mobile App Screenshot 3" class="inline-img" style="margin: 0; width: 100%; height: auto;" />
      </div>

      <img src="${mappingAmericaSubmit}" alt="Mobile Submission Flow" class="inline-img" />
      <img src="${mappingAmericaDetail}" alt="Memory Detail View" class="inline-img" />

      <h3>Technical Architecture</h3>
      <p>
        The frontend is packaged as a cross-platform desktop binary using <strong>Tauri (Rust)</strong>, running on a Raspberry Pi 5 hidden within the kiosk furniture. This setup provides the performance of a native app with the flexibility of web technologies.
      </p>
      
      <p>
        The backend is a robust serverless architecture built on <span class="tech-chip"><img src="${awsIcon}" alt="AWS" />AWS</span>. I used <span class="tech-chip"><img src="${pythonIcon}" alt="Python" />Python</span> Lambda functions and <strong>Amazon Rekognition</strong> to implement automated content moderation. This ensures that every public submission is screened for exhibit-appropriateness in real-time before being persisted to <strong>S3</strong> and <strong>DynamoDB</strong>.
      </p>

      <blockquote>
        "The exhibit frames the United States as an 'unfinished story' and explore the evolving definition of what it means to be American." — The GW Hatchet
      </blockquote>
    `,
  },
  {
    title: "Portfolio",
    projectLink: "https://sawyerdiamond.xyz/",
    codeLink: "https://github.com/SawyerDiamond/portfolioCS",
    description: "Elegant portfolio built from scratch. I designed this to showcase my work and skills.",
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
    title: "Query Engine",
    projectLink:
      "https://699e489ed786af9bc27a0dea--statuesque-swan-265767.netlify.app",
    description:
      "An AI-powered SQL interface translating natural language to optimized queries.",
    imgUrl: queryEngineThumb,
    images: [geminiIcon, pythonIcon, typescriptIcon, reactIcon, tailwindIcon],
    showDescription: true,
    detailedDescription: `
      <h2>The Vision</h2>
      <p>
        Building a bridge between business intent and database execution. <strong>Query Engine</strong> allows users to extract complex insights without needing to write or understand SQL.
      </p>

      <h3>Natural Language to SQL</h3>
      <p>
        The core experience centers on a "Human-in-the-loop" design. Powered by the <span class="tech-chip"><img src="${geminiIcon}" alt="Gemini" />Gemini API</span> and <span class="tech-chip"><img src="${pythonIcon}" alt="Python" />Python</span>, user prompts are translated into optimized SQL in real-time. I designed the interface to provide immediate visual feedback, allowing users to see their natural language evolve into technical logic instantly.
      </p>
      <img src="${editorView}" alt="Natural Language Interface" class="inline-img" />

      <h3>High-Performance Editor & UX</h3>
      <p>
        Built with <span class="tech-chip"><img src="${reactIcon}" alt="React" />React</span> and <span class="tech-chip"><img src="${tailwindIcon}" alt="Tailwind" />Tailwind CSS</span>, I developed a robust editor with syntax highlighting and schema-aware autocomplete. The design philosophy was "Terminal-plus"—the speed and precision of a CLI with the affordances of a modern GUI. I intentionally integrated the schema browser and query history to maintain a unified workspace, ensuring that data context is always just a glance away.
      </p>
      
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin: 1.25rem 0; width: 100%;">
        <div style="min-width: 0;">
          <img src="${queryHistory}" alt="Authentication and Query History" class="inline-img" style="width: 100%; height: 100%; object-fit: cover; object-position: left; margin: 0;" />
        </div>
        <div style="min-width: 0;">
          <img src="${schemaBrowser}" alt="User Profile and Personalization" class="inline-img" style="width: 100%; height: auto; margin: 0; object-fit: contain;" />
        </div>
      </div>

      <h3>Data Storytelling</h3>
      <p>
        Design isn't just how it looks, but how it works. I prioritized a clean visual hierarchy where raw data is instantly transformed into interactive visualizations. Every design choice—from the micro-interactions in the editor to the precise spacing of the results table—was made to minimize cognitive load. The "Dark-Glass" aesthetic creates a focused, high-contrast environment that highlights the data without distractions.
      </p>
      <img src="${dataViz}" alt="Data Visualizations" class="inline-img" />
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
];
