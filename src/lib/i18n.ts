export const translations = {
  en: {
    header: { home: 'Home', contact: 'Contact', brand: 'Restroworks' },
    footer: {
      tagline: 'Crafting vibrant digital experiences for modern restaurants.',
      copyright: 'All rights reserved.',
    },
    contact: {
      title: 'Get in Touch',
      description: 'We would love to hear about your project or answer any questions you may have.',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      subject: 'Subject',
      subjectPlaceholder: 'How can we help?',
      message: 'Message',
      messagePlaceholder: 'Tell us about your project or inquiry...',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Thanks for reaching out! We will get back to you soon.',
      error: 'Something went wrong. Please try again.',
      requiredFields: 'Please fill in all required fields.',
      honeypotLabel: 'Leave this field blank',
    },
    homepage: {
      title: 'Welcome to Restroworks',
      subtitle: 'Crafting delightful restaurant experiences with modern technology.',
      noContentTitle: 'No content yet',
      noContentMessage:
        'Publish blocks for the home page in the Payload admin panel to see them here.',
    },
  },
  hi: {
    header: { home: 'मुखपृष्ठ', contact: 'संपर्क करें', brand: 'रेस्ट्रोवर्क्स' },
    footer: {
      tagline: 'आधुनिक रेस्टोरेंट्स के लिए जीवंत डिजिटल अनुभव तैयार करना।',
      copyright: 'सर्वाधिकार सुरक्षित।',
    },
    contact: {
      title: 'संपर्क करें',
      description:
        'हम आपके प्रोजेक्ट के बारे में सुनना पसंद करेंगे या आपके किसी भी प्रश्न का उत्तर देंगे।',
      name: 'नाम',
      namePlaceholder: 'आपका नाम',
      email: 'ईमेल',
      emailPlaceholder: 'you@example.com',
      subject: 'विषय',
      subjectPlaceholder: 'हम कैसे मदद कर सकते हैं?',
      message: 'संदेश',
      messagePlaceholder: 'हमें अपने प्रोजेक्ट या प्रश्न के बारे में बताएं...',
      send: 'संदेश भेजें',
      sending: 'भेजा जा रहा है...',
      success: 'आपके संपर्क के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
      error: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
      requiredFields: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
      honeypotLabel: 'इस फ़ील्ड को खाली छोड़ दें',
    },
    homepage: {
      title: 'रेस्ट्रोवर्क्स में आपका स्वागत है',
      subtitle: 'प्रौद्योगिकी की शक्ति से अपने रेस्टोरेंट अनुभव को बेहतर बनाएं।',
      noContentTitle: 'अभी तक कोई सामग्री नहीं',
      noContentMessage:
        'होम पेज पर सामग्री देखने के लिए Payload एडमिन पैनल में ब्लॉक्स प्रकाशित करें।',
    },
  },
}

export type SupportedLocale = keyof typeof translations
export const SUPPORTED_LOCALES = Object.keys(translations) as SupportedLocale[]
export const DEFAULT_LOCALE: SupportedLocale = 'en'
export const isSupportedLocale = (value?: string): value is SupportedLocale =>
  typeof value === 'string' && value in translations
