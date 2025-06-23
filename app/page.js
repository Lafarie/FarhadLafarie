"use client";
import { useState, useEffect, useRef } from "react";
import me from "./assets/images/me.png";
import "@/styles/globals.css";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, ExternalLink, Github, ArrowDown, BarChart3, Code, Calendar, Users, Sparkles } from "lucide-react";

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [countStats, setCountStats] = useState({ projects: 0, languages: 0, years: 0, clients: 0 });
  const [animatedElements, setAnimatedElements] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const fullText = "Hi, I'm Farhad Lafarie!";

  // Refs for different sections
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);

  // Refs for form fields
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Typing animation effect with more dynamic cursor
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
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  // Enhanced scroll animation observer with staggered animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-10%",
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimatedElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));

          // Start counting animation for stats when stats section becomes visible
          if (entry.target.id === "stats-section" && !countStats.counted) {
            setTimeout(() => animateStats(), 300);
          }

          // Staggered animation for project cards
          if (entry.target.classList.contains('project-card')) {
            const index = Array.from(document.querySelectorAll('.project-card')).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 150);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe elements
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (heroRef.current) observer.observe(heroRef.current);

    // Get all project cards
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
      card.id = `project-${index}`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced stats animation with easing
  const animateStats = () => {
    const duration = 2500;
    const frameRate = 60;
    const totalFrames = duration / (1000 / frameRate);

    const finalValues = { projects: 10, languages: 15, years: 3, clients: 5 };
    let frame = 0;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const interval = setInterval(() => {
      if (frame < totalFrames) {
        const progress = easeOutCubic(frame / totalFrames);
        setCountStats({
          projects: Math.ceil(progress * finalValues.projects),
          languages: Math.ceil(progress * finalValues.languages),
          years: Math.ceil(progress * finalValues.years),
          clients: Math.ceil(progress * finalValues.clients),
          counted: true,
        });
        frame++;
      } else {
        setCountStats({
          projects: finalValues.projects,
          languages: finalValues.languages,
          years: finalValues.years,
          clients: finalValues.clients,
          counted: true,
        });
        clearInterval(interval);
      }
    }, 1000 / frameRate);
  };

  const handleSendMessage = () => {
    const emailElement = document.getElementById("email-form");
    emailElement.classList.add("shake-animation");
    setTimeout(() => emailElement.classList.remove("shake-animation"), 500);

    const recipientEmail = "farhadlafarie@gmail.com";
    const subject = encodeURIComponent(subjectRef.current.value);
    const body = encodeURIComponent(messageRef.current.value);

    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const services = [
    {
      title: "Full-Stack Web Development",
      description: "Creating end-to-end web solutions with modern technologies.",
      icon: <Code className="h-6 w-6" />,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Mobile Development",
      description: "Building cross-platform mobile applications with Flutter and React Native.",
      icon: <BarChart3 className="h-6 w-6" />,
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "Website Management & Services",
      description: "Ongoing maintenance, updates, and performance optimization.",
      icon: <Calendar className="h-6 w-6" />,
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "UI/UX Development",
      description: "Creating beautiful, intuitive, and responsive user interfaces.",
      icon: <Users className="h-6 w-6" />,
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  const projects = [
    {
      title: "AIducator 2024",
      description: "This 3D eLearning platform teaches students more efficiently and is my biggest project during my academic years. Built with Vite.js, Node.js, Express and ChatGPT API, creating an immersive 3D learning experience.",
      image: "https://i.ibb.co/MSTKtD5/Screenshot-2024-07-11-at-9-22-37-AM.png",
      link: "https://aiducator.vercel.app/",
      status: "Completed",
      tech: ["Vite.js", "Node.js", "Express", "ChatGPT API"],
      featured: true,
    },
    {
      title: "UniConnect 2024",
      description: "An ongoing project to connect students and lecturers in one place to share knowledge and help each other. Built with Flutter for cross-platform compatibility.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK21JiYnXoWX-FOTfqA7w8L3oXv1cq_9ZcVg&s",
      status: "In Progress",
      tech: ["Flutter", "Dart"],
    },
    {
      title: "WhatsApp Bot 2022",
      description: "A small project to create an automated bot for WhatsApp. Built with Node.js for efficient message handling and automation.",
      image: "https://play-lh.googleusercontent.com/MWV1erZURmTaeXGj29ZLWMSo_7DB92q3IL71lDSRooqbb3qidsa4c9DJ0_jEQgOeXEQ=w416-h235-rw",
      status: "Completed",
      tech: ["Node.js", "JavaScript"],
    },
    {
      title: "Telegram Bot 2022",
      description: "A small project to create an automated bot for Telegram. Built with Python for smart message processing.",
      image: "https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2023/08/1-1.webp?ssl=1&quality=80&w=f",
      status: "Completed",
      tech: ["Python", "Telegram API"],
    },
    {
      title: "WordPress Movies 2021",
      description: "A movie sharing website built using WordPress with custom themes and plugins for enhanced user experience.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmRBmntSxZh99CBluc1Y-1vEERXQc9HqBbFg&s",
      status: "Completed",
      tech: ["WordPress", "PHP", "MySQL"],
    },
  ];

  return (
    <>
      <style jsx="true">{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeSlideRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8) rotate(-5deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }

        @keyframes backgroundMove {
          0% { transform: translateX(-100px) translateY(-100px); }
          50% { transform: translateX(100px) translateY(100px); }
          100% { transform: translateX(-100px) translateY(-100px); }
        }

        @keyframes cardFlip {
          0% { transform: rotateY(0); }
          50% { transform: rotateY(10deg) scale(1.05); }
          100% { transform: rotateY(0); }
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
          50% { text-shadow: 0 0 30px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.3); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .float-animation {
          animation: float 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .fade-slide-up {
          animation: fadeSlideUp 1s ease-out forwards;
        }

        .fade-slide-in {
          animation: fadeSlideIn 1s ease-out forwards;
        }

        .fade-slide-right {
          animation: fadeSlideRight 1s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }

        .slide-in-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }

        .slide-in-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }

        .shake-animation {
          animation: shake 0.6s ease-in-out;
        }

        .sparkle-animation {
          animation: sparkle 2s ease-in-out infinite;
        }

        .background-move {
          animation: backgroundMove 20s ease-in-out infinite;
        }

        .card-flip {
          animation: cardFlip 0.6s ease-in-out;
        }

        .text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }

        .gradient-shift {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.3s; }
        .stagger-3 { animation-delay: 0.5s; }
        .stagger-4 { animation-delay: 0.7s; }
        .stagger-5 { animation-delay: 0.9s; }

        .typing-cursor::after {
          content: "|";
          animation: blink 1.2s step-end infinite;
        }

        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }

        .project-card-animated {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .project-card-animated.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .parallax-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(1px);
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          top: 20%;
          left: 10%;
          animation: float 15s ease-in-out infinite;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(45deg, #4834d4, #686de0);
          top: 60%;
          right: 15%;
          animation: float 12s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #00d2d3, #54a0ff);
          bottom: 20%;
          left: 20%;
          animation: float 18s ease-in-out infinite;
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          transition: box-shadow 0.3s ease;
        }

        .glow-effect:hover {
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
        }

        .magnetic-hover {
          transition: transform 0.2s ease;
        }

        .btn-3d {
          transform-style: preserve-3d;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-3d:hover {
          transform: translateY(-2px) rotateX(15deg);
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-3d:hover {
          transform: rotateY(5deg) rotateX(5deg) translateY(-5px);
        }
      `}</style>

      {/* Floating Background Shapes */}
      <div className="parallax-bg">
        <div className="floating-shape shape-1 background-move"></div>
        <div className="floating-shape shape-2 background-move"></div>
        <div className="floating-shape shape-3 background-move"></div>
      </div>

      {/* Hero Section */}
      <div 
        id="home" 
        ref={heroRef}
        className="mt-12 pt-20 min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        {/* Sparkle effects */}
        <div className="absolute top-20 left-20 w-4 h-4 text-primary sparkle-animation">
          <Sparkles />
        </div>
        <div className="absolute top-40 right-32 w-3 h-3 text-primary sparkle-animation" style={{ animationDelay: '1s' }}>
          <Sparkles />
        </div>
        <div className="absolute bottom-32 left-40 w-5 h-5 text-primary sparkle-animation" style={{ animationDelay: '2s' }}>
          <Sparkles />
        </div>

        <div className={`transition-all duration-1000 ease-in-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div 
            className="relative w-56 h-56 md:w-72 md:h-72 mb-8 overflow-visible float-animation"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full animate-pulse-slow">
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  maskImage: "url(\"data:image/svg+xml,%3Csvg width='480' height='500' viewBox='0 0 480 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.19025 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z' /%3E%3C/svg%3E\")",
                  WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg width='480' height='500' viewBox='0 0 480 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.19025 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z' /%3E%3C/svg%3E\")",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  backgroundColor: "rgb(220, 38, 38)", // fill-red-600 equivalent
                }}
              >
                <div className="opacity-80 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center h-full">
                  <Image
                    className="translate-y-16 translate-x-5 hover:translate-y-12 transition-transform duration-500 object-contain"
                    src={me}
                    alt="Farhad Lafarie profile picture"
                    fill={false} // Disable the `fill` prop to allow custom width and height
                    width={250} // Set a specific width
                    height={140} // Set a specific height
                    priority
                    sizes="(max-width: 768px) 14px, 18px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ease-in-out delay-300 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent text-glow slide-in-left">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium typing-cursor slide-in-right stagger-1">{typedText}</p>
          <p className="text-md text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed bounce-in stagger-2">
            I'm a passionate developer with a focus on creating engaging and efficient user experiences. With a background in Software Engineering and a keen eye for design, I specialize in developing responsive, high-performing websites and applications using the latest web technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8 bounce-in stagger-3">
            <Button size="lg" className="group btn-3d glow-effect">
              <ArrowDown className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              <a href="#projects">View My Projects</a>
            </Button>
            <Button variant="outline" size="lg" className="group btn-3d hover-lift">
              <Mail className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>

        {/* Modern Tabs Section */}
        <div className="w-full max-w-6xl mt-16 scale-in stagger-4 mb-20">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 hover-lift">
              <TabsTrigger value="stats" className="flex items-center gap-2 transition-all hover:scale-105">
                <BarChart3 className="h-4 w-4" />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2 transition-all hover:scale-105">
                <Code className="h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2 transition-all hover:scale-105">
                <Users className="h-4 w-4" />
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4">
              <div id="stats-section" ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center group hover-lift card-3d glow-effect">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2 transition-all group-hover:scale-110">{countStats.projects}+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </CardContent>
                </Card>
                <Card className="text-center group hover-lift card-3d glow-effect">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2 transition-all group-hover:scale-110">{countStats.languages}+</div>
                    <div className="text-sm text-muted-foreground">Programming Languages</div>
                  </CardContent>
                </Card>
                <Card className="text-center group hover-lift card-3d glow-effect">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2 transition-all group-hover:scale-110">{countStats.years}+</div>
                    <div className="text-sm text-muted-foreground">Years of Experience</div>
                  </CardContent>
                </Card>
                <Card className="text-center group hover-lift card-3d glow-effect">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2 transition-all group-hover:scale-110">{countStats.clients}+</div>
                    <div className="text-sm text-muted-foreground">Happy Clients</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="group hover-lift card-3d overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                          {service.icon}
                        </div>
                        <span className="group-hover:translate-x-2 transition-transform duration-300">{service.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base group-hover:text-foreground transition-colors duration-300">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <Card className="hover-lift card-3d">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-12">😅</div>
                  <CardTitle className="mb-4 gradient-shift bg-clip-text text-transparent">Nobody has asked a question yet</CardTitle>
                  <CardDescription className="text-base">
                    Be the first to ask a question through the contact form below!
                  </CardDescription>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Projects Section */}
      <div 
        id="projects" 
        ref={projectsRef} 
        className={`min-h-screen pt-20 pb-20 px-4 md:px-10 bg-gradient-to-b from-secondary/20 to-background relative ${animatedElements["projects"] ? "fade-slide-up" : "opacity-0"}`}
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent slide-in-left">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto slide-in-right stagger-1">
            Here are some of the projects I've worked on, showcasing different technologies and approaches.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`project-card project-card-animated group overflow-hidden hover-lift card-3d glow-effect relative ${project.featured ? 'ring-2 ring-primary/20' : ''}`}
                style={{
                  transform: `translate(${mousePosition.x * (index + 1) * 2}px, ${mousePosition.y * (index + 1) * 2}px)`,
                }}
              >
                {project.featured && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white sparkle-animation">
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1">{project.title}</CardTitle>
                    <Badge 
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className="transition-all duration-300 group-hover:scale-110"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4 line-clamp-3 group-hover:text-foreground transition-colors duration-300">{project.description}</CardDescription>
                  {project.tech && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="outline" 
                          className="text-xs transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                          style={{ animationDelay: `${techIndex * 0.1}s` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                {project.link && (
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full group btn-3d" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3 group-hover:scale-110 transition-transform" />
                        View Project
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef} 
        className={`bg-gradient-to-b from-background to-secondary/20 py-20 px-4 relative ${animatedElements["contact"] ? "fade-slide-up" : "opacity-0"}`}
        style={{
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent slide-in-left">
              Contact Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto slide-in-right stagger-1">
              Got a technical issue? Want to talk about your future projects? Need details about my services? Let me know!
            </p>
          </div>

          <Card id="email-form" className="hover-lift card-3d glow-effect scale-in stagger-2">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 slide-in-left stagger-1">
                    <Label htmlFor="email">Your email</Label>
                    <Input
                      ref={emailRef}
                      type="email"
                      id="email"
                      placeholder="name@email.com"
                      className="transition-all focus:scale-[1.02] hover:shadow-md"
                      required
                    />
                  </div>
                  <div className="space-y-2 slide-in-right stagger-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      ref={subjectRef}
                      type="text"
                      id="subject"
                      placeholder="Let me know how I can help you"
                      className="transition-all focus:scale-[1.02] hover:shadow-md"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 bounce-in stagger-3">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea
                    ref={messageRef}
                    id="message"
                    rows={6}
                    placeholder="Share your thoughts or questions..."
                    className="transition-all focus:scale-[1.02] hover:shadow-md"
                  />
                </div>
                <div className="flex justify-center md:justify-end scale-in stagger-4">
                  <Button type="button" onClick={handleSendMessage} size="lg" className="group btn-3d glow-effect">
                    <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Home;
