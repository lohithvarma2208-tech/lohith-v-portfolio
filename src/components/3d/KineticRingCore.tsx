import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

export const KineticRingCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 16)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Lighting (High-contrast rim lighting inspired by industrial brutalism)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
    scene.add(ambientLight)

    // Primary cool specular rim light
    const rimLight1 = new THREE.DirectionalLight(0xffffff, 3.5)
    rimLight1.position.set(12, 18, 10)
    scene.add(rimLight1)

    // Secondary accent rim light (colored by active theme)
    const themeColorHex = {
      cyan: 0x38bdf8,
      emerald: 0x34d399,
      amber: 0xfbbf24,
      violet: 0xc084fc
    }[theme]

    const rimLight2 = new THREE.DirectionalLight(themeColorHex, 2.8)
    rimLight2.position.set(-15, -10, 8)
    scene.add(rimLight2)

    // Subtle center glow point light
    const coreLight = new THREE.PointLight(themeColorHex, 2.0, 15)
    coreLight.position.set(0, -3.5, 2)
    scene.add(coreLight)

    // Build the Kinetic Systems Core Ring (Interlocking titanium slats)
    const ringGroup = new THREE.Group()
    ringGroup.position.set(0, -5.2, 0) // Arches up from bottom center
    ringGroup.rotation.x = 0.55 // Tilted forward toward camera

    const slatCount = 56
    const radius = 6.4

    // Slat geometry (sleek tapered wedge)
    const slatGeom = new THREE.BoxGeometry(0.22, 1.4, 0.65)

    // Brushed titanium material
    const slatMat = new THREE.MeshStandardMaterial({
      color: 0x12151f,
      metalness: 0.94,
      roughness: 0.22,
    })

    // Inner glowing ring edge
    const innerEdgeMat = new THREE.MeshBasicMaterial({
      color: themeColorHex,
      transparent: true,
      opacity: 0.75
    })

    const slats: THREE.Mesh[] = []

    for (let i = 0; i < slatCount; i++) {
      const angle = (i / slatCount) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      const slat = new THREE.Mesh(slatGeom, slatMat)
      slat.position.set(x, y, 0)
      slat.rotation.z = angle + Math.PI / 2
      slat.rotation.y = 0.35 // Aerodynamic twist angle

      // Add thin glowing accent line to inner edge of each slat
      const edgeLineGeom = new THREE.BoxGeometry(0.04, 1.42, 0.04)
      const edgeLine = new THREE.Mesh(edgeLineGeom, innerEdgeMat)
      edgeLine.position.set(0, 0, -0.33)
      slat.add(edgeLine)

      ringGroup.add(slat)
      slats.push(slat)
    }

    // Inner secondary orbital ring
    const innerRingGeom = new THREE.TorusGeometry(radius * 0.82, 0.04, 16, 64)
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x222633,
      metalness: 0.98,
      roughness: 0.1
    })
    const innerRing = new THREE.Mesh(innerRingGeom, innerRingMat)
    ringGroup.add(innerRing)

    scene.add(ringGroup)

    // Mouse movement reactivity
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.targetX = x * 0.35
      mouse.targetY = y * 0.25
    }
    window.addEventListener('mousemove', onMouseMove)

    // Scroll reactivity
    let scrollY = window.scrollY
    const onScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Base rotation + mouse tilt + scroll rotation
      ringGroup.rotation.z = time * 0.12 + scrollY * 0.0015
      ringGroup.rotation.x = 0.55 + mouse.y * 0.4 + scrollY * 0.0005
      ringGroup.rotation.y = mouse.x * 0.4

      // Gentle wave pulsation through slats
      for (let i = 0; i < slats.length; i++) {
        const slat = slats[i]
        const wave = Math.sin(time * 2.5 + i * 0.2) * 0.08
        slat.scale.set(1 + wave * 0.5, 1, 1 + wave)
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    />
  )
}
