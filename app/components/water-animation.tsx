"use client"

import { useEffect, useState } from "react"

interface WaterAnimationProps {
  darkMode: boolean
}

export function WaterAnimation({ darkMode }: WaterAnimationProps) {
  const [waveOffset, setWaveOffset] = useState(0)
  const [isEngineRunning, setIsEngineRunning] = useState(false)
  const [smokeParticles, setSmokeParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      opacity: number
      size: number
      drift: number
    }>
  >([])

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 1) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Smoke animation effect
  useEffect(() => {
    if (!isEngineRunning) {
      // Clear smoke particles when engine stops
      setSmokeParticles([])
      return
    }

    const smokeInterval = setInterval(() => {
      setSmokeParticles((prev) => {
        // Remove old particles and update existing ones
        const updatedParticles = prev
          .filter((particle) => particle.opacity > 0)
          .map((particle) => ({
            ...particle,
            y: particle.y - 2, // Move up
            x: particle.x + particle.drift, // Drift sideways
            opacity: particle.opacity - 0.02, // Fade out
            size: particle.size + 0.5, // Grow slightly
          }))

        // Add new smoke particles from exhaust
        const newParticles = Array.from({ length: 3 }, (_, i) => ({
          id: Date.now() + i,
          x: 320 + Math.random() * 10 - 5, // Exhaust position with slight randomness
          y: 95,
          opacity: 0.6 + Math.random() * 0.3,
          size: 3 + Math.random() * 2,
          drift: (Math.random() - 0.5) * 2,
        }))

        return [...updatedParticles, ...newParticles].slice(-20) // Keep max 20 particles
      })
    }, 100)

    return () => {
      clearInterval(smokeInterval)
    }
  }, [isEngineRunning])

  const playEngineSound = () => {
    try {
      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/engine-start-4Z14jA77wyQpyJYFoamYG3Jc2vGZW3.mp3")
      audio.volume = 1.0 // Maximum volume (100%)

      // Start smoke animation
      setIsEngineRunning(true)
      setSmokeParticles([])

      // Listen for when audio ends to stop smoke
      audio.addEventListener("ended", () => {
        setIsEngineRunning(false)
      })

      // Also stop smoke after a maximum duration as fallback
      const maxSmokeTimeout = setTimeout(() => {
        setIsEngineRunning(false)
      }, 10000) // 10 seconds max

      audio
        .play()
        .then(() => {
          // Audio started successfully
          console.log("Engine sound playing with smoke effect")
        })
        .catch((error) => {
          console.log("Audio playback failed:", error)
          // Stop smoke if audio fails
          setIsEngineRunning(false)
          clearTimeout(maxSmokeTimeout)

          // Fallback: create a simple beep sound using Web Audio API
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5)

          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 1)

          // Start smoke for fallback sound (shorter duration)
          setIsEngineRunning(true)
          setTimeout(() => setIsEngineRunning(false), 1000)
        })

      // Cleanup timeout when component unmounts or audio changes
      return () => {
        clearTimeout(maxSmokeTimeout)
      }
    } catch (error) {
      console.log("Audio not supported:", error)
      setIsEngineRunning(false)
    }
  }

  return (
    <div
      className={`relative w-full h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-blue-100"}`}
    >
      {/* Ground level reference */}
      <div className="absolute bottom-0 w-full h-2 bg-gray-600"></div>
      <div className="absolute bottom-2 left-1 sm:left-2 lg:left-4 text-xs text-gray-500">Ground Level (0")</div>

      {/* Professional Realistic Car - Now clickable */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className="relative transform-gpu transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
          onClick={playEngineSound}
          title="Click to start engine sound! 🚗"
        >
          {/* Car shadow */}
          <div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-black opacity-30 rounded-full blur-sm"
            style={{ width: "280px", height: "20px" }}
          />

          {/* Smoke particles */}
          {smokeParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: darkMode ? "rgba(200, 200, 200, 0.7)" : "rgba(100, 100, 100, 0.6)",
                borderRadius: "50%",
                opacity: particle.opacity,
                filter: "blur(1px)",
                transform: "translateZ(30px)",
                transition: "all 0.1s ease-out",
              }}
            />
          ))}

          {/* Professional Realistic Car SVG - FIXED LIGHTS */}
          <svg
            width="320"
            height="140"
            viewBox="0 0 400 160"
            className="w-60 h-32 sm:w-72 sm:h-36 md:w-80 md:h-40 lg:w-96 lg:h-48 drop-shadow-2xl transform-gpu hover:drop-shadow-3xl transition-all duration-300"
            style={{
              transform: "rotateX(2deg) rotateY(-3deg) translateZ(10px)",
              filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.4))",
            }}
          >
            {/* Professional gradients and materials */}
            <defs>
              {/* Car body gradient - metallic silver */}
              <linearGradient id="carBodyPro" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="20%" stopColor="#d1d5db" />
                <stop offset="50%" stopColor="#9ca3af" />
                <stop offset="80%" stopColor="#6b7280" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>

              {/* Car roof gradient */}
              <linearGradient id="carRoofPro" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3f4f6" />
                <stop offset="30%" stopColor="#e5e7eb" />
                <stop offset="70%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>

              {/* Professional windshield */}
              <linearGradient id="windshieldPro" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.25)" />
                <stop offset="100%" stopColor="rgba(29, 78, 216, 0.35)" />
              </linearGradient>

              {/* FIXED Professional headlight */}
              <radialGradient id="headlightPro" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#f8fafc" />
                <stop offset="70%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </radialGradient>

              {/* FIXED Professional taillight */}
              <radialGradient id="taillightPro" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </radialGradient>

              {/* Professional wheel */}
              <radialGradient id="wheelPro" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="30%" stopColor="#e2e8f0" />
                <stop offset="60%" stopColor="#94a3b8" />
                <stop offset="80%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </radialGradient>

              {/* Tire gradient */}
              <radialGradient id="tirePro" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="70%" stopColor="#1f2937" />
                <stop offset="100%" stopColor="#111827" />
              </radialGradient>

              {/* Chrome/metal gradient */}
              <linearGradient id="chromePro" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="30%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>

            {/* Professional sedan body - realistic proportions */}
            <path
              d="M 50 110 
                 C 50 108, 52 105, 58 103
                 L 85 100
                 C 92 98, 98 95, 105 88
                 C 110 82, 115 75, 120 70
                 L 280 70
                 C 285 75, 290 82, 295 88
                 C 302 95, 308 98, 315 100
                 L 342 103
                 C 348 105, 350 108, 350 110
                 L 350 125
                 C 348 128, 345 130, 340 130
                 L 320 130
                 C 318 130, 316 128, 316 125
                 L 84 125
                 C 84 128, 82 130, 80 130
                 L 60 130
                 C 55 130, 50 128, 50 125
                 Z"
              fill="url(#carBodyPro)"
              stroke="#64748b"
              strokeWidth="1.5"
            />

            {/* Professional roof/cabin */}
            <path
              d="M 105 88
                 C 110 82, 115 75, 120 70
                 L 280 70
                 C 285 75, 290 82, 295 88
                 C 300 92, 302 96, 302 100
                 L 302 110
                 C 300 115, 296 118, 290 118
                 L 110 118
                 C 104 118, 100 115, 98 110
                 L 98 100
                 C 98 96, 100 92, 105 88 Z"
              fill="url(#carRoofPro)"
              stroke="#94a3b8"
              strokeWidth="1"
            />

            {/* Professional windshield */}
            <path
              d="M 105 88
                 C 108 82, 112 76, 120 70
                 L 180 70
                 C 182 74, 184 80, 185 88
                 L 185 105
                 C 183 110, 180 113, 175 113
                 L 110 113
                 C 104 113, 100 110, 98 105
                 L 98 95
                 C 100 92, 102 90, 105 88 Z"
              fill="url(#windshieldPro)"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="0.5"
            />

            {/* Professional rear windshield */}
            <path
              d="M 215 88
                 C 217 82, 218 76, 220 70
                 L 280 70
                 C 288 76, 292 82, 295 88
                 C 300 92, 302 96, 302 100
                 L 302 110
                 C 300 113, 296 113, 290 113
                 L 225 113
                 C 220 113, 217 110, 215 105
                 Z"
              fill="url(#windshieldPro)"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="0.5"
            />

            {/* Professional side windows */}
            <path
              d="M 190 88
                 L 210 88
                 C 212 92, 212 96, 212 100
                 L 212 105
                 C 210 108, 208 108, 205 108
                 L 195 108
                 C 192 108, 190 105, 190 100
                 Z"
              fill="url(#windshieldPro)"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="0.5"
            />

            {/* FIXED Professional headlights - properly positioned */}
            <g>
              {/* Main headlight housing */}
              <ellipse cx="65" cy="112" rx="12" ry="8" fill="url(#headlightPro)" stroke="#cbd5e1" strokeWidth="1" />
              {/* Inner headlight lens */}
              <ellipse cx="65" cy="112" rx="8" ry="5" fill="#ffffff" opacity="0.95" />
              {/* Headlight reflector */}
              <circle cx="67" cy="110" r="3" fill="#f8fafc" />
              <circle cx="63" cy="114" r="2" fill="#e2e8f0" />
            </g>

            {/* FIXED Professional taillights - properly positioned */}
            <g>
              {/* Main taillight housing */}
              <ellipse cx="335" cy="112" rx="10" ry="6" fill="url(#taillightPro)" stroke="#dc2626" strokeWidth="1" />
              {/* Inner taillight lens */}
              <ellipse cx="335" cy="112" rx="6" ry="4" fill="#ef4444" opacity="0.9" />
              {/* Taillight reflector */}
              <circle cx="336" cy="111" r="2" fill="#fca5a5" />
            </g>

            {/* Professional front grille - properly positioned */}
            <rect x="45" y="108" width="18" height="16" rx="2" fill="#1f2937" stroke="#374151" strokeWidth="1" />
            <rect x="47" y="110" width="14" height="1.5" fill="#4b5563" />
            <rect x="47" y="113" width="14" height="1.5" fill="#4b5563" />
            <rect x="47" y="116" width="14" height="1.5" fill="#4b5563" />
            <rect x="47" y="119" width="14" height="1.5" fill="#4b5563" />

            {/* Professional exhaust pipe */}
            <ellipse cx="345" cy="128" rx="5" ry="2.5" fill="#374151" stroke="#1f2937" strokeWidth="1" />
            <ellipse cx="347" cy="128" rx="2.5" ry="1.5" fill="#1f2937" />

            {/* Professional side mirrors */}
            <ellipse cx="95" cy="85" rx="5" ry="3" fill="url(#chromePro)" stroke="#94a3b8" strokeWidth="0.5" />
            <ellipse cx="305" cy="85" rx="5" ry="3" fill="url(#chromePro)" stroke="#94a3b8" strokeWidth="0.5" />

            {/* Professional door handles */}
            <ellipse cx="140" cy="105" rx="3" ry="1.5" fill="url(#chromePro)" stroke="#94a3b8" strokeWidth="0.5" />
            <ellipse cx="260" cy="105" rx="3" ry="1.5" fill="url(#chromePro)" stroke="#94a3b8" strokeWidth="0.5" />

            {/* Professional door lines and body details */}
            <line x1="170" y1="75" x2="170" y2="125" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            <line x1="230" y1="75" x2="230" y2="125" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />

            {/* Body highlight lines */}
            <path
              d="M 60 115 C 100 113, 150 113, 200 113 C 250 113, 300 113, 340 115"
              stroke="rgba(248, 250, 252, 0.4)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 60 108 C 100 106, 150 106, 200 106 C 250 106, 300 106, 340 108"
              stroke="rgba(248, 250, 252, 0.2)"
              strokeWidth="1"
              fill="none"
            />

            {/* Professional front wheel */}
            <g transform="translate(100, 130)">
              {/* Tire */}
              <circle cx="0" cy="0" r="28" fill="url(#tirePro)" stroke="#111827" strokeWidth="2" />
              {/* Rim */}
              <circle cx="0" cy="0" r="22" fill="url(#wheelPro)" stroke="#64748b" strokeWidth="1" />
              {/* Rim details */}
              <circle cx="0" cy="0" r="18" fill="#e2e8f0" />
              <circle cx="0" cy="0" r="12" fill="#f1f5f9" />
              <circle cx="0" cy="0" r="6" fill="url(#chromePro)" />

              {/* Professional spoke pattern */}
              <g stroke="#94a3b8" strokeWidth="1.5" fill="none">
                <line x1="-15" y1="0" x2="15" y2="0" />
                <line x1="0" y1="-15" x2="0" y2="15" />
                <line x1="-11" y1="-11" x2="11" y2="11" />
                <line x1="-11" y1="11" x2="11" y2="-11" />
              </g>

              {/* Center cap */}
              <circle cx="0" cy="0" r="4" fill="url(#chromePro)" stroke="#64748b" strokeWidth="0.5" />

              {/* Brake disc visible through spokes */}
              <circle cx="0" cy="0" r="16" fill="#6b7280" opacity="0.3" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#4b5563" strokeWidth="0.5" opacity="0.5" />
            </g>

            {/* Professional rear wheel */}
            <g transform="translate(300, 130)">
              {/* Tire */}
              <circle cx="0" cy="0" r="28" fill="url(#tirePro)" stroke="#111827" strokeWidth="2" />
              {/* Rim */}
              <circle cx="0" cy="0" r="22" fill="url(#wheelPro)" stroke="#64748b" strokeWidth="1" />
              {/* Rim details */}
              <circle cx="0" cy="0" r="18" fill="#e2e8f0" />
              <circle cx="0" cy="0" r="12" fill="#f1f5f9" />
              <circle cx="0" cy="0" r="6" fill="url(#chromePro)" />

              {/* Professional spoke pattern */}
              <g stroke="#94a3b8" strokeWidth="1.5" fill="none">
                <line x1="-15" y1="0" x2="15" y2="0" />
                <line x1="0" y1="-15" x2="0" y2="15" />
                <line x1="-11" y1="-11" x2="11" y2="11" />
                <line x1="-11" y1="11" x2="11" y2="-11" />
              </g>

              {/* Center cap */}
              <circle cx="0" cy="0" r="4" fill="url(#chromePro)" stroke="#64748b" strokeWidth="0.5" />

              {/* Brake disc visible through spokes */}
              <circle cx="0" cy="0" r="16" fill="#6b7280" opacity="0.3" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#4b5563" strokeWidth="0.5" opacity="0.5" />
            </g>

            {/* Professional antenna */}
            <line x1="280" y1="70" x2="280" y2="55" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="280" cy="55" r="1.5" fill="#94a3b8" />

            {/* Professional license plate area */}
            <rect x="170" y="135" width="60" height="12" rx="2" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <text x="200" y="143" textAnchor="middle" className="text-xs fill-gray-600 font-mono">
              FLOOD-TEST
            </text>

            {/* Click indicator - professional engine icon */}
            <g transform="translate(200, 90)" opacity="0.8">
              <circle
                cx="0"
                cy="0"
                r="12"
                fill="rgba(59, 130, 246, 0.9)"
                stroke="#1d4ed8"
                strokeWidth="1"
                className={isEngineRunning ? "animate-pulse" : ""}
              />
              <text x="0" y="4" textAnchor="middle" className="text-sm fill-white font-bold">
                🔊
              </text>
            </g>
          </svg>

          {/* Professional click instruction tooltip */}
          <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Click to test engine sound 🚗💨
          </div>
        </div>
      </div>

      {/* Water levels */}
      <div className="absolute bottom-0 w-full">
        {/* Level 1: 0-6 inches */}
        <div
          className="absolute bottom-2 w-full bg-gradient-to-t from-blue-500 to-blue-400 opacity-80"
          style={{
            height: "35px",
            clipPath: `polygon(0% 100%, 100% 100%, 100% ${85 + Math.sin(waveOffset * 0.1) * 5}%, 0% ${90 + Math.sin(waveOffset * 0.15) * 5}%)`,
          }}
        />

        {/* Level 2: 6-24 inches */}
        <div
          className="absolute bottom-2 w-full bg-gradient-to-t from-orange-500 to-orange-400 opacity-60"
          style={{
            height: "70px",
            clipPath: `polygon(0% 100%, 100% 100%, 100% ${70 + Math.sin(waveOffset * 0.12) * 4}%, 0% ${75 + Math.sin(waveOffset * 0.18) * 4}%)`,
          }}
        />

        {/* Level 3: 36+ inches */}
        <div
          className="absolute bottom-2 w-full bg-gradient-to-t from-red-500 to-red-400 opacity-40"
          style={{
            height: "110px",
            clipPath: `polygon(0% 100%, 100% 100%, 100% ${50 + Math.sin(waveOffset * 0.08) * 3}%, 0% ${55 + Math.sin(waveOffset * 0.14) * 3}%)`,
          }}
        />
      </div>

      {/* Responsive legend */}
      <div className="absolute top-1 sm:top-2 lg:top-4 right-1 sm:right-2 lg:right-4 space-y-0.5 sm:space-y-1 bg-black bg-opacity-50 p-1.5 sm:p-2 lg:p-3 rounded-lg max-w-xs">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full shrink-0"></div>
          <span className="text-xs text-white font-medium">Level 3: 36+ inches</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full shrink-0"></div>
          <span className="text-xs text-white font-medium">Level 2: 6-24 inches</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full shrink-0"></div>
          <span className="text-xs text-white font-medium">Level 1: 0-6 inches</span>
        </div>
      </div>

      {/* Responsive water depth ruler */}
      <div className="absolute left-1 sm:left-2 bottom-2 flex flex-col items-center">
        <div className="bg-white bg-opacity-90 p-1 sm:p-1.5 lg:p-2 rounded text-xs font-mono">
          <div className="text-center mb-0.5 sm:mb-1 font-semibold text-xs">Depth</div>
          <div className="space-y-0.5">
            <div className="flex justify-between w-10 sm:w-12 md:w-16 lg:w-20 items-center">
              <span className="font-medium text-xs">48"</span>
              <div className="w-2 sm:w-3 h-0.5 bg-red-500"></div>
            </div>
            <div className="flex justify-between w-10 sm:w-12 md:w-16 lg:w-20 items-center">
              <span className="font-medium text-xs">36"</span>
              <div className="w-2 sm:w-3 h-0.5 bg-red-400"></div>
            </div>
            <div className="flex justify-between w-10 sm:w-12 md:w-16 lg:w-20 items-center">
              <span className="font-medium text-xs">24"</span>
              <div className="w-2 sm:w-3 h-0.5 bg-orange-500"></div>
            </div>
            <div className="flex justify-between w-10 sm:w-12 md:w-16 lg:w-20 items-center">
              <span className="font-medium text-xs">12"</span>
              <div className="w-2 sm:w-3 h-0.5 bg-orange-400"></div>
            </div>
            <div className="flex justify-between w-10 sm:w-12 md:w-16 lg:w-20 items-center">
              <span className="font-medium text-xs">6"</span>
              <div className="w-2 sm:w-3 h-0.5 bg-blue-500"></div>
            </div>
            <div className="flex justify-between w-10 sm:w-12 md:w-16 lg:w-20 items-center">
              <span className="font-medium text-xs">0"</span>
              <div className="w-2 sm:w-3 h-0.5 bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-friendly reference lines */}
      <div className="absolute left-0 bottom-0 w-full pointer-events-none hidden sm:block">
        {/* Rocker Panel level reference line */}
        <div className="absolute bottom-9 w-full h-0.5 bg-blue-500 opacity-30"></div>
        <div className="absolute bottom-9 right-4 text-xs text-blue-600 bg-white px-1 rounded">Rocker Panel (6")</div>

        {/* Floor Level reference line */}
        <div className="absolute bottom-18 w-full h-0.5 bg-orange-500 opacity-30"></div>
        <div className="absolute bottom-18 right-4 text-xs text-orange-600 bg-white px-1 rounded">
          Floor Level (12")
        </div>

        {/* Dashboard level reference line */}
        <div className="absolute bottom-28 w-full h-0.5 bg-red-500 opacity-30"></div>
        <div className="absolute bottom-28 right-4 text-xs text-red-600 bg-white px-1 rounded">Dashboard (36")</div>
      </div>
    </div>
  )
}
