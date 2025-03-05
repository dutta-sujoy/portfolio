import { motion } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";

const experiences = [
  {
    company: "GeeksforGeeks KIIT",
    role: "AI ML",
    duration: "Feb 2025 - Present",
    logo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
    description: [
      "Working on RAG Based AI Agent Projects.",
    ]
  },
  {
    company: "GeeksforGeeks KIIT",
    role: "Core Developer",
    duration: "Feb 2024 - Feb 2025 (1 yr)",
    logo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
    description: [
      "Designed and deployed 2+ web applications, improving community engagement.",
      "Conducted workshops for 500+ students on advanced programming concepts and tools"
    ]
  },
  {
    company: "AISoC",
    role: "Core Member",
    duration: "Feb 2023 - Feb 2025 (2 yrs)",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGybATFXWldWQ/company-logo_200_200/company-logo_200_200/0/1723126491097/a30648263_logo?e=1749081600&v=beta&t=A3TDFWEUVB25yzDRPaP83K6pX7Ix6xJLgImyl5Fz56s", // Replace with actual logo URL
    description: [
      "Participated in 2 AI-based projects, research, and workshops to foster innovation and skill development among peers.",
      "Organized AI/ML workshops for students on AI technologies."
    ]
  },
  {
    company: "EduSkills Foundation",
    role: "Data Analyst (Internship)",
    duration: "Nov 2024 - Jan 2025 (3 mos)",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl8JXBUCR1kZoXlBlJmdVbw_gkIV1UfY0_ig&s", // Replace with actual logo URL
    description: [
      "Fundamental Data Analysis, Data Cleaning, and Data Visualization.",
      "Analyzed large-scale datasets using Python, SQL, and Power BI."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}