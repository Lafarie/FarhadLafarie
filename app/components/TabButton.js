function TabButton({ id, activeTab, tabId, onClick, onClose, children }) {
  return (
    <li className="w-full">
      <button
        id={id}
        onClick={() => {
          onClick(tabId);
          onClose();
        }}
        className={`inline-block w-full p-4 transition-colors duration-200 ${
          activeTab === tabId
            ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400"
            : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
        }`}
      >
        {children}
      </button>
    </li>
  );
}

export default TabButton;
