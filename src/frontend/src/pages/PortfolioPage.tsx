import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Twitter,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Project, Skill } from "../backend.d";
import {
  useProfile,
  useProjects,
  useSkills,
  useSubmitContact,
} from "../hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SKILL_LOGOS: Record<string, string> = {
  photoshop: "/assets/generated/skill-photoshop-transparent.dim_120x120.png",
  illustrator:
    "/assets/generated/skill-illustrator-transparent.dim_120x120.png",
  maya: "/assets/generated/skill-maya-transparent.dim_120x120.png",
  blender: "/assets/generated/skill-blender-transparent.dim_120x120.png",
  premiere: "/assets/generated/skill-premiere-transparent.dim_120x120.png",
  aftereffects:
    "/assets/generated/skill-aftereffects-transparent.dim_120x120.png",
  unreal: "/assets/generated/skill-unreal-transparent.dim_120x120.png",
};

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    setActiveSection(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="text-xl font-extrabold uppercase tracking-widest"
          data-ocid="nav.link"
        >
          <span className="text-orange">NICK</span>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors relative pb-1 ${
                activeSection === link.href.replace("#", "")
                  ? "text-orange"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="nav.link"
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Button
            className="hidden md:flex bg-orange text-primary-foreground font-bold uppercase tracking-wider rounded-full px-6 hover:opacity-90 transition-opacity"
            onClick={() => handleNavClick("#contact")}
            data-ocid="nav.primary_button"
          >
            Hire Me
          </Button>
          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-orange transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
          <Button
            className="bg-orange text-primary-foreground font-bold uppercase tracking-wider rounded-full w-full"
            onClick={() => handleNavClick("#contact")}
            data-ocid="nav.primary_button"
          >
            Hire Me
          </Button>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  const { data: profile } = useProfile();
  const name = profile?.name ?? "Nick";

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, oklch(0.63 0.19 42 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center py-16">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
            HELLO, I'M{" "}
            <span className="text-orange">{name.toUpperCase()}.</span>
          </p>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-foreground">
            Building <span className="text-orange">Pixel-Perfect</span> Digital
            Experiences
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            {profile?.title ?? "Full-Stack Developer & UI/UX Designer"}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              size="lg"
              className="bg-orange text-primary-foreground font-bold uppercase tracking-wider rounded-full px-8 hover:opacity-90 transition-opacity glow-orange-sm"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.primary_button"
            >
              View Projects
            </Button>
            <button
              type="button"
              className="flex items-center gap-2 text-orange font-semibold hover:gap-3 transition-all"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.secondary_button"
            >
              Let's Talk <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Right: Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Glow behind portrait */}
            <div
              className="absolute inset-0 rounded-full blur-3xl animate-glow-pulse"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.63 0.19 42 / 0.4) 0%, transparent 70%)",
                transform: "scale(1.2)",
              }}
            />
            <img
              src="/assets/generated/hero-portrait.dim_500x600.png"
              alt={`${name} - Portfolio`}
              className="relative z-10 w-64 h-80 sm:w-80 sm:h-96 object-cover object-top rounded-3xl"
              style={{ boxShadow: "0 0 80px oklch(0.63 0.19 42 / 0.25)" }}
            />
            {/* Orange accent border */}
            <div className="absolute -inset-2 rounded-3xl border border-orange opacity-30 z-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { data: profile } = useProfile();
  const name = profile?.name ?? "Nick";

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-3xl border border-border p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <img
                  src="/assets/generated/hero-portrait.dim_500x600.png"
                  alt={`${name} about`}
                  className="w-64 h-72 object-cover object-top rounded-2xl"
                  style={{ boxShadow: "0 0 40px oklch(0.63 0.19 42 / 0.2)" }}
                />
                <div className="absolute -bottom-3 -right-3 bg-orange text-primary-foreground rounded-xl px-4 py-2 text-sm font-bold">
                  5+ Years Exp
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-extrabold uppercase leading-snug">
                Passionate About <span className="text-orange">Innovation</span>{" "}
                &amp; Craft
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {profile?.bio ??
                  "I'm a passionate full-stack developer with over 5 years of experience crafting beautiful, high-performance digital experiences. I blend technical precision with creative design thinking to deliver products that users love."}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "50+ successful client projects delivered",
                  "Specializing in React, TypeScript & Node.js",
                  "Open to freelance and full-time roles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 pt-2">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-orange">50+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Projects
                  </div>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-orange">5+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Years
                  </div>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-orange">30+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const logoSrc = SKILL_LOGOS[skill.iconName];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-4 hover:border-orange transition-colors group text-center"
      data-ocid={`skills.item.${index + 1}`}
    >
      <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={skill.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center">
            <span className="text-orange font-extrabold text-2xl">
              {skill.name[0]}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3 className="font-bold text-foreground text-lg">{skill.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {skill.description}
        </p>
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  const { data: skills = [] } = useSkills();

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title">My Skills</h2>
          <span className="section-title-accent" />
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:border-orange transition-colors"
      data-ocid={`projects.item.${index + 1}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={
            project.imageUrl ||
            `https://placehold.co/600x400/1A1A1A/FF6A00?text=${encodeURIComponent(project.title)}`
          }
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="font-extrabold text-foreground text-lg">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-border text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-end pt-2">
          <a
            href={project.projectUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-bold text-orange hover:opacity-80 transition-opacity"
            data-ocid={`projects.link.${index + 1}`}
          >
            View <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  const { data: projects = [] } = useProjects();

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Featured Projects</h2>
          <span className="section-title-accent" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { data: profile } = useProfile();
  const submitContact = useSubmitContact();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitContact.mutateAsync(form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Get In Touch</h2>
          <span className="section-title-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-3xl border border-border overflow-hidden"
        >
          {/* Orange header strip */}
          <div className="bg-orange px-8 py-5">
            <h3 className="text-xl font-extrabold uppercase tracking-widest text-primary-foreground">
              GET IN TOUCH
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Form */}
            <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                data-ocid="contact.modal"
              >
                <div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                    Name
                  </div>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-orange"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                    Email
                  </div>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-orange"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                    Message
                  </div>
                  <Textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-orange resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full bg-orange text-primary-foreground font-bold uppercase tracking-wider rounded-xl py-6 hover:opacity-90 transition-opacity"
                  data-ocid="contact.submit_button"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="p-8 lg:p-10 flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <h4 className="text-lg font-bold uppercase tracking-wider">
                  Contact Details
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Email
                    </div>
                    <div className="text-sm font-semibold">
                      {profile?.email ?? "lingampallynikhil7@gmail.com"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Phone
                    </div>
                    <div className="text-sm font-semibold">9573971664</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Location
                    </div>
                    <div className="text-sm font-semibold">
                      {profile?.location ?? "San Francisco, CA"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold uppercase tracking-wider mb-4">
                  Social Links
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      className="w-11 h-11 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-orange hover:border-orange transition-colors"
                      data-ocid="contact.link"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-auto p-6 bg-secondary rounded-2xl border border-border">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I'm currently open to freelance projects and full-time
                  opportunities. Let's build something amazing together!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="w-4 h-4" />, href: "#", label: "Twitter" },
  ];

  const scroll = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="text-xl font-extrabold uppercase tracking-widest">
              <span className="text-orange">NICK</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building pixel-perfect digital experiences with passion and
              precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-4">
              Quick Links
            </h5>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scroll(link.href)}
                    className="text-sm text-muted-foreground hover:text-orange transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-4">
              Social Media
            </h5>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-orange hover:border-orange transition-colors"
                  data-ocid="footer.link"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear}. Built with <span className="text-orange">♥</span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
