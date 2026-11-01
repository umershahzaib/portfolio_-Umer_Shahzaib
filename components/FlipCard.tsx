'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  width?: number
  height?: number
  axis?: 'x' | 'y'
  flipOnClick?: boolean
  tilt?: boolean
  tiltMax?: number
  glare?: boolean
  glareOpacity?: number
  hoverScale?: number
  perspective?: number
  stiffness?: number
  damping?: number
  radius?: number
  background?: string
  color?: string
  shadow?: boolean
  shadowColor?: string
  shadowOpacity?: number
  onFlipChange?: (flipped: boolean) => void
}

export default function FlipCard({
  front,
  back,
  width = 300,
  height = 400,
  axis = 'y',
  flipOnClick = false,
  tilt = true,
  tiltMax = 12,
  glare = true,
  glareOpacity = 0.22,
  hoverScale = 1.03,
  perspective = 1100,
  stiffness = 170,
  damping = 20,
  radius = 22,
  background = '#27272a',
  color = '#f5f5f5',
  shadow = true,
  shadowColor = '#000000',
  shadowOpacity = 0.45,
  onFlipChange,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [canFlip, setCanFlip] = useState(true)
  const cardRef = useRef<HTMLDivElement>(null)
  const flipTimeoutRef = useRef<NodeJS.Timeout>()

  // Motion values for tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltMax, -tiltMax]), {
    stiffness,
    damping,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltMax, tiltMax]), {
    stiffness,
    damping,
  })

  // Glare position
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tilt) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)

    x.set(mouseX)
    y.set(mouseY)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!flipOnClick && canFlip) {
      // Clear any existing timeout
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current)
      }

      // Add small delay before flipping
      flipTimeoutRef.current = setTimeout(() => {
        setIsFlipped(true)
        onFlipChange?.(true)
        // Lock flipping for 600ms to prevent rapid flips on re-enter
        setCanFlip(false)
        setTimeout(() => setCanFlip(true), 600)
      }, 150)
    }
  }

  const handleMouseLeave = () => {
    // Clear flip timeout if user leaves before delay completes
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current)
    }

    setIsHovered(false)
    x.set(0)
    y.set(0)

    // Always flip back when mouse leaves (no canFlip check)
    if (!flipOnClick) {
      setTimeout(() => {
        setIsFlipped(false)
        onFlipChange?.(false)
      }, 100)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't flip if clicking on a link or button
    const target = e.target as HTMLElement
    if (target.closest('a') || target.closest('button')) {
      return
    }

    if (flipOnClick) {
      const newState = !isFlipped
      setIsFlipped(newState)
      onFlipChange?.(newState)
    }
  }

  return (
    <div
      style={{
        perspective: `${perspective}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          width: '100%',
          height: '100%',
          rotateX: tilt ? rotateX : 0,
          rotateY: tilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
          cursor: flipOnClick ? 'pointer' : 'default',
        }}
        animate={{
          rotateY: axis === 'y' ? (isFlipped ? 180 : 0) : 0,
          rotateX: axis === 'x' ? (isFlipped ? 180 : 0) : 0,
          scale: isHovered ? hoverScale : 1,
        }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness,
          damping,
        }}
      >
        {/* Front Face */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: `${radius}px`,
            overflow: 'hidden',
            background,
            color,
            boxShadow: shadow
              ? `0 10px 30px ${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')}`
              : 'none',
          }}
        >
          {front}

          {/* Glare Effect */}
          {glare && isHovered && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`,
                pointerEvents: 'none',
              }}
            />
          )}
        </motion.div>

        {/* Back Face */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: `${radius}px`,
            overflow: 'hidden',
            background,
            color,
            boxShadow: shadow
              ? `0 10px 30px ${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')}`
              : 'none',
            rotateY: axis === 'y' ? 180 : 0,
            rotateX: axis === 'x' ? 180 : 0,
          }}
        >
          {back}

          {/* Glare Effect */}
          {glare && isHovered && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`,
                pointerEvents: 'none',
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
