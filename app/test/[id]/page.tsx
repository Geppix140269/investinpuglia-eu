'use client'

export default function TestPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1>Test Dynamic Route</h1>
      <p>ID: {params.id}</p>
    </div>
  )
}