import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { ArrowUpRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Error Boundary ---
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare state: ErrorBoundaryState;
  declare props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Application error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#f8f9fa] min-h-screen text-black flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-gray-600 mb-8">Something went wrong. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- Staggered Text Entry ---
const StaggeredText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {}
      }}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em] mb-[0.1em]">
          <motion.span
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

// --- Scroll-Linked Opacity Wrapper ---
const FocusSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.3, 1, 1, 1, 0.3]
  );

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// --- Spotlight Card ---
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => { setOpacity(0); };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden rounded-[24px] bg-black/[0.02] border border-black/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-50 pointer-events-none" />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,.04), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

// --- Sections ---

const Background = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      style={{ scale }}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none origin-center bg-[#fdfdfd]"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-black/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-black/5 blur-[120px]" />
      </div>
      <div className="absolute inset-0 backdrop-blur-[50px] bg-white/60 border border-black/5" />
    </motion.div>
  );
};

const TopLinks = () => (
  <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-8 px-8 py-4 rounded-full bg-black/5 backdrop-blur-xl border border-black/10 text-xs font-mono tracking-widest uppercase text-gray-700">
    <a href="https://github.com/ArinPattnaik" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub</a>
    <a href="https://www.linkedin.com/in/arinpattnaik" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Resume</a>
  </div>
);

const RightNav = () => (
  <nav className="fixed right-0 top-0 h-full w-16 md:w-24 z-50 flex flex-col justify-center items-center group">
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] backdrop-blur-none group-hover:backdrop-blur-xl transition-all duration-500 border-l border-transparent group-hover:border-black/10" />
    <div className="relative flex flex-col gap-12 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
      {['About', 'Expertise', 'Projects', 'Insights'].map((item) => (
        <a 
          key={item} 
          href={`#${item.toLowerCase()}`}
          className="text-[10px] md:text-xs font-mono tracking-widest uppercase hover:text-black text-gray-500 transition-colors"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {item}
        </a>
      ))}
    </div>
  </nav>
);

const Hero = () => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const subtitles = ["DATA ANALYST", "INSIGHT ARCHITECT", "DESIGNER"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center px-4 relative z-10">
      <div className="w-full flex flex-col items-center">
        <StaggeredText 
          text="ARIN PATTNAIK" 
          className="text-[12vw] font-black uppercase tracking-tighter leading-none text-center w-full justify-center"
        />
        <div className="h-8 mt-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={subtitleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-500 font-mono text-sm md:text-base tracking-widest uppercase"
            >
              {subtitles[subtitleIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const text = "I transform raw data into strategic narratives. Specializing in predictive modeling and visual architecture, I build systems that reveal hidden patterns and drive decisive action.";
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"]
  });

  const words = text.split(" ");

  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center px-8 md:px-24 py-32 relative z-10">
      <FocusSection className="max-w-5xl">
        <p ref={ref} className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight flex flex-wrap text-black">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
            return (
              <motion.span key={i} style={{ opacity }} className="mr-[0.25em] mb-[0.1em]">
                {word}
              </motion.span>
            );
          })}
        </p>
      </FocusSection>
    </section>
  );
};

