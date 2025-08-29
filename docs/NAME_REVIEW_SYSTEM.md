# Name Review and Verification System

## Overview

The Name Review and Verification System is a comprehensive solution for managing and verifying contact names in the mailing list before sending email campaigns. It provides confidence scoring, batch operations, and a professional interface for reviewing all 287 contacts.

## Features

### 1. Name Confidence Scoring
- **High Confidence**: Properly formatted names (e.g., "John Smith", "Maria")
- **Medium Confidence**: Could be names but uncertain formatting
- **Low Confidence**: Questionable names
- **None**: No name or clearly not a name

### 2. Automatic Name Extraction
- Extracts potential names from email addresses
- Removes common prefixes (info, admin, support, etc.)
- Capitalizes words appropriately
- Provides suggestions for manual review

### 3. Admin Interface
Located at `/admin/review-names`, the interface provides:
- Dashboard with statistics (total contacts, with/without names, reviewed count, etc.)
- Filter and search functionality
- Individual name editing
- Batch operations for uncertain names
- Professional, responsive design

### 4. Batch Operations
- **Set "Friend" for contacts without names**: Bulk replacement for empty names
- **Set "Friend" for uncertain names**: Bulk replacement for low/medium confidence names
- **Analyze All Names**: Extracts names from email addresses for all contacts

## API Endpoints

### GET /api/mailing-list
Retrieves all contacts with enhanced name analysis data.

### PATCH /api/mailing-list/[id]
Updates individual contact name and review status.

Parameters:
- `name`: New name for the contact
- `isReviewed`: Boolean indicating if the contact has been reviewed

### POST /api/mailing-list/batch-update
Performs batch updates on contacts.

Parameters:
- `type`: "no-name" or "uncertain"
- `fallbackName`: Name to use for batch updates (default: "Friend")

### POST /api/mailing-list/analyze-names
Analyzes all contacts and extracts potential names from email addresses.

### GET /api/mailing-list/stats
Provides detailed statistics about the name review status.

## Firebase Integration

### Enhanced InvestorContact Interface
```typescript
interface InvestorContact {
  // Existing fields...
  
  // Name review fields
  extractedName?: string;        // Name extracted from email
  confidence?: 'high' | 'medium' | 'low' | 'none';
  isReviewed?: boolean;         // Manual review status
  lastModified?: any;           // Last modification timestamp
}
```

### New Firebase Functions
- `extractNameFromEmail(email: string)`: Extracts name from email address
- `getNameConfidence(name: string)`: Determines confidence level
- `updateInvestorWithNameReview()`: Updates contact with review data

## Usage Workflow

1. **Initial Setup**: Navigate to `/admin/review-names`
2. **Analyze Names**: Click "Analyze All Names" to extract potential names from emails
3. **Review Statistics**: Check the dashboard cards for overview
4. **Filter Contacts**: Use filters to focus on specific categories
5. **Individual Editing**: Click edit button to manually correct names
6. **Batch Operations**: Use quick actions for bulk updates
7. **Campaign Readiness**: Check the summary section for campaign status

## Campaign Integration

The system integrates with the existing email campaign functionality:
- Names are used for personalization: "Dear [Name]," or "Dear Friend,"
- Campaign readiness indicator shows when review is complete
- Direct link to email campaign creation

## Security Considerations

- All API endpoints should be protected with admin authentication
- Input validation for name updates
- Rate limiting for batch operations
- Audit trail for name changes

## Performance Optimizations

- Batch operations for large contact lists
- Caching of confidence scores
- Lazy loading for large datasets
- Optimized Firebase queries

## Future Enhancements

- AI-powered name detection
- Bulk import with automatic name extraction
- Name validation against external databases
- Multi-language name support
- Export functionality for reviewed contacts