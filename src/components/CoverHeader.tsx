import React, { useState } from 'react';
import {
  Compass,
  FileSpreadsheet,
  Info,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Flame
} from 'lucide-react';
import { CONSULTING_PHASES } from '../data/phases';
import { coreQuestions } from '../data/questions';

interface CoverHeaderProps {
  clientName: string;
  clientEmail: string;
  consultant: string;
  onChangeClientName: (name: string) => void;
  onChangeClientEmail: (email: string) => void;
  onChangeConsultant: (consultant: string) => void;
}

export const CoverHeader: React.FC<CoverHeaderProps> = ({
  clientName,
  clientEmail,
  consultant,
  onChangeClientName,
  onChangeClientEmail,
  onChangeConsultant
}) => {
  const [showPhases, setShowPhases] = useState(false);

  return (
    <section
      id="section-cover-card"
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
    >
      <div className="border-t-[8px] border-[#D7192B] p-6 sm:p-8 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="text-xs font-black tracking-widest text-[#D7192B] uppercase">
            PATRICIA LOAIZA · CREA Y MONETIZA™
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-rose-50 text-[#D7192B] font-extrabold text-[11px] px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
              <Flame className="w-3 h-3" />
              PILAR 4 · DIGITAL BUSINESS DAY
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-2">
          Digital Business Day — Diagnóstico de Negocios Digitales
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
          Jornada estratégica intensiva (7 horas) para transformar tu modelo: de la dispersión y la saturación operativa
          a la claridad comercial, rentabilidad y automatización de la entrega con 3 Agentes de IA.
        </p>

        {/* Banner de Guía Metodológica */}
        <div className="mt-5 p-4 bg-rose-50/80 border-l-4 border-[#D7192B] rounded-r-lg text-xs text-gray-800 leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-[#D7192B] shrink-0 mt-0.5" />
          <div className="space-y-1.5 flex-1">
            <div className="font-bold text-gray-900">Estructura del Cuestionario y Auditoría:</div>
            <p className="text-gray-700">
              Este diagnóstico evalúa <strong className="text-[#D7192B] font-bold">36 reactivos estratégicos organizados en 5 dimensiones</strong> (Modelo de Negocio, Operaciones y Sistemas, Finanzas del Negocio, Producto y Oferta, Crecimiento y Escala). Cada pregunta incluye contrastes de control (lo que manifiestas querer vs lo que realmente necesitas) y se conecta directamente con las 9 fases y 41 ejercicios del Digital Business Day.
            </p>
            <div className="pt-1">
              <button
                onClick={() => setShowPhases(!showPhases)}
                className="text-[#D7192B] hover:text-[#b91222] font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{showPhases ? 'Ocultar roadmap de las 9 fases de consultoría' : 'Ver las 9 fases de entrega (Kickoff a Offboarding · 41 Ejercicios)'}</span>
                {showPhases ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desplegable de Fases de Consultoría */}
        {showPhases && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-gray-700">
              Roadmap Integral del Servicio Productizado Digital Business Day (Fases 0 a 8 · 41 Ejercicios):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {CONSULTING_PHASES.map((ph) => (
                <div key={ph.code} className="p-3 bg-white rounded-lg border border-gray-200 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#D7192B]">{ph.code} · {ph.name}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">
                      {ph.exerciseCount} {ph.exerciseCount === 1 ? 'ejercicio' : 'ejercicios'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px] leading-tight">{ph.subtitle}</p>
                  <div className="text-[10px] text-gray-700 pt-1 border-t border-gray-100 font-mono">
                    {ph.exercises.map(e => e.code).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ficha de identificación del cliente */}
      <div className="px-6 sm:px-8 pb-6 pt-2 bg-gray-50/50 border-t border-gray-100">
        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#D7192B]" />
          Ficha de identificación y seguimiento de la sesión
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Nombre del cliente o marca
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => onChangeClientName(e.target.value)}
              placeholder="Ej: Camila Valenzuela"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#D7192B] focus:ring-1 focus:ring-[#D7192B]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => onChangeClientEmail(e.target.value)}
              placeholder="cliente@marca.com"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#D7192B] focus:ring-1 focus:ring-[#D7192B]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Consultor responsable
            </label>
            <input
              type="text"
              value={consultant}
              onChange={(e) => onChangeConsultant(e.target.value)}
              placeholder="Patricia Loaiza"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#D7192B] focus:ring-1 focus:ring-[#D7192B]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
