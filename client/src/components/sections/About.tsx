import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default forwardRef<HTMLElement>(function About(props, ref) {
  return (
    <section id="about" className="py-20 px-4 mt-16">
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-20 px-6 md:px-16 lg:px-32"
    >
      <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
      
      <Card className="bg-black/30 shadow-lg">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
          <Avatar className="w-48 h-48">
            <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQHJPsyBRN5urA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726229822878?e=1746662400&v=beta&t=tGa0zdTYajCZ680MeRC_Fdy0_jP9n7QY12Qc7FR3Fmo" />
            <AvatarFallback>Sujoy Dutta</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <p className="text-lg leading-relaxed text-muted-foreground">
            I am an AI/ML enthusiast and software developer with experience in building intelligent systems. Passionate about Deep learning, Generative AI, and LLMs, I create solutions that bridge the gap between technology and real-world applications. Beyond coding, I have a strong interest in robotics and enjoy working on innovative hardware projects. In my free time, I love playing the guitar, traveling, and exploring new places on bike.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.section>
    </section>
  );
});
