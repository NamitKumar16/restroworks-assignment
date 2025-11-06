import type { CollectionConfig } from 'payload'

const Contacts: CollectionConfig = {
  slug: 'contacts',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'source',
      type: 'text',
    },
    {
      name: 'honeypot',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
  timestamps: true,
}

export default Contacts
