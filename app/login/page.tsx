'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  email: string;
  senha: string;
}

interface Errors {
  email: string;
  senha: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    senha: '',
  });
  const [errors, setErrors] = useState<Errors>({
    email: '',
    senha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {
      email: formData.email.trim() 
        ? /\S+@\S+\.\S+/.test(formData.email) 
          ? '' 
          : 'Digite um e-mail válido'
        : 'O e-mail é obrigatório',
      senha: formData.senha.trim() 
        ? '' 
        : 'A senha é obrigatória',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);
    
    // TODO: Implement real authentication
    // await api.login(formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Reset after success
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ email: '', senha: '' });
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
            Bem-vindo de volta
          </h1>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm"
            >
              Login realizado com sucesso!
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Sua senha"
                  autoComplete="current-password"
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

            {/* Forgot Password */}
            <div className="text-right">
              <a 
                href="#" 
                className="text-navy-600 hover:text-navy-800 text-sm transition-colors duration-200"
              >
                Esqueci minha senha
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg bg-navy-800 hover:bg-navy-700 text-ivory font-sans font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3">
            <div className="text-center">
              <span className="text-navy-600 font-sans text-sm">
                Ainda não tem conta?{' '}
                <Link href="/cadastro" className="text-navy-800 hover:text-navy-600 font-semibold transition-colors duration-200">
                  Experimentar
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