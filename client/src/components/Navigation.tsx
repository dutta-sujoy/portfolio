import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-400">&lt;SUJOY/&gt;</a>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6">
          {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden text-muted-foreground focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-t border-border absolute left-0 right-0 top-16 p-4"
        >
          <ul className="flex flex-col gap-4">
            {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
