# Trullo Chatbot - Quick Reference

## Quick Start

### Authentication Flow
1. User gets 1 welcome message + 2 free messages
2. After 2 messages ? Google authentication required
3. Authenticated users get unlimited access

### Key Files
- components/trullo/TrulloChatbot.tsx - Main component
- components/trullo/hooks/useChat.ts - Logic & auth
- components/trullo/constants/prompts.ts - AI personality

### Troubleshooting
1. Auth not working: Check Supabase credentials
2. Messages failing: Verify OpenAI API key
3. Email not sending: Check Resend API config
