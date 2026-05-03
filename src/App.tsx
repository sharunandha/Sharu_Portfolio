import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Github, ExternalLink, Download, Award, Zap, Target, Users, 
  Cpu, Code, Database, Globe, ArrowRight, Play, Pause, ChevronDown 
} from 'lucide-react';

// Types
interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  longDescription: string;
  tech: string[];
  live: string;
  github: string;
  highlight?: string;
  category: string;
}

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

// Project Data
const projects: Project[] = [
  {
    id: 1,
    title: "BlueLock Exam Portal",
    image: "/images/exam-portal.jpg",
    description: "Secure AI-proctored digital exam platform with blockchain verification",
    longDescription: "A cutting-edge examination portal featuring real-time AI proctoring, 3D holographic interfaces, and blockchain-based credential verification. Built with advanced security protocols to ensure integrity in high-stakes testing environments.",
    tech: ["React", "Node.js", "AI Proctoring", "Blockchain", "WebRTC"],
    live: "https://bluelockexamportal.netlify.app/",
    github: "https://github.com/sharunandha/BlueLock_Exam_Portal",
    highlight: "Commercial-grade secure testing solution",
    category: "Web & AI"
  },
  {
    id: 2,
    title: "PM2.5 Air Quality Analysis",
    image: "/images/pm25-project.jpg",
    description: "ML-powered real-time PM2.5 prediction & urban pollution intelligence platform",
    longDescription: "Advanced machine learning system analyzing air pollution trends with predictive modeling. Features interactive geospatial visualizations, sensor network integration, and actionable AI insights for environmental health monitoring.",
    tech: ["Python", "TensorFlow", "Scikit-learn", "Flask", "Data Viz"],
    live: "https://pm-25-prediction-and-analysis-project-production-a9d3.up.railway.app/",
    github: "https://github.com/sharunandha/Pm25_analyse",
    highlight: "Real-time environmental intelligence",
    category: "AI/ML & IoT"
  },
  {
    id: 3,
    title: "Industrial IoT Monitoring System",
    image: "/images/industrial-project.jpg",
    description: "Enterprise-grade real-time industrial monitoring with AI analytics & energy optimization",
    longDescription: "Comprehensive IoT dashboard for industrial facilities featuring multi-sensor data fusion, predictive maintenance alerts, energy consumption analytics, and interactive 3D visualizations of plant operations.",
    tech: ["ESP8266", "Firebase", "React", "Python", "Power BI"],
    live: "https://iot-energy-monitor.onrender.com/",
    github: "https://github.com/sharunandha/Industrial-monitoring-syatem-pika",
    highlight: "Deployed across industrial sites",
    category: "IoT & Embedded"
  },
  {
    id: 4,
    title: "Sewage Gas Monitoring System",
    image: "/images/sewage-project.jpg",
    description: "Smart underground IoT gas detection & real-time hazardous gas alert system",
    longDescription: "Critical safety IoT solution for sewage infrastructure with multi-gas sensing, cloud connectivity, automated alerts, and predictive analytics to prevent toxic gas incidents in urban utility systems.",
    tech: ["Arduino", "ESP8266", "ThingSpeak", "Python", "Sensors"],
    live: "https://sewage-gas.onrender.com",
    github: "https://github.com/sharunandha/Seawage_gas",
    highlight: "Real-time public safety infrastructure",
    category: "IoT & Embedded"
  },
  {
    id: 5,
    title: "UbicoD.Transylvania",
    image: "/images/transylvania-project.jpg",
    description: "Immersive cyber-fantasy digital experience platform with interactive storytelling",
    longDescription: "A stunning immersive digital experience combining elegant cyber-fantasy aesthetics with interactive narrative design. Features stunning 3D environments, dynamic UI interactions, and seamless multimedia integration.",
    tech: ["Three.js", "React", "WebGL", "GSAP", "Tailwind"],
    live: "https://ubico-d-transylvania.netlify.app/",
    github: "https://github.com/sharunandha/UbicoD.Transylvania",
    highlight: "Award-winning immersive UI design",
    category: "Web & Creative"
  },
  {
    id: 6,
    title: "Nature Monitor",
    image: "/images/nature-project.jpg",
    description: "AI-driven biodiversity & ecosystem intelligence platform for conservation",
    longDescription: "Advanced environmental monitoring system integrating IoT sensors with AI to track biodiversity, soil health, climate patterns, and ecosystem anomalies. Provides actionable insights for sustainable conservation efforts.",
    tech: ["ESP8266", "Machine Learning", "Flask", "Data Viz", "REST APIs"],
    live: "https://nature-monitor.onrender.com/",
    github: "https://github.com/sharunandha/Nature-monitor",
    highlight: "Real-world conservation impact",
    category: "AI/ML & IoT"
  },
  {
    id: 7,
    title: "IS-TEWS Tsunami Early Warning",
    image: "/images/tsunami-project.jpg",
    description: "Research-grade ML Tsunami Detection System (AUC: 0.9957) with IoT alerts",
    longDescription: "Pioneering research project integrating high-accuracy machine learning models with IoT sensor networks for tsunami early detection. Published dataset of 17,000+ events on Zenodo. Exceptional real-world performance.",
    tech: ["LightGBM", "Python", "IoT", "Scikit-learn", "Firebase"],
    live: "#",
    github: "https://github.com/sharunandha",
    highlight: "0.9957 AUC | Zenodo Published Dataset",
    category: "AI/ML & IoT"
  }
];

