import { Block } from 'payload'

const CTA: Block = {
  slug: 'cta',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
  ],
}

export default CTA
