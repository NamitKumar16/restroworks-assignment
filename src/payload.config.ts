// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { buildConfig } from 'payload'
import type { CollectionSlug } from 'payload'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Hero from './collections/blocks/Hero'
import Feature from './collections/blocks/Feature'
import Testimonial from './collections/blocks/Testimonial'
import CTA from './collections/blocks/CTA'
import Pages from './collections/Pages'
import Contacts from './collections/Contact'

export const blocks = [Hero, Feature, Testimonial, CTA]

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const usersCollectionSlug = Users.slug as CollectionSlug

const enableAdminAutoLogin = process.env.PAYLOAD_ENABLE_ADMIN_AUTOLOGIN === 'true'
const adminAutoLoginEmail = process.env.PAYLOAD_ADMIN_AUTOLOGIN_EMAIL
const adminAutoLoginPassword = process.env.PAYLOAD_ADMIN_AUTOLOGIN_PASSWORD

const adminAutoLoginCredentials =
  enableAdminAutoLogin && adminAutoLoginEmail && adminAutoLoginPassword
    ? {
        email: adminAutoLoginEmail,
        password: adminAutoLoginPassword,
      }
    : undefined

export default buildConfig({
  serverURL: process.env.PAYLOAD_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    ...(adminAutoLoginCredentials
      ? {
          autoLogin: adminAutoLoginCredentials,
        }
      : {}),
  },
  blocks,
  collections: [Users, Media, Pages, Contacts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  localization: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
    fallback: true,
  },
  onInit: async (payload) => {
    if (!adminAutoLoginCredentials) {
      return
    }

    const existingAdminUser = await payload.find({
      collection: usersCollectionSlug,
      limit: 1,
      where: {
        email: {
          equals: adminAutoLoginCredentials.email,
        },
      },
    })

    if (existingAdminUser.totalDocs === 0) {
      await payload.create({
        collection: usersCollectionSlug,
        data: {
          email: adminAutoLoginCredentials.email,
          password: adminAutoLoginCredentials.password,
          admin: true,
        },
      })
    }
  },
})
