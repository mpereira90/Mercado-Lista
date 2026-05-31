import React, { useRef } from 'react'
import { CATEGORIAS } from '../lib/categorias'

export function FiltroCategoria({ ativo, onChange, contagens }) {
  const scrollRef = useRef(null)

  const categoriasFiltradas = [
    { id: 'todos', label: 'Todos', emoji: '🛍️', cor: '#555' },
    ...CATEGORIAS.filter(c => (contagens[c.id] || 0) > 0),
  ]

  return (
    <div
      ref={scrollRef}
      style={{
        display: 'flex', gap: 8,
        overflowX: 'auto',
        padding: '4px 20px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {categoriasFiltradas.map(cat => {
        const isAtivo = ativo === cat.id
        const count = cat.id === 'todos'
          ? Object.values(contagens).reduce((a, b) => a + b, 0)
          : (contagens[cat.id] || 0)

        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 14px',
              borderRadius: 20,
              border: 'none',
              background: isAtivo ? cat.cor : '#F0F0F0',
              color: isAtivo ? '#fff' : '#666',
              fontSize: 13,
              fontWeight: isAtivo ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            {count > 0 && (
              <span style={{
                background: isAtivo ? 'rgba(255,255,255,0.3)' : '#DDD',
                color: isAtivo ? '#fff' : '#666',
                borderRadius: 10,
                padding: '1px 6px',
                fontSize: 11,
                fontWeight: 600,
              }}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
