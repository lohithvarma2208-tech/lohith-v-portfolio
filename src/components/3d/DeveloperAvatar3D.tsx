import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

export type RobotGestureState =
  | 'power_off'
  | 'booting'
  | 'speaking_0'
  | 'speaking_1'
  | 'speaking_2'
  | 'speaking_3'
  | 'explore'
  | 'idle'

export interface DeveloperAvatar3DProps {
  isIntroMode?: boolean
  gesture?: RobotGestureState
  isSpeaking?: boolean
  className?: string
}

export const DeveloperAvatar3D: React.FC<DeveloperAvatar3DProps> = ({
  isIntroMode = false,
  gesture = 'idle',
  isSpeaking = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { theme } = useTheme()

  const gestureRef = useRef<RobotGestureState>(gesture)
  const speakingRef = useRef<boolean>(isSpeaking)

  useEffect(() => {
    gestureRef.current = gesture
  }, [gesture])

  useEffect(() => {
    speakingRef.current = isSpeaking
  }, [isSpeaking])

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
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45)
    scene.add(ambientLight)

    const themeColorHex = {
      cyan: 0x38bdf8,
      emerald: 0x34d399,
      amber: 0xfbbf24,
      violet: 0xc084fc
    }[theme]

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(5, 8, 6)
    scene.add(keyLight)

    const backRim = new THREE.DirectionalLight(themeColorHex, 4.2)
    backRim.position.set(-6, 4, -4)
    scene.add(backRim)

    const underGlow = new THREE.PointLight(themeColorHex, 2.5, 10)
    underGlow.position.set(0, -3, 2)
    scene.add(underGlow)

    // Root Group
    const rootGroup = new THREE.Group()
    rootGroup.position.set(0, -0.6, 0)
    scene.add(rootGroup)

    // Head Pivot Group (for cursor tracking & gestures)
    const headPivot = new THREE.Group()
    headPivot.position.set(0, 0.8, 0)
    rootGroup.add(headPivot)

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0x181c2b,
      metalness: 0.6,
      roughness: 0.4
    })

    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c12,
      metalness: 0.85,
      roughness: 0.3
    })

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x05070f,
      emissive: themeColorHex,
      emissiveIntensity: 0.8,
      metalness: 0.95,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9
    })

    const metallicMat = new THREE.MeshStandardMaterial({
      color: 0x2d3748,
      metalness: 0.95,
      roughness: 0.15
    })

    const neonGlowMat = new THREE.MeshBasicMaterial({
      color: themeColorHex
    })

    // 1. Head Geometry
    const headGeom = new THREE.BoxGeometry(1.5, 1.8, 1.6)
    const headMesh = new THREE.Mesh(headGeom, skinMat)
    headMesh.position.y = 0.4
    headPivot.add(headMesh)

    // 2. Cyber Visor / Glasses (The Signature Cyber Look)
    const visorGeom = new THREE.BoxGeometry(1.6, 0.38, 0.4)
    const visorMesh = new THREE.Mesh(visorGeom, visorMat)
    visorMesh.position.set(0, 0.55, 0.82)
    headPivot.add(visorMesh)

    // Visor glowing frame accent
    const visorFrameGeom = new THREE.BoxGeometry(1.64, 0.04, 0.42)
    const visorFrame = new THREE.Mesh(visorFrameGeom, neonGlowMat)
    visorFrame.position.set(0, 0.74, 0.82)
    headPivot.add(visorFrame)

    // 3. Futuristic Studio Headphones
    const earCupGeom = new THREE.CylinderGeometry(0.45, 0.45, 0.3, 24)
    earCupGeom.rotateZ(Math.PI / 2)

    const earL = new THREE.Mesh(earCupGeom, metallicMat)
    earL.position.set(-0.85, 0.45, 0)
    headPivot.add(earL)

    const earR = new THREE.Mesh(earCupGeom, metallicMat)
    earR.position.set(0.85, 0.45, 0)
    headPivot.add(earR)

    // Glowing ear cup ring
    const ringGeom = new THREE.TorusGeometry(0.32, 0.03, 16, 32)
    ringGeom.rotateY(Math.PI / 2)
    const ringL = new THREE.Mesh(ringGeom, neonGlowMat)
    ringL.position.set(-0.96, 0.45, 0)
    headPivot.add(ringL)

    const ringR = new THREE.Mesh(ringGeom, neonGlowMat)
    ringR.position.set(0.96, 0.45, 0)
    headPivot.add(ringR)

    // Headband
    const bandGeom = new THREE.TorusGeometry(0.9, 0.06, 12, 32, Math.PI)
    bandGeom.rotateZ(Math.PI)
    const headband = new THREE.Mesh(bandGeom, metallicMat)
    headband.position.set(0, 1.25, 0)
    headPivot.add(headband)

    // 4. Neck & Collar
    const neckGeom = new THREE.CylinderGeometry(0.48, 0.55, 0.7, 16)
    const neck = new THREE.Mesh(neckGeom, skinMat)
    neck.position.set(0, 0, 0)
    rootGroup.add(neck)

    // 5. Hoodie Torso & Shoulders
    const torsoGeom = new THREE.CylinderGeometry(1.1, 1.45, 2.0, 16)
    const torso = new THREE.Mesh(torsoGeom, hoodieMat)
    torso.position.set(0, -1.2, 0)
    rootGroup.add(torso)

    // Shoulder curve pads
    const shoulderLGeom = new THREE.SphereGeometry(0.75, 16, 16)
    const shoulderL = new THREE.Mesh(shoulderLGeom, hoodieMat)
    shoulderL.position.set(-1.45, -0.75, 0)
    rootGroup.add(shoulderL)

    const shoulderR = new THREE.Mesh(shoulderLGeom, hoodieMat)
    shoulderR.position.set(1.45, -0.75, 0)
    rootGroup.add(shoulderR)

    // Hoodie collar ring
    const collarGeom = new THREE.TorusGeometry(0.72, 0.16, 16, 32)
    collarGeom.rotateX(Math.PI / 2)
    const collar = new THREE.Mesh(collarGeom, metallicMat)
    collar.position.set(0, -0.25, 0)
    rootGroup.add(collar)

    // Mouse Tracking Mechanics
    const mouse = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.targetX = x
      mouse.targetY = y
    }

    window.addEventListener('mousemove', onMouseMove)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation Render Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Smooth lerp toward mouse coordinates
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.08
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.08

      const curGesture = gestureRef.current
      const isSpk = speakingRef.current

      // Visor speaking pulse
      if (isSpk) {
        const pulse = 0.8 + Math.sin(time * 16) * 0.4
        visorMat.emissiveIntensity = pulse
        visorFrame.scale.set(1 + Math.sin(time * 16) * 0.04, 1, 1)
      } else if (curGesture === 'power_off') {
        visorMat.emissiveIntensity = 0.05
        visorFrame.visible = false
        ringL.visible = false
        ringR.visible = false
      } else {
        visorMat.emissiveIntensity = 0.85
        visorFrame.visible = true
        ringL.visible = true
        ringR.visible = true
      }

      // Pose & Gestures
      if (isIntroMode) {
        if (curGesture === 'power_off') {
          headPivot.rotation.x = 0.35
          headPivot.rotation.y = 0
          headPivot.rotation.z = 0
          rootGroup.position.y = -0.7
        } else if (curGesture === 'booting') {
          headPivot.rotation.x = Math.max(0, 0.35 - time * 0.3)
          headPivot.rotation.y = 0
          headPivot.rotation.z = 0
        } else if (curGesture === 'speaking_0') {
          // "System online."
          headPivot.rotation.x = -mouse.currentY * 0.25
          headPivot.rotation.y = mouse.currentX * 0.35
          headPivot.rotation.z = 0
        } else if (curGesture === 'speaking_1') {
          // "Interesting. A new mind has entered the system." (Curious head tilt)
          headPivot.rotation.z = 0.18
          headPivot.rotation.x = -mouse.currentY * 0.25 - 0.08
          headPivot.rotation.y = mouse.currentX * 0.35 + 0.1
        } else if (curGesture === 'speaking_2') {
          // "This is not just a portfolio..." (Thoughtful nod)
          headPivot.rotation.z = 0
          headPivot.rotation.x = -0.15 + Math.sin(time * 2) * 0.06
          headPivot.rotation.y = mouse.currentX * 0.35
        } else if (curGesture === 'speaking_3' || curGesture === 'explore') {
          // "I'm his little guide. Shall we explore?" (Turns toward right/monitor)
          headPivot.rotation.z = -0.12
          headPivot.rotation.y = 0.38 + mouse.currentX * 0.2
          headPivot.rotation.x = -0.05
        } else {
          headPivot.rotation.y = mouse.currentX * 0.45
          headPivot.rotation.x = -mouse.currentY * 0.3
          headPivot.rotation.z = -mouse.currentX * 0.12
        }
      } else {
        // Standard Hero Mode (tracking cursor)
        headPivot.rotation.y = mouse.currentX * 0.45
        headPivot.rotation.x = -mouse.currentY * 0.3
        headPivot.rotation.z = -mouse.currentX * 0.12
      }

      // Torso breathing float
      rootGroup.position.y = -0.6 + Math.sin(time * 1.8) * 0.05
      rootGroup.rotation.y = Math.sin(time * 0.8) * 0.04

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [theme, isIntroMode])

  return (
    <div
      ref={containerRef}
      className={`w-full ${className || 'h-[360px] sm:h-[420px] md:h-[460px]'} relative z-10`}
    />
  )
}
