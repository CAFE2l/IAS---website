'use client';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">Página não encontrada</h1>
        <p className="text-navy-600 mb-6">A página que você está procurando não existe.</p>
        <a href="/" className="text-blue-600 hover:underline">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}