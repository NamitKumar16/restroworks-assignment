'use client'

import { FormEvent, useState } from 'react'

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  honeypot: '',
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange =
    (field: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message || 'Failed to send message.')
      }

      setSuccess('Thanks for reaching out! We will get back to you soon.')
      setFormData(initialFormData)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-12 px-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-center text-3xl font-semibold text-gray-900">Get in Touch</h1>
        <p className="mt-3 text-center text-gray-600">
          We would love to hear about your project or answer any questions you may have.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="name">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange('subject')}
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="message">
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange('message')}
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tell us about your project or inquiry..."
            />
          </div>

          <div className="hidden">
            <label className="block text-sm font-semibold text-gray-800" htmlFor="honeypot">
              Leave this field blank
            </label>
            <input
              id="honeypot"
              name="honeypot"
              type="text"
              value={formData.honeypot}
              onChange={handleChange('honeypot')}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 px-6 font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {success && (
          <p className="mt-6 text-center text-sm font-medium text-emerald-500">{success}</p>
        )}
        {error && <p className="mt-2 text-center text-sm font-medium text-red-500">{error}</p>}
      </div>
    </section>
  )
}

export default ContactPage
