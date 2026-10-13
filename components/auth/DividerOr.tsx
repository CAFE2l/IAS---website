'use client';

export default function DividerOr() {
  return (
    <div className="relative flex items-center my-6">
      <div className="flex-1 h-px bg-white/30" />
      <span className="px-4 text-white/60 text-sm font-sans">ou</span>
      <div className="flex-1 h-px bg-white/30" />
    </div>
  );
}