import React from 'react';
import './cv/cv.css';

const CV = () => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Farhad Lafarie CV</title>
                <link rel="stylesheet" href="cv.css" />
            </head>
            <body>
                <section className="top-container">
                    <div className="top-left">
                        <h1>Farhad Lafarie</h1>
                        <h2 className="degree">Software Engineer Undergraduate</h2>
                    </div>
                    <div className="contact-info-bar">
                        <table>
                            <tr>
                                <td>
                                    <div className="contact-info">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/483/483947.png"
                                            alt="Phone Icon" className="icon"></img>
                                        <p><a href="tel:+94776350933">+94 77 635 0933</a></p>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-info">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/542/542689.png"
                                            alt="Email Icon" className="icon"></img>
                                        <p><a href="mailto:farhadlafarie@gmail.com">farhadlafarie@gmail.com</a></p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="contact-info">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/3536/3536569.png"
                                            alt="LinkedIn Icon" className="icon"></img>
                                        <p><a href="https://www.linkedin.com/in/farhad-lafarie/">in/farhad-lafarie</a></p>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-info">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/25/25657.png"
                                            alt="GitHub Icon" className="icon"></img>
                                        <p><a href="https://github.com/LAFARIE">github/LAFARIE</a></p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <div className="contact-info">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/3177/3177361.png"
                                            alt="Address Icon" className="icon"></img>
                                        <p>Dehiwala, Sri Lanka</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="left-column">
                            <section>
                                <h3>Summary</h3>
                                <p>I am a proactive software engineering
                                    undergraduate with a strong work ethic and a
                                    passion for problem-solving and continuous
                                    learning. Experienced in managing team
                                    projects
                                    and Hackathons, I am committed to delivering
                                    my
                                    best performance in every task.
                                    Self-motivated
                                    and eager to explore, I seek opportunities
                                    to
                                    enhance my skills in software development
                                    and
                                    teamwork, ready to contribute to the dynamic
                                    field of technology.</p>
                            </section>
                            <section>
                                <h3>Experience</h3>
                                <div className="item-info">
                                    <h4>Esport CSGO Game Manager</h4>
                                    <h5>Informatics Institute of Technology</h5>
                                    <ul>
                                        <li>Assigned as the game manager for
                                            CSGO,
                                            responsible for handling game events
                                            and
                                            managing related activities.</li>
                                        <li>Organized and coordinated CSGO
                                            events.</li>
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <h3>Education</h3>
                                <div className="education">
                                    <h4>BEng (Hons) Software Engineering</h4>
                                    <h5>Informatics Institute of Technology</h5>
                                    <div className="education-more-info">
                                        <p> <img
                                            src="https://cdn-icons-png.flaticon.com/128/10156/10156100.png"
                                            alt="date"
                                            className="body-icon"></img>2022 -
                                            Present</p>
                                        <p> <img
                                            src="https://cdn-icons-png.flaticon.com/128/3177/3177361.png"
                                            alt="location"
                                            className="body-icon"></img>Colombo 04</p>
                                    </div>
                                    <p>The following list is the modules that are currently being taken.</p>
                                    <ul className="small-margin-bottom">
                                        <li>Mathematics for Computing – 71</li>
                                        <li>Software Development I (Python) –
                                            83</li>
                                        <li>Software Development II (Java) –
                                            76</li>
                                        <li>Trends in Computer Science – 77</li>
                                        <li>Computer System Fundamentals –
                                            87</li>
                                        <li>Web Design and Development – 83</li>
                                    </ul>
                                </div>
                                <div className="education">
                                    <h4>Bachelor of Information Technology</h4>
                                    <h5>University of Colombo</h5>
                                    <div className="education-more-info">
                                        <p> <img
                                            src="https://cdn-icons-png.flaticon.com/128/10156/10156100.png"
                                            alt="date"
                                            className="body-icon"></img>2023 -
                                            Present</p>
                                        <p><img
                                            src="https://cdn-icons-png.flaticon.com/128/3177/3177361.png"
                                            alt="location"
                                            className="body-icon"></img>Colombo 03</p>
                                    </div>
                                </div>
                            </section>
                            <div className="small-margin-bottom"></div>
                            <div className="page-break"></div>
                            <section>
                                <h3>Projects</h3>
                                <div className="item-info">
                                    <h4>AIducator</h4>
                                    <p>3D eLearning platform Group Project</p>
                                    <ul>
                                        <li>Led a yearlong group project to
                                            develop
                                            a 3D
                                            eLearning platform from scratch we
                                            research, Design and Developed,
                                            using
                                            React.js for frontend and Node.js
                                            for
                                            backend.</li>
                                        <li>Integrated multiple APIs and
                                            frameworks
                                            like
                                            OpenAI and Google model view.</li>
                                        <li>Lanagues that used in this project: React.js, Node.js, MYSQL, ChatGPT API,Google model view API, Express</li>
                                    </ul>
                                </div>
                                <div className="item-info">
                                    <h4>UniConnect</h4>
                                    <p>Platform for University Students to
                                        Connect</p>
                                    <ul>
                                        <li>This ongoing project aims to connect
                                            university students for assignments,
                                            surveys, etc.</li>
                                        <li>Targets both students and
                                            lecturers.</li>
                                        <li>Used Figma to design the UI and started development using Flutter</li>
                                    </ul>
                                </div>
                                <div className="item-info">
                                    <h4>Chatbots</h4>
                                    <p>Automated Telegram and whatsapp Bot project</p>
                                    <ul>
                                        <li>Developed an automated Telegram bot
                                            to
                                            perform various tasks.</li>
                                            <li>Built to deepen knowledge of Node.js
                                                and
                                                explore creating chatbots on
                                                WhatsApp.</li>
                                                <li>Lanagues that used in this project: Python, Node.js</li>
                                    </ul>
                                </div>
                                <div className="item-info">
                                    <h4>Flutter App</h4>
                                    <p>Dice roll Flutter App as a learning
                                        project</p>
                                    <ul>
                                        <li>Created to enhance understanding of
                                            the
                                            Flutter framework and mobile app
                                            development.</li>
                                    </ul>
                                </div>
                                <div className="item-info">
                                    <h4>FilmFlex.ml</h4>
                                    <p>Movie Downloading WordPress Site</p>
                                    <ul>
                                        <li>Started to understand and
                                            enhance
                                            WordPress skills, currently
                                            inactive.</li>
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <h3>Strengths</h3>
                                <ul className="strength other-info">
                                    <li>Problem Solving<br /><p>Effective at
                                            tackling
                                            complex coding challenges and
                                            debugging,
                                            enhancing analytical
                                            skills.</p></li>
                                    <li>Communication<br /><p>Skilled in clear
                                            communication with team members and
                                            stakeholders to meet project
                                            requirements.</p></li>
                                    <li>Leadership<br /><p>Demonstrated leadership
                                            in
                                            guiding team members to successful
                                            project completion.</p></li>
                                    <li>Motivation<br /><p>Self-motivated to learn
                                            new
                                            technologies and techniques to
                                            improve
                                            development processes.</p></li>
                                </ul>
                            </section>
                            <section>
                                <h3>Skills</h3>
                                <ul className="skills">
                                    <li>JavaScript (React.js, Node.js) -
                                        Proficient</li>
                                    <li>Python - Proficient</li>
                                    <li>Java - Intermediate</li>
                                    <li>HTML5, CSS3 - Proficient</li>
                                    <li>SQL (MySQL) - Intermediate</li>
                                    <li>Git - Proficient</li>
                                    <li>Figma - Intermediate</li>
                                    <li>Flutter - Beginner</li>
                                </ul>
                            </section>
                            <section>
                                <h3>Certifications</h3>
                                <div className="item-info">
                                    <h4>CSSD Certification</h4>
                                    <p>Configured a Unix-like OS (Solaris and
                                        Windows) in order to achieve the CSSD
                                        Certification.</p>
                                </div>
                            </section>
                            <section>
                            <h3>References</h3>
                        <ul className="reference">
                            <h4>Ms. Suvetha Suvendran</h4>
                            <li><p>Assistant Lecturer at Informatics
                                    Institute of Technology</p></li>
                            <li>Phone: 070 210 7279</li>
                            <li>Email : suvetha.s@iit.ac.lk</li>
                        </ul>
                            </section>
                        </div>
                    </div>
                </section>
            </body>
        </html>
    );
}

export default CV;
