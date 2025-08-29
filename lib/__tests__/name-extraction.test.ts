import { extractNameFromEmail, getNameConfidence } from '../firebase-mailing-list';

describe('Name Extraction and Confidence Scoring', () => {
  describe('extractNameFromEmail', () => {
    test('should extract simple names from emails', () => {
      expect(extractNameFromEmail('john.smith@example.com')).toBe('John Smith');
      expect(extractNameFromEmail('maria_garcia@test.com')).toBe('Maria Garcia');
      expect(extractNameFromEmail('alessandro-rossi@company.it')).toBe('Alessandro Rossi');
    });

    test('should handle single names', () => {
      expect(extractNameFromEmail('giuseppe@example.com')).toBe('Giuseppe');
      expect(extractNameFromEmail('francesco@test.it')).toBe('Francesco');
    });

    test('should remove common prefixes', () => {
      expect(extractNameFromEmail('info@company.com')).toBe('');
      expect(extractNameFromEmail('admin.giovanni@test.com')).toBe('Giovanni');
      expect(extractNameFromEmail('support.team@example.com')).toBe('Team');
    });

    test('should remove numbers', () => {
      expect(extractNameFromEmail('mario123@example.com')).toBe('Mario');
      expect(extractNameFromEmail('luca2024@test.com')).toBe('Luca');
    });

    test('should handle empty cases', () => {
      expect(extractNameFromEmail('123@example.com')).toBe('');
      expect(extractNameFromEmail('info@company.com')).toBe('');
    });
  });

  describe('getNameConfidence', () => {
    test('should return high confidence for proper names', () => {
      expect(getNameConfidence('John Smith')).toBe('high');
      expect(getNameConfidence('Maria Garcia')).toBe('high');
      expect(getNameConfidence('Giuseppe')).toBe('high');
    });

    test('should return medium confidence for possible names', () => {
      expect(getNameConfidence('john smith')).toBe('medium');
      expect(getNameConfidence('MARIA')).toBe('medium');
    });

    test('should return low confidence for short strings', () => {
      expect(getNameConfidence('ab')).toBe('low');
      expect(getNameConfidence('xyz')).toBe('low');
    });

    test('should return none for empty or invalid names', () => {
      expect(getNameConfidence('')).toBe('none');
      expect(getNameConfidence('1')).toBe('low');
    });
  });
});

// Integration test data examples
export const mockContacts = [
  {
    id: '1',
    email: 'giuseppe.verdi@example.com',
    name: '',
    status: 'active' as const,
    tags: [],
    source: 'website',
    subscribed: true
  },
  {
    id: '2',
    email: 'maria.rossi@test.it',
    name: 'Maria Rossi',
    status: 'active' as const,
    tags: [],
    source: 'website',
    subscribed: true
  },
  {
    id: '3',
    email: 'info@company.com',
    name: '',
    status: 'active' as const,
    tags: [],
    source: 'website',
    subscribed: true
  }
];