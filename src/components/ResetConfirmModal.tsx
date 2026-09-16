import React from 'react';
import { Play, RotateCcw, TriangleAlert, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-rose-100 text-[#D7192B] flex items-center justify-center mb-4">
          <RotateCcw className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-black text-gray-900 mb-2">
          ¿Iniciar prueba manual desde cero?
        </h3>

        <p className="text-xs text-gray-600 leading-relaxed mb-6">
          Se vaciarán todas las respuestas actuales y se reiniciará el diagnóstico en la primera
          pregunta (<strong>MP-001</strong>) para que puedas responder cada reactivo
          manualmente a tu propio ritmo.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 mb-6 flex items-start gap-2.5">
          <TriangleAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Nota:</strong> Si deseas conservar los datos actuales, puedes pulsar primero
            en <strong>Guardar</strong> antes de reiniciar.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-xs font-bold transition-all text-center"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-black transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Sí, empezar prueba manual</span>
          </button>
        </div>
      </div>
    </div>
  );
};
