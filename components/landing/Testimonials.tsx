import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'High School Student',
    content: 'STEMLens AI makes learning fun! I can learn about physics just by taking pictures of things around my house.',
    initials: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'University Student',
    content: 'The quizzes are challenging and help me understand complex engineering concepts in a practical way.',
    initials: 'MC',
  },
  {
    name: 'Emily Rodriguez',
    role: 'STEM Teacher',
    content: 'I use STEMLens AI in my classroom. My students are more engaged than ever in learning STEM subjects.',
    initials: 'ER',
  },
  {
    name: 'David Thompson',
    role: 'Parent',
    content: 'My kids love exploring objects around them and learning the science behind everyday things. Highly recommend!',
    initials: 'DT',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students and educators using STEMLens AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
