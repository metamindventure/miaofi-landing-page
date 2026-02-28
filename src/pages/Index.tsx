import { useState } from 'react';
import { Search } from 'lucide-react';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import WalletInput from '@/components/landing/WalletInput';
import ProductPreview from '@/components/landing/ProductPreview';
import PersonaCards from '@/components/landing/PersonaCards';

const Index = () => {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground inputFocused={inputFocused} />

      {/* Hero — full viewport */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-5">
        <div className="w-full flex flex-col items-center gap-8 -mt-12">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground/90 tracking-tight">MiaoFi</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-center leading-[1.1] max-w-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Your AI Investment Copilot for Crypto
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-foreground/40 text-base sm:text-lg text-center max-w-md">
            Paste an address. Get your diagnosis in 30 seconds.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['EVM + Solana', '6 AI Models', 'Free to Start'].map(badge => (
              <span key={badge} className="glass-pill px-3.5 py-1.5 rounded-full text-xs text-foreground/50 font-medium">
                {badge}
              </span>
            ))}
          </div>

          {/* Wallet Input */}
          <WalletInput onFocusChange={setInputFocused} />
        </div>
      </main>

      {/* Product Preview */}
      <ProductPreview />

      {/* Persona Cards */}
      <PersonaCards />

      {/* Famous Wallets CTA */}
      <div className="relative z-10 text-center py-8">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-primary hover:underline text-sm transition-colors"
        >
          <Search size={14} />
          Peek at a famous wallet →
        </a>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-foreground/20 text-[11px]">
        © 2026 MiaoFi · Terms · Privacy
      </footer>
    </div>
  );
};

export default Index;