// Technical Skills
const skills: Skill[] = [
  { name: "Embedded Systems & IoT", level: 95, icon: <Cpu size={20} />, color: "#00f0ff" },
  { name: "AI/ML & Data Science", level: 90, icon: <Zap size={20} />, color: "#a855f7" },
  { name: "Programming (C/Python)", level: 92, icon: <Code size={20} />, color: "#22ff88" },
  { name: "Cloud & Web Development", level: 85, icon: <Globe size={20} />, color: "#00f0ff" },
  { name: "Hardware & PCB Design", level: 88, icon: <Target size={20} />, color: "#a855f7" },
  { name: "Data Visualization", level: 87, icon: <Database size={20} />, color: "#22ff88" },
];

// Highlights Data
const highlights = [
  { number: 0.9957, label: "Tsunami ML AUC Score", suffix: "" },
  { number: 17000, label: "Events Published on Zenodo", suffix: "+" },
  { number: 8, label: "Production-Ready Systems", suffix: "" },
  { number: 100, label: "Real-World Deployments", suffix: "%" },
];

// 3D Tilt Card Component
const TiltCard: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXVal = (-mouseY / rect.height) * 18;
    const rotateYVal = (mouseX / rect.width) * 18;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card cursor-pointer ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// Particle Background Component
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{x: number; y: number; vx: number; vy: number; size: number}> = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1,
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 0.8;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

