'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current

    if (!dot || !outline) return

    let mouseX = 0
    let mouseY = 0
    let outlineX = 0
    let outlineY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (dot) {
        dot.style.left = `${mouseX}px`
        dot.style.top = `${mouseY}px`
      }
    }

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15
      outlineY += (mouseY - outlineY) * 0.15

      if (outline) {
        outline.style.left = `${outlineX}px`
        outline.style.top = `${outlineY}px`
      }

      requestAnimationFrame(animateOutline)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateOutline()

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .interactive')

    const handleMouseEnter = () => {
      if (dot) {
        dot.style.transform = 'translate(-50%, -50%) scale(2)'
      }
      if (outline) {
        outline.style.transform = 'translate(-50%, -50%) scale(1.5)'
        outline.style.borderColor = 'rgba(0, 217, 255, 1)'
      }
    }

    const handleMouseLeave = () => {
      if (dot) {
        dot.style.transform = 'translate(-50%, -50%) scale(1)'
      }
      if (outline) {
        outline.style.transform = 'translate(-50%, -50%) scale(1)'
        outline.style.borderColor = 'rgba(0, 217, 255, 0.5)'
      }
    }

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed w-2 h-2 bg-neon-blue rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={outlineRef}
        className="cursor-outline fixed w-10 h-10 border-2 border-neon-blue/50 rounded-full pointer-events-none z-[9998]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
