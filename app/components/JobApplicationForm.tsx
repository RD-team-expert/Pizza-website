'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2 } from 'lucide-react'

const JOB_LOCATIONS = [
  'Chatterton 001',
  'Hudson 002',
  'Broad 003',
  'Columbus Square 005',
  'Morse Rd 005',
  'Eaton 006',
  'Lebanon 007',
  'Middle Town 008',
  'Trenton 009',
  'Cincinnati-Dayton 010',
  'Hamilton 011',
  'Montgomery 012',
]

const SMS_CONSENT_TEXT =
  'By providing your phone number, you agree to receive recruitment SMS messages regarding your job application and interview scheduling from PNE Pizza LLC. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out.'

export function JobApplicationForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [smsConsent, setSmsConsent] = useState(false)
  const [location, setLocation] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!smsConsent || !location) return
    setSubmitted(true)
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-pizza">Job Application</CardTitle>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Thank you for applying! We will be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                id="fullName"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input
                id="applicantEmail"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input
                id="applicantPhone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="flex items-start gap-2 mt-3">
                <Checkbox
                  id="smsConsent"
                  checked={smsConsent}
                  onCheckedChange={(checked) => setSmsConsent(checked === true)}
                  required
                  className="mt-1"
                />
                <label htmlFor="smsConsent" className="text-xs text-gray-600 leading-relaxed">
                  {SMS_CONSENT_TEXT}{' '}
                  <a href="/privacy-policy" className="underline text-primary">Privacy Policy &amp; SMS Terms</a>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-1">Job Location</label>
              <Select value={location} onValueChange={setLocation} required>
                <SelectTrigger id="jobLocation">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_LOCATIONS.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={!smsConsent || !location}>
              Submit Application
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
