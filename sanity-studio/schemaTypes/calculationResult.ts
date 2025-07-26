import { defineField, defineType } from 'sanity'

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
        { 
          name: 'breakdown', 
          type: 'object', 
          title: 'Cost Breakdown',
          fields: [
            { name: 'propertyPurchase', type: 'number' },
            { name: 'renovationCosts', type: 'number' },
            { name: 'fixturesAndFittings', type: 'number' },
            { name: 'innovationComponent', type: 'number' },
            { name: 'sustainabilityComponent', type: 'number' },
            { name: 'designAndPM', type: 'number' },
            { name: 'preliminaryStudies', type: 'number' }
          ]
        }
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
  ],
  preview: {
    select: {
      email: 'userEmail',
      date: 'calculatedAt',
      grant: 'results.grantAmount'
    },
    prepare(selection) {
      const { email, date, grant } = selection
      return {
        title: email || 'Anonymous',
        subtitle: `${new Date(date).toLocaleDateString()} - €${grant?.toLocaleString() || '0'}`
      }
    }
  }
})
