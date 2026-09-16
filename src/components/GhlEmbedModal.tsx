import React, { useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Github,
  HelpCircle,
  Layers,
  ShieldAlert,
  Sparkles,
  X
} from 'lucide-react';

interface GhlEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GhlEmbedModal: React.FC<GhlEmbedModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ghl' | 'github' | 'standalone'>('ghl');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const ghlIframeSnippet = `<!-- Código de incrustación para GoHighLevel (GHL) -->
<!-- Pega este bloque en un elemento "Custom Code" o "HTML/JS" en tu Funnel o Sitio Web -->
<div style="width: 100%; min-height: 100vh; display: flex; justify-content: center; align-items: stretch; background: #f4f4f5; margin: 0; padding: 0;">
  <iframe 
    id="bms-diagnostic-frame"
    src="https://TU_USUARIO.github.io/TU_REPOSITORIO/" 
    style="width: 100%; min-height: 950px; border: none; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.06);"
    allow="clipboard-write; clipboard-read"
    loading="lazy"
    title="Diagnóstico de Profundización BMS"
  ></iframe>
</div>

<!-- Script de auto-ajuste de altura para mobile y desktop en GHL -->
<script>
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'bms-resize' && e.data.height) {
      var frame = document.getElementById('bms-diagnostic-frame');
      if (frame) frame.style.height = Math.max(900, e.data.height + 40) + 'px';
    }
  });
</script>`;

  const githubActionsWorkflow = `# .github/workflows/deploy.yml
name: Desplegar Diagnóstico BMS en GitHub Pages

