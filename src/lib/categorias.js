export const CATEGORIAS = [
  { id: 'mercearia',   label: 'Mercearia',   emoji: '🛒', cor: '#E8A838' },
  { id: 'hortifruti',  label: 'Hortifruti',  emoji: '🥦', cor: '#4CAF50' },
  { id: 'acougue',     label: 'Açougue',     emoji: '🥩', cor: '#E57373' },
  { id: 'limpeza',     label: 'Limpeza',     emoji: '🧹', cor: '#5C9BD6' },
  { id: 'frios',       label: 'Frios/Laticinios', emoji: '🧀', cor: '#9C7ABA' },
  { id: 'padaria',     label: 'Padaria',     emoji: '🍞', cor: '#D4A574' },
  { id: 'bebidas',     label: 'Bebidas',     emoji: '🥤', cor: '#26A69A' },
  { id: 'higiene',     label: 'Higiene',     emoji: '🪥', cor: '#F06292' },
  { id: 'congelados',  label: 'Congelados',  emoji: '🧊', cor: '#42A5F5' },
  { id: 'outros',      label: 'Outros',      emoji: '📦', cor: '#90A4AE' },
]

export const UNIDADES = ['un', 'kg', 'g', 'L', 'mL', 'cx', 'pct', 'dz']

export const getCategoriaById = (id) =>
  CATEGORIAS.find(c => c.id === id) || CATEGORIAS[CATEGORIAS.length - 1]
