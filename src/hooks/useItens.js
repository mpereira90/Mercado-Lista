import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LOCAL_KEY = 'mercadolista_itens'

const loadLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  } catch {
    return []
  }
}

const saveLocal = (itens) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(itens))
}

export function useItens() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [online, setOnline] = useState(isSupabaseConfigured)

  const carregarItens = useCallback(async () => {
    setLoading(true)
    setErro(null)

    if (!isSupabaseConfigured) {
      setItens(loadLocal())
      setOnline(false)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('itens')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setItens(data || [])
      setOnline(true)
    } catch (err) {
      console.warn('Supabase indisponível, usando localStorage:', err.message)
      setItens(loadLocal())
      setOnline(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    carregarItens()
  }, [carregarItens])

  const adicionarItem = useCallback(async (novoItem) => {
    const item = {
      id: Date.now().toString(),
      nome: novoItem.nome.trim(),
      quantidade: novoItem.quantidade || 1,
      unidade: novoItem.unidade || 'un',
      categoria: novoItem.categoria || 'outros',
      concluido: false,
      created_at: new Date().toISOString(),
    }

    if (!isSupabaseConfigured || !online) {
      const atualizados = [item, ...itens]
      setItens(atualizados)
      saveLocal(atualizados)
      return item
    }

    try {
      const { data, error } = await supabase
        .from('itens')
        .insert([{
          nome: item.nome,
          quantidade: item.quantidade,
          unidade: item.unidade,
          categoria: item.categoria,
          concluido: false,
        }])
        .select()
        .single()

      if (error) throw error
      setItens(prev => [data, ...prev])
      return data
    } catch (err) {
      console.warn('Erro ao salvar no Supabase, salvando local:', err.message)
      const atualizados = [item, ...itens]
      setItens(atualizados)
      saveLocal(atualizados)
      return item
    }
  }, [itens, online])

  const removerItem = useCallback(async (id) => {
    const anteriores = [...itens]
    const atualizados = itens.filter(i => i.id !== id)
    setItens(atualizados)

    if (!isSupabaseConfigured || !online) {
      saveLocal(atualizados)
      return
    }

    try {
      const { error } = await supabase.from('itens').delete().eq('id', id)
      if (error) throw error
    } catch (err) {
      console.warn('Erro ao remover do Supabase:', err.message)
      setItens(anteriores)
      saveLocal(anteriores)
    }
  }, [itens, online])

  const toggleConcluido = useCallback(async (id) => {
    const item = itens.find(i => i.id === id)
    if (!item) return

    const atualizados = itens.map(i =>
      i.id === id ? { ...i, concluido: !i.concluido } : i
    )
    setItens(atualizados)

    if (!isSupabaseConfigured || !online) {
      saveLocal(atualizados)
      return
    }

    try {
      const { error } = await supabase
        .from('itens')
        .update({ concluido: !item.concluido })
        .eq('id', id)

      if (error) throw error
    } catch (err) {
      console.warn('Erro ao atualizar:', err.message)
      setItens(itens)
    }
  }, [itens, online])

  const limparConcluidos = useCallback(async () => {
    const concluidos = itens.filter(i => i.concluido).map(i => i.id)
    const atualizados = itens.filter(i => !i.concluido)
    setItens(atualizados)

    if (!isSupabaseConfigured || !online) {
      saveLocal(atualizados)
      return
    }

    try {
      const { error } = await supabase
        .from('itens')
        .delete()
        .in('id', concluidos)

      if (error) throw error
    } catch (err) {
      console.warn('Erro ao limpar:', err.message)
      await carregarItens()
    }
  }, [itens, online, carregarItens])

  return {
    itens,
    loading,
    erro,
    online,
    adicionarItem,
    removerItem,
    toggleConcluido,
    limparConcluidos,
    recarregar: carregarItens,
  }
}
