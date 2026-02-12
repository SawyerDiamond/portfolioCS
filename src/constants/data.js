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
    description:
      "Built from scratch to display my accomplishments in a simple yet elegant manner. ",
    imgUrl: portfolioThumb,
    images: [portfolioTool1, portfolioTool2],
  },
  {
    title: "Jobsite",
    codeLink: "https://github.com/SawyerDiamond/jobsite",
    description:
      "A modern internship application hub to get your career kickstarted. ",
    imgUrl: jobsiteThumb,
    images: [
      jobsiteTool1,
      jobsiteTool2,
      jobsiteTool3,
      jobsiteTool4,
      jobsiteTool5,
    ],
  },
];
