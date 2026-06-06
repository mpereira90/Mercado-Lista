import React, { useState, useRef, useEffect } from 'react'

export function ModalValor({ item, onConfirmar, onFechar }) {
  const [valor, setValor] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const handleConfirmar = () => {
    const v = parseFloat(valor.replace(',', '.'))
    onConfirmar(isNaN(v) ? 0 : v)
    onFechar()
  }

  const handlePular = () => {
    onConfirmar(0)
    onFechar()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 24px',
      animation: 'fadeIn 0.2s ease',
    }} onClick={e => e.target === e.currentTarget && handlePular()}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        padding: '28px 24px',
        width: '100%',
        maxWidth: 340,
        animation: 'slideUp 0.25s ease',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>💰</div>
          <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700, color: '#1A1A2E' }}>
            Quanto custou?
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: '#AAA' }}>
            {item.nome} · {item.quantidade} {item.unidade}
          </p>
        </div>

        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 16, fontWeight: 600, color: '#4CAF50',
          }}>R$</span>
          <input
            ref={inputRef}
            type="number"
            min="0"
            step="0.01"
            value={valor}
            onChange={e => setValor(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleConfirmar()}
            placeholder="0,00"
            style={{
              width: '100%', padding: '14px 14px 14px 44px',
              fontSize: 22, fontWeight: 600,
              border: '1.5px solid #E8E8E8', borderRadius: 12,
              outline: 'none', boxSizing: 'border-box',
              fontFamily: 'inherit', color: '#1A1A2E',
              textAlign: 'right',
            }}
            onFocus={e => e.target.style.borderColor = '#4CAF50'}
            onBlur={e => e.target.style.borderColor = '#E8E8E8'}
          />
        </div>

        <button
          onClick={handleConfirmar}
          style={{
            width: '100%', padding: '14px',
            background: '#4CAF50', color: '#fff',
            border: 'none', borderRadius: 12,
            fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
            marginBottom: 10,
          }}
        >
          Confirmar
        </button>

        <button
          onClick={handlePular}
          style={{
            width: '100%', padding: '12px',
            background: 'none', color: '#AAA',
            border: 'none', borderRadius: 12,
            fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Pular (não sei o valor)
        </button>
      </div>
    </div>
  )
}
