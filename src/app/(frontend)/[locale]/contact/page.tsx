'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { translations, SupportedLocale } from '@/lib/i18n'

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

type ContactPageProps = {
  params: Promise<{
    locale?: string
  }>
}

const ContactPage = ({ params }: ContactPageProps) => {
  const resolvedParams = React.use(params)
  const locale = resolvedParams?.locale ?? 'en'
  const t = translations[locale as SupportedLocale] ?? translations.en
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setError(t.contact.requiredFields)
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
        throw new Error(message || t.contact.error)
      }

      setSuccess(t.contact.success)
      setFormData(initialFormData)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : t.contact.error,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-12 px-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-center text-3xl font-semibold text-gray-900">{t.contact.title}</h1>
        <p className="mt-3 text-center text-gray-600">{t.contact.description}</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="name">
              {t.contact.name}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={t.contact.namePlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="email">
              {t.contact.email}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={t.contact.emailPlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="subject">
              {t.contact.subject}
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange('subject')}
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={t.contact.subjectPlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="message">
              {t.contact.message}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange('message')}
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={t.contact.messagePlaceholder}
            />
          </div>

          <div className="hidden">
            <label className="block text-sm font-semibold text-gray-800" htmlFor="honeypot">
              {t.contact.honeypotLabel}
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
            className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 py-3 px-6 font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? t.contact.sending : t.contact.send}
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
