'use client';

import Link from 'next/link';
import { Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center justify-center">
            <Brain className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            STEMLens AI
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
            Learn STEM from the world around you
          </p>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Upload any image and discover the science, technology, engineering, and mathematics 
            behind everyday objects. Get instant AI-powered lessons and interactive quizzes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
