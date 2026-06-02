import { Upload, Scan, BookOpen, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    step: 'Step 1',
    title: 'Upload Image',
    description: 'Take a photo or upload an image of any object around you',
  },
  {
    icon: Scan,
    step: 'Step 2',
    title: 'AI Analyzes Object',
    description: 'Our AI identifies the object and detects relevant STEM concepts',
  },
  {
    icon: BookOpen,
    step: 'Step 3',
    title: 'Generate STEM Lesson',
    description: 'Get comprehensive lessons on physics, math, engineering, and technology',
  },
  {
    icon: Trophy,
    step: 'Step 4',
    title: 'Take Quiz',
    description: 'Test your understanding with interactive quizzes and track your progress',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform any object into a learning opportunity in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                {index + 1}
              </div>
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
