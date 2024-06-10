import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

import { Wrap } from "../../wrapper";
import "./Projects.scss";
import { icons } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { urlFor, client } from "../../client";

const Projects = React.memo(() => {
  const { isMobile } = useDeviceDetect();

  //Sets logic for clicking on project items
  const itemRef = useRef();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Sets logic for inputs into the projects grid and removes filler from mobile site.
  const [projects, setProjects] = useState([]);
  const getItemClass = useCallback(
    (project) => {
      return isMobile && !project.projectLink ? "hidden" : "project__item";
    },
    [isMobile]
  );
  useEffect(() => {
    const query = '*[_type == "projects"]';

    client.fetch(query).then((data) => {
      setProjects(data);
    });
  }, []);

  return (
    <section className="project">
      <div className="project__container">
        <div className="project__header">
          <img src={icons.ProjectsHeader} alt="Header Icon" />
          <h1>Projects</h1>
        </div>
        <div className="project__grid">
          {projects.map((project, index) => (
            <motion.div
              ref={itemRef}
              whileInView={{ opacity: 1 }}
              key={project.title ? project.title + index : index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut", type: "tween" }}
              className={getItemClass(project)}>
              <img src={urlFor(project.imgUrl)} alt={project.title} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                whileHover={{ opacity: 1 }}
                whileTap={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                  staggerChildren: 0.5,
                }}
                onClick={() => setIsActive(!isActive)}
                className={project.codeLink ? "project__item--hover" : ""}>
                <a href={project.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="project__item--hover-link">
                    <img src={icons.Link} alt="View Code" />
                  </motion.div>
                </a>
                <a href={project.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="project__item--hover-github">
                    <img src={icons.GitHub} alt="View Code" />
                  </motion.div>
                </a>
              </motion.div>
              <h2 className="project__title">{project.title}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Wrap(Projects, "Projects");
