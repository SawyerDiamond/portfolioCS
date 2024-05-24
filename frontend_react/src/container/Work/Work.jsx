import React, { useState, useEffect } from "react"; // Import useEffect

import "./Work.scss";
import { images, icons, links } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { urlFor, client } from "../../client";

const Work = () => {
  const [projects, setProjects] = useState([]);

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
          <div className="project__profile">
            {projects.map((project, index) => (
              <motion.div
                whileInView={{ opacity: 1 }}
                key={project.title + index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5, type: "tween" }}
                className="project__profile-item">
                <img src={urlFor(project.imgUrl)} alt={project.title} />
                <h3 className="project__profile-title">{project.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
