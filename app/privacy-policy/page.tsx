import type { Metadata } from 'next'
import { ModernNavbar } from '../components/ModernNavbar'
import { Footer } from '../components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy & SMS Terms | PNE Pizza',
  description: 'Privacy Policy and SMS Terms of Service for PNE Pizza LLC.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <ModernNavbar />
      <main className="flex min-h-screen flex-col">
        <div className="flex-grow bg-gradient-to-b from-orange-50 to-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-pizza font-bold text-primary mb-10">
              Privacy Policy &amp; SMS Terms of Service
            </h1>

            <section id="privacy-policy" className="mb-10">
              <h2 className="text-2xl font-bold mb-3">1. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                PNE Pizza LLC collects mobile phone numbers strictly for candidate communications,
                interview scheduling, and hiring/onboarding updates. We do not sell, rent, share, or
                trade your mobile information with third parties for marketing or promotional purposes
                under any circumstances.
              </p>
            </section>

            <section id="sms-terms">
              <h2 className="text-2xl font-bold mb-3">2. SMS Terms &amp; Conditions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By providing your phone number, you agree to receive interview and hiring updates from
                PNE Pizza LLC. Message frequency varies based on your application status. Msg &amp; data
                rates may apply.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Opt-Out (Unsubscribe):</strong> You can cancel the SMS service at any time by
                simply replying STOP to any message. Once you send STOP, you will receive a confirmation
                message, and you will no longer receive SMS messages from us.
              </p>
            </section>
          </article>
        </div>
        <Footer />
      </main>
    </>
  )
}
