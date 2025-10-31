import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, CheckCircle, ArrowRight, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'We Simplified Our Booking Process: Book Your FREE Consultation in 30 Seconds',
  description: 'Skip the forms and book your FREE EU grant consultation instantly. Learn how we removed friction from our booking process to save you time and get you expert advice faster.',
  openGraph: {
    title: 'Simplified Booking: FREE EU Grant Consultation in 30 Seconds',
    description: 'No more forms. Just click, choose your time, and get expert advice on €200K-€2M EU grants for your Puglia investment.',
    type: 'article',
    publishedTime: '2025-10-31T00:00:00Z',
  }
};

export default function SimplifiedBookingBlogPost() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold">
              🎉 NEW UPDATE
            </span>
            <span className="text-green-100 text-sm">October 31, 2025</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            We Listened. We Simplified.
            <br />
            <span className="text-green-200">Book in 30 Seconds.</span>
          </h1>

          <p className="text-2xl text-green-50 mb-8 leading-relaxed">
            Skip the forms. Get expert advice on €200K-€2M EU grants for your Puglia investment—faster than ever.
          </p>

          <a
            href="https://calendly.com/investinpuglia/30min?utm_source=blog&utm_medium=simplified_booking&utm_campaign=blog_cta"
            className="inline-flex items-center gap-3 bg-white text-green-700 px-8 py-5 rounded-full font-bold text-xl hover:bg-green-50 transition-all shadow-2xl hover:scale-105"
          >
            <Calendar className="h-7 w-7" />
            Book Your FREE Consultation Now
            <ArrowRight className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Here's What Changed (And Why You'll Love It)
          </h2>

          <p className="text-xl text-gray-700 mb-6">
            I'll be honest with you. Our old booking process was getting in your way.
          </p>

          <p className="text-xl text-gray-700 mb-6">
            You wanted expert advice on EU grants. Instead, you got a questionnaire.
          </p>

          <p className="text-xl text-gray-700 mb-6">
            So we fixed it.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-2 border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            The Transformation
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  ❌
                </div>
                <h4 className="text-xl font-bold text-gray-900">BEFORE</h4>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">1.</span>
                  Fill out contact form
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">2.</span>
                  Answer investment questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">3.</span>
                  Share detailed preferences
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">4.</span>
                  THEN get to book
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-red-300">
                <p className="text-red-700 font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time: 2-5 minutes (if you didn't give up)
                </p>
              </div>
            </div>

            {/* After */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  ✅
                </div>
                <h4 className="text-xl font-bold text-gray-900">NOW</h4>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Click "Book FREE Consultation"</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Choose your preferred time</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Done. You're booked.</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-green-300">
                <p className="text-green-700 font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Time: 30 seconds. Seriously.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Changed */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why We Made This Change
          </h2>

          <p className="text-xl text-gray-700 mb-4">
            We analyzed our booking data. The results were clear:
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-6 border-l-4 border-blue-600">
            <p className="text-lg text-gray-800 font-semibold mb-2">
              📊 Only 15% of visitors completed the questionnaire
            </p>
            <p className="text-gray-700">
              85% of potential consultations were lost because of unnecessary friction.
            </p>
          </div>

          <p className="text-xl text-gray-700 mb-4">
            Here's what we learned from your feedback:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3 text-lg text-gray-700">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                1
              </div>
              <span><strong>"I just want to talk to someone."</strong> You didn't need to fill out forms first.</span>
            </li>
            <li className="flex items-start gap-3 text-lg text-gray-700">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                2
              </div>
              <span><strong>"I'm on mobile."</strong> Multi-step forms on phones are painful.</span>
            </li>
            <li className="flex items-start gap-3 text-lg text-gray-700">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                3
              </div>
              <span><strong>"I'll do it later."</strong> (But you never did.)</span>
            </li>
          </ul>

          <p className="text-xl text-gray-700">
            So we removed the barriers. Because getting expert advice should be easy, not exhausting.
          </p>
        </div>

        {/* What You Still Get */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-12 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What You Still Get (For FREE)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                €200K-€2M Grant Assessment
              </h3>
              <p className="text-gray-700">
                We'll review your eligibility for Mini PIA, PIA Turismo, and other EU grants specific to your project.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Project-Specific Guidance
              </h3>
              <p className="text-gray-700">
                Tourism, industrial, commercial—we'll tailor our advice to your exact investment type.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ROI Analysis
              </h3>
              <p className="text-gray-700">
                Realistic projections based on 30+ years of experience and 50+ successful projects.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Clear Action Plan
              </h3>
              <p className="text-gray-700">
                Step-by-step roadmap from consultation to grant approval to property ownership.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg border-2 border-green-300">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">
                The Numbers Don't Lie
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span><strong>95% approval rate</strong> for grant applications</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span><strong>50+ successful investors</strong> in the past 3 years</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span><strong>€100M+</strong> in total project value facilitated</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span><strong>30+ years</strong> combined team experience</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Optional Path */}
        <div className="bg-yellow-50 rounded-xl p-8 mb-12 border-2 border-yellow-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎁 Bonus: Want to Help Us Prepare?
          </h2>

          <p className="text-lg text-gray-700 mb-4">
            We still have the questionnaire—but now it's <strong>optional</strong>.
          </p>

          <p className="text-lg text-gray-700 mb-4">
            If you have 2 extra minutes and want us to research your specific situation before the call, you can:
          </p>

          <ul className="space-y-2 mb-4 text-gray-700">
            <li className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-yellow-600" />
              Share your investment budget and timeline
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-yellow-600" />
              Tell us about your project type
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-yellow-600" />
              Mention any specific questions
            </li>
          </ul>

          <p className="text-lg text-gray-700">
            But if you'd rather dive straight into the conversation? <strong>That works too.</strong>
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl p-12 text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-6">
            Ready to See How Easy This Is?
          </h2>

          <p className="text-2xl text-green-50 mb-8">
            30 seconds. Zero cost. Expert advice that could unlock €2M in grants.
          </p>

          <a
            href="https://calendly.com/investinpuglia/30min?utm_source=blog&utm_medium=simplified_booking&utm_campaign=blog_bottom_cta"
            className="inline-flex items-center gap-3 bg-white text-green-700 px-10 py-6 rounded-full font-bold text-2xl hover:bg-green-50 transition-all shadow-2xl hover:scale-105"
          >
            <Calendar className="h-8 w-8" />
            Book Your FREE Consultation
            <ArrowRight className="h-7 w-7" />
          </a>

          <p className="mt-6 text-green-100 text-sm">
            No payment required • No obligation • No more forms
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Questions You Might Have
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                "Is it really FREE?"
              </h3>
              <p className="text-gray-700">
                Yes. No payment. No credit card. No catch. We offer FREE consultations to help you understand your options.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                "What if I'm just exploring options?"
              </h3>
              <p className="text-gray-700">
                Perfect! That's exactly what the consultation is for. No pressure to proceed. Just information to help you decide.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                "Do I need to prepare anything?"
              </h3>
              <p className="text-gray-700">
                Nope. Just show up with your questions. We'll guide the conversation and make sure you leave with actionable insights.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                "What if I can't make the scheduled time?"
              </h3>
              <p className="text-gray-700">
                Calendly makes it super easy to reschedule. Just click the link in your confirmation email and pick a new time.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <p className="text-2xl text-gray-700 mb-6">
            Stop overthinking it. <strong>Just book the call.</strong>
          </p>

          <a
            href="https://calendly.com/investinpuglia/30min?utm_source=blog&utm_medium=simplified_booking&utm_campaign=blog_final_cta"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-full font-bold text-xl hover:shadow-xl transition-all hover:scale-105"
          >
            <Calendar className="h-7 w-7" />
            Book in 30 Seconds
            <ArrowRight className="h-6 w-6" />
          </a>

          <p className="mt-6 text-gray-600">
            Prefer to call? <a href="tel:+393514001402" className="text-green-600 font-semibold hover:underline">+39 351 400 1402</a>
          </p>
        </div>
      </div>

      {/* Author Bio */}
      <div className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                GF
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  About Giuseppe Funaro
                </h3>
                <p className="text-gray-700 mb-4">
                  Founder of InvestInPuglia.eu, Giuseppe has 30+ years of experience in EU-funded development projects
                  and has helped over 50 international investors successfully navigate the Mini PIA and PIA grant process,
                  securing over €100M in total project funding.
                </p>
                <div className="flex gap-4">
                  <Link href="/about" className="text-green-600 font-semibold hover:underline">
                    Learn More
                  </Link>
                  <Link href="/portfolio" className="text-green-600 font-semibold hover:underline">
                    View Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
