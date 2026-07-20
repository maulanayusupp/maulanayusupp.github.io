// Shared open/close state for the global command palette (⌘K / Ctrl+K).
export function useCommandPalette() {
  const isOpen = useState('command-palette', () => false)
  const open = () => (isOpen.value = true)
  const close = () => (isOpen.value = false)
  const toggle = () => (isOpen.value = !isOpen.value)
  return { isOpen, open, close, toggle }
}
