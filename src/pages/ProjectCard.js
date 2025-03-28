import React from "react";

function ProjectCard({ title, description, imageUrl }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
      <img src={imageUrl} alt={title} className="rounded-lg mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default ProjectCard;
