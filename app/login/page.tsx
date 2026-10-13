'use client';

import { useState } from 'react';
import AuthLayout from '../../components/AuthLayout';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      return 'Informe um e-mail válido.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Informe um e-mail válido.';
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return 'Informe sua senha.';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);

    // TODO: Connect to real authentication backend
    await handleLogin(email, password);

    setIsLoading(false);
    setShowSuccess(true);
  };

  // Placeholder function for login
  const handleLogin = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log('Login attempt:', { email, password });
  };

  return (
    <AuthLayout>
      {showSuccess ? (
        <div className="text-center py-8">
          <h1 className="font-serif text-white text-3xl md:text-4xl mb-4">Sucesso!</h1>
          <p className="text-white/80 font-sans text-lg">
            Login simulado com sucesso. A autenticação real será conectada em breve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-white text-3xl md:text-4xl mb-3">
              Bem-vindo de volta
            </h1>
            <p className="text-white/80 font-sans text-base md:text-lg max-w-md mx-auto">
              Entre para continuar sua jornada de aprendizado.
            </p>
          </div>

          {/* Form Container - Optimized for Desktop */}
          <div className="max-w-md mx-auto">
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-white/90 font-sans text-sm mb-2"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full h-13 rounded-full bg-white/85 text-navy-900 placeholder-gray-400/60 px-5 outline-none transition-all duration-200 ${
                    errors.email 
                      ? 'focus:ring-2 focus:ring-[#FFB4B4]' 
                      : 'focus:ring-2 focus:ring-white/60'
                  }`}
                  placeholder="seu@email.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p 
                    id="email-error" 
                    className="text-[#FFB4B4] font-sans text-sm mt-2"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-white/90 font-sans text-sm mb-2"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full h-13 rounded-full bg-white/85 text-navy-900 placeholder-gray-400/60 px-5 pr-14 outline-none transition-all duration-200 ${
                      errors.password 
                        ? 'focus:ring-2 focus:ring-[#FFB4B4]' 
                        : 'focus:ring-2 focus:ring-white/60'
                    }`}
                    placeholder="••••••••"
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-600 hover:text-navy-800 transition-colors duration-200"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p 
                    id="password-error" 
                    className="text-[#FFB4B4] font-sans text-sm mt-2"
                    role="alert"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div>
                <Link 
                  href="#" 
                  className="text-white/80 hover:text-white font-sans text-sm transition-colors duration-200"
                >
                  Esqueci minha senha
                </Link>
              </div>
            </div>
          </div>

          {/* Primary Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-13 rounded-full bg-[#06122B] text-white font-sans font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Entrar'
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-white/80 font-sans text-sm">
              Ainda não tem conta?{' '}
              <Link 
                href="/cadastro" 
                className="text-white font-bold hover:text-white/90 transition-colors duration-200"
              >
                Experimentar
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center space-x-4">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-white/60 font-sans text-sm">ou</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          {/* Social Buttons - Stacked for Mobile, Inline for Desktop */}
          <div className="space-y-3 sm:max-w-md sm:mx-auto sm:flex sm:space-x-4 sm:space-y-0">
            {/* Google Button */}
            <button
              type="button"
              disabled
              className="w-full sm:flex-1 h-13 rounded-full border border-white/60 text-white font-sans font-medium transition-all duration-200 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              title="Em breve"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="hidden sm:inline">Continuar com Google</span>
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              disabled
              className="w-full sm:flex-1 h-13 rounded-full border border-white/60 text-white font-sans font-medium transition-all duration-200 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              title="Em breve"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path fill="#ffffff" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.807 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.202-6.086 8.202-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="hidden sm:inline">Continuar com GitHub</span>
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}