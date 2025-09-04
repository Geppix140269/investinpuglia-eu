'use client';

import { useState, useEffect } from 'react';
import { Phone, Video, Calendar, CheckCircle, ArrowRight, MessageSquare, Target, Clock, Shield, Users, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import TrulloConsultation from '@/components/trullo/TrulloConsultation';

export default function ConsultationPageClient() {
  const [showTrullo, setShowTrullo] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(false);

  useEffect(() => {
    // Check if user has already answered questions
    const answered = localStorage.getItem('consultation-questions-answered');
    if (answered === 'true') {
      setQuestionsAnswered(true);
    }

    // Trigger Trullo to open after a delay
    const timer = setTimeout(() => {
      if (!questionsAnswered) {
        setShowTrullo(true);
        // Open Trullo chatbot with consultation context
        if (window.trullo) {
          window.trullo.open();
          window.trullo.sendMessage('I\'m interested in booking a consultation');
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [questionsAnswered]);

  const consultationObjectives = [
    {
      icon: Target,
      title: 'Grant Eligibility Assessment',
      description: 'Discover which EU grants you qualify for and potential funding amounts'
    },
    {
      icon: Shield,
      title: 'Investment Strategy Review',
      description: 'Get personalized advice on property investment opportunities in Puglia'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Direct access to our grant specialists with 30+ years of experience'
    },
    {
      icon: Clock,
      title: 'Fast-Track Process',
      description: 'Learn how to expedite your grant application and approval timeline'
    }
  ];

  const testimonials = [
    {
      name: 'Marco R.',
      location: 'Switzerland',
      text: 'The consultation clarified everything about the Mini PIA grant. We secured €450K for our B&B project!',
      rating: 5
    },
    {
      name: 'Sarah L.',
      location: 'United Kingdom',
      text: 'Professional and knowledgeable team. The roadmap they provided saved us months of research.',
      rating: 5
    },
    {
      name: 'Hans M.',
      location: 'Germany',
      text: 'Giuseppe\'s expertise in EU grants is exceptional. Highly recommend the consultation!',
      rating: 5
    }
  ];

  const handleStartQuestionnaire = () => {
    setShowTrullo(true);
    // Open Trullo with consultation context
    if (window.trullo) {
      window.trullo.open();
      window.trullo.sendMessage('I want to book a FREE consultation');
    }
  };

  return (
    <>
      <TrulloConsultation />
      <Script
        id="trullo-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.trulloConfig = {
              context: 'consultation',
              autoOpen: false,
              initialMessage: 'consultation_inquiry'
            };
          `
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              FREE Expert Consultation
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-4">
              Unlock €200K-€2M in EU Grants for Your Italian Property Investment
            </p>
            <p className="text-lg text-blue-600 font-semibold">
              30-Minute Strategic Session with Our Grant Experts
            </p>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What You'll Achieve in Your Consultation
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {consultationObjectives.map((objective, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <objective.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{objective.title}</h3>
                  <p className="text-gray-600">{objective.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Simple 3-Step Process
            </h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Answer Quick Questions</h3>
                  <p className="text-gray-600">
                    Our intelligent chatbot Trullo will guide you through a brief questionnaire 
                    to understand your investment goals and grant eligibility (3-5 minutes)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Schedule Your Free Call</h3>
                  <p className="text-gray-600">
                    Choose your preferred time slot via Calendly - available times include 
                    mornings, afternoons, and evenings to accommodate all time zones
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get Expert Guidance</h3>
                  <p className="text-gray-600">
                    Join your 30-minute video or phone consultation with our grant specialists 
                    for personalized advice and clear next steps
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Consultation Questions Preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What We'll Discuss
            </h2>
            <div className="bg-blue-50 rounded-xl p-8">
              <p className="text-lg text-gray-700 mb-6">
                To make the most of your consultation, we'll need to understand:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Your investment timeline and budget range</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Type of property you're interested in (residential, commercial, hospitality)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Your business plan or investment objectives</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Previous experience with property investment or grants</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Preferred location in Puglia and specific requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Success Stories from Our Consultations
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl mb-8">
              Your FREE consultation is just a few questions away. Let's discuss how 
              EU grants can transform your Italian property investment.
            </p>
            
            <button
              onClick={handleStartQuestionnaire}
              className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              <MessageSquare className="mr-3 h-6 w-6" />
              Start Free Consultation Process
              <ChevronRight className="ml-2 h-6 w-6" />
            </button>
            
            <p className="mt-6 text-blue-100">
              Takes only 3-5 minutes • No payment required • Instant scheduling
            </p>
            
            <p className="text-sm text-blue-200 mt-2">
              Or call directly: +39 351 400 1402
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Is the consultation really free?
                </h3>
                <p className="text-gray-600">
                  Yes! We offer a complimentary 30-minute consultation to help you understand 
                  your grant eligibility and investment opportunities. There's no obligation to proceed.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What if I'm not ready to invest immediately?
                </h3>
                <p className="text-gray-600">
                  That's perfectly fine! Many clients consult with us months before making their 
                  investment. We'll help you understand the timeline and prepare for when you're ready.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Do I need to have a specific property in mind?
                </h3>
                <p className="text-gray-600">
                  No, we can discuss general investment strategies and grant opportunities. 
                  However, if you have specific properties in mind, we can provide more targeted advice.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What languages are consultations available in?
                </h3>
                <p className="text-gray-600">
                  Our consultations are available in English, Italian, German, and French. 
                  Please specify your preference when booking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Alternative */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 mb-4">
              Prefer to speak with someone immediately?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+393514001402"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: +39 351 400 1402
              </a>
              <a
                href="mailto:g.funaro@investinpuglia.eu"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Email: g.funaro@investinpuglia.eu
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}