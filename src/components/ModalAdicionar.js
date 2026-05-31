import React, { useState, useRef, useEffect } from 'react'
import { CATEGORIAS, UNIDADES } from '../lib/categorias'

export function ModalAdicionar({ onAdicionar, onFechar }) {
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('1')
  const [unidade, setUnidade] = useState('un')
  const [categoria, setCategoria] = useState('mercearia')
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nome.trim()) return
    onAdicionar({ nome, quantidade: Number(quantidade), unidade, categoria })
    onFechar()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 0.2s ease'
    }} onClick={(e) => e.target === e.currentTarget && onFechar()}>
      <div style={{
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        padding: '8px 20px 40px',
        width: '100%',
        animation: 'slideUp 0.3s ease',
        boxSizing: 'border-box',
      }}>
        {/* Handle */}
        <div style={{
          width: 40, height: 4,
          background: '#E0E0E0',
          borderRadius: 2,
          margin: '12px auto 20px',
        }} />

        <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>
          Adicionar item
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Nome do produto
            </label>
            <input
              ref={inputRef}
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex: Arroz, Tomate, Frango..."
              style={{
                width: '100%', padding: '12px 14px',
                fontSize: 16, border: '1.5px solid #E8E8E8',
                borderRadius: 12, outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#4CAF50'}
              onBlur={e => e.target.style.borderColor = '#E8E8E8'}
            />
          </div>

          {/* Quantidade + Unidade */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Quantidade
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
                style={{
                  width: '100%', padding: '12px 14px',
                  fontSize: 16, border: '1.5px solid #E8E8E8',
                  borderRadius: 12, outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = '#4CAF50'}
                onBlur={e => e.target.style.borderColor = '#E8E8E8'}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Unidade
              </label>
              <select
                value={unidade}
                onChange={e => setUnidade(e.target.value)}
                style={{
                  width: '100%', padding: '12px 14px',
                  fontSize: 16, border: '1.5px solid #E8E8E8',
                  borderRadius: 12, outline: 'none',
                  boxSizing: 'border-box',
                  background: '#fff',
                  fontFamily: 'inherit',
                  appearance: 'none',
                }}
              >
                {UNIDADES.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          {/* Categoria */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Categoria
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {CATEGORIAS.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoria(cat.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 12px',
                    border: categoria === cat.id
                      ? `2px solid ${cat.cor}`
                      : '1.5px solid #E8E8E8',
                    borderRadius: 10,
                    background: categoria === cat.id
                      ? `${cat.cor}15`
                      : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    fontSize: 13,
                    fontWeight: categoria === cat.id ? 600 : 400,
                    color: categoria === cat.id ? cat.cor : '#555',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 18 }}>{cat.emoji}</span>
                  <span style={{ fontSize: 12 }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!nome.trim()}
            style={{
              width: '100%', padding: '15px',
              background: nome.trim() ? '#4CAF50' : '#E0E0E0',
              color: '#fff', border: 'none', borderRadius: 14,
              fontSize: 16, fontWeight: 700,
              cursor: nome.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
              letterSpacing: '0.02em',
            }}
          >
            Adicionar à lista
          </button>
        </form>
      </div>
    </div>
  )
}
