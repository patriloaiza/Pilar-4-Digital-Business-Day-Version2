import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, TriangleAlert } from 'lucide-react';
import { STORAGE_KEY } from '../data/questions';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary atrapó un error en el diagnóstico:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('No se pudo limpiar localStorage', e);
    }
    window.location.reload();
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-[#D7192B] flex items-center justify-center mx-auto">
              <TriangleAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-gray-900">
                Se detectó un detalle en la sesión
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ocurrió un error al procesar las respuestas en el navegador. Puedes reiniciar una sesión limpia para continuar sin interrupciones.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-gray-50 p-3 rounded-lg border border-gray-200 text-[11px] font-mono text-gray-700 max-h-32 overflow-y-auto">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reiniciar sesión limpia</span>
              </button>

              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Recargar página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
