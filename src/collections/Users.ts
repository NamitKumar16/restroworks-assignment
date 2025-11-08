import type { CollectionConfig } from 'payload'

const isAdminUser = (user: unknown): user is { admin?: boolean } =>
  typeof user === 'object' && user !== null && 'admin' in user

const hasAdminAccess = (user: unknown): boolean => isAdminUser(user) && Boolean(user.admin)

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => hasAdminAccess(user),
    delete: ({ req: { user } }) => hasAdminAccess(user),
    admin: ({ req: { user } }) => hasAdminAccess(user),
  },
  fields: [
    {
      name: 'admin',
      type: 'checkbox',
      label: 'Administrator',
      defaultValue: false,
      required: true,
    },
  ],
}
