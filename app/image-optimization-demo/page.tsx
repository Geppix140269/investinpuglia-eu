'use client';

import { useState } from 'react';
import CloudinaryImage from '@/components/CloudinaryImage';
import CloudinaryOptimizedImage from '@/components/CloudinaryOptimizedImage';
import { useCloudinaryOptimization, useCloudinaryPerformance } from '@/hooks/useCloudinaryOptimization';
import { OPTIMIZATION_PRESETS } from '@/lib/cloudinary-config';

export default function ImageOptimizationDemo() {
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof OPTIMIZATION_PRESETS>('gallery');
  const { metrics, trackImageLoad, trackImageError } = useCloudinaryPerformance();

  // Example images to demonstrate optimization
  const demoImages = [
    {
      src: '/Hero_BG.jpg',
      alt: 'Hero Background',
      publicId: 'investinpuglia/hero_bg'
    },
    {
      src: '/projects/baglioni-pool.jpg',
      alt: 'Baglioni Pool',
      publicId: 'investinpuglia/projects/baglioni-pool'
    },
    {
      src: '/projects/santa-lucia-pool.jpg',
      alt: 'Santa Lucia Pool',
      publicId: 'investinpuglia/projects/santa-lucia-pool'
    }
  ];

  const optimizationExamples = [
    {
      title: 'Auto Format & Quality',
      description: 'Automatically selects best format (WebP/AVIF) and quality',
      options: {
        quality: 'auto:best',
        format: 'auto'
      }
    },
    {
      title: 'Responsive Images',
      description: 'Different sizes for different screen sizes',
      options: {
        responsive: true,
        sizes: [640, 768, 1024, 1280, 1920]
      }
    },
    {
      title: 'Face Detection & Cropping',
      description: 'AI-powered face detection for smart cropping',
      options: {
        crop: 'thumb',
        gravity: 'face',
        width: 300,
        height: 300
      }
    },
    {
      title: 'Background Removal',
      description: 'AI-powered background removal',
      options: {
        removeBackground: true
      }
    },
    {
      title: 'Image Enhancement',
      description: 'AI-powered image improvement',
      options: {
        improve: true
      }
    },
    {
      title: 'Lazy Loading with Blur',
      description: 'Progressive loading with blur placeholder',
      options: {
        lazy: true,
        placeholder: 'blur'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cloudinary Image Optimization Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Advanced image optimization with AI-powered features for InvestInPuglia
          </p>

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">{metrics.imagesLoaded}</div>
                <div className="text-sm text-gray-600">Images Loaded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {metrics.averageLoadTime.toFixed(0)}ms
                </div>
                <div className="text-sm text-gray-600">Avg Load Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {(metrics.bandwidth / 1024 / 1024).toFixed(2)}MB
                </div>
                <div className="text-sm text-gray-600">Bandwidth Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{metrics.failedLoads}</div>
                <div className="text-sm text-gray-600">Failed Loads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {metrics.imagesLoaded > 0 
                    ? `${((1 - metrics.bandwidth / (metrics.imagesLoaded * 500000)) * 100).toFixed(0)}%`
                    : '0%'
                  }
                </div>
                <div className="text-sm text-gray-600">Size Reduction</div>
              </div>
            </div>
          </div>

          {/* Preset Selector */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Optimization Presets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(OPTIMIZATION_PRESETS).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSelectedPreset(preset as keyof typeof OPTIMIZATION_PRESETS)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPreset === preset
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {preset.charAt(0).toUpperCase() + preset.slice(1)}
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Current Preset: {selectedPreset}</h3>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(OPTIMIZATION_PRESETS[selectedPreset], null, 2)}
              </pre>
            </div>
          </div>

          {/* Optimization Examples */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Optimization Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {optimizationExamples.map((example, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{example.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{example.description}</p>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <CloudinaryOptimizedImage
                      src={demoImages[0].publicId}
                      alt={example.title}
                      width={400}
                      height={300}
                      {...example.options}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Optimized Image Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoImages.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <CloudinaryImage
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={300}
                      quality="auto:best"
                      crop="fill"
                      gravity="auto"
                      responsive
                      lazy
                      placeholder="blur"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center">{image.alt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Guide */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Implementation Guide</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Basic Usage</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import CloudinaryImage from '@/components/CloudinaryImage';

<CloudinaryImage
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality="auto:best"
  responsive
  lazy
/>`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Advanced Features</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import CloudinaryOptimizedImage from '@/components/CloudinaryOptimizedImage';

<CloudinaryOptimizedImage
  src="your-public-id"
  alt="Description"
  removeBackground={true}
  improve={true}
  effects={[
    { effect: 'sharpen', value: 100 },
    { effect: 'brightness', value: 20 }
  ]}
  overlays={[
    { text: 'InvestInPuglia', position: 'south_east' }
  ]}
/>`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Performance Hook</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import { useCloudinaryOptimization } from '@/hooks/useCloudinaryOptimization';

const { src, srcSet, placeholder } = useCloudinaryOptimization({
  publicId: 'your-image-id',
  options: {
    quality: 'auto:best',
    format: 'auto'
  },
  responsive: true,
  lazy: true
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}