// IoT Flow Simulator Component
const IoTFlowSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const steps = [
    { label: "SENSORS", desc: "Real-time Data Capture" },
    { label: "MCU", desc: "Embedded Processing" },
    { label: "CLOUD", desc: "Secure Data Sync" },
    { label: "AI/ML", desc: "Intelligent Analysis" },
    { label: "UI", desc: "User Insights" },
  ];

  const toggleSimulation = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setActiveStep(0);
      intervalRef.current = setInterval(() => {
        setActiveStep(prev => {
          const next = (prev + 1) % steps.length;
          if (next === 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 850);
    }
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
    setActiveStep(0);
  };

  return (
    <div className="glass rounded-3xl p-8 md:p-10 border border-white/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-semibold text-white tracking-tight">Live IoT System Simulator</h3>
          <p className="text-white/60 mt-1">Experience the end-to-end intelligent engineering pipeline</p>
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <button 
            onClick={toggleSimulation} 
            className="futuristic-btn flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm font-medium transition-all active:scale-[0.985]"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />} <span className="hidden sm:inline">{isPlaying ? "PAUSE" : "SIMULATE"}</span>
          </button>
          <button onClick={reset} className="px-3 sm:px-5 py-2 sm:py-3 border border-white/20 rounded-full text-xs sm:text-sm hover:bg-white/5 transition"><span className="hidden sm:inline">RESET</span><span className="sm:hidden">✕</span></button>
        </div>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div 
              className={`flex flex-col items-center text-center transition-all duration-300 ${activeStep === index ? 'scale-105' : 'opacity-60'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 border transition-all ${activeStep === index ? 'bg-[#00f0ff] border-[#00f0ff] text-black shadow-[0_0_30px_#00f0ff]' : 'bg-[#0a0a1f] border-white/20 text-white/70'}`}>
                {index + 1}
              </div>
              <div className="font-semibold tracking-[1px] text-sm">{step.label}</div>
              <div className="text-xs text-white/50 mt-0.5">{step.desc}</div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`hidden md:block flex-1 h-[2px] mx-4 transition-all rounded ${activeStep > index ? 'bg-[#00f0ff]' : 'bg-white/15'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-8 text-center text-xs text-white/50 tracking-[3px]">FROM PHYSICAL SENSORS TO INTELLIGENT ACTIONABLE INSIGHTS</div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);
  
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    highlights: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    vision: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Smooth Scroll Navigation
  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref?.current) {
      const offset = 80;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveSection(section);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Animated Counters
  useEffect(() => {
    const animateCounters = () => {
      highlights.forEach((highlight, index) => {
        const target = highlight.number;
        let current = 0;
        const duration = 1400;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setAnimatedStats(prev => {
              const newStats = [...prev];
              newStats[index] = target;
              return newStats;
            });
            clearInterval(timer);
          } else {
            setAnimatedStats(prev => {
              const newStats = [...prev];
              newStats[index] = Math.floor(current);
              return newStats;
            });
          }
        }, 16);
      });
    };

    const timer = setTimeout(animateCounters, 800);
    return () => clearTimeout(timer);
  }, []);

  // Project Modal Handlers
  const openProject = (project: Project) => setSelectedProject(project);
  const closeProject = () => setSelectedProject(null);

  // Functional Contact Form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate realistic API call
    await new Promise(resolve => setTimeout(resolve, 1250));

    setIsSubmitting(false);
    setFormSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3200);
  };

  // Download Professional CV (prefers uploaded PDF at /Sharunandhaganesh_CV.pdf)
  const downloadCV = async () => {
    const publicPdf = '/Sharunandhaganesh_CV.pdf';
    try {
      const resp = await fetch(publicPdf, { method: 'HEAD' });
      if (resp.ok) {
        const link = document.createElement('a');
        link.href = publicPdf;
        link.download = 'Sharunandhaganesh_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
    } catch (err) {
      // ignore and fallback to generated text CV
    }

    const cvContent = `SHARUNANDHAGANESH S
Aspiring Electronics & Communication Engineer | IoT • Embedded AI • ML

CONTACT
GitHub: github.com/sharunandhaganesh

PROFESSIONAL SUMMARY
Aspiring Electronics and Communication Engineer specializing in building real-world end-to-end engineering solutions combining hardware, software, and AI/ML. Proven expertise in microcontroller programming, cloud-connected IoT systems, and deploying high-performance machine learning models.

KEY ACHIEVEMENTS
• Research-grade Tsunami Early Warning System (AUC: 0.9957) with published 17k+ event dataset
• TCS NQT Digital Category Qualified
• Multiple production IoT deployments including industrial monitoring & smart automation

TECHNICAL EXPERTISE
Embedded & IoT: ESP8266, Arduino, Sensors, Real-time Firmware
Programming: C, Embedded C, Python, Java
AI/ML: LightGBM, TensorFlow, Scikit-learn, Feature Engineering
Cloud & Web: Flask, REST APIs, Firebase, ThingSpeak, React
Hardware: PCB Design, Soldering, Debugging, Testing

PROJECTS
• BlueLock Exam Portal - Production Secure Testing Platform
• PM2.5 Analysis - AI Air Quality Intelligence Platform
• Industrial IoT Monitoring - Enterprise Energy Optimization
• Sewage Gas Monitoring - Critical Safety Infrastructure
• Nature Monitor - AI Ecosystem Intelligence
• UbicoD.Transylvania - Immersive Digital Experience
• IS-TEWS Tsunami Warning - Award-winning Research

CAREER VISION
IoT System Development | Embedded AI & Edge Computing | Data-Driven Engineering | Smart Infrastructure

"Building Intelligent Systems for a Safer, Smarter Tomorrow."

© 2025 Sharunandhaganesh S. All Rights Reserved.`;

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sharunandhaganesh_S_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#05050f] text-white overflow-x-hidden">
      {/* FUTURISTIC NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-black text-sm sm:text-lg tracking-[-1.5px]">S</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold tracking-[-1px] text-sm md:text-lg">SHARUNANDHAGANESH</div>
              <div className="text-[8px] md:text-[9px] text-white/50 -mt-1">ELECTRONICS &amp; AI ENGINEER</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-sm tracking-[1.5px] font-medium">
            {[
              { label: 'ABOUT', id: 'about' },
              { label: 'HIGHLIGHTS', id: 'highlights' },
              { label: 'EXPERTISE', id: 'skills' },
              { label: 'PROJECTS', id: 'projects' },
              { label: 'VISION', id: 'vision' },
              { label: 'CONTACT', id: 'contact' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors hover:text-[#00f0ff] relative ${activeSection === item.id ? 'text-[#00f0ff]' : 'text-white/80'}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-[#00f0ff]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="https://github.com/sharunandha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 hover:bg-white/5 text-xs sm:text-sm transition-all"
            >
              <Github size={14} /> <span className="hidden sm:inline">GITHUB</span>
            </a>
            <button 
              onClick={downloadCV} 
              className="futuristic-btn flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 bg-white text-black rounded-full text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#00f0ff] transition-all active:scale-[0.985]"
            >
              <Download size={14} /> <span className="hidden xs:inline">CV</span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10 px-6 py-8 mobile-menu"
            >
              <div className="flex flex-col gap-5 text-lg">
                {['about', 'highlights', 'skills', 'projects', 'vision', 'contact'].map(s => (
                  <button key={s} onClick={() => scrollToSection(s)} className="text-left py-1 text-white/90 hover:text-white">
                    {s.toUpperCase()}
                  </button>
                ))}
                <a href="https://github.com/sharunandha" target="_blank" className="flex items-center gap-1 pt-3 text-[#00f0ff] hover:text-cyan-300 transition">
              <Github size={16} /> VIEW GITHUB →
            </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION - 3D Futuristic */}
      <div id="hero" ref={sectionRefs.hero} className="relative min-h-[100dvh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a2e_0.8px,transparent_1px)] bg-[length:5px_5px] z-0" />
        <img src="/images/hero-bg.jpg" alt="Futuristic Lab" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <ParticleBackground />
        
        <div className="relative z-10 max-w-5xl px-3 sm:px-6 text-center">
          <div className="inline-block mb-4 px-3 sm:px-4 py-1 rounded-full bg-white/5 border border-white/20 text-[10px] sm:text-xs tracking-[1px] sm:tracking-[4px] text-[#00f0ff]">ELECTRONICS • EMBEDDED AI • IOT • ML</div>
          
          <h1 className="text-xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[92px] leading-[1.0] md:leading-[0.88] font-semibold tracking-[0px] sm:tracking-[-1.5px] md:tracking-[-6.2px] mb-4 word-spacing-1 overflow-hidden">
            SHARUNANDHAGANESH<br />S
          </h1>
          
          <p className="max-w-md mx-auto text-lg sm:text-xl md:text-2xl text-white/80 tracking-[-0.6px] mb-10">
            Building Intelligent Systems.<br />Bridging Hardware, AI &amp; the Real World.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('projects')} className="futuristic-btn group flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#00f0ff] hover:bg-white text-black font-semibold text-lg tracking-[1px] transition-all">
              EXPLORE PROJECTS <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>
            <button onClick={() => scrollToSection('about')} className="flex items-center justify-center gap-3 px-9 py-4 rounded-full border border-white/40 hover:bg-white/5 text-lg tracking-[1px] transition-all">
              MY JOURNEY <ChevronDown size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 sm:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[4px] text-white/50">
          SCROLL TO DISCOVER <ChevronDown size={14} className="animate-bounce" />
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div id="about" ref={sectionRefs.about} className="max-w-6xl mx-auto px-3 sm:px-6 pt-12 sm:pt-24 pb-12 sm:pb-20">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-16 items-center">
          <div className="lg:w-5/12">
            <div className="text-[#00f0ff] text-sm tracking-[4px] mb-4">CHAPTER 01 — THE ENGINEER</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[-3.4px] font-semibold leading-none mb-9">Engineering<br />Identity</h2>
            
            <div className="space-y-3 md:space-y-6 text-base md:text-xl text-white/85 pr-2 leading-snug">
              I am Sharunandhaganesh S — an aspiring Electronics &amp; Communication Engineer driven by the convergence of <span className="text-[#00f0ff]">hardware, software, and intelligence</span>.
            </div>
          </div>

          <div className="lg:w-7/12">
              <div className="glass rounded-3xl p-4 sm:p-9 lg:p-12 border border-white/10">
              <p className="text-sm md:text-[17px] leading-relaxed text-white/90">
                I design complete systems from sensors to microcontrollers to cloud to beautiful interfaces. 
                My work fuses AI/ML with embedded systems for smarter automation, focusing on real-time performance and research-driven innovation.
              </p>
              <div className="h-px bg-white/10 my-9" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                {[
                  "Designs complete end-to-end systems",
                  "Combines AI/ML with real hardware",
                  "Focuses on reliability & real-time",
                  "Publishes research & open datasets",
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#00f0ff] flex-shrink-0" />
                    <div>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KEY HIGHLIGHTS - Animated Stats */}
      <div id="highlights" ref={sectionRefs.highlights} className="bg-[#0a0a1f] py-12 sm:py-20 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-[#00f0ff] tracking-[2px] sm:tracking-[3px] text-[10px] sm:text-sm">CHAPTER 02 — IMPACT</div>
            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl tracking-[-1.2px] sm:tracking-[-2.6px] font-semibold mt-3">Key Highlights</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {highlights.map((item, index) => (
              <div key={index} className="glass rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-5 sm:py-9 text-center border border-white/10">
                <div className="font-mono text-2xl sm:text-4xl md:text-[54px] leading-none tracking-[-1px] sm:tracking-[-3px] text-[#00f0ff] font-semibold tabular-nums">
                  {index === 0 ? animatedStats[index].toFixed(4) : animatedStats[index].toLocaleString()}
                  {item.suffix}
                </div>
                <div className="mt-2 sm:mt-3 text-white/70 text-[10px] sm:text-sm tracking-[0.5px]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SKILLS + INTERACTIVE SIMULATOR */}
      <div id="skills" ref={sectionRefs.skills} className="max-w-6xl mx-auto px-3 sm:px-6 py-12 sm:py-24">
        <div className="mb-12 text-center">
          <div className="text-[#a855f7] text-xs tracking-[4px]">CHAPTER 03 — MASTERY</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl tracking-[-2.6px] font-semibold mt-3">Technical Strengths</h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {skills.map((skill, index) => (
            <div key={index} className="glass p-7 rounded-3xl border border-white/10 group">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3 text-lg">
                  <div style={{ color: skill.color }}>{skill.icon}</div>
                  <span>{skill.name}</span>
                </div>
                <div className="font-mono text-[#00f0ff] text-xl tabular-nums tracking-tight">{skill.level}</div>
              </div>
              <div className="h-px bg-white/10 mb-5" />
              <div className="h-1.5 bg-white/10 rounded overflow-hidden">
                <motion.div 
                  className="skill-bar h-full rounded" 
                  style={{ background: skill.color, width: `${skill.level}%` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* IoT Simulator - The 3D Interactive Highlight */}
        <IoTFlowSimulator />
      </div>

      {/* PROJECTS - Award Winning 3D Grid */}
      <div id="projects" ref={sectionRefs.projects} className="bg-[#0a0a1f] py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="text-[#00f0ff] text-xs tracking-[4px]">CHAPTER 04 — BUILT TO LAST</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[-3.2px] font-semibold">Featured Projects</h2>
            </div>
            <a href="https://github.com/sharunandha?tab=repositories" target="_blank" className="hidden md:flex items-center gap-2 text-sm text-[#00f0ff] hover:underline">
              VIEW ALL ON GITHUB <ExternalLink size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <TiltCard key={project.id} onClick={() => openProject(project)} className="group">
                <div className="glass rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col">
                  <div className="relative aspect-[16/9.6] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:scale-[1.08] transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
                    <div className="absolute top-5 right-5 px-4 py-px rounded-full bg-black/70 text-[10px] tracking-[1.5px] border border-white/30">{project.category}</div>
                  </div>
                  
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="font-semibold text-2xl tracking-[-1px] mb-2.5 group-hover:text-[#00f0ff] transition-colors">{project.title}</h3>
                    <p className="text-white/70 text-xs sm:text-sm md:text-[15px] flex-1 leading-tight">{project.description}</p>
                    
                    <div className="mt-auto pt-5 text-xs md:text-sm text-[#22ff88] tracking-wider font-medium border-t border-white/10">{project.highlight}</div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* CAREER VISION */}
      <div id="vision" ref={sectionRefs.vision} className="max-w-5xl mx-auto px-3 sm:px-6 py-12 sm:py-24 text-center">
        <div className="inline text-[#a855f7] text-xs tracking-[4px]">CHAPTER 05 — THE FUTURE</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-3.2px] mt-4 mb-9">Career Vision</h2>
        
        <div className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 tracking-tight">
          I aim to pioneer roles in <span className="text-[#00f0ff]">IoT Systems Development</span>, <span className="text-[#a855f7]">Embedded AI &amp; Edge Computing</span>, and <span className="text-[#22ff88]">Data-Driven Smart Infrastructure</span>.
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4 text-lg text-white/70">
          {["IoT System Development", "Embedded AI", "Edge Computing", "Automation & Smart Cities", "Real-World Intelligence"].map((item, i) => (
            <div key={i} className="px-6 py-px border-b border-white/10">{item}</div>
          ))}
        </div>
        
        <div className="mt-14 text-sm text-white/50 max-w-md mx-auto">My long-term goal is to engineer technologies that improve safety, efficiency, and the quality of human life through intelligent, reliable systems.</div>
      </div>

      {/* CONTACT - Fully Functioning */}
      <div id="contact" ref={sectionRefs.contact} className="bg-[#0a0a1f] border-t border-white/10 py-24">
        <div className="max-w-4xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-[#22ff88] text-xs tracking-[4px]">CHAPTER 06 — LET'S CONNECT</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl tracking-[-2.5px] font-semibold mt-4">Ready to Build<br />Together?</h2>
          </div>

          <div className="glass rounded-3xl p-10 md:p-14 border border-white/10">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs tracking-[2px] text-white/50 mb-2 block">YOUR NAME</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full bg-black/40 border border-white/15 focus:border-[#00f0ff] px-6 py-4 rounded-2xl outline-none placeholder:text-white/30 text-lg transition"
                      placeholder="Jane Cooper" 
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-[2px] text-white/50 mb-2 block">EMAIL ADDRESS</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className="w-full bg-black/40 border border-white/15 focus:border-[#00f0ff] px-6 py-4 rounded-2xl outline-none placeholder:text-white/30 text-lg transition"
                      placeholder="you@domain.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-[2px] text-white/50 mb-2 block">PROJECT IDEA OR MESSAGE</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleInputChange} required rows={6}
                    className="w-full resize-y bg-black/40 border border-white/15 focus:border-[#00f0ff] px-6 py-5 rounded-3xl outline-none placeholder:text-white/30 text-lg"
                    placeholder="Tell me about your IoT, AI, or embedded systems challenge..."
                  />
                </div>

                <button 
                  type="submit" disabled={isSubmitting}
                  className="futuristic-btn w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#00f0ff] hover:bg-white text-xl font-semibold tracking-[2px] text-black disabled:opacity-70 active:scale-[0.985] transition-all"
                >
                  {isSubmitting ? "TRANSMITTING TO NEURAL CORE..." : "SEND MESSAGE →"}
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#22ff88]/10 flex items-center justify-center border border-[#22ff88]/40">
                  <Award className="text-[#22ff88]" size={42} />
                </div>
                <div className="text-5xl font-semibold tracking-tight">Message Received.</div>
                <p className="mt-4 text-white/70 text-xl">Thank you. I will respond within the next 24 hours.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-8 text-xs sm:text-sm text-white/60 flex flex-wrap justify-center gap-3 sm:gap-6 tracking-wider">
            <a href="https://github.com/sharunandha" target="_blank" className="flex items-center gap-2 hover:text-[#00f0ff] transition font-semibold">
              <Github size={18} /> GitHub
            </a> 
            <span className="hidden md:inline">•</span> 
            <span>OPEN TO COLLABORATIONS</span> 
            <span className="hidden md:inline">•</span> 
            <button onClick={downloadCV} className="flex items-center gap-2 hover:text-[#00f0ff] transition font-semibold">
              <Download size={18} /> CV
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-8 sm:py-12 border-t border-white/10 text-center text-[10px] sm:text-xs tracking-[1.5px] sm:tracking-[2.5px] text-white/50">
        <div className="mb-4 flex justify-center gap-6 sm:gap-8">
          <a href="https://github.com/sharunandha" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00f0ff] transition">
            <Github size={20} />
          </a>
          <button onClick={downloadCV} className="flex items-center gap-2 hover:text-[#00f0ff] transition">
            <Download size={20} />
          </button>
        </div>
        © {new Date().getFullYear()} SHARUNANDHAGANESH S — BUILT WITH PRECISION &amp; PURPOSE.
      </footer>

      {/* PROJECT DETAIL MODAL - Stunning & Functional */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[70] flex items-start md:items-center justify-center p-0 md:p-8 bg-black/90 overflow-y-auto" onClick={closeProject}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 40 }}
              transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.4 }}
              className="modal w-full md:max-w-5xl glass rounded-t-2xl md:rounded-3xl border border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto" 
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button onClick={closeProject} className="absolute top-6 right-6 z-10 p-3 bg-black/60 hover:bg-black rounded-full"><X size={22} /></button>
                
                <img src={selectedProject.image} alt="" className="w-full h-[220px] md:h-[410px] object-cover" />
                
                <div className="p-4 sm:p-6 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-start gap-x-7 justify-between">
                    <div>
                      <div className="uppercase tracking-[4px] text-xs text-[#00f0ff] mb-1.5">{selectedProject.category}</div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] tracking-[-2.6px] font-semibold leading-none mb-4 pr-2 sm:pr-6">{selectedProject.title}</h3>
                      {selectedProject.highlight && <div className="inline text-sm px-4 py-px bg-[#22ff88]/10 text-[#22ff88] border border-[#22ff88]/20 rounded tracking-widest">{selectedProject.highlight}</div>}
                    </div>
                    
                  <div className="mt-7 md:mt-4 flex gap-2 sm:gap-3 flex-col sm:flex-row flex-shrink-0">
                      {selectedProject.live !== "#" && (
                        <a href={selectedProject.live} target="_blank" className="futuristic-btn flex-1 md:flex-none inline-flex items-center justify-center gap-2.5 bg-[#00f0ff] text-black px-8 py-3.5 text-sm font-semibold tracking-wider rounded-2xl active:scale-[0.985]">
                          LIVE DEMO <ExternalLink size={17} />
                        </a>
                      )}
                      <a href={selectedProject.github} target="_blank" className="flex-1 md:flex-none inline-flex items-center justify-center gap-2.5 border border-white/40 px-7 py-3.5 text-sm tracking-wider rounded-2xl hover:bg-white/5 active:scale-[0.985]">
                        <Github size={18} /> SOURCE
                      </a>
                    </div>
                  </div>

                  <div className="mt-9 max-w-[52ch] text-sm sm:text-base md:text-xl leading-tight text-white/90 tracking-tight">
                    {selectedProject.longDescription}
                  </div>

                  <div className="mt-10">
                    <div className="uppercase text-xs tracking-[3px] mb-4 text-white/50">TECHNOLOGY STACK</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, idx) => (
                        <div key={idx} className="px-5 py-1.5 text-sm bg-white/5 rounded-full border border-white/10">{tech}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
