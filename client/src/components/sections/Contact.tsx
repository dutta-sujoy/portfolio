import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { SiHuggingface } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

// EmailJS credentials
const EMAILJS_SERVICE_ID = "service_kpuater";
const EMAILJS_TEMPLATE_ID = "template_7f0f6gs";
const EMAILJS_PUBLIC_KEY = "XbGQIXvdqJ3spCRov";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/dutta-sujoy",
    label: "GitHub",
    color: "hover:text-white hover:border-white/30 hover:shadow-white/10",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/dutta-sujoy/",
    label: "LinkedIn",
    color: "hover:text-blue-400 hover:border-blue-400/30 hover:shadow-blue-400/10",
  },
  {
    icon: SiHuggingface,
    href: "https://huggingface.co/sujoy0011",
    label: "Hugging Face",
    color: "hover:text-yellow-400 hover:border-yellow-400/30 hover:shadow-yellow-400/10",
  },
  {
    icon: Mail,
    href: "mailto:sujoydutta0011@gmail.com",
    label: "Email",
    color: "hover:text-cyan-400 hover:border-cyan-400/30 hover:shadow-cyan-400/10",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactForm) => {
    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent! ✨",
        description: "I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="05" title="Get In Touch" />

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 -mt-8 mb-10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          <span className="text-xs text-muted-foreground/50">Usually responds within 24 hours</span>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Input
                    placeholder="Your Name"
                    {...register("name")}
                    className="bg-white/5 border-white/10 focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300 placeholder:text-muted-foreground/40 h-12"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    {...register("email")}
                    className="bg-white/5 border-white/10 focus:border-cyan-400/50 transition-all duration-300 placeholder:text-muted-foreground/40 h-12"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="Your Message"
                    {...register("message")}
                    className="bg-white/5 border-white/10 focus:border-cyan-400/50 transition-all duration-300 placeholder:text-muted-foreground/40 min-h-[140px] resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 border-0 font-semibold transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex flex-col justify-center gap-4"
          >
            <p className="text-sm text-muted-foreground/60 mb-2 text-center md:text-left">
              Connect with me
            </p>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-muted-foreground transition-all duration-300 hover:shadow-lg ${link.color}`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
