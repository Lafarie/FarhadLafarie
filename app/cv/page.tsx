import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Farhad Lafarie | Curriculum Vitae (CV)",
  description: "View the professional Curriculum Vitae (CV) of Farhad Lafarie, Trainee DevOps Engineer and Full-Stack Developer.",
  keywords: "Farhad Lafarie CV, Farhad Lafarie Resume, DevOps Engineer Sri Lanka, Full-Stack Developer",
};

export default function CVPage(): ReactNode {
  return (
    <main className="min-h-screen bg-white text-gray-800 pt-24 pb-16 px-4 sm:px-6 lg:px-8 print:pt-4 print:pb-4">
      {/* Inline styles to handle clean print layouts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            font-size: 11px !important;
          }
          header, footer, button, .vibe-btn {
            display: none !important;
          }
          .cv-container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          a {
            color: #046bfb !important;
            text-decoration: underline !important;
          }
          section {
            break-inside: avoid;
          }
        }
      `}} />

      <div className="cv-container max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 border border-gray-200 rounded-2xl shadow-sm print:border-none print:shadow-none print:p-0">
        
        {/* Header Section */}
        <section className="text-center border-b border-gray-200 pb-6 print:pb-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-2 uppercase print:text-3xl">
            Farhad Lafarie
          </h1>
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-blue-600 mb-4 print:text-sm print:mb-2" style={{ color: "#046bfb" }}>
            DevOps Engineer | Cloud & Automation
          </h2>

          {/* Contact Details Table / Grid */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600 sm:text-sm print:text-[10px] print:gap-x-4">
            <span className="flex items-center gap-1.5">
              <strong>Phone:</strong> 
              <a href="tel:+94776350933" className="hover:text-blue-600 hover:underline">+94 77 635 0933</a>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <strong>Location:</strong> Dehiwala 10350, Sri Lanka
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <strong>Email:</strong> 
              <a href="mailto:farhadlafarie@gmail.com" className="hover:text-blue-600 hover:underline">farhadlafarie@gmail.com</a>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <strong>LinkedIn:</strong> 
              <a href="https://www.linkedin.com/in/farhad-lafarie/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">in/farhad-lafarie</a>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <strong>GitHub:</strong> 
              <a href="https://github.com/Lafarie" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">git/lafarie</a>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <strong>Website:</strong> 
              <a href="https://farhad-lafarie.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">portfolio</a>
            </span>
          </div>
        </section>

        {/* Main Content Sections */}
        <div className="mt-8 space-y-8 print:mt-4 print:space-y-4">
          
          {/* Summary Section */}
          <section className="print:break-inside-avoid">
            <h3 className="text-base font-bold text-blue-600 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide print:text-xs" style={{ color: "#046bfb" }}>
              Summary
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 print:text-[11px] print:leading-normal">
              DevOps Engineer undergraduate with hands-on experience building production web and mobile applications, automating CI/CD pipelines, scripting with Python and Bash, and managing cloud infrastructure. Currently employed as a Trainee DevOps Engineer at hSenid Mobile Solutions, working daily with Docker, Kubernetes, GitLab CI/CD, and monitoring tools such as Grafana and Sentry. Experienced in full-stack development using Next.js, Node.js, and React Native with strong foundation in cloud technologies, automation, collaborative problem-solving, and a proven track record of directing teams in hackathons and coding competitions.
            </p>
          </section>

          {/* Education Section */}
          <section className="print:break-inside-avoid">
            <h3 className="text-base font-bold text-blue-600 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide print:text-xs" style={{ color: "#046bfb" }}>
              Education
            </h3>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-sm sm:text-base font-bold text-gray-700 uppercase print:text-xs">
                  BEng (Hons) Software Engineering
                </h4>
                <span className="text-xs sm:text-sm font-bold text-gray-500 print:text-[10px]">
                  2022 - Present
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 font-medium print:text-[11px]">
                Informatics Institute of Technology affiliated with University of Westminster, UK
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <section className="print:break-inside-avoid">
            <h3 className="text-base font-bold text-blue-600 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide print:text-xs" style={{ color: "#046bfb" }}>
              Experience
            </h3>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-sm sm:text-base font-bold text-gray-700 uppercase print:text-xs">
                  Trainee DevOps Engineer
                </h4>
                <span className="text-xs sm:text-sm font-bold text-gray-500 print:text-[10px]">
                  September 2024 - June 2026 (1 year 10 months)
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 font-semibold mb-2 print:text-[11px]">
                hSenid Mobile Solutions | Colombo, Sri Lanka
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 print:text-[10px] print:space-y-1">
                <li>Systematized CI/CD builds and deployments using GitLab CI/CD, reducing release cycle time from 2 hours to 15 minutes (87% reduction) and developed 8+ automation scripts in Python and Bash, eliminating 10+ hours of repetitive tasks weekly.</li>
                <li>Orchestrated containerized applications using Docker and Kubernetes, enabling 40% faster scaling and supporting 3+ production deployments monthly on AWS with zero critical downtime.</li>
                <li>Deployed Sentry and Grafana monitoring dashboards, reducing mean time to detect errors from 4 hours to 12 minutes and improving issue resolution velocity by 60% across production services.</li>
                <li>Constructed containerized build pipeline with Docker (2-5 containers) for appiGo Retailer eCommerce platform, delivering 2 production builds monthly with 99.9% uptime and Apache web server optimization.</li>
                <li className="list-none text-xs text-gray-500 font-bold mt-1 print:text-[9px]">
                  Skills Used: Docker, Kubernetes, GitLab CI/CD, AWS, Linux, Python, Bash, Grafana, Sentry, Ansible
                </li>
              </ul>
            </div>
          </section>

          {/* Projects Section */}
          <section className="print:break-inside-avoid">
            <h3 className="text-base font-bold text-blue-600 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide print:text-xs" style={{ color: "#046bfb" }}>
              Projects
            </h3>
            <div className="space-y-6 print:space-y-4">
              
              {/* Project 1 */}
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-gray-700 uppercase print:text-xs">
                    Ticket Portal - <span className="font-normal text-gray-600">Event Ticketing Platform</span>
                  </h4>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 print:text-[10px]">
                    2025 - 2026
                  </span>
                </div>
                <p className="text-xs text-blue-600 mb-2 hover:underline print:text-[10px]">
                  <a href="https://ticket.rush.lk/" target="_blank" rel="noopener noreferrer">ticket.rush.lk</a>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 print:text-[10px] print:space-y-0.5">
                  <p className="text-xs text-gray-500 font-semibold mb-1 print:text-[9px]">Affiliated with hSenid Mobile Solutions.</p>
                  <li>Architected a production ticketing platform hosting 5+ live events, generating $3000+ in ticket sales, containerized with Docker and deployed via GitLab CI/CD pipelines, achieving zero-downtime releases for 1000+ paying customers.</li>
                  <li>Built and published the Android Ticket Validator app for this ecosystem using React Native.</li>
                  <li className="list-none text-xs text-gray-500 font-bold mt-1 print:text-[9px]">
                    Skills Used: Next.js, Prisma, PostgreSQL, Docker, GitLab CI/CD, Tailwind CSS, React Native, Monorepo
                  </li>
                </ul>
              </div>

              {/* Project 2 */}
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-gray-700 uppercase print:text-xs">
                    Sheet Ninja - <span className="font-normal text-gray-600">GitLab-Sheets Sync Platform</span>
                  </h4>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 print:text-[10px]">
                    2025
                  </span>
                </div>
                <p className="text-xs text-blue-600 mb-2 hover:underline print:text-[10px]">
                  <a href="https://github.com/Lafarie/Sheet-Ninja" target="_blank" rel="noopener noreferrer">github.com/Lafarie/Sheet-Ninja</a>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 print:text-[10px] print:space-y-0.5">
                  <li>Built an enterprise-grade bidirectional sync platform between Google Sheets and GitLab with 6+ integrations, featuring a streamlined 6-step setup wizard and Docker-based deployment enabling safe synchronization of 1000+ records.</li>
                  <li className="list-none text-xs text-gray-500 font-bold mt-1 print:text-[9px]">
                    Skills Used: Next.js, TypeScript, Prisma, PostgreSQL, Docker, NextAuth.js, Zustand, GitLab REST API
                  </li>
                </ul>
              </div>

              {/* Project 3 */}
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-gray-700 uppercase print:text-xs">
                    appiGo Retailer - <span className="font-normal text-gray-600">eCommerce Website Builder</span>
                  </h4>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 print:text-[10px]">
                    2024 - Present
                  </span>
                </div>
                <p className="text-xs text-blue-600 mb-2 hover:underline print:text-[10px]">
                  <a href="https://appigo.co/stores/" target="_blank" rel="noopener noreferrer">appigo.co/stores</a>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 print:text-[10px] print:space-y-0.5">
                  <p className="text-xs text-gray-500 font-semibold mb-1 print:text-[9px]">Affiliated with hSenid Mobile Solutions.</p>
                  <li>Architected containerized build pipeline with Docker (2-5 containers) for production eCommerce platform, delivering 2 builds monthly; optimized Apache web server configuration, reducing response time by 35% and supporting 50,000+ concurrent requests.</li>
                  <li className="list-none text-xs text-gray-500 font-bold mt-1 print:text-[9px]">
                    Skills Used: Docker, GitLab CI/CD, Apache, Linux, Bash, Build Automation
                  </li>
                </ul>
              </div>

              {/* Project 4 */}
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-gray-700 uppercase print:text-xs">
                    AIducator - <span className="font-normal text-gray-600">AI-Powered 3D eLearning Platform</span>
                  </h4>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 print:text-[10px]">
                    2024
                  </span>
                </div>
                <p className="text-xs text-blue-600 mb-2 hover:underline print:text-[10px]">
                  <a href="https://aiducator.vercel.app/" target="_blank" rel="noopener noreferrer">aiducator.vercel.app</a>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 print:text-[10px] print:space-y-0.5">
                  <li>Directed a team of 6 engineers in a year-long project to design and deploy an AI-powered eLearning platform serving 500+ students with ChatGPT-based tutoring, 3D model viewer with 50+ models, and Sentry error tracking across 3 environments.</li>
                  <li className="list-none text-xs text-gray-500 font-bold mt-1 print:text-[9px]">
                    Skills Used: React.js, Node.js, MySQL, ChatGPT API, Google Model Viewer API, Express.js, Sentry
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Certifications Section */}
          <section className="print:break-inside-avoid">
            <h3 className="text-base font-bold text-blue-600 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide print:text-xs" style={{ color: "#046bfb" }}>
              Certifications & Awards
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700 list-disc pl-5 print:text-[10px] print:grid-cols-1">
              <li className="flex justify-between gap-2">React Certification - LinkedIn Learning <span>2024</span></li>
              <li className="flex justify-between gap-2">Learning Kubernetes - LinkedIn <span>2026</span></li>
              <li className="flex justify-between gap-2">DevOps Foundations: IaC - LinkedIn <span>2026</span></li>
              <li className="flex justify-between gap-2">Microsoft Certified: Azure AI Fundamentals <span>2025</span></li>
              <li className="flex justify-between gap-2">NASA Space Apps Challenge - Global Nominee <span>2024</span></li>
              <li className="flex justify-between gap-2">Tech Triathlon - Rootcode <span>2024</span></li>
              <li className="flex justify-between gap-2">Westminster Hackathon - Winner <span>2024</span></li>
              <li className="flex justify-between gap-2">CodeSprint 7.0 - Participant <span>2024</span></li>
              <li className="flex justify-between gap-2">SkillUp Professional Dev - Leo Club of IIT <span>2023</span></li>
            </ul>
          </section>

          {/* Skills Section */}
          <section className="print:break-inside-avoid">
            <h3 className="text-base font-bold text-blue-600 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide print:text-xs" style={{ color: "#046bfb" }}>
              Technical Skills
            </h3>
            <div className="text-sm text-gray-700 space-y-2 print:text-[10px] print:space-y-1">
              <p><strong>Programming Languages:</strong> Python, Bash, JavaScript, Java, PHP</p>
              <p><strong>Frameworks:</strong> React, React Native, Next.js, Node.js, Express.js, FastAPI, JAX-RS</p>
              <p><strong>DevOps & Cloud:</strong> Docker, Kubernetes, GitLab CI/CD, AWS (EC2), Linux, Ansible, Docker Compose, Harbor</p>
              <p><strong>Monitoring & Logging:</strong> Grafana, Sentry</p>
              <p><strong>CI/CD & Version Control:</strong> GitLab CI/CD, GitHub Actions, Git, GitHub, GitLab, Git Workflows</p>
              <p><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, Prisma ORM</p>
              <p><strong>Other tools:</strong> REST API, Microservices, Firebase, GCP, Tailwind CSS, Figma</p>
            </div>
          </section>

          {/* Extracurriculars Section */}
          <section className="print:break-inside-avoid">
            <h3 className="text-base font-bold text-blue-600 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide print:text-xs" style={{ color: "#046bfb" }}>
              Extracurricular Activities
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 print:text-[10px] print:space-y-0.5">
              <li className="flex justify-between items-baseline gap-2">
                <span>Volunteered at the Rotary Club Sunshine Games, contributing to operations.</span>
                <span className="font-bold text-gray-500 shrink-0 text-xs sm:text-sm print:text-[10px]">2025</span>
              </li>
              <li className="flex justify-between items-baseline gap-2">
                <span>Participated in IEEEXtreme 18.0, a global 24-hour competitive programming challenge.</span>
                <span className="font-bold text-gray-500 shrink-0 text-xs sm:text-sm print:text-[10px]">2024</span>
              </li>
              <li className="flex justify-between items-baseline gap-2">
                <span>Member of IEEE Student Branch of IIT (200+ members).</span>
                <span className="font-bold text-gray-500 shrink-0 text-xs sm:text-sm print:text-[10px]">2023 - Present</span>
              </li>
            </ul>
          </section>

          {/* References Section */}
          <section className="print:break-inside-avoid">
            <h3 className="text-base font-bold text-blue-600 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide print:text-xs" style={{ color: "#046bfb" }}>
              References
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 print:text-[9px] print:grid-cols-2 print:gap-4">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-700 print:text-xs">Ms. Suvetha Suvendran</h4>
                <p className="text-xs text-gray-600 font-semibold">Assistant Lecturer, Informatics Institute of Technology</p>
                <p className="text-xs text-gray-600 mt-1">Phone: +94 70 210 7279</p>
                <p className="text-xs text-gray-600">Email: suvetha.s@iit.ac.lk</p>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-700 print:text-xs">Mr. Navod Payagala</h4>
                <p className="text-xs text-gray-600 font-semibold">Head of Special Projects, Anunine Holdings (Pvt) Ltd</p>
                <p className="text-xs text-gray-600 mt-1">Phone: +94 71 882 3611</p>
                <p className="text-xs text-gray-600">Email: nkpayagala@gmail.com</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
