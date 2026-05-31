import React, { useState } from 'react'
import { getCategoriaById } from '../lib/categorias'

export function ItemCard({ item, onToggle, onRemover }) {
  const [swipeX, setSwipeX] = useState(0)
  const [startX, setStartX] = useState(null)
  const [removendo, setRemovendoState] = useState(false)
  const cat = getCategoriaById(item.categoria)

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (startX === null) return
    const dx = e.touches[0].clientX - startX
    if (dx < 0) setSwipeX(Math.max(dx, -80))
  }

  const handleTouchEnd = () => {
    if (swipeX < -60) {
      setRemovendoState(true)
      setTimeout(() => onRemover(item.id), 300)
    } else {
      setSwipeX(0)
    }
    setStartX(null)
  }

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 8,
      borderRadius: 14,
      opacity: removendo ? 0 : 1,
      transform: removendo ? 'translateX(-100%)' : 'none',
      transition: removendo ? 'all 0.3s ease' : 'none',
    }}>
      {/* Fundo vermelho (swipe para remover) */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: 80,
        background: '#FF5252',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '0 14px 14px 0',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </div>

      {/* Card principal */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: '#fff',
          padding: '14px 16px',
          borderRadius: 14,
          border: '1px solid #F0F0F0',
          transform: `translateX(${swipeX}px)`,
          transition: startX ? 'none' : 'transform 0.3s ease',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
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
          <p style={{
            margin: '2px 0 0',
            fontSize: 12,
            color: '#AAA',
          }}>
            {item.quantidade} {item.unidade} · {cat.label}
          </p>
        </div>

        {/* Botão remover (desktop) */}
        <button
          onClick={() => {
            setRemovendoState(true)
            setTimeout(() => onRemover(item.id), 300)
          }}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', padding: 4,
            color: '#CCC',
            display: 'flex', alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
