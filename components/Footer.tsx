'use client';

import { useRef, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

const navItems = [
  { name: 'A proposta', href: '#proposta' },
  { name: 'Como funciona', href: '#como-funciona' },
  { name: 'Experiências', href: '#experiencias' },
  { name: 'Princípios', href: '#principios' },
];

// Fixed values only (no Math.random / Date) so server and client HTML always match.
const blobs = [
  { className: 'left-[8%] top-[10%] h-96 w-96 bg-blue-500/20 blur-[110px]', dx: 30, dy: -20, duration: 14 },
  { className: 'right-[6%] bottom-[5%] h-80 w-80 bg-sky-400/15 blur-[120px]', dx: -30, dy: 25, duration: 17 },
  { className: 'left-[45%] top-[40%] h-64 w-64 bg-blue-300/10 blur-[90px]', dx: 20, dy: 30, duration: 12 },
];

export default function Footer() {
  const reduce = useReducedMotion() ?? false;

  return (
    <footer
      id="rodape"
      data-theme="dark"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#041B3F] to-[#06122B] px-4 pb-28 pt-20 sm:px-6 sm:pb-24 lg:px-8"
    >
      {/* LED line on the top edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4FA3FF]/70 to-transparent" />
        {!reduce && (
          <motion.div
            className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '500%' }}
            transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
          />
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#4FA3FF]/10 to-transparent"
      />

      {/* Blurred blobs, so the glass has something to blur */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${b.className}`}
            animate={reduce ? undefined : { x: [0, b.dx, 0], y: [0, b.dy, 0] }}
            transition={{ duration: b.duration, ease: 'easeInOut', repeat: Infinity }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl">
        {/* One grid, all columns stretch to the same height and start on the same line */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-12">
          <Column delay={0.05} className="md:col-span-5">
            <TiltCard reduce={reduce}>
              <CardTitle>Instituto de Aprendizado Social</CardTitle>
              <p className="font-sans text-sm leading-relaxed text-white/75">
                Um ponto de encontro para transformar conhecimento em experiência, conectar pessoas e construir
                possibilidades por meio da colaboração.
              </p>
            </TiltCard>
          </Column>

          <Column delay={0.12} className="md:col-span-3">
            <TiltCard reduce={reduce}>
              <nav aria-label="Navegar no rodapé" className="flex h-full flex-col">
                <CardTitle>Navegar</CardTitle>
                <ul className="-mt-1 flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </TiltCard>
          </Column>

          <Column delay={0.19} className="md:col-span-4">
            <TiltCard reduce={reduce}>
              <CardTitle>Sobre</CardTitle>
              <div className="flex flex-col items-start gap-3">
                <StatusPill reduce={reduce} led>
                  Projeto em desenvolvimento
                </StatusPill>
                <StatusPill reduce={reduce}>Experiência educacional colaborativa</StatusPill>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <Link
                  href="/cadastro"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 font-sans text-sm font-semibold text-[#06122B] shadow-lg transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(79,163,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06122B]"
                >
                  Experimentar
                </Link>
                <Link
                  href="/login"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/40 px-6 font-sans text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06122B]"
                >
                  Entrar
                </Link>
              </div>
            </TiltCard>
          </Column>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 border-t border-white/10 pt-6"
        >
          <p className="font-sans text-sm text-white/60">
            © 2026 Instituto de Aprendizado Social. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

/* ---------- helpers ---------- */

function Column({ children, className, delay }: { children: ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay }}
      className={`h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Same size and spacing on all three cards, so the headings share one baseline.
function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-5 text-balance font-serif text-xl font-bold leading-tight text-white">{children}</h2>;
}

function TiltCard({ children, reduce }: { children: ReactNode; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Mouse only: no tilt on touch screens or when reduced motion is on.
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    // The perspective lives on the parent, the rotation on the child.
    <div className="group h-full [perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={reduce ? undefined : { rotateX, rotateY }}
        className="relative flex h-full flex-col rounded-3xl border border-white/15 bg-[#0B2A5C]/60 p-7 shadow-[0_20px_60px_rgba(2,10,40,0.5)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/[0.06]"
      >
        {/* Stronger shadow + soft blue glow, faded in on hover (opacity only) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-[0_30px_80px_rgba(2,10,40,0.7),0_0_40px_rgba(79,163,255,0.18)] transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* Glass highlights */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
        <div className="relative flex h-full flex-col">{children}</div>
      </motion.div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group/link relative flex min-h-[40px] items-center font-sans text-sm text-white/75 transition-colors duration-200 hover:text-white hover:[text-shadow:0_0_14px_rgba(79,163,255,0.8)] focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06122B] rounded-sm"
    >
      {children}
      {/* LED underline that grows from the left (transform only) */}
      <span
        aria-hidden
        className="absolute bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#4FA3FF] to-white shadow-[0_0_8px_rgba(79,163,255,0.8)] transition-transform duration-300 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
      />
    </Link>
  );
}

function StatusPill({ children, led, reduce }: { children: ReactNode; led?: boolean; reduce: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 font-sans text-sm text-white/85">
      {led && (
        <motion.span
          aria-hidden
          className="h-2 w-2 shrink-0 rounded-full bg-[#4FA3FF] shadow-[0_0_10px_rgba(79,163,255,0.9)]"
          animate={reduce ? undefined : { opacity: [0.45, 1, 0.45], scale: [1, 1.25, 1] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        />
      )}
      {children}
    </span>
  );
}