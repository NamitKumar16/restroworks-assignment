import type { CollectionConfig } from 'payload'

import CTA from './blocks/CTA'
import Feature from './blocks/Feature'
import Hero from './blocks/Hero'
import Testimonial from './blocks/Testimonial'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used in page URL',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, Feature, Testimonial, CTA],
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
    },
  ],
}

export default Pages
