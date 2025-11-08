import { Block } from 'payload'

const Feature: Block = {
  slug: 'feature',
  fields: [
    {
      name: 'title',
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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'linkUrl',
      type: 'text',
    },
  ],
}

export default Feature
