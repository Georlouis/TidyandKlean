"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Loader2 } from "lucide-react";

const initialState = {
  error: null as string | null,
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm relative z-10">
        <div className="bg-white pt-10 pb-6 px-10 border border-gray-300 sm:rounded-sm">
          
          <div className="flex justify-center mb-10">
             {/* Typographic Logo similar to Instagram's cursive/serif logo */}
             <h1 className="text-4xl font-black font-serif tracking-tighter text-gray-900 mt-2">
               Tidy & Klean
             </h1>
          </div>

          <form action={formAction} className="space-y-2">
            <div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Teléfono, usuario o correo electrónico"
                  className="appearance-none block w-full px-2 py-2.5 border border-gray-300 rounded-sm bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-xs text-gray-900 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Contraseña"
                  className="appearance-none block w-full px-2 py-2.5 border border-gray-300 rounded-sm bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-xs text-gray-900 transition-colors"
                />
              </div>
            </div>

            <div className="pt-3 pb-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#0095f6] hover:bg-[#1877f2] focus:outline-none transition-colors disabled:opacity-70 disabled:cursor-not-allowed items-center"
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
            
            {state?.error && (
              <div className="text-center mt-4">
                 <p className="text-sm text-red-500">{state.error}</p>
              </div>
            )}
          </form>

          <div className="mt-5 flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <div className="px-4 text-[13px] text-gray-500 font-semibold uppercase">O</div>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          
          <div className="mt-6 text-center text-xs">
             <a href="#" className="text-[#00376b] font-normal hover:underline">
               ¿Olvidaste tu contraseña?
             </a>
          </div>
        </div>
        
        <div className="bg-white py-5 px-8 border border-gray-300 sm:rounded-sm mt-3 text-center">
           <p className="text-[14px] text-gray-900">
             ¿No tienes una cuenta? <a href="#" className="text-[#0095f6] font-semibold">Regístrate</a>
           </p>
        </div>
      </div>
    </div>
  );
}
