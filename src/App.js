import React, { useState, useMemo } from 'react'
import { useItens } from './hooks/useItens'
import { ModalAdicionar } from './components/ModalAdicionar'
import { ItemCard } from './components/ItemCard'
import { FiltroCategoria } from './components/FiltroCategoria'
import './App.css'

export default function App() {
  const { itens, loading, online, adicionarItem, removerItem, toggleConcluido, limparConcluidos } = useItens()
  const [modalAberto, setModalAberto] = useState(false)
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos')
  const [busca, setBusca] = useState('')
  const [mostrarConcluidos, setMostrarConcluidos] = useState(true)

  const itensFiltrados = useMemo(() => {
    return itens.filter(item => {
      const matchCategoria = categoriaFiltro === 'todos' || item.categoria === categoriaFiltro
      const matchBusca = busca === '' || item.nome.toLowerCase().includes(busca.toLowerCase())
      const matchConcluido = mostrarConcluidos || !item.concluido
      return matchCategoria && matchBusca && matchConcluido
    })
  }, [itens, categoriaFiltro, busca, mostrarConcluidos])

  const itensAtivos = itensFiltrados.filter(i => !i.concluido)
  const itensConcluidos = itensFiltrados.filter(i => i.concluido)

  const contagens = useMemo(() => {
    return itens.reduce((acc, item) => {
      acc[item.categoria] = (acc[item.categoria] || 0) + 1
      return acc
    }, {})
  }, [itens])

  const totalConcluidos = itens.filter(i => i.concluido).length
  const progresso = itens.length > 0 ? (totalConcluidos / itens.length) * 100 : 0

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8F9FA',
      maxWidth: 430,
      margin: '0 auto',
      position: 'relative',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        padding: '52px 20px 16px',
        borderBottom: '1px solid #F0F0F0',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>🛒</span>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.5px' }}>
                MercadoLista
              </h1>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#AAA' }}>
              {itens.length === 0
                ? 'Lista vazia'
                : `${totalConcluidos} de ${itens.length} ${itens.length === 1 ? 'item' : 'itens'}`}
              {' '}
              <span style={{ color: online ? '#4CAF50' : '#FF9800', fontSize: 11 }}>
                {online ? '● online' : '● offline'}
              </span>
            </p>
          </div>

          {totalConcluidos > 0 && (
            <button
              onClick={limparConcluidos}
              style={{
                background: '#FFF3F3', color: '#FF5252',
                border: 'none', borderRadius: 10,
                padding: '8px 12px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Limpar ✓
            </button>
          )}
        </div>

        {/* Barra de progresso */}
        {itens.length > 0 && (
          <div style={{
            height: 4, background: '#F0F0F0', borderRadius: 2, marginBottom: 12, overflow: 'hidden'
          }}>
            <div style={{
              height: '100%', background: '#4CAF50',
              width: `${progresso}%`,
              borderRadius: 2,
              transition: 'width 0.4s ease',
            }} />
          </div>
        )}

        {/* Busca */}
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#CCC' }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar produto..."
            style={{
              width: '100%', padding: '10px 12px 10px 36px',
              border: '1px solid #F0F0F0', borderRadius: 10,
              fontSize: 14, background: '#F8F9FA',
              outline: 'none', boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Filtros */}
      <div style={{ paddingTop: 12, paddingBottom: 4, background: '#fff', borderBottom: '1px solid #F0F0F0' }}>
        <FiltroCategoria
          ativo={categoriaFiltro}
          onChange={setCategoriaFiltro}
          contagens={contagens}
        />
      </div>

      {/* Lista */}
      <div style={{ padding: '16px 16px 100px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#CCC' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
            <p>Carregando...</p>
          </div>
        ) : itens.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#BBB' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🛒</div>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#AAA', margin: '0 0 8px' }}>
              Lista vazia
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              Toque no botão + para adicionar o primeiro item
            </p>
          </div>
        ) : itensFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#BBB' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 15 }}>Nenhum item encontrado</p>
          </div>
        ) : (
          <>
            {/* Itens ativos */}
            {itensAtivos.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#BBB', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 4px 10px' }}>
                  A comprar · {itensAtivos.length}
                </p>
                {itensAtivos.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onToggle={toggleConcluido}
                    onRemover={removerItem}
                  />
                ))}
              </div>
            )}

            {/* Itens concluídos */}
            {itensConcluidos.length > 0 && (
              <div>
                <button
                  onClick={() => setMostrarConcluidos(!mostrarConcluidos)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 11, fontWeight: 600, color: '#BBB',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    margin: '0 4px 10px', background: 'none', border: 'none', cursor: 'pointer',
                    padding: 0, fontFamily: 'inherit',
                  }}
                >
                  <span>{mostrarConcluidos ? '▾' : '▸'}</span>
                  Comprados · {itensConcluidos.length}
                </button>
                {mostrarConcluidos && itensConcluidos.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onToggle={toggleConcluido}
                    onRemover={removerItem}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setModalAberto(true)}
        style={{
          position: 'fixed', bottom: 32, right: '50%',
          transform: 'translateX(50%)',
          width: 58, height: 58,
          background: '#4CAF50',
          color: '#fff', border: 'none', borderRadius: '50%',
          fontSize: 28, fontWeight: 300,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(76,175,80,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 50,
        }}
        onMouseDown={e => { e.currentTarget.style.transform = 'translateX(50%) scale(0.95)' }}
        onMouseUp={e => { e.currentTarget.style.transform = 'translateX(50%) scale(1)' }}
      >
        +
      </button>

      {/* Modal */}
      {modalAberto && (
        <ModalAdicionar
          onAdicionar={adicionarItem}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  )
}
