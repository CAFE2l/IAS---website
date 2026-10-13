'use client';

import { CSSProperties } from 'react';

/**
 * Full-screen animated background shared by /cadastro and /login:
 *   - deep navy → royal blue → light blue gradient
 *   - a few large blurred color blobs behind the card
 *   - three pure-CSS 3D shapes (glossy sphere, tilted rounded cube, torus)
 *     floating with a slow motion and a subtle mouse-parallax.
 *
 * All motion is limited to `transform` / `opacity` so it stays on the
 * compositor. `prefers-reduced-motion` is honoured globally via globals.css
 * (which pins every CSS animation / transition), and the mouse parallax is
 * handed a blank transform when motion is reduced.
 */
interface AuthBackgroundProps {
  parallaxStyle?: CSSProperties;
}

export default function AuthBackground({ parallaxStyle }: AuthBackgroundProps) {
  return (
    <>
      {/* 1. The gradient canvas (deepest layer) */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#041B3F] via-[#0B3A8F] to-[#3B6FD4]" />

      {/* 2. Blurred color blobs living behind the card */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-3/4 -left-20 w-[34rem] h-[34rem] rounded-full bg-[#3B6FD4]/30 blur-[120px] animate-[pulse-glow_10s_ease-in-out_infinite]" />
        <div className="absolute top-[8%] -right-24 w-[38rem] h-[38rem] rounded-full bg-[#0B3A8F]/35 blur-[110px] animate-[pulse-glow_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 left-[6%] w-[26rem] h-[26rem] rounded-full bg-[#041B3F]/40 blur-[90px]" />
      </div>

      {/* 3. The 3D shapes — sit in front of the card, overlapping its corners */}
      <div
        className="fixed inset-0 z-20 pointer-events-none overflow-hidden"
        style={parallaxStyle}
      >
        <GlossySphere />
        <TiltedCube />
        <Torus />
      </div>
    </>
  );
}

/* ---- 3D shape definitions (pure CSS) ---- */

function GlossySphere() {
  return (
    <div
      className="absolute rounded-full opacity-85
        bg-[radial-gradient(ellipse_at_30%_30%,#ffffff95_0%,#ffffff55_32%,#3B6FD4cc_62%,#0B3A8F_100%)]
        shadow-[0_34px_68px_rgba(0,0,0,0.4),inset_0_6px_14px_rgba(255,255,255,0.55),inset_0_0_0_1px_rgba(0,0,0,0.12)]
        animate-[float-shape_8s_ease-in-out_infinite]"
      style={{ top: '80px', left: '64px', width: '176px', height: '176px' }}
    />
  );
}

function TiltedCube() {
  return (
    <div
      className="absolute rounded-2xl rotate-15 opacity-85
        bg-[linear-gradient(135deg,#ffffff48_0%,#ffffff22_35%,#1E4A9B88_70%,#06122B_100%)]
        shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_2px_8px_rgba(255,255,255,0.45)]
        animate-[float-shape_9s_ease-in-out_infinite]"
      style={{ bottom: '96px', right: '64px', width: '160px', height: '160px' }}
    />
  );
}

function Torus() {
  return (
    <div
      className="absolute rounded-full opacity-85
        border-[18px] border-t-[#ffffff88] border-r-[#ffffff66] border-b-[#00000038] border-l-[#00000044]
        bg-[radial-gradient(ellipse_at_50%_55%,#4A90D9_5%,#3B6FD4cc_38%,#0B3A8F_70%,transparent_90%)]
        shadow-[0_32px_64px_rgba(0,0,0,0.45),inset_0_2px_6px_rgba(255,255,255,0.5)]
        animate-[float-shape_7.5s_ease-in-out_infinite]"
      style={{ top: '224px', right: '64px', width: '176px', height: '176px' }}
    />
  );
}
