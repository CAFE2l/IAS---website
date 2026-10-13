'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

interface Errors {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [errors, setErrors] = useState<Errors>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {
      nome: formData.nome.trim() ? '' : 'O nome é obrigatório',
      email: /\S+@\S+\.\S+/.test(formData.email) 
        ? '' 
        : 'Digite um e-mail válido',
      senha: formData.senha.length >= 8 
        ? '' 
        : 'A senha deve ter pelo menos 8 caracteres',
      confirmarSenha: formData.senha === formData.confirmarSenha 
        ? '' 
        : 'As senhas não coincidem',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);
    
    // TODO: Implement real authentication
    // await api.signup(formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Reset after success
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ nome: '', email: '', senha: '', confirmarSenha: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when typing
    if (errors[e.target.name as keyof Errors]) {
      setErrors({
        ...errors,
        [e.target.name as keyof Errors]: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-ivory rounded-2xl shadow-2xl w-full max-w-md mx-auto"
      >
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center overflow-hidden">
            <Image
              src="/favicon.png"
              alt="IAS Logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          <h1 className="font-serif text-navy-900 text-2xl text-center mb-6">
            Crie sua conta
          </h1>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm"
            >
              Conta criada com sucesso! Bem-vindo à comunidade I.A.S.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome Completo */}
            <div>
              <label htmlFor="nome" className="block font-sans text-navy-700 text-sm mb-2">
                Nome completo
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                  errors.nome 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-navy-200 focus:ring-navy-500 focus:border-navy-500'
                }`}
                placeholder="Seu nome completo"
                autoComplete="name"
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "nome-error" : undefined}
              />
              {errors.nome && (
                <p id="nome-error" className="text-red-600 text-xs mt-1" role="alert">
                  {errors.nome}
                </p>
              )}
            </div>

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block font-sans text-navy-700 text-sm mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                  errors.email 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-navy-200 focus:ring-navy-500 focus:border-navy-500'
                }`}
                placeholder="seu@email.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-600 text-xs mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block font-sans text-navy-700 text-sm mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showSenha ? 'text' : 'password'}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 pr-12 ${
                    errors.senha 
                      ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                      : 'border-navy-200 focus:ring-navy-500 focus:border-navy-500'
                  }`}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  aria-invalid={!!errors.senha}
                  aria-describedby={errors.senha ? "senha-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-700"
                  aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showSenha ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.senha && (
                <p id="senha-error" className="text-red-600 text-xs mt-1" role="alert">
                  {errors.senha}
                </p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmarSenha" className="block font-sans text-navy-700 text-sm mb-2">
                Confirmar senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmarSenha ? 'text' : 'password'}
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 pr-12 ${
                    errors.confirmarSenha 
                      ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                      : 'border-navy-200 focus:ring-navy-500 focus:border-navy-500'
                  }`}
                  placeholder="Digite novamente"
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirmarSenha}
                  aria-describedby={errors.confirmarSenha ? "confirmarSenha-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-700"
                  aria-label={showConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showConfirmarSenha ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmarSenha && (
                <p id="confirmarSenha-error" className="text-red-600 text-xs mt-1" role="alert">
                  {errors.confirmarSenha}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg bg-navy-800 hover:bg-navy-700 text-ivory font-sans font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3">
            <div className="text-center">
              <span className="text-navy-600 font-sans text-sm">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-navy-800 hover:text-navy-600 font-semibold transition-colors duration-200">
                  Entrar
                </Link>
              </span>
            </div>
            <div className="text-center">
              <Link 
                href="/" 
                className="text-navy-600 hover:text-navy-800 font-sans text-sm transition-colors duration-200"
              >
                ← Voltar para o início
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}