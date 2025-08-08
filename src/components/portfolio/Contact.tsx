import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Github, Linkedin, X as XIcon, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';


const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are not set.');
      }
      const res = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          name: formData.name,
          from_email: formData.email,
          email: formData.email,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      );
      toast({
        title: 'Message sent!',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to send message.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/abheeshakespeare", 
      label: "GitHub",
      username: "@abheeshakespeare"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/abheeshakespeare/", 
      label: "LinkedIn",
      username: "abheeshakespeare"
    },
    {
      icon: XIcon,
      href: "https://twitter.com/kr_abhi__",
      label: "X",
      username: "@kr_abhi__"
    },
    { 
      icon: Mail, 
      href: "mailto:kumarabhishekmishra28@gmail.com", 
      label: "Email",
      username: "kumarabhishekmishra28@gmail.com"
    }
  ];

  const contactInfo = [
    { icon: MapPin, label: "Location", value: "Ranchi, JH" },
    { icon: Phone, label: "Phone", value: "+91 9334905084" },
    { icon: Mail, label: "Email", value: "kumarabhishekmishra28@gmail.com" }
  ];

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-syntax-function">contactMe</span>
              <span className="text-foreground">()</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's build something amazing together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="terminal-window"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="text-muted-foreground font-mono text-xs ml-4">
                  contact-form.jsx
                </span>
              </div>
              <div className="terminal-content">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-mono text-syntax-string mb-2">
                        "name": 
                      </label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-terminal-border focus:border-matrix-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono text-syntax-string mb-2">
                        "email": 
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-terminal-border focus:border-matrix-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono text-syntax-string mb-2">
                        "message": 
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Let's discuss your project..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="bg-background border-terminal-border focus:border-matrix-green resize-none"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit"
                    className="w-full hover-glow group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Send className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Send className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Social Links */}
            <div className="space-y-8">
              {/* Contact Information */}
              <motion.div
                className="terminal-window"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="terminal-header">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                  <span className="text-muted-foreground font-mono text-xs ml-4">
                    contact-info.json
                  </span>
                </div>
                <div className="terminal-content">
                  <pre className="text-sm leading-relaxed">
                    <span className="text-foreground">{'{'}</span>
                    <br />
                    {contactInfo.map((info, index) => (
                      <div key={info.label}>
                        <span className="ml-4 text-syntax-string">"{info.label.toLowerCase()}"</span>
                        <span className="text-foreground">: </span>
                        <span className="text-syntax-string">"{info.value}"</span>
                        {index < contactInfo.length - 1 && <span className="text-foreground">,</span>}
                        <br />
                      </div>
                    ))}
                    <span className="text-foreground">{'}'}</span>
                  </pre>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-xl font-bold text-center mb-6">
                  <span className="text-syntax-comment">// Find me online</span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="flex items-center gap-4 p-4 rounded-lg border border-terminal-border hover-glow transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 10 }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    >
                      <social.icon className="h-6 w-6 text-matrix-green flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium">{social.label}</div>
                        <div className="text-sm text-muted-foreground">{social.username}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Availability Status */}
              <motion.div
                className="bg-card/50 rounded-lg p-6 border border-terminal-border text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-matrix-green rounded-full animate-pulse-glow"></div>
                  <span className="text-matrix-green font-mono text-sm">Available for work</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Open to freelance projects and full-time opportunities
                </p>
              </motion.div>
            </div>
          </div>

          {/* Quote/Footer */}
          <motion.div
            className="text-center mt-16 pt-8 border-t border-terminal-border"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <blockquote className="text-lg italic text-muted-foreground mb-4">
              "The best way to predict the future is to create it."
            </blockquote>
            <cite className="text-sm text-matrix-green">- Abraham Lincoln</cite>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;