on:
  push:
    branches:
      - main  # o master según tu rama principal

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout del repositorio
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci

      - name: Compilar aplicación Vite para producción
        run: npm run build

      - name: Subir artefacto para GitHub Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Desplegar en GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#111111] text-white p-5 border-b-4 border-[#D7192B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D7192B] flex items-center justify-center text-white shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-[#f55364]">
                Guía de Solución e Integración
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                Incrustar en GoHighLevel (GHL) y Configurar GitHub
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-5 pt-2 gap-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('ghl')}
            className={`px-4 py-2.5 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ghl'
                ? 'border-[#D7192B] text-[#D7192B] bg-white rounded-t-lg'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            1. Incrustar en GoHighLevel (GHL)
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`px-4 py-2.5 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'border-[#D7192B] text-[#D7192B] bg-white rounded-t-lg'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            2. Solución al Error de GitHub Pages
          </button>
          <button
            onClick={() => setActiveTab('standalone')}
            className={`px-4 py-2.5 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'standalone'
                ? 'border-[#D7192B] text-[#D7192B] bg-white rounded-t-lg'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            3. Alternativa Directa (.HTML único)
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-gray-800 text-xs sm:text-sm">
          {activeTab === 'ghl' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950">
                <h4 className="font-extrabold text-sm mb-1 text-blue-900">
                  ¿Cómo incrustar la app en GoHighLevel (Funnels o Websites)?
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-xs text-blue-900/90 leading-relaxed mt-2">
                  <li>Abre tu funnel o página en el <strong>Page Builder de GHL</strong>.</li>
                  <li>Añade un elemento de tipo <strong>Custom Code</strong> (o <strong>HTML/JS</strong>).</li>
                  <li>Haz clic en <strong>Open Code Editor</strong>.</li>
                  <li>Pega el código HTML a continuación y reemplaza la URL por la de tu GitHub Pages (o URL de tu app).</li>
                  <li>Guarda y publica la página en GHL.</li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-gray-700 text-xs">
                    Código Iframe Optimizado para GHL:
                  </span>
                  <button
                    onClick={() => handleCopy(ghlIframeSnippet, 'ghl')}
                    className="px-3 py-1 rounded bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    {copiedKey === 'ghl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'ghl' ? '¡Copiado!' : 'Copiar código'}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#171717] text-gray-200 font-mono text-[11px] overflow-x-auto border border-gray-800 leading-relaxed max-h-72">
                  {ghlIframeSnippet}
                </pre>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-[11px] text-gray-600">
                <strong>Consejo de usabilidad en GHL:</strong> Si tu página en GHL tiene padding excesivo en la sección o fila, configúralos en 0px para que el diagnóstico ocupe el ancho completo y sea agradable de responder en teléfonos y laptops.
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#D7192B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm mb-1 text-rose-900">
                    ¿Por qué sale error en GitHub Pages y cómo se soluciona?
                  </h4>
                  <p className="text-xs text-rose-900/90 leading-relaxed">
                    Hay 2 razones principales por las que suele fallar al publicar un proyecto Vite en GitHub:
                  </p>
                  <ul className="list-disc list-inside text-xs mt-2 space-y-1.5 text-rose-950">
                    <li>
                      <strong>Causa 1 (Rutas absolutas 404):</strong> Por defecto, Vite busca los scripts en <code className="bg-rose-100 px-1 rounded font-mono">/assets/...</code> en vez de <code className="bg-rose-100 px-1 rounded font-mono">./assets/...</code>. 
                      <span className="text-emerald-700 font-bold ml-1">¡Ya lo dejamos corregido configurando <code className="font-mono">base: './'</code> en vite.config.ts!</span>
                    </li>
                    <li>
                      <strong>Causa 2 (Subir código fuente sin compilar):</strong> GitHub Pages solo puede servir archivos HTML/JS ya compilados (<code className="bg-rose-100 px-1 rounded font-mono">dist/</code>), no ejecuta TypeScript (<code className="font-mono">.tsx</code>) directamente en el navegador.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 text-xs mb-2">
                  Solución Definitiva y Automática: GitHub Actions
                </h5>
                <p className="text-xs text-gray-600 mb-2">
                  Crea un archivo llamado <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[#D7192B]">.github/workflows/deploy.yml</code> en tu repositorio con el siguiente contenido. Luego ve a <strong>Settings → Pages → Source: GitHub Actions</strong> en tu repositorio de GitHub. ¡Se compilará y publicará automáticamente!
                </p>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-gray-700 text-xs">
                    Workflow (.github/workflows/deploy.yml):
                  </span>
                  <button
                    onClick={() => handleCopy(githubActionsWorkflow, 'workflow')}
                    className="px-3 py-1 rounded bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    {copiedKey === 'workflow' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'workflow' ? '¡Copiado!' : 'Copiar workflow'}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#171717] text-gray-200 font-mono text-[11px] overflow-x-auto border border-gray-800 leading-relaxed max-h-64">
                  {githubActionsWorkflow}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'standalone' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
                <h4 className="font-extrabold text-sm mb-1 text-amber-900">
                  ¿Quieres una solución sin complicaciones de compilación?
                </h4>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  También tienes a tu disposición el archivo único <code className="font-mono font-bold">diagnostico-bms.html</code>.
                  Es un único archivo con todo el CSS, JavaScript, reactivos y lógica empaquetados juntos.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="font-bold text-gray-900 text-xs mb-1">
                    Opción A: Subir el archivo .html a cualquier hosting o CDN
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Puedes subir <code className="font-mono bg-white px-1 border rounded">diagnostico-bms.html</code> a Amazon S3, Cloudflare Pages, Netlify, Vercel o directamente al gestor de archivos de GHL o tu hosting, e incrustar esa URL en tu iframe de GHL.
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="font-bold text-gray-900 text-xs mb-1">
                    Opción B: Descargar para uso local / offline
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Puedes pulsar en <strong>Descargar App (.html)</strong> en la barra superior. El archivo funciona incluso sin conexión a internet directamente en cualquier navegador web.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
          <div className="text-[11px] text-gray-500 font-medium">
            CREA Y MONETIZA™ · Consultoría de Alta Fidelidad
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-bold transition-all shadow-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
