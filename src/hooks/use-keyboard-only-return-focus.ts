"use client"

import { useCallback, useEffect, useRef } from "react"

// When a menu, sheet or dialog closes, Radix moves focus back to the button
// that opened it. Keyboard users need that, but after a mouse click it leaves
// the focus ring drawn around the button. Pass the returned handler as
// onCloseAutoFocus: it skips the return when the last input was a pointer.
export function useKeyboardOnlyReturnFocus() {
  const lastInputWasPointer = useRef(false)

  useEffect(() => {
    const onPointer = () => (lastInputWasPointer.current = true)
    const onKey = () => (lastInputWasPointer.current = false)
    window.addEventListener("pointerdown", onPointer, true)
    window.addEventListener("keydown", onKey, true)
    return () => {
      window.removeEventListener("pointerdown", onPointer, true)
      window.removeEventListener("keydown", onKey, true)
    }
  }, [])

  return useCallback((event: Event) => {
    if (lastInputWasPointer.current) event.preventDefault()
  }, [])
}
