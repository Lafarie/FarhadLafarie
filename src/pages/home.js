import { useState, useEffect, useRef } from "react";
import me from "../assets/images/me.png";

function Home() {
  const [activeTab, setActiveTab] = useState("stats");
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [countStats, setCountStats] = useState({ projects: 0, languages: 0, years: 0, clients: 0 });
  const [animatedElements, setAnimatedElements] = useState({});
  const fullText = "Hi, I'm Farhad Lafarie!";
  
  // Refs for different sections
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const statsRef = useRef(null);
  
  // Refs for form fields
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    setIsVisible(true);
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimatedElements(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
          
          // Start counting animation for stats when stats section becomes visible
          if (entry.target.id === 'stats-section' && !countStats.counted) {
            animateStats();
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Observe elements
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.id = `project-${index}`;
      observer.observe(card);
    });
    
    return () => observer.disconnect();
  }, []);

  // Animate counting for statistics
  const animateStats = () => {
    const duration = 2000; // 2 seconds
    const frameRate = 50; // 50 updates per second
    const totalFrames = duration / (1000 / frameRate);
    
    const finalValues = { projects: 10, languages: 15, years: 3, clients: 5 };
    let frame = 0;
    
    const interval = setInterval(() => {
      if (frame < totalFrames) {
        const progress = frame / totalFrames;
        setCountStats({
          projects: Math.ceil(progress * finalValues.projects),
          languages: Math.ceil(progress * finalValues.languages),
          years: Math.ceil(progress * finalValues.years),
          clients: Math.ceil(progress * finalValues.clients),
          counted: true
        });
        frame++;
      } else {
        setCountStats({
          projects: finalValues.projects,
          languages: finalValues.languages,
          years: finalValues.years,
          clients: finalValues.clients,
          counted: true
        });
        clearInterval(interval);
      }
    }, 1000 / frameRate);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSendMessage = () => {
    const emailElement = document.getElementById('email-form');
    emailElement.classList.add('shake-animation');
    setTimeout(() => emailElement.classList.remove('shake-animation'), 500);
    
    const recipientEmail = "farhadlafarie@gmail.com";
    const subject = encodeURIComponent(subjectRef.current.value);
    const body = encodeURIComponent(messageRef.current.value);

    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <style jsx="true">{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeSlideRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .fade-slide-up {
          animation: fadeSlideUp 0.8s ease-out forwards;
        }
        
        .fade-slide-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
        }
        
        .fade-slide-right {
          animation: fadeSlideRight 0.8s ease-out forwards;
        }
        
        .scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        
        .typing-cursor::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .project-card-animated {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s, transform 0.5s;
        }
        
        .project-card-animated.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div id="home" className="mt-12 pt-20 min-h-screen bg-black bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4 md:p-8">
        <div className={`transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative w-56 h-56 md:w-72 md:h-72 mb-8 overflow-visible float-animation">
            <svg className="absolute top-0 left-0 w-full h-full animate-pulse-slow" viewBox="-60 -60 600 584" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0" mask-type="alpha">
                <path d="M9.19025 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
              </mask>
              <g mask="url(#mask0)">
                <rect x="-60" y="-60" width="600" height="584" className="fill-red-600 dark:fill-red-500">
                  <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
                </rect>
                <image 
                  className="hover:scale-105 transition-transform duration-500" 
                  x="70" 
                  y="60" 
                  width="400" 
                  height="584" 
                  preserveAspectRatio="xMidYMid slice" 
                  href={me} 
                />
              </g>
            </svg>
          </div>
        </div>
        
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ease-in-out delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 fade-slide-up">Welcome to My Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-3 font-medium typing-cursor">
            {typedText}
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center mb-6 leading-relaxed fade-slide-up stagger-2">I'm a passionate developer with a focus on creating engaging and efficient user experiences. With a background in Software Engineering and a keen eye for design, I specialize in developing responsive, high-performing websites and applications using the latest web technologies.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 mb-10 fade-slide-up stagger-3">
            <a href="#projects" className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-all transform hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-xl">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                View My Projects
              </span>
            </a>
            <a href="#contact" className="px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-all transform hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-xl">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contact Me
              </span>
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 mt-8 transition-all hover:shadow-xl fade-slide-up stagger-4">
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
              <button id="stats-tab" onClick={() => handleTabClick("stats")} className={`inline-block w-full p-4 rounded-tl-lg transition-colors duration-200 ${activeTab === "stats" ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"}`}>
                Statistics
              </button>
            </li>
            <li className="w-full">
              <button id="about-tab" onClick={() => handleTabClick("about")} className={`inline-block w-full p-4 transition-colors duration-200 ${activeTab === "about" ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"}`}>
                Services
              </button>
            </li>
            <li className="w-full">
              <button id="faq-tab" onClick={() => handleTabClick("faq")} className={`inline-block w-full p-4 rounded-tr-lg transition-colors duration-200 ${activeTab === "faq" ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"}`}>
                FAQ
              </button>
            </li>
          </ul>
          <div className="border-t border-gray-200 dark:border-gray-600">
            <div id="stats-section" ref={statsRef} className={`${activeTab === "stats" ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}>
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4 mx-auto text-gray-900 dark:text-white sm:p-8 text-center max-w-screen-xl">
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 scale-in stagger-1">
                  <dt className="mb-2 text-4xl font-extrabold text-red-600 dark:text-red-400">{countStats.projects}+</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-lg">Projects</dd>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 scale-in stagger-2">
                  <dt className="mb-2 text-4xl font-extrabold text-red-600 dark:text-red-400">{countStats.languages}+</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-lg">Programming Languages</dd>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 scale-in stagger-3">
                  <dt className="mb-2 text-4xl font-extrabold text-red-600 dark:text-red-400">{countStats.years}+</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-lg">Years of Experience</dd>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 scale-in stagger-4">
                  <dt className="mb-2 text-4xl font-extrabold text-red-600 dark:text-red-400">{countStats.clients}+</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-lg">Happy Clients</dd>
                </div>
              </dl>
            </div>
            <div className={`${activeTab === "about" ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}>
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center mb-2">
                    <svg className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="font-medium text-gray-800 dark:text-white">Full-Stack Web Development</span>
                  </div>
                  <p className="ml-7 text-gray-600 dark:text-gray-300">Creating end-to-end web solutions with modern technologies.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center mb-2">
                    <svg className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="font-medium text-gray-800 dark:text-white">Mobile Development</span>
                  </div>
                  <p className="ml-7 text-gray-600 dark:text-gray-300">Building cross-platform mobile applications with Flutter and React Native.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center mb-2">
                    <svg className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="font-medium text-gray-800 dark:text-white">Website Management & Services</span>
                  </div>
                  <p className="ml-7 text-gray-600 dark:text-gray-300">Ongoing maintenance, updates, and performance optimization.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center mb-2">
                    <svg className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="font-medium text-gray-800 dark:text-white">UI/UX Development</span>
                  </div>
                  <p className="ml-7 text-gray-600 dark:text-gray-300">Creating beautiful, intuitive, and responsive user interfaces.</p>
                </div>
              </div>
            </div>
            <div className={`${activeTab === "faq" ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}>
              <dl className="space-y-6 text-gray-500 dark:text-gray-400">
                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <dt className="font-semibold text-lg text-gray-800 dark:text-white text-center">Nobody has asked a question yet 😅</dt>
                  <dd className="mt-3 text-center">Be the first to ask a question through the contact form below!</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* projects */}
      <div id="projects" ref={projectsRef} className={`min-h-screen pt-20 pb-20 px-4 md:px-10 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 ${animatedElements['projects'] ? 'fade-slide-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">My Projects</h2>
          
          {/* Responsive grid setup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Project 1 */}
            <div className={`project-card bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full overflow-hidden ${animatedElements['project-0'] ? 'visible' : 'project-card-animated'}`} style={{ transitionDelay: '0.1s' }}>
              <a href="https://aiducator.vercel.app/" className="h-48 overflow-hidden group">
                <img className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" src="https://i.ibb.co/MSTKtD5/Screenshot-2024-07-11-at-9-22-37-AM.png" alt="AIducator project" />
              </a>
              <div className="p-5 flex flex-col flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AIducator 2024</h5>
                <p className="mb-4 flex-grow text-gray-700 dark:text-gray-400">
                  This 3D eLearning platform teaches students more efficiently and is my biggest project during my academic years. Built with <span className="font-medium text-red-600 dark:text-red-400">Vite.js, Node.js, Express and ChatGPT API</span>, creating an immersive 3D learning experience.
                </p>
                <a href="https://aiducator.vercel.app/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition-all duration-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 group">
                  Visit Website
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Remaining project cards with staggered animation delays */}
            <div className={`project-card bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full overflow-hidden ${animatedElements['project-1'] ? 'visible' : 'project-card-animated'}`} style={{ transitionDelay: '0.2s' }}>
              <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK21JiYnXoWX-FOTfqA7w8L3oXv1cq_9ZcVg&s" alt="UniConnect project" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">UniConnect 2024</h5>
                <p className="mb-3 flex-grow text-gray-700 dark:text-gray-400">
                  An ongoing project to connect students and lecturers in one place to share knowledge and help each other. Built with <span className="font-medium text-red-600 dark:text-red-400">Flutter</span> for cross-platform compatibility.
                </p>
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-yellow-500 rounded-full">In Progress</span>
              </div>
            </div>
            
            <div className={`project-card bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full overflow-hidden ${animatedElements['project-2'] ? 'visible' : 'project-card-animated'}`} style={{ transitionDelay: '0.3s' }}>
              <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://play-lh.googleusercontent.com/MWV1erZURmTaeXGj29ZLWMSo_7DB92q3IL71lDSRooqbb3qidsa4c9DJ0_jEQgOeXEQ=w416-h235-rw" alt="WhatsApp bot project" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">WhatsApp Bot 2022</h5>
                <p className="mb-3 flex-grow text-gray-700 dark:text-gray-400">
                  A small project to create an automated bot for WhatsApp. Built with <span className="font-medium text-red-600 dark:text-red-400">Node.js</span> for efficient message handling and automation.
                </p>
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">Completed</span>
              </div>
            </div>
            
            <div className={`project-card bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full overflow-hidden ${animatedElements['project-3'] ? 'visible' : 'project-card-animated'}`} style={{ transitionDelay: '0.4s' }}>
              <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2023/08/1-1.webp?ssl=1&quality=80&w=f" alt="Telegram bot project" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Telegram Bot 2022</h5>
                <p className="mb-3 flex-grow text-gray-700 dark:text-gray-400">
                  A small project to create an automated bot for Telegram. Built with <span className="font-medium text-red-600 dark:text-red-400">Python</span> for smart message processing.
                </p>
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">Completed</span>
              </div>
            </div>
            
            <div className={`project-card bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full overflow-hidden ${animatedElements['project-4'] ? 'visible' : 'project-card-animated'}`} style={{ transitionDelay: '0.5s' }}>
              <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmRBmntSxZh99CBluc1Y-1vEERXQc9HqBbFg&s" alt="WordPress bot project" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">WordPress Movies 2021</h5>
                <p className="mb-3 flex-grow text-gray-700 dark:text-gray-400">
                  A movie sharing website built using <span className="font-medium text-red-600 dark:text-red-400">WordPress</span> with custom themes and plugins for enhanced user experience.
                </p>
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact */}
      <section id="contact" ref={contactRef} className={`bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 ${animatedElements['contact'] ? 'fade-slide-up' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Contact Me</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Got a technical issue? Want to talk about your future projects? Need details about my services? Let me know!</p>
          </div>
          
          <div id="email-form" className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all scale-in">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="fade-slide-in stagger-1">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Your email
                  </label>
                  <input 
                    ref={emailRef} 
                    type="email" 
                    id="email" 
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3 transition-all dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
                    placeholder="name@email.com" 
                    required 
                    onFocus={(e) => e.target.classList.add('scale-in')}
                  />
                </div>
                <div className="fade-slide-right stagger-2">
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Subject
                  </label>
                  <input 
                    ref={subjectRef} 
                    type="text" 
                    id="subject" 
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 transition-all dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
                    placeholder="Let me know how I can help you" 
                    required 
                    onFocus={(e) => e.target.classList.add('scale-in')}
                  />
                </div>
              </div>
              <div className="fade-slide-up stagger-3">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Your message
                </label>
                <textarea 
                  ref={messageRef} 
                  id="message" 
                  rows="6" 
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-red-500 focus:border-red-500 transition-all dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
                  placeholder="Share your thoughts or questions..."
                  onFocus={(e) => e.target.classList.add('scale-in')}
                ></textarea>
              </div>
              <div className="flex justify-center md:justify-end fade-slide-up stagger-4">
                <button 
                  type="button" 
                  onClick={handleSendMessage} 
                  className="py-3 px-8 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition-all transform hover:scale-105 shadow-md hover:shadow-lg dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 group"
                >
                  <span className="flex items-center">
                    Send Message
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
