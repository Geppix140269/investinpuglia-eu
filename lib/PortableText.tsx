// lib/PortableText.tsx
'use client'

import { PortableText as PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'

export const PortableText = ({ value }: { value: any }) => {
  return (
    <PortableTextComponent
      value={value}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 text-gray-900">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 border-b-2 border-emerald-100 pb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-800">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-800">
              {children}
            </h4>
          ),
          normal: ({ children }) => (
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              {children}
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 py-4 bg-emerald-50/50 rounded-r-lg">
              <p className="text-lg italic text-gray-700">{children}</p>
            </blockquote>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="list-none ml-0 mb-8 space-y-3">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="list-none ml-0 mb-8 space-y-3 counter-reset-list">
              {children}
            </ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="flex items-start">
              <span className="text-emerald-600 mr-3 mt-1 flex-shrink-0">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700">{children}</span>
            </li>
          ),
          number: ({ children }) => (
            <li className="flex items-start counter-increment-list">
              <span className="text-emerald-600 font-bold mr-3 mt-0.5 flex-shrink-0 
                           bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                <span className="counter-list"></span>
              </span>
              <span className="text-gray-700">{children}</span>
            </li>
          ),
        },
        marks: {
          strong: ({ children }) => (
            <strong className="font-semibold text-emerald-700">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          link: ({ value, children }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
              <a 
                href={value?.href} 
                target={target} 
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className="text-emerald-600 underline hover:text-emerald-700 transition-colors"
              >
                {children}
              </a>
            )
          },
        },
        types: {
          image: ({ value }) => {
            return (
              <div className="my-10">
                <img
                  src={value.asset?.url || ''}
                  alt={value.alt || ''}
                  className="w-full rounded-2xl shadow-lg"
                />
                {value.caption && (
                  <p className="text-center text-sm text-gray-600 mt-3 italic">
                    {value.caption}
                  </p>
                )}
              </div>
            )
          },
          callout: ({ value }) => {
            const icons = {
              info: '💡',
              warning: '⚠️',
              success: '✅',
              error: '❌'
            }

            const colors = {
              info: 'bg-blue-50 border-blue-500 text-blue-900',
              warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
              success: 'bg-green-50 border-green-500 text-green-900',
              error: 'bg-red-50 border-red-500 text-red-900'
            }

            return (
              <div className={`my-8 p-6 rounded-lg border-l-4 ${colors[(value.type as keyof typeof colors) || 'info']}`}>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{icons[(value.type as keyof typeof icons) || 'info']}</span>
                  <div>
                    {value.title && (
                      <h4 className="font-bold mb-2">{value.title}</h4>
                    )}
                    <p>{value.text}</p>
                  </div>
                </div>
              </div>
            )
          },
          featureList: ({ value }) => {
            return (
              <div className="my-10 grid md:grid-cols-2 gap-4">
                {value.features?.map((feature: any, index: number) => (
                  <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <span className="text-emerald-600 mr-3">✓</span>
                    <div>
                      <h5 className="font-semibold">{feature.title}</h5>
                      {feature.description && (
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        }
      }}
    />
  )
}

// Add necessary CSS for counter styling
export const portableTextStyles = `
  .counter-reset-list {
    counter-reset: list-counter;
  }
  
  .counter-increment-list {
    counter-increment: list-counter;
  }
  
  .counter-list::before {
    content: counter(list-counter);
  }
`
