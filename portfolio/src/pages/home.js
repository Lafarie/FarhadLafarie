import React, { useState } from "react";
import me from "../assets/images/me.png";

function Home() {
  const [activeTab, setActiveTab] = useState("stats"); // State to track active tab

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="relative w-80 h-80 mb-5">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 479 467"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="mask0" mask-type="alpha">
            <path d="M9.19025 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
          </mask>
          <g mask="url(#mask0)">
            <rect x="0" y="0" width="479" height="467" fill="red" />
            <image className="w-100 h-100" x="80" y="0" href={me} />
          </g>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3 text-center">
        Welcome to My Portfolio
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
        Hi, I'm Farhad Lafarie!
      </p>
      <p className="text-md text-gray-600 dark:text-gray-400 max-w-xl text-center">
        I'm a passionate developer with a focus on creating engaging and
        efficient user experiences. With a background in Software Engineering
        and a keen eye for design, I specialize in developing responsive,
        high-performing websites and applications using the latest web
        technologies. Explore my portfolio to see my work, projects, and more.
      </p>

      <div className="w-11/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-8">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select tab
          </label>
          <select
            id="tabs"
            className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleTabClick(e.target.value)}
            value={activeTab}
          >
            <option value="stats">Statistics</option>
            <option value="about">Services</option>
            <option value="faq">FAQ</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400">
          <li className="w-full">
            <button
              id="stats-tab"
              onClick={() => handleTabClick("stats")}
              className={`inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none ${
                activeTab === "stats" ? "bg-gray-100" : ""
              } dark:bg-gray-700 dark:hover:bg-gray-600`}
            >
              Statistics
            </button>
          </li>
          <li className="w-full">
            <button
              id="about-tab"
              onClick={() => handleTabClick("about")}
              className={`inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none ${
                activeTab === "about" ? "bg-gray-100" : ""
              } dark:bg-gray-700 dark:hover:bg-gray-600`}
            >
              Services
            </button>
          </li>
          <li className="w-full">
            <button
              id="faq-tab"
              onClick={() => handleTabClick("faq")}
              className={`inline-block w-full p-4 rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none ${
                activeTab === "faq" ? "bg-gray-100" : ""
              } dark:bg-gray-700 dark:hover:bg-gray-600`}
            >
              FAQ
            </button>
          </li>
        </ul>
        <div className=" border-t border-gray-200 dark:border-gray-600 p-4">
          <div
            className={`${
              activeTab === "stats" ? "" : "hidden"
            } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          >

            <dl className="flex justify-center content-center max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-5xl font-extrabold">10+</dt>
                <dd className="text-gray-500 dark:text-gray-400 text-2xl">Projects</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-5xl font-extrabold">15+</dt>
                <dd className="text-gray-500 dark:text-gray-400 text-2xl">Programing<br></br> Lanuages</dd>
              </div>
              
              
            </dl>
          </div>
          <div
            className={`${
              activeTab === "about" ? "" : "hidden"
            } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          >
            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Services
            </h2>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">
                 full-stack web development
                </span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Mobile development</span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">website management & Services</span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">UI/UX development</span>
              </li>
            </ul>
          </div>
          <div
            className={`${
              activeTab === "faq" ? "" : "hidden"
            } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          >
            <dl className="space-y-6 text-gray-500 dark:text-gray-400">
              <div>
                <dt className="font-semibold">Nobody didn't ask question yet</dt>
                {/* <dd className="mt-2">A: Just click the "Get Started" button above!</dd> */}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    //skills
    
  );
}

export default Home;
