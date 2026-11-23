import { Schema } from 'sanity-typescript'

/**
 * Navigation document type - header and footer menus
 */
export const navigation = Schema.documentType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  singleton: false,

  fields: [
    {
      name: 'headerMenu',
      type: 'array',
      title: 'Header Menu',
      description: 'Navigation links displayed in the header',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Menu Label',
              description: 'The text displayed in the menu',
              validation: Rule => Rule.required(),
            },
            {
              name: 'href',
              type: 'string',
              title: 'Link URL',
              description: 'The URL the menu item links to',
              validation: Rule => Rule.uri(),
            },
            {
              name: 'isExternal',
              type: 'boolean',
              title: 'Is External',
              description: 'Whether this link opens in a new tab',
              initialValue: false,
            },
            {
              name: 'order',
              type: 'number',
              title: 'Order',
              description: 'The display order of the menu item',
              initialValue: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'footerMenu',
      type: 'array',
      title: 'Footer Menu',
      description: 'Navigation links displayed in the footer',
      of: [
        {
          type: 'object',
          name: 'footerMenuItem',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Menu Label',
              description: 'The text displayed in the footer menu',
              validation: Rule => Rule.required(),
            },
            {
              name: 'href',
              type: 'string',
              title: 'Link URL',
              description: 'The URL the menu item links to',
              validation: Rule => Rule.uri(),
            },
            {
              name: 'isExternal',
              type: 'boolean',
              title: 'Is External',
              description: 'Whether this link opens in a new tab',
              initialValue: false,
            },
          ],
        },
      ],
    },
  ],

  preview: {
    select: {
      headerCount: 'headerMenu',
    },
    prepare: ({ headerCount }) => ({
      title: `Navigation - ${headerCount} header items`,
    }),
  },

  __experimental_actions: ['create', 'update', 'delete'],
})