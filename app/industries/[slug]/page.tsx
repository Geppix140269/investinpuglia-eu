// app/industries/[slug]/page.tsx
// ULTRA-SIMPLE VERSION TO TEST IF ROUTING WORKS AT ALL

export default function IndustryPage({ params }: { params: { slug: string } }) {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        INDUSTRY PAGE WORKS
      </h1>
      <p style={{ fontSize: '24px' }}>
        Slug: {params.slug}
      </p>
      <p style={{ marginTop: '40px', fontSize: '18px' }}>
        If you see this, routing works. The redirect is caused by data fetching.
      </p>
    </div>
  )
}
