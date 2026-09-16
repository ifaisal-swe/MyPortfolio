import React from 'react';
import { FolderOpen, ExternalLink, Users,MessageSquare,Calendar } from 'lucide-react';
const Projects = () => {
  const projects = [
    {
      title: "Suhol",
      subtitle: "AI-Powered Project Management",
      description: "Working as a Software Engineer on Suhol, an AI-powered project management platform. Building scalable solutions and implementing core features using modern web technologies. The platform is deployed and actively serving 100+ users, helping teams manage projects more efficiently with AI assistance.",
      technologies: ["Docker", "Nuxt.js", "Vue.js"],
      platform: "Web Platform",
      stats: { users: "600+" },
      liveLink: "https://suhol.ai",
      since: "2025",
      untilNow: true
    },
    {
      title: " Gaming Development - CFX.re",
      subtitle: "Lead Server Script Developer & Systems Architect",
      description: `Designed, developed, and optimized a custom FiveM (GTA V) server infrastructure to maximize performance, scalability, and security for a large-scale multiplayer community, evolving capacity from 
400 concurrent players (2024) to 
1950+ concurrent players (2026) with systems handling peaks of 
3,000+ players in the connection queue, engineering core server scripts to reduce network latency and traffic by eliminating client-server bottlenecks, implementing protections against code injection, XSS, and SQL injection to safeguard a user base of 
250,000+ players, and building the entire system around scalability, maintainability, and performance-oriented design patterns.`,
      technologies: ["Lua", "Node.js", "MySQL", "Redis", "MongoDB", "Express.js", "Ubuntu OS", "Windows Server", "Python"],
      platform: "CFX.re Game server",
      stats: {  users: "250K+" },
      liveLink: "https://servers.fivem.net/servers/detail/dm4rjq",
      since: "2023",
      untilNow: true
    },
    {
      title: "PlaneBot",
      subtitle: "Discord Server Management Bot",
      description: "Full Stack Developer on PlaneBot, a Discord management bot serving 500+ servers and 300,000+ members. Architected and deployed a full-stack dashboard using Next.js and a MySQL, utilizing Zod for runtime validation to ensure type safety and prevent injection risks. Optimized system performance by integrating a Redis caching layer and Next.js ISR, reducing database load and achieving sub-second response times for dashboards. Developed a UI with shadcn/ui and Tailwind CSS, featuring real-time server statistics, aggregated analytics, and modular settings panels for seamless server management.",
      technologies: ["Next.js", "Node.js", "MySQL", "Redis", "Zod"],
      platform: "Web dashboard",
      stats: { servers: "1200+", users: "150k+" },
      liveLink: "https://planebot.xyz",
      since: "2025",
      untilNow: true
    },
    {
      title: "Academic Semester Countdown Bot",
      description: "Developed an automated social media bot that provides daily visual progress tracking for academic semester completion. The bot posts daily updates featuring progress bar visualization showing semester completion percentage, remaining days countdown with precise calculations, weekly progress indicators and milestone tracking, and clean, minimalist design for easy readability.",
      technologies: ["Node.js", "X API", "Automation"],
      platform: "X (Twitter)",
      stats: { users: "2.3k+" },
      liveLink: "https://x.com/timer_uj",
      since: "2023",
      untilNow: true
    },
    {
      title: "MezlaBot",
      subtitle: "Telegram Group Moderation Bot",
      description: "MezlaBot is a Telegram bot that helps group admins automatically moderate chats and protect communities by detecting and banning spam accounts instantly. Built with Node.js and MySQL, it provides real-time protection for Telegram groups.",
      technologies: ["Node.js", "MySQL", "Telegram Bot API", "Auto-Moderation"],
      platform: "Telegram",
      stats: { servers: "1.5k+",users: "1.3M+" },
      liveLink: "https://t.me/MezlaBot",
      since: "2021",
      untilNow: true
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-600 mb-4 flex items-center justify-center gap-3">
            <FolderOpen className="w-10 h-10" />
            Featured Projects
          </h2>
 
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-600 text-sm font-medium">{project.platform}</span>
                  <div className="flex items-center gap-3">
                    {project.status && (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium border border-yellow-300">
                        {project.status}
                      </span>
                    )}
                    {project.stats && (
                      <div className="flex items-center gap-3 text-green-600 text-sm flex-wrap">
                        {project.stats.users && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{project.stats.users}</span>
                          </div>
                        )}
                        {project.stats.servers && (
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{project.stats.servers}</span>
                          </div>
                        )}
                        {project.since && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{project.since} - {project.untilNow ? "Present" : ""}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-gray-600 text-sm">{project.subtitle}</p>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm border border-green-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Link or Coming Soon */}
                {project.isComingSoon ? (
                  <div className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 text-gray-600 px-6 py-3 rounded-lg font-semibold">
                    <span>Coming Soon</span>
                  </div>
                ) : (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Visit Project</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;