import { Github, Linkedin, Mail } from "lucide-react";
import { SiHuggingface } from "react-icons/si";


export default function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-lg border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Sujoy. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a
              href="https://github.com/dutta-sujoy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://huggingface.co/sujoy0011"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <SiHuggingface className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/dutta-sujoy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:sujoydutta0011@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
