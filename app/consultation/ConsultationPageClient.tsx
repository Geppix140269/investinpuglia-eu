'use client';

import { useState } from 'react';
import { Phone, Video, Calendar, CheckCircle, ArrowRight, MessageSquare, Target, Clock, Shield, Users, Star, ChevronRight } from 'lucide-react';
import PreBookingQuestionnaire from '@/components/PreBookingQuestionnaire';
import ConsultationCTA from '@/components/ConsultationCTA';

export default function ConsultationPageClient() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [questionnaireComplete, setQuestionnaireComplete] = useState(false);

  const consultationObjectives = [
    {
      icon: Target,
      title: 'Grant Eligibility Assessment',
      description: 'Discover which EU grants you qualify for tourism, industrial, or commercial projects'
    },
    {
      icon: Shield,
      title: 'Investment Strategy Review',
      description: 'Get personalized advice on tourism development, industrial projects, and commercial ventures in Puglia'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Direct access to our specialists with 30+ years experience in industrial and tourism projects'
    },
    {
      icon: Clock,
      title: 'Fast-Track Process',
      description: 'Learn how to expedite your grant application and approval timeline for any project type'
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

  const handleQuestionnaireComplete = (data: any) => {
    setQuestionnaireComplete(true);
    setShowQuestionnaire(false);
  };

  if (showQuestionnaire) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Pre-Consultation Questionnaire
            </h1>
            <p className="text-lg text-gray-600">
              Help us prepare for your FREE consultation by answering a few quick questions
            </p>
          </div>
          
          <PreBookingQuestionnaire 
            onComplete={handleQuestionnaireComplete}
            calendlyUrl="https://calendly.com/investinpuglia/30min"
          />
          
          <div className="text-center mt-6">
            <button
              onClick={() => setShowQuestionnaire(false)}
              className="text-gray-500 underline hover:text-gray-700"
            >
              Back to consultation info
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section with Direct CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            FREE Expert Consultation
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-4">
            Unlock €200K-€2M in EU Grants for Your Italian Property Investment
          </p>
          <p className="text-lg text-blue-600 font-semibold mb-8">
            30-Minute Strategic Session with Our Grant Experts
          </p>
          
          {/* Main CTA with Two Options */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Quick Book Button - PRIMARY */}
              <a
                href="https://calendly.com/investinpuglia/30min"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'quick_book_click', {
                      event_category: 'consultation',
                      event_label: 'hero_quick_book'
                    });
                  }
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-full font-bold text-xl hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <Calendar className="h-7 w-7" />
                Quick Book (30 sec)
                <ArrowRight className="h-6 w-6" />
              </a>

              {/* Optional: Detailed Questionnaire */}
              <button
                onClick={() => setShowQuestionnaire(true)}
                className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-5 rounded-full font-bold text-xl hover:shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare className="h-7 w-7" />
                Help Us Prepare
              </button>
            </div>

            <p className="text-sm text-gray-600 max-w-2xl text-center">
              <span className="font-semibold text-green-600">Quick Book:</span> Go directly to our calendar |
              <span className="font-semibold text-blue-600 ml-2">Help Us Prepare:</span> Optional 2-min questionnaire for personalized consultation
            </p>
          </div>

          <p className="mt-6 text-gray-600">
            <span className="font-bold text-green-600">100% FREE</span> • No payment required • Limited slots available
          </p>
        </div>
      </section>


      {/* Value Proposition */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You'll Achieve in Your FREE Consultation
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

      {/* Simple Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple 3-Step Process
          </h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Complete Quick Questionnaire</h3>
                <p className="text-gray-600">
                  Answer a few questions about your investment goals and budget (2 minutes)
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Schedule Your Call</h3>
                <p className="text-gray-600">
                  Choose your preferred time slot via Calendly after completing the questionnaire
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get Expert Guidance</h3>
                <p className="text-gray-600">
                  Join your FREE 30-minute consultation with our grant specialists
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We'll Discuss */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We'll Discuss in Your FREE Call
          </h2>
          <div className="bg-blue-50 rounded-xl p-8">
            <p className="text-lg text-gray-700 mb-6">
              To maximize your consultation value, we'll cover:
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
                <span>Available EU grants and your eligibility (€200K-€2M)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Your business plan or investment objectives</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Clear next steps and timeline for your investment</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories from Our FREE Consultations
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

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Unlock €200K-€2M in EU Grants?
          </h2>
          <p className="text-xl mb-8">
            Your FREE 30-minute consultation is just one click away. 
            Get expert advice that could transform your Italian property investment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/investinpuglia/30min"
              className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all gap-3"
            >
              <Calendar className="h-7 w-7" />
              Quick Book Now
              <ChevronRight className="h-6 w-6" />
            </a>

            <button
              onClick={() => setShowQuestionnaire(true)}
              className="inline-flex items-center bg-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:bg-blue-400 transition-all gap-3"
            >
              <MessageSquare className="h-7 w-7" />
              Help Us Prepare
            </button>
          </div>

          <p className="mt-6 text-blue-100">
            ⚡ Limited slots available • 100% FREE • No payment required
          </p>
          
          <p className="text-sm text-blue-200 mt-4">
            Prefer to call directly? +39 351 400 1402
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
                How do I book my consultation?
              </h3>
              <p className="text-gray-600">
                Simply click any "Book Your Call NOW" button on this page. You'll be taken directly 
                to our Calendly scheduling page where you can choose your preferred time slot.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Do I need to prepare anything?
              </h3>
              <p className="text-gray-600">
                No preparation is required! However, if you'd like to help us prepare for your call, 
                you can optionally complete our pre-booking questionnaire. This is not mandatory.
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

      {/* Sticky Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg lg:hidden z-50">
        <div className="flex gap-2">
          <a
            href="https://calendly.com/investinpuglia/30min"
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-full font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            Quick Book
          </a>
          <button
            onClick={() => setShowQuestionnaire(true)}
            className="flex-1 bg-blue-600 text-white py-3 rounded-full font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-5 w-5" />
            Prepare
          </button>
        </div>
      </div>
    </div>
  );
}