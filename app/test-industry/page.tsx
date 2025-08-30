// app/test-industry/page.tsx
// CREATE THIS NEW FILE TO TEST

export default function TestIndustryPage() {
  return (
    <div style={{ 
      padding: '100px', 
      textAlign: 'center',
      fontSize: '48px',
      background: 'red',
      color: 'white'
    }}>
      <h1>TEST PAGE WORKS - NO DYNAMIC ROUTE</h1>
      <p>If you see this, deployment works</p>
      <p>The issue is with [slug] dynamic routes</p>
    </div>
  )
}
