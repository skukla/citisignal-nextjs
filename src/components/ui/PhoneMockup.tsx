'use client';

import { twMerge } from 'tailwind-merge';

interface PhoneMockupProps {
  title?: string;
  subtitle?: string;
  signalBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

export default function PhoneMockup({
  title = '5G',
  subtitle = 'CitiSignal CONNECT',
  signalBars = 16,
  gradientFrom = '#8821f4',
  gradientTo = '#6a1b9a',
  className
}: PhoneMockupProps) {
  return (
    <div className={twMerge('bg-gray-900 rounded-2xl p-4 mx-auto w-48', className)}>
      <div 
        className="rounded-xl h-80 flex items-center justify-center"
        style={{ 
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
        }}
      >
        <div className="text-center text-white">
          <div className="text-3xl font-bold mb-2">{title}</div>
          <div className="text-sm opacity-75">{subtitle}</div>
          <div className="grid grid-cols-4 gap-1 mt-4">
            {[...Array(signalBars)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white bg-opacity-20 h-3 rounded"
                style={{
                  animation: `pulse 2s ${i * 0.1}s infinite`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
} 