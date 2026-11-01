'use client'

import { useEffect, useRef, useState } from 'react'

interface InteractiveAvatarProps {
  videoSrc: string
  posterSrc?: string
  className?: string
}

export default function InteractiveAvatar({ videoSrc, posterSrc, className = '' }: InteractiveAvatarProps) {
  const [isVideoAvailable, setIsVideoAvailable] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const avatarContainerRef = useRef<HTMLDivElement>(null)
  const leftPupilRef = useRef<HTMLDivElement>(null)
  const rightPupilRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()

  // Current pupil positions
  const currentPupilPos = useRef({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  })

  // Target pupil positions (what we're animating towards)
  const targetPupilPos = useRef({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  })

  // Subtle head tilt
  const headTilt = useRef({ x: 0, y: 0 })
  const targetHeadTilt = useRef({ x: 0, y: 0 })

  // Eye positions (as percentages of container)
  // Adjust these values to match your avatar's eye positions
  const EYE_POSITIONS = {
    left: { x: 0.38, y: 0.42 },  // Left eye at 38% from left, 42% from top
    right: { x: 0.62, y: 0.42 }, // Right eye at 62% from left, 42% from top
  }

  const MAX_PUPIL_MOVEMENT = 8 // Maximum pupil movement in pixels
  const SMOOTHNESS = 0.15 // Lower = smoother but slower (0-1)
  const HEAD_TILT_AMOUNT = 2 // Subtle head tilt in degrees

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('error', (e) => {
        console.error('Video error:', e)
        setIsVideoAvailable(false)
      })

      video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully')
      })

      // Attempt to play video (handle autoplay policy)
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing')
          })
          .catch((error) => {
            console.log('Autoplay prevented, waiting for user interaction', error)
            // Autoplay failed, try playing on first user interaction
            const playOnInteraction = () => {
              video.play()
              document.removeEventListener('click', playOnInteraction)
              document.removeEventListener('touchstart', playOnInteraction)
            }
            document.addEventListener('click', playOnInteraction)
            document.addEventListener('touchstart', playOnInteraction)
          })
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent
      if (!avatarContainerRef.current) return

      const rect = avatarContainerRef.current.getBoundingClientRect()
      const mouseX = mouseEvent.clientX - rect.left
      const mouseY = mouseEvent.clientY - rect.top

      // Calculate target positions for both pupils
      ;['left', 'right'].forEach((eye) => {
        const eyeKey = eye as 'left' | 'right'
        const eyePos = EYE_POSITIONS[eyeKey]

        // Eye center in pixels
        const eyeCenterX = rect.width * eyePos.x
        const eyeCenterY = rect.height * eyePos.y

        // Vector from eye to mouse
        const deltaX = mouseX - eyeCenterX
        const deltaY = mouseY - eyeCenterY

        // Distance and angle
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const angle = Math.atan2(deltaY, deltaX)

        // Constrain pupil movement
        const moveDistance = Math.min(distance * 0.08, MAX_PUPIL_MOVEMENT)

        targetPupilPos.current[eyeKey] = {
          x: Math.cos(angle) * moveDistance,
          y: Math.sin(angle) * moveDistance,
        }
      })

      // Calculate subtle head tilt
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      targetHeadTilt.current = {
        x: ((mouseY - centerY) / rect.height) * HEAD_TILT_AMOUNT,
        y: -((mouseX - centerX) / rect.width) * HEAD_TILT_AMOUNT,
      }
    }

    const handleMouseLeave = () => {
      // Reset to center when mouse leaves
      targetPupilPos.current = {
        left: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
      }
      targetHeadTilt.current = { x: 0, y: 0 }
    }

    // Animation loop for smooth interpolation
    const animate = () => {
      // Interpolate pupil positions
      ;['left', 'right'].forEach((eye) => {
        const eyeKey = eye as 'left' | 'right'
        currentPupilPos.current[eyeKey].x +=
          (targetPupilPos.current[eyeKey].x - currentPupilPos.current[eyeKey].x) * SMOOTHNESS
        currentPupilPos.current[eyeKey].y +=
          (targetPupilPos.current[eyeKey].y - currentPupilPos.current[eyeKey].y) * SMOOTHNESS
      })

      // Interpolate head tilt
      headTilt.current.x += (targetHeadTilt.current.x - headTilt.current.x) * SMOOTHNESS
      headTilt.current.y += (targetHeadTilt.current.y - headTilt.current.y) * SMOOTHNESS

      // Apply transforms
      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform =
          `translate(${currentPupilPos.current.left.x}px, ${currentPupilPos.current.left.y}px)`
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform =
          `translate(${currentPupilPos.current.right.x}px, ${currentPupilPos.current.right.y}px)`
      }
      if (avatarContainerRef.current) {
        avatarContainerRef.current.style.transform =
          `rotateX(${headTilt.current.x}deg) rotateY(${headTilt.current.y}deg)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const heroSection = document.querySelector('#home') as HTMLElement | null
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove)
      heroSection.addEventListener('mouseleave', handleMouseLeave)
    }

    animate()

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove)
        heroSection.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={avatarContainerRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Avatar Video/Image */}
      {isVideoAvailable ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(0, 217, 255, 0.4))',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : posterSrc ? (
        <img
          src={posterSrc}
          alt="Avatar"
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(0, 217, 255, 0.4))',
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-dark-card rounded-2xl">
          <p className="text-gray-400">Avatar Loading...</p>
        </div>
      )}

      {/* Left Eye Pupil Overlay - TEMPORARILY HIDDEN FOR DEBUGGING */}
      <div
        className="absolute pointer-events-none z-10 hidden"
        style={{
          left: `${EYE_POSITIONS.left.x * 100}%`,
          top: `${EYE_POSITIONS.left.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          ref={leftPupilRef}
          className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-black"
          style={{
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
            opacity: 0.8,
            transition: 'width 0.2s, height 0.2s',
          }}
        />
      </div>

      {/* Right Eye Pupil Overlay - TEMPORARILY HIDDEN FOR DEBUGGING */}
      <div
        className="absolute pointer-events-none z-10 hidden"
        style={{
          left: `${EYE_POSITIONS.right.x * 100}%`,
          top: `${EYE_POSITIONS.right.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          ref={rightPupilRef}
          className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-black"
          style={{
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
            opacity: 0.8,
            transition: 'width 0.2s, height 0.2s',
          }}
        />
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-neon-blue/30 pointer-events-none" />
    </div>
  )
}
