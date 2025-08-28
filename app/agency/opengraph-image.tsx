import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Partner with InvestInPuglia - List Your Mini PIA Properties'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)',
            opacity: 0.5,
          }}
        />
        
        {/* Gradient Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '24px',
          }}
        >
          ⭐ EXCLUSIVE PARTNER NETWORK
        </div>
        
        {/* Main Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>List Your Mini PIA Properties</span>
          <span
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Connect with 5,000+ Investors
          </span>
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#cbd5e1',
            marginBottom: '48px',
            lineHeight: 1.5,
          }}
        >
          Join 250+ agencies partnering with InvestInPuglia.eu
        </div>
        
        {/* Stats Container */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {[
            { icon: '💰', value: '€30K-€5M', label: 'Investment Range' },
            { icon: '📈', value: '55%', label: 'Max Grants' },
            { icon: '🏛️', value: '250+', label: 'Properties' },
            { icon: '✅', value: '95%', label: 'Success Rate' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px 24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Benefits */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {[
            'Premium Marketing',
            'Grant Support',
            'Account Manager',
            'Analytics Dashboard',
          ].map((benefit, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '10px 20px',
                borderRadius: '50px',
                color: 'white',
                fontSize: '16px',
              }}
            >
              <span style={{ color: '#f59e0b' }}>✓</span>
              {benefit}
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Apply Now →
        </div>
        
        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            color: '#94a3b8',
            fontSize: '18px',
          }}
        >
          investinpuglia.eu/agency
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}