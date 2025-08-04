// Path: sanity-studio/sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {markdownSchema} from 'sanity-plugin-markdown'

export default defineConfig({
  name: 'default',
  title: 'InvestInPuglia Content',

  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .icon(() => '📝')
              .child(
                S.documentTypeList('post')
                  .title('Blog Posts')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
              ),
            S.divider(),
            S.listItem()
              .title('Authors')
              .icon(() => '👤')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .icon(() => '🏷️')
              .child(S.documentTypeList('category').title('Categories')),
          ])
    }),
    visionTool(),
    markdownSchema() // Add markdown support
  ],

  schema: {
    types: schemaTypes,
  },
})
