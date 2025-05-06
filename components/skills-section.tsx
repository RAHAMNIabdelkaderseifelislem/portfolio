"use client"; // Required for Recharts and Framer Motion client components

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"; // Assuming Shadcn UI Card
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming Shadcn UI Tabs
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { toolCategories, categoryTabs, iconMap } from "@/data/skillsData"; // Import data

// --- Reusable Radar Chart Component (Keep enhanced version) ---
interface SkillRadarChartProps {
  data: { subject: string; proficiency: number }[];
  strokeColor: string;
  fillColor: string;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data, strokeColor, fillColor }) => (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="rgba(125, 130, 184, 0.2)" /> {/* info/20 */}
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#F5F5F5", fontSize: 12, fontFamily: 'var(--font-accent)' }} // text-light
        />
         <PolarRadiusAxis
           angle={30}
           domain={[0, 100]}
           tick={{ fill: "rgba(245, 245, 245, 0.5)", fontSize: 10 }} // text-light/50
           axisLine={{ stroke: "rgba(125, 130, 184, 0.2)" }} // info/20
           tickCount={6}
         />
        <Radar
          name="Proficiency"
          dataKey="proficiency"
          stroke={strokeColor}
          fill={fillColor}
          fillOpacity={0.6} // Keep opacity from refactor
          strokeWidth={2}
        />
         <Tooltip
            contentStyle={{
                backgroundColor: 'rgba(45, 48, 71, 0.8)', // secondary/80
                borderColor: 'rgba(125, 130, 184, 0.5)', // info/50
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
            labelStyle={{ color: '#F5F5F5' }} // text-light
            itemStyle={{ color: '#F5F5F5' }} // text-light
            formatter={(value: number) => [`${value}/100`, 'Proficiency']} // Adjusted formatter slightly
        />
      </RadarChart>
    </ResponsiveContainer>
);


// --- Main Skills Section Component ---
const SkillsSection = () => {
  return (
    // Revert to original gradient using theme color names
    <section id="skills" className="py-20 from-deep-indigo/90 to-deep-indigo relative">
      {/* Optional: Add subtle background elements if needed */}
      <div className="neural-lines"></div>

      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
           {/* Revert heading/paragraph colors if needed, text-white/text-text-light is usually fine on dark bg */}
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            Technical Skills Laboratory
          </h2>
          <p className="text-text-light/80 max-w-3xl mx-auto text-base md:text-lg">
            A comprehensive overview of my technical expertise and capabilities. {/* Adjusted text slightly */}
          </p>
        </motion.div>

        {/* --- Tabs and Radar Charts --- */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Revert TabsList background/border to original style */}
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 bg-deep-indigo/50 border border-accent-lavender/20">
                {categoryTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    // Use original active color (primary/Vibrant Teal) but keep dynamic approach for consistency
                    // Revert inactive/hover state to original style
                    className={`
                      data-[state=active]:bg-vibrant-teal data-[state=active]:text-cloud-white
                    `}
                  >
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <tab.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>{tab.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

                {/* Tab Content Panes */}
                 {categoryTabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-deep-indigo/50 border border-accent-lavender/20  rounded-xl" >
                         {/* Revert Card background/border */}
                        <Card className="gap-8 items-center">
                         <CardContent className="p-4 sm:p-6">
                            <div className="relative h-[400px] overflow-hidden">
                                 {/* Keep calling the enhanced Radar Chart */}
                                 <SkillRadarChart data={tab.data} strokeColor={tab.stroke} fillColor={tab.fill} />
                            </div>
                         </CardContent>
                        </Card>
                    </TabsContent>
                 ))}
            </Tabs>
        </motion.div>

        {/* --- Tool & Framework Lists --- */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-10 border-t border-info/20" // Revert border color
        >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10 text-white">
                Key Tools & Frameworks
            </h3>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {toolCategories.map((category, index) => {
                    const IconComponent = iconMap[category.icon];
                    return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="skill-item"
                        >
                          <Card className="bg-transparent border-0 h-full">
                            <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                             <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30" >
                                {IconComponent && <IconComponent className={`h-6 w-6 ${category.color}`} />}
                              </div>
                              <h3 className="text-xl font-semibold text-cloud-white">{category.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, skillIndex) => (
                                  // Revert skill tag background/border/text color
                                  <span
                                    key={skillIndex}
                                    className="px-3 py-1 rounded-full text-sm bg-deep-indigo/80 text-cloud-white/90 border border-accent-lavender/20"
                                  >
                                    {skill}
                                  </span>
                                ))}
                            </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                    );
                })}
             </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;