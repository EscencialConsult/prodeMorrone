import React, { useState, useEffect } from 'react';
import ManualBetGate from '../ManualBetGate';
import CreateBetForm from './CreateBetForm';
import BetsHistory from './BetsHistory';
import BetsSummary from './BetsSummary';

/**
 * UserApuestasSection - Sección de apuestas del usuario
 * Integra apuestas normales Y apuestas manuales con control de habilitación
 */

export default function UserApuestasSection() {
  const [activeView, setActiveView] = useState('resumen'); // 'resumen', 'crear', 'historial'

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-lg p-6" style={{
        background: 'linear-gradient(135deg, #202124 0%, #111214 100%)',
        border: '1px solid rgba(184,160,106,0.2)',
      }}>
        <h2 className="text-2xl font-bold text-white mb-2">
          Mis pronósticos
        </h2>
        <p className="text-gray-300">
          Gestioná tus pronósticos regulares y participá en pronósticos manuales cuando estén disponibles.
        </p>
      </div>

      {/* TABS DE VISTAS */}
      <div className="flex gap-2 rounded-lg p-2" style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(184,160,106,0.1)',
      }}>
        {[
          { key: 'resumen', label: 'Resumen' },
          { key: 'crear', label: 'Crear pronóstico' },
          { key: 'historial', label: 'Historial' },
        ].map(view => (
          <button
            key={view.key}
            onClick={() => setActiveView(view.key)}
            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
            style={{
              background: activeView === view.key ? '#b8a06a' : 'transparent',
              color: activeView === view.key ? '#191a1d' : '#9CA3AF',
              border: activeView === view.key ? '1px solid #b8a06a' : '1px solid transparent',
            }}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="space-y-6">
        
        {/* VISTA: RESUMEN */}
        {activeView === 'resumen' && (
          <div className="space-y-4">
            <BetsSummary />
            
            {/* Pronósticos manuales con gate */}
            <ManualBetGate
              fallback={
                <div className="rounded-lg p-6" style={{
                  background: 'rgba(255,193,7,0.1)',
                  border: '2px dashed rgba(255,193,7,0.4)',
                }}>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-bold text-yellow-700">
                        Pronósticos manuales próximamente
                      </p>
                      <p className="text-sm text-yellow-600">
                        Esta función se habilitará en una fecha especial. Te avisaremos cuando esté disponible.
                      </p>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="rounded-lg p-6" style={{
                background: 'rgba(52,211,153,0.1)',
                border: '2px solid rgba(52,211,153,0.3)',
              }}>
                <p className="text-green-700 font-bold mb-3">
                  Pronósticos manuales habilitados
                </p>
                <p className="text-sm text-green-600 mb-4">
                  Podés crear pronósticos personalizados en este momento.
                </p>
                <button
                  onClick={() => setActiveView('crear')}
                  className="px-4 py-2 rounded-lg font-semibold text-white transition-all"
                  style={{
                    background: '#b8a06a',
                    color: '#191a1d',
                  }}
                >
                  Crear pronóstico manual
                </button>
              </div>
            </ManualBetGate>
          </div>
        )}

        {/* VISTA: CREAR PRONÓSTICO */}
        {activeView === 'crear' && (
          <div className="space-y-4">
            {/* Pronósticos manuales con gate - versión crear */}
            <ManualBetGate
              fallback={
                <div className="rounded-lg p-8 text-center" style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '2px solid rgba(239,68,68,0.3)',
                }}>
                  <p className="font-bold text-red-700 mb-2">
                    Pronósticos manuales no disponibles
                  </p>
                  <p className="text-sm text-red-600 mb-4">
                    Los pronósticos manuales están deshabilitados en este momento.
                  </p>
                  <button
                    onClick={() => setActiveView('resumen')}
                    className="px-4 py-2 rounded-lg font-semibold text-white transition-all"
                    style={{
                      background: 'rgba(239,68,68,0.5)',
                      color: 'white',
                    }}
                  >
                    Volver al resumen
                  </button>
                </div>
              }
            >
              <CreateBetForm onSuccess={() => setActiveView('resumen')} />
            </ManualBetGate>
          </div>
        )}

        {/* VISTA: HISTORIAL */}
        {activeView === 'historial' && (
          <div>
            <BetsHistory />
          </div>
        )}

      </div>
    </div>
  );
}
