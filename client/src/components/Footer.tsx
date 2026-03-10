import { Github, Linkedin, Mail } from "lucide-react";
import { SiHuggingface } from "react-icons/si";
import { motion } from "framer-motion";

const footerLinks = [
  { icon: Github, href: "https://github.com/dutta-sujoy", label: "GitHub" },
  { icon: SiHuggingface, href: "https://huggingface.co/sujoy0011", label: "Hugging Face" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/dutta-sujoy/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:sujoydutta0011@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative py-8 px-4">
      {/* Gradient top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground/50">
          © {new Date().getFullYear()} <span className="gradient-text font-medium">Sujoy Dutta</span>. All rights reserved.
        </p>

        <div className="flex gap-4">
          {footerLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground/40 hover:text-foreground border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
