function ProjectCard({ project, delay }) {
  return (
    <div
      className={`project-card bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full overflow-hidden`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <a href={project.link} className="h-48 overflow-hidden group">
        <img
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          src={project.image}
          alt={project.title}
        />
      </a>
      <div className="p-5 flex flex-col flex-grow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {project.title}
        </h5>
        <p className="mb-3 flex-grow text-gray-700 dark:text-gray-400">
          {project.description}
        </p>
        {project.status && (
          <span
            className={`inline-block px-3 py-1 text-xs font-medium text-white ${
              project.status === "Completed" ? "bg-green-500" : "bg-yellow-500"
            } rounded-full`}
          >
            {project.status}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
