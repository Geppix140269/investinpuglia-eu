// sanity-studio/schemaTypes/calculatorConfig.ts

import { defineField, defineType } from 'sanity'

export const calculatorConfigType = defineType({
  name: 'calculatorConfig',
  title: 'Calculator Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Configuration Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Mini PIA Turismo 2025"'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only one configuration can be active at a time'
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'datetime',
    }),
    defineField({
      name: 'parameters',
      title: 'Calculator Parameters',
      type: 'object',
      fields: [
        defineField({
          name: 'propertyValue',
          title: 'Property Value Limits',
          type: 'object',
          fields: [
            { name: 'min', type: 'number', title: 'Minimum (€)', initialValue: 100000 },
            { name: 'max', type: 'number', title: 'Maximum (€)', initialValue: 3000000 },
            { name: 'step', type: 'number', title: 'Step (€)', initialValue: 10000 },
          ]
        }),
        defineField({
          name: 'renovationBudget',
          title: 'Renovation Budget Limits',
          type: 'object',
          fields: [
            { name: 'min', type: 'number', title: 'Minimum (€)', initialValue: 50000 },
            { name: 'max', type: 'number', title: 'Maximum (€)', initialValue: 2000000 },
            { name: 'step', type: 'number', title: 'Step (€)', initialValue: 5000 },
          ]
        }),
        defineField({
          name: 'grantRates',
          title: 'Grant Rate Options',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string', title: 'Label' },
              { name: 'value', type: 'number', title: 'Rate (as decimal)', description: 'e.g., 0.4 for 40%' },
              { name: 'description', type: 'text', title: 'Description', rows: 2 },
              { name: 'conditions', type: 'array', of: [{ type: 'string' }], title: 'Conditions' }
            ]
          }],
          initialValue: [
            { label: 'Base Rate', value: 0.4, description: 'Standard 40% grant rate' },
            { label: 'Small Enterprise', value: 0.5, description: '50% for small enterprises' },
            { label: 'Micro Enterprise', value: 0.6, description: '60% for micro enterprises' }
          ]
        }),
        defineField({
          name: 'components',
          title: 'Required Components',
          type: 'object',
          fields: [
            {
              name: 'innovation',
              type: 'object',
              title: 'Innovation Component',
              fields: [
                { name: 'minPercent', type: 'number', title: 'Minimum %', initialValue: 2 },
                { name: 'description', type: 'text', title: 'Description' }
              ]
            },
            {
              name: 'sustainability',
              type: 'object',
              title: 'Environmental Sustainability',
              fields: [
                { name: 'minPercent', type: 'number', title: 'Minimum %', initialValue: 2 },
                { name: 'maxPercent', type: 'number', title: 'Maximum %', initialValue: 3 },
                { name: 'description', type: 'text', title: 'Description' }
              ]
            }
          ]
        }),
        defineField({
          name: 'costs',
          title: 'Cost Calculations',
          type: 'object',
          fields: [
            {
              name: 'designAndPM',
              type: 'object',
              title: 'Design & Project Management',
              fields: [
                { name: 'percent', type: 'number', title: 'Percentage', initialValue: 6 },
                { name: 'description', type: 'string', title: 'Description' }
              ]
            },
            {
              name: 'preliminaryStudies',
              type: 'object',
              title: 'Preliminary Studies',
              fields: [
                { name: 'percent', type: 'number', title: 'Percentage', initialValue: 1.5 },
                { name: 'description', type: 'string', title: 'Description' }
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'helpTexts',
      title: 'Help Texts',
      type: 'object',
      fields: [
        { name: 'propertyValue', type: 'text', title: 'Property Value Help' },
        { name: 'renovationBudget', type: 'text', title: 'Renovation Budget Help' },
        { name: 'fixturesPercent', type: 'text', title: 'Fixtures & Fittings Help' },
        { name: 'grantRate', type: 'text', title: 'Grant Rate Help' }
      ]
    }),
    defineField({
      name: 'disclaimers',
      title: 'Disclaimers',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Legal disclaimers to show with calculations'
    })
  ],
  preview: {
    select: {
      title: 'name',
      active: 'active',
      validFrom: 'validFrom'
    },
    prepare(selection) {
      const { title, active, validFrom } = selection
      return {
        title,
        subtitle: `${active ? '✓ Active' : 'Inactive'} - Valid from ${new Date(validFrom).toLocaleDateString()}`
      }
    }
  }
})

// sanity-studio/schemaTypes/calculationResult.ts

export const calculationResultType = defineType({
  name: 'calculationResult',
  title: 'Calculation Result',
  type: 'document',
  fields: [
    defineField({
      name: 'sessionId',
      title: 'Session ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userEmail',
      title: 'User Email',
      type: 'string',
    }),
    defineField({
      name: 'calculatedAt',
      title: 'Calculated At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'configUsed',
      title: 'Configuration Used',
      type: 'reference',
      to: [{ type: 'calculatorConfig' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inputs',
      title: 'User Inputs',
      type: 'object',
      fields: [
        { name: 'propertyValue', type: 'number', title: 'Property Value' },
        { name: 'renovationBudget', type: 'number', title: 'Renovation Budget' },
        { name: 'fixturesPercent', type: 'number', title: 'Fixtures %' },
        { name: 'grantRate', type: 'number', title: 'Grant Rate' },
      ]
    }),
    defineField({
      name: 'results',
      title: 'Calculation Results',
      type: 'object',
      fields: [
        { name: 'totalProjectCost', type: 'number', title: 'Total Project Cost' },
        { name: 'eligibleCosts', type: 'number', title: 'Eligible Costs' },
        { name: 'grantAmount', type: 'number', title: 'Grant Amount' },
        { name: 'userInvestment', type: 'number', title: 'User Investment Required' },
        { name: 'breakdown', type: 'object', title: 'Cost Breakdown' }
      ]
    }),
    defineField({
      name: 'reportDownloaded',
      title: 'Report Downloaded',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'followUpStatus',
      title: 'Follow-up Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Contacted', value: 'not_contacted' },
          { title: 'Email Sent', value: 'email_sent' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified Lead', value: 'qualified' },
          { title: 'Customer', value: 'customer' }
        ]
      },
      initialValue: 'not_contacted'
    })
  ]
})