const Expertise = () => {
  const tools = [
    { name: "PREDICTIVE MODELING", desc: "Statistical forecasting & ML algorithms." },
    { name: "DATA VISUALIZATION", desc: "Tableau & PowerBI dashboards." },
    { name: "PYTHON AUTOMATION", desc: "Scripting & data pipeline optimization." },
    { name: "SQL ARCHITECTURE", desc: "Database design & complex querying." }
  ];

  return (
    <section id="expertise" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-32 relative z-10">
      <FocusSection>
        <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-16">Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="p-8 aspect-square flex flex-col justify-between group">
                <div className="w-12 h-12 rounded-full bg-black/5 border border-black/10 backdrop-blur-xl flex items-center justify-center text-black font-mono text-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)]">0{i + 1}</div>
                <div>
                  <h3 className="text-xl font-bold tracking-tighter uppercase mb-3 text-black">{tool.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tool.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </FocusSection>
    </section>
  );
};

const Works = () => {
  const projects = [
    { name: "MARKET PREDICTOR", type: "PYTHON / ML", desc: "A machine learning model forecasting market trends with 85% accuracy using historical data and sentiment analysis." },
    { name: "SALES DASHBOARD", type: "TABLEAU", desc: "Interactive visualization suite tracking real-time KPIs across 5 global regions, adopted by 200+ stakeholders." },
    { name: "ETL PIPELINE", type: "SQL / PYTHON", desc: "Automated data extraction and transformation pipeline handling 50GB+ daily, reducing manual reporting by 15 hours/week." },
    { name: "CUSTOMER CHURN", type: "POWERBI", desc: "Predictive dashboard identifying at-risk customers, leading to a 12% increase in retention through targeted interventions." }
  ];

  return (
    <section id="projects" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-32 relative z-10">
      <FocusSection>
        <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-16">Selected Works</h2>
        <div className="flex flex-col w-full gap-12">
          {projects.map((project, i) => (
            <div key={i} className="group border-b border-black/10 pb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col gap-4 max-w-3xl">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-black">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed">{project.desc}</p>
              </div>
              <span className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-widest whitespace-nowrap mt-4 md:mt-0">
                {project.type}
              </span>
            </div>
          ))}
        </div>
      </FocusSection>
    </section>
  );
};

const Insights = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopX = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const x = isMobile ? "0%" : desktopX;

  const insights = [
    { text: "Arin transformed our data pipeline, reducing processing time by 40%.", author: "Tech Lead, DataCorp" },
    { text: "The visualizations provided deep insights that shifted our entire Q3 strategy.", author: "Product Manager, Insightful" },
    { text: "Exceptional predictive models. Highly recommend his analytical skills.", author: "CEO, StartupX" },
    { text: "A rare combination of design sensibility and hardcore data engineering.", author: "Director of Analytics" }
  ];

  return (
    <section id="insights" ref={targetRef} className="relative md:h-[300vh] z-10">
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center overflow-hidden py-32 md:py-0">
        <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-12 md:mb-16 px-8 md:px-24">Selected Insights</h2>
        <motion.div style={{ x }} className="flex flex-col md:flex-row gap-8 px-8 md:px-24">
          {insights.map((t, i) => (
            <SpotlightCard key={i} className="w-full md:w-[40vw] flex-shrink-0 p-8 md:p-12 flex flex-col justify-between min-h-[200px] md:min-h-[300px]">
              <p className="text-xl md:text-3xl font-medium leading-tight text-black mb-12">"{t.text}"</p>
              <p className="text-xs md:text-sm font-mono text-gray-500 uppercase tracking-widest">{t.author}</p>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full px-8 md:px-24 py-12 flex flex-col gap-16 border-t border-black/10 relative z-10 bg-[#f8f9fa]/80 backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="flex flex-col gap-2">
          <a href="mailto:arinpattnaikofficial@gmail.com" className="text-2xl md:text-4xl font-bold tracking-tighter uppercase text-black hover:text-gray-500 transition-colors">
            LET'S TALK <ArrowUpRight className="inline-block w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>
        
        <div className="flex flex-col md:items-end gap-4 font-mono text-xs text-gray-500 tracking-widest uppercase">
          <p>BHUBANESWAR, INDIA [20.27° N, 85.84° E]</p>
        </div>
      </div>
      
      <div className="w-full text-center pt-8 border-t border-black/5">
        <p className="font-mono text-[10px] md:text-xs text-gray-400 tracking-[0.2em] uppercase">
          "Often Imitated but never duplicated"
        </p>
      </div>
    </footer>
  );
};

function AppContent() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
      touchMultiplier: isMobile ? 1 : 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-black selection:bg-black selection:text-white overflow-hidden">
      <Background />
      <TopLinks />
      <RightNav />
      
      <main className="w-full flex flex-col items-center">
        <Hero />
        <About />
        <Expertise />
        <Works />
        <Insights />
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
