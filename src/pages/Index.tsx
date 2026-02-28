import { Shield, Zap, Eye, Search } from 'lucide-react';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import WalletInput from '@/components/landing/WalletInput';
import SampleCards from '@/components/landing/SampleCards';

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-[15vh] sm:pt-[25vh] px-5 sm:px-6">
        <div className="w-full max-w-[600px] flex flex-col gap-5">

          {/* Logo + Tagline */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">M</span>
              </div>
              <span className="font-heading font-semibold text-[22px] text-foreground text-glow-brand">MiaoFi</span>
            </div>
            <p className="text-secondary-custom text-base font-body">Your AI Investment Copilot for Crypto</p>
            <p className="text-muted-custom text-sm font-body mt-1">
              Paste an address. See your real P&L. Get AI advice in 30 seconds.
            </p>
          </div>

          {/* Social proof */}
          <p className="text-center text-[13px] text-muted-custom font-body">
            Powered by <span className="text-glow-green green-tint font-mono font-medium">Zerion</span> ·{' '}
            <span className="text-glow-green green-tint font-mono font-medium">CoinGecko</span> ·{' '}
            <span className="text-glow-green green-tint font-mono font-medium">Claude AI</span>
          </p>

          {/* Input Section */}
          <WalletInput />

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
            {[
              { icon: Shield, text: 'No wallet connection' },
              { icon: Zap, text: 'Free · No signup' },
              { icon: Eye, text: 'Read-only analysis' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-muted-custom text-xs font-body">
                <Icon size={13} className="trust-pulse" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Sample cards */}
          <SampleCards />

          {/* Famous wallets teaser */}
          <div className="flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-card text-[13px] font-body text-brand hover:text-foreground transition-all group"
            >
              <Search size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              <span>Peek at a famous wallet — see what AI finds</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-muted-custom text-[11px] font-body">
        © 2026 MiaoFi · Terms · Privacy
      </footer>
    </div>
  );
};

export default Index;
