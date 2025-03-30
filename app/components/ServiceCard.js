function ServiceCard({ service }) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all">
      <div className="flex items-center mb-2">
        <svg
          className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="font-medium text-gray-800 dark:text-white">
          {service.title}
        </span>
      </div>
      <p className="ml-7 text-gray-600 dark:text-gray-300">{service.description}</p>
    </div>
  );
}

export default ServiceCard;
