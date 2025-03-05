import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TimelineItemProps {
  company: string;
  role: string;
  duration: string;
  description: string[];
  logo: string;
  index: number;
}

export default function TimelineItem({ company, role, duration, description, logo, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="mb-8 flex gap-8"
    >
      <div className="md:block w-24 pt-2 text-right text-sm text-muted-foreground">
          {duration}
      </div>

      <div className="relative flex-grow">
        <div className="absolute left-0 top-2 -ml-6">
          <Avatar className="h-12 w-12 border-4 border-background">
            <AvatarImage src={logo} alt={company} />
            <AvatarFallback className="bg-primary">
              {company.split(' ').map(word => word[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute left-0 top-14 bottom-0 -ml-[2px] w-[2px] bg-border"></div>

        <Card className="ml-8 bg-black/30 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{company}</h3>
                <p className="text-muted-foreground">{role}</p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2">
              {description.map((item, i) => (
                <li key={i} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}