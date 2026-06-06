import React from 'react'
import { getCategoriaById } from '../lib/categorias'

export function ItemCard({ item, onToggle }) {
  const cat = getCategoriaById(item.categoria)

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: '#fff',
      padding: '14px 16px',
      borderRadius: 14,
      border: '1px solid #F0F0F0',
      marginBottom: 8,
      cursor: 'pointer',
      userSelect: 'none',
    }}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        style={{
          width: 26, height: 26, borderRadius: '50%',
          border: item.concluido ? 'none' : `2px solid ${cat.cor}`,
          background: item.concluido ? cat.cor : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {item.concluido && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        )}
      </button>

      {/* Emoji categoria */}
      <span style={{ fontSize: 20, flexShrink: 0 }}>{cat.emoji}</span>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: 15,
          fontWeight: 500,
          color: item.concluido ? '#AAA' : '#1A1A2E',
          textDecoration: item.concluido ? 'line-through' : 'none',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.nome}
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#AAA' }}>
          {item.quantidade} {item.unidade} · {cat.label}
          {item.valor != null && (
            <span style={{ color: '#4CAF50', fontWeight: 600 }}>
              {' '}· R$ {Number(item.valor).toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
