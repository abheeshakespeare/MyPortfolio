import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    "Full Stack Developer",
    "React Specialist", 
    "Node.js Expert",
    "Problem Solver"
  ];

  useEffect(() => {
    const currentRoleText = roles[currentRole];
    let currentIndex = 0;
    
    const typeTimer = setInterval(() => {
      if (currentIndex <= currentRoleText.length) {
        setDisplayedText(currentRoleText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [currentRole]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Matrix Background Effect */}
      <div className="absolute inset-0 matrix-rain opacity-10" />
      
      {/* Enhanced Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-matrix-green/15 font-mono"
            initial={{ y: -100, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: "120vh",
              x: [0, Math.sin(i) * 100, Math.cos(i) * 150],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.3],
              rotate: [0, 360]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 8}px`
            }}
          >
            {["const", "function", "return", "async", "await", "=>", "{}", "[]", "import", "export", "class", "interface"][i]}
          </motion.div>
        ))}
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-matrix-green rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              opacity: 0 
            }}
            animate={{
              y: -100,
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal Window */}
          <motion.div 
            className="terminal-window mb-8"
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px hsl(var(--matrix-green) / 0.3)"
            }}
          >
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <span className="text-muted-foreground font-mono text-xs ml-4">
                abhishek@portfolio:~$
              </span>
            </div>
            <div className="terminal-content">
              <div className="font-mono">
                <span className="text-syntax-keyword">const</span>{" "}
                <span className="text-syntax-function">developer</span>{" "}
                <span className="text-foreground">=</span>{" "}
                <span className="text-foreground">{'{'}</span>
                <br />
                <span className="ml-4 text-syntax-string">"name"</span>
                <span className="text-foreground">:</span>{" "}
                <span className="text-syntax-string">"Abhishek Kr. Mishra"</span>
                <span className="text-foreground">,</span>
                <br />
                <span className="ml-4 text-syntax-string">"role"</span>
                <span className="text-foreground">:</span>{" "}
                <span className="text-syntax-string">
                  "{displayedText}"
                  <span className="typing-cursor animate-pulse-glow"></span>
                </span>
                <br />
                <span className="text-foreground">{'}'}</span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 1,
                delay: 0.5,
                type: "spring",
                stiffness: 200
              }}
            >
              <motion.span 
                className="text-foreground"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Hi, I'm Abhishek
              </motion.span>
              
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crafting digital experiences with modern web technologies. 
              Passionate about clean code, beautiful UIs, and scalable solutions.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  <a href="#contact">
    <Button className="hover-glow group">
      <Mail className="mr-2 h-4 w-4 group-hover:animate-pulse" />
      Get In Touch
    </Button>
  </a>
  
  <a href="/MyResume.pdf" target="_blank" rel="noopener noreferrer">
    <Button variant="outline" className="hover-glow group">
      <Download className="mr-2 h-4 w-4 group-hover:animate-pulse" />
      View Resume
    </Button>
  </a>
</motion.div>


          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
            {
              icon: Github,
              href: "https://github.com/abheeshakespeare",
              label: "GitHub",
            },
            {
              icon: Linkedin,
              href: "https://www.linkedin.com/in/abheeshakespeare/",
              label: "LinkedIn",
            },
            {
              icon: Mail,
              href: "mailto:kumarabhishekmishra@28gmail.com",
              label: "Email",
            },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-terminal-border hover-glow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-6 w-6 text-matrix-green" />
              <span className="sr-only">{label}</span>
            </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-matrix-green rounded-full flex justify-center">
          <div className="w-1 h-3 bg-matrix-green rounded-full mt-2 animate-pulse-glow" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;