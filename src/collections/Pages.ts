import type { CollectionConfig } from 'payload'

import CTA from './blocks/CTA'
import Feature from './blocks/Feature'
import Hero from './blocks/Hero'
import Testimonial from './blocks/Testimonial'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    description: 'Define dynamic, localized page content and SEO metadata.',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used for page URL (e.g., "home", "contact")',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [Hero, Feature, Testimonial, CTA],
      localized: true,
    },
    {
      label: 'SEO Metadata',
      type: 'collapsible',
      fields: [
        {
          name: 'seoTitle',
          label: 'SEO Title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Appears as the browser tab title and search engine title (max 60 chars)',
          },
        },
        {
          name: 'seoDescription',
          label: 'SEO Description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Appears as the meta description in search results (max 160 chars)',
          },
        },
      ],
    },
  ],
}

export default Pages
