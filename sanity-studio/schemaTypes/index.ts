// sanity-studio/schemaTypes/index.ts
import { calculatorConfigType } from './calculatorConfig'
import { calculationResultType } from './calculationResult'
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import { locationPageType } from './locationPage'
import { seoType } from './objects/seo'
import { industryPageType } from './industryPage'

export const schemaTypes = [
  post,
  author,
  category,
  blockContent,
  calculatorConfigType,
  calculationResultType,
  locationPageType,
  seoType,
  industryPageType
]
