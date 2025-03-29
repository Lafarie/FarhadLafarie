import { useState } from "react";
import { useRef } from "react";
import me from "../assets/images/me.png";

function Home() {
  const [activeTab, setActiveTab] = useState("stats"); // State to track active tab

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // contact page
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const handleSendMessage = () => {
    const recipientEmail = "farhadlafarie@gmail.com";
    const subject = encodeURIComponent(subjectRef.current.value);
    const body = encodeURIComponent(messageRef.current.value);

    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <div id="home" className="pt-20 min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="relative w-80 h-80 mb-5">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 479 467" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha">
              <path d="M9.19025 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
            </mask>
            <g mask="url(#mask0)">
              <rect x="0" y="0" width="479" height="467" fill="red" />
              <image className="w-100 h-100" x="80" y="0" href={me} />
            </g>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3 text-center">Welcome to My Portfolio</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Hi, I'm Farhad Lafarie!</p>
        <p className="text-md text-gray-600 dark:text-gray-400 max-w-xl text-center">I'm a passionate developer with a focus on creating engaging and efficient user experiences. With a background in Software Engineering and a keen eye for design, I specialize in developing responsive, high-performing websites and applications using the latest web technologies. Explore my portfolio to see my work, projects, and more.</p>


        {/* Tabs */}
        <div className="w-auto min-w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-8">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select tab
            </label>
            <select id="tabs" className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => handleTabClick(e.target.value)} value={activeTab}>
              <option value="stats">Statistics</option>
              <option value="about">Services</option>
              <option value="faq">FAQ</option>
            </select>
          </div>
          <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400">
            <li className="w-full">
              <button id="stats-tab" onClick={() => handleTabClick("stats")} className={`inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none ${activeTab === "stats" ? "bg-gray-100" : ""} dark:bg-gray-700 dark:hover:bg-gray-600`}>
                Statistics
              </button>
            </li>
            <li className="w-full">
              <button id="about-tab" onClick={() => handleTabClick("about")} className={`inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none ${activeTab === "about" ? "bg-gray-100" : ""} dark:bg-gray-700 dark:hover:bg-gray-600`}>
                Services
              </button>
            </li>
            <li className="w-full">
              <button id="faq-tab" onClick={() => handleTabClick("faq")} className={`inline-block w-full p-4 rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none ${activeTab === "faq" ? "bg-gray-100" : ""} dark:bg-gray-700 dark:hover:bg-gray-600`}>
                FAQ
              </button>
            </li>
          </ul>
          <div className=" border-t border-gray-200 dark:border-gray-600 p-4">
            <div className={`${activeTab === "stats" ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}>
              <dl className="flex flex-col sm:flex-row items-center justify-center gap-8 p-4 mx-auto text-gray-900 dark:text-white sm:p-8 text-center max-w-screen-xl">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">10+</dt>
                  <dd className="text-gray-500 dark:text-gray-400 text-1xl">Projects</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">15+</dt>
                  <dd className="text-gray-500 dark:text-gray-400 text-1xl">
                    Programing<br></br> Languages
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">3+</dt>
                  <dd className="text-gray-500 dark:text-gray-400 text-1xl">
                    Years of<br></br> Experience
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">5+</dt>
                  <dd className="text-gray-500 dark:text-gray-400 text-1xl">
                    Happy<br></br> Clients
                  </dd>
                </div>
              </dl>
            </div>
            <div className={`${activeTab === "about" ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}>
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Services</h2>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">full-stack web development</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">Mobile development</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">website management & Services</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">UI/UX development</span>
                </li>
              </ul>
            </div>
            <div className={`${activeTab === "faq" ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}>
              <dl className="space-y-6 text-gray-500 dark:text-gray-400">
                <div>
                  <dt className="font-semibold">Nobody didn't ask question yet😅.</dt>
                  {/* <dd className="mt-2">A: Just click the "Get Started" button above!</dd> */}
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* projects */}

      <div id="projects" className="min-h-screen mt-18 p-10 dark:bg-gray-800 dark:border-gray-700">
        {/* Responsive grid setup */}
        <h2 className="mb-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div class="max-w-sm max-h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="https://aiducator.vercel.app/">
              <img class="rounded-t-lg w-full max-h-40 min-h-36" src="https://i.ibb.co/MSTKtD5/Screenshot-2024-07-11-at-9-22-37-AM.png" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AIducator 2024</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                This 3D eLearning platform to teach students more efficiently and this is my biggest project i have done during my academic years. here what we used <b>vite.js, Node,js, Express and chatGPT API</b> by using all of these we manage to make a 3D eLearning platform.
              </p>
              <a href="https://aiducator.vercel.app/" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Website
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
          <div class="max-w-sm max-h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg w-full max-h-40 min-h-36" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK21JiYnXoWX-FOTfqA7w8L3oXv1cq_9ZcVg&s" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">UniConnect 2024</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                This is a ongoing project to help all type students and lecturers connect in place and share your knowlage and help each other. here what I used <b>Flutter</b>
              </p>
            </div>
          </div>
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg w-full max-h-40 min-h-36" src="https://play-lh.googleusercontent.com/MWV1erZURmTaeXGj29ZLWMSo_7DB92q3IL71lDSRooqbb3qidsa4c9DJ0_jEQgOeXEQ=w416-h235-rw" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">WhatsApp bot 2022</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                This is a small project to create a bot for whatsapp. here what I used <b>Node.js</b>
              </p>
            </div>
          </div>
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg w-full max-h-40 min-h-40" src="https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2023/08/1-1.webp?ssl=1&quality=80&w=f" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Telegram bot 2022</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                This is a small project to create a bot for Telegram. here what I used <b>Python</b>
              </p>
            </div>
          </div>
          <div class="max-w-sm max-h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg w-full max-h-40 min-h-36" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmRBmntSxZh99CBluc1Y-1vEERXQc9HqBbFg&s" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">WordPress 2021</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                This movie share website build using WordPress. here what I used <b>WordPress</b>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* contact */}
      <section id="contact" className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Me</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to talk about your future projects? Need details about our Business plan? Let us know.</p>
          <form className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your email
              </label>
              <input ref={emailRef} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@email.com" required />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Subject
              </label>
              <input ref={subjectRef} type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Your message
              </label>
              <textarea ref={messageRef} id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button type="button" onClick={handleSendMessage} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-red-700 sm:w-fit hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Home;
