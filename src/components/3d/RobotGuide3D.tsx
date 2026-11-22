import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export type RobotGestureState =
  | 'power_off'
  | 'booting'
  | 'speaking_0'
  | 'speaking_1'
  | 'speaking_2'
  | 'speaking_3'
  | 'explore_pointing'
  | 'idle'

interface RobotGuide3DProps {
  gestureState: RobotGestureState
  isSpeaking?: boolean
  className?: string
}

export const RobotGuide3D: React.FC<RobotGuide3DProps> = ({
  gestureState,
  isSpeaking = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const gestureRef = useRef<RobotGestureState>(gestureState)
  const speakingRef = useRef<boolean>(isSpeaking)

  useEffect(() => {
    gestureRef.current = gestureState
  }, [gestureState])

  useEffect(() => {
    speakingRef.current = isSpeaking
  }, [isSpeaking])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    )
    camera.position.set(0, 0.2, 5.8)

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

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
    keyLight.position.set(4, 6, 5)
    scene.add(keyLight)

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 4.0)
    cyanRim.position.set(-5, 4, -3)
    scene.add(cyanRim)

    const underGlow = new THREE.PointLight(0x38bdf8, 2.0, 8)
    underGlow.position.set(0, -2, 2)
    scene.add(underGlow)

    // Materials
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x0f1422,
      metalness: 0.85,
      roughness: 0.18
    })

    const whiteCeramicMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.4,
      roughness: 0.2
    })

    const visorGlassMat = new THREE.MeshStandardMaterial({
      color: 0x03060c,
      metalness: 0.95,
      roughness: 0.05
    })

    const cyanGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8
    })

    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x242e42,
      metalness: 0.9,
      roughness: 0.2
    })

    // Root Group
    const robotRoot = new THREE.Group()
    robotRoot.position.set(0, -0.2, 0)
    scene.add(robotRoot)

    // --- 1. HEAD & EXPRESIVE FACE ---
    const headPivot = new THREE.Group()
    headPivot.position.set(0, 0.75, 0)
    robotRoot.add(headPivot)

    // Head Shell (Aerodynamic rounded box/sphere hybrid)
    const headGeom = new THREE.SphereGeometry(0.85, 32, 24)
    headGeom.scale(1.15, 0.95, 1.0)
    const headMesh = new THREE.Mesh(headGeom, whiteCeramicMat)
    headPivot.add(headMesh)

    // Visor Glass Screen
    const visorGeom = new THREE.SphereGeometry(0.84, 24, 24, 0, Math.PI * 0.9, 0, Math.PI * 0.6)
    visorGeom.rotateY(-Math.PI * 0.45)
    visorGeom.rotateX(Math.PI * 0.2)
    const visorMesh = new THREE.Mesh(visorGeom, visorGlassMat)
    visorMesh.position.set(0, 0.05, 0.12)
    headPivot.add(visorMesh)

    // Expressive Digital Eyes Canvas Texture
    const faceCanvas = document.createElement('canvas')
    faceCanvas.width = 512
    faceCanvas.height = 256
    const faceCtx = faceCanvas.getContext('2d')

    const faceTexture = new THREE.CanvasTexture(faceCanvas)
    const faceMat = new THREE.MeshBasicMaterial({
      map: faceTexture,
      transparent: true,
      opacity: 0.95
    })

    const facePlaneGeom = new THREE.PlaneGeometry(1.2, 0.6)
    const facePlane = new THREE.Mesh(facePlaneGeom, faceMat)
    facePlane.position.set(0, 0.08, 0.88)
    headPivot.add(facePlane)

    // Antenna Ears
    const earGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.15, 24)
    earGeom.rotateZ(Math.PI / 2)
    const earL = new THREE.Mesh(earGeom, shellMat)
    earL.position.set(-1.0, 0.05, 0)
    headPivot.add(earL)

    const earR = new THREE.Mesh(earGeom, shellMat)
    earR.position.set(1.0, 0.05, 0)
    headPivot.add(earR)

    // Ear Glowing Rings
    const earRingGeom = new THREE.TorusGeometry(0.14, 0.02, 16, 24)
    earRingGeom.rotateY(Math.PI / 2)
    const earRingL = new THREE.Mesh(earRingGeom, cyanGlowMat)
    earRingL.position.set(-1.08, 0.05, 0)
    headPivot.add(earRingL)

    const earRingR = new THREE.Mesh(earRingGeom, cyanGlowMat)
    earRingR.position.set(1.08, 0.05, 0)
    headPivot.add(earRingR)

    // Top Halo Antenna Tip
    const antennaStemGeom = new THREE.CylinderGeometry(0.02, 0.03, 0.4, 12)
    const antennaStem = new THREE.Mesh(antennaStemGeom, jointMat)
    antennaStem.position.set(0, 1.05, -0.1)
    headPivot.add(antennaStem)

    const antennaTipGeom = new THREE.SphereGeometry(0.07, 16, 16)
    const antennaTip = new THREE.Mesh(antennaTipGeom, cyanGlowMat)
    antennaTip.position.set(0, 1.25, -0.1)
    headPivot.add(antennaTip)

    // --- 2. TORSO & CORE REACTOR ---
    const torsoGroup = new THREE.Group()
    torsoGroup.position.set(0, -0.4, 0)
    robotRoot.add(torsoGroup)

    const bodyGeom = new THREE.CylinderGeometry(0.55, 0.42, 0.9, 24)
    const bodyMesh = new THREE.Mesh(bodyGeom, shellMat)
    torsoGroup.add(bodyMesh)

    // White Chest Armor Plate
    const chestGeom = new THREE.CylinderGeometry(0.57, 0.46, 0.65, 24, 1, false, 0, Math.PI)
    chestGeom.rotateY(-Math.PI / 2)
    const chestMesh = new THREE.Mesh(chestGeom, whiteCeramicMat)
    chestMesh.position.set(0, 0.08, 0.02)
    torsoGroup.add(chestMesh)

    // Chest Arc Reactor Core
    const coreGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 24)
    coreGeom.rotateX(Math.PI / 2)
    const coreMesh = new THREE.Mesh(coreGeom, cyanGlowMat)
    coreMesh.position.set(0, 0.12, 0.52)
    torsoGroup.add(coreMesh)

    // Floating Ring around waist
    const waistRingGeom = new THREE.TorusGeometry(0.65, 0.035, 16, 32)
    waistRingGeom.rotateX(Math.PI / 2)
    const waistRing = new THREE.Mesh(waistRingGeom, cyanGlowMat)
    waistRing.position.set(0, -0.38, 0)
    torsoGroup.add(waistRing)

    // --- 3. ARTICULATED ARMS ---
    // Left Arm (Viewer's left)
    const leftArmGroup = new THREE.Group()
    leftArmGroup.position.set(-0.85, 0, 0)
    torsoGroup.add(leftArmGroup)

    const shoulderL = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), jointMat)
    leftArmGroup.add(shoulderL)

    const armUpperL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.5, 12), whiteCeramicMat)
    armUpperL.position.set(-0.1, -0.3, 0)
    leftArmGroup.add(armUpperL)

    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), shellMat)
    handL.position.set(-0.15, -0.6, 0.1)
    leftArmGroup.add(handL)

    // Right Arm (Viewer's right - Gestures & Points)
    const rightArmGroup = new THREE.Group()
    rightArmGroup.position.set(0.85, 0, 0)
    torsoGroup.add(rightArmGroup)

    const shoulderR = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), jointMat)
    rightArmGroup.add(shoulderR)

    const armUpperR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.5, 12), whiteCeramicMat)
    armUpperR.position.set(0.1, -0.3, 0)
    rightArmGroup.add(armUpperR)

    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), shellMat)
    handR.position.set(0.15, -0.6, 0.1)
    rightArmGroup.add(handR)

    // --- MOUSE TRACKING ---
    const mouse = { targetX: 0, targetY: 0, curX: 0, curY: 0 }
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouseMove)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // --- ANIMATION RENDER LOOP ---
    let animId: number
    const clock = new THREE.Clock()
    let eyeBlinkTimer = 0

    const render = () => {
      animId = requestAnimationFrame(render)
      const t = clock.getElapsedTime()
      eyeBlinkTimer += 0.016

      // Interpolate mouse coordinates
      mouse.curX += (mouse.targetX - mouse.curX) * 0.08
      mouse.curY += (mouse.targetY - mouse.curY) * 0.08

      const curGesture = gestureRef.current
      const isSpk = speakingRef.current

      // --- DYNAMIC FACE DRAWING ---
      if (faceCtx) {
        faceCtx.clearRect(0, 0, 512, 256)

        const isBlinking = eyeBlinkTimer % 4.5 < 0.18
        const eyeColor = curGesture === 'power_off' ? '#000000' : '#38bdf8'

        if (curGesture !== 'power_off') {
          // Eye glow shadow
          faceCtx.shadowColor = '#38bdf8'
          faceCtx.shadowBlur = 24

          // Eyes geometry depending on gesture
          if (isBlinking) {
            // Closed eyes slit
            faceCtx.fillStyle = eyeColor
            faceCtx.fillRect(140, 115, 60, 6)
            faceCtx.fillRect(312, 115, 60, 6)
          } else if (curGesture === 'speaking_1') {
            // Curious squint on left eye, wide on right
            faceCtx.fillStyle = eyeColor
            // Left eye tilted
            faceCtx.save()
            faceCtx.translate(170, 115)
            faceCtx.rotate(-0.15)
            faceCtx.beginPath()
            faceCtx.ellipse(0, 0, 32, 40, 0, 0, Math.PI * 2)
            faceCtx.fill()
            faceCtx.restore()

            // Right eye wide
            faceCtx.beginPath()
            faceCtx.ellipse(342, 115, 34, 44, 0, 0, Math.PI * 2)
            faceCtx.fill()
          } else if (curGesture === 'speaking_3' || curGesture === 'explore_pointing') {
            // Playful wink!
            faceCtx.fillStyle = eyeColor
            // Left eye wide & happy
            faceCtx.beginPath()
            faceCtx.arc(170, 115, 35, 0, Math.PI * 2)
            faceCtx.fill()

            // Right eye winking curve
            faceCtx.lineWidth = 10
            faceCtx.strokeStyle = eyeColor
            faceCtx.beginPath()
            faceCtx.arc(342, 125, 28, Math.PI * 1.1, Math.PI * 1.9)
            faceCtx.stroke()
          } else {
            // Standard expressive oval eyes
            faceCtx.fillStyle = eyeColor
            const eyeHeight = 42 + Math.sin(t * 3) * 3
            faceCtx.beginPath()
            faceCtx.ellipse(170, 115, 32, eyeHeight, 0, 0, Math.PI * 2)
            faceCtx.fill()

            faceCtx.beginPath()
            faceCtx.ellipse(342, 115, 32, eyeHeight, 0, 0, Math.PI * 2)
            faceCtx.fill()
          }

          // Animated speaking waveform mouth
          if (isSpk) {
            faceCtx.lineWidth = 6
            faceCtx.strokeStyle = '#38bdf8'
            faceCtx.beginPath()
            faceCtx.moveTo(210, 185)
            const freq = 4 + Math.sin(t * 12) * 8
            faceCtx.quadraticCurveTo(256, 185 - freq, 302, 185)
            faceCtx.stroke()
          }
        }
        faceTexture.needsUpdate = true
      }

      // --- SKELETAL POSES BY GESTURE STATE ---
      if (curGesture === 'power_off') {
        headPivot.rotation.x = 0.5
        headPivot.rotation.y = 0
        headPivot.position.y = 0.5
        robotRoot.position.y = -0.5
        coreMesh.visible = false
        waistRing.visible = false
      } else if (curGesture === 'booting') {
        headPivot.rotation.x = Math.max(0, 0.5 - t * 0.5)
        coreMesh.visible = true
        waistRing.visible = true
      } else if (curGesture === 'speaking_0') {
        // "System online" - snaps upright, looking forward
        headPivot.rotation.x = -0.05 + mouse.curY * 0.25
        headPivot.rotation.y = mouse.curX * 0.35
        headPivot.rotation.z = 0

        rightArmGroup.rotation.z = -0.3 + Math.sin(t * 3) * 0.08
        leftArmGroup.rotation.z = 0.3 - Math.sin(t * 3) * 0.08
      } else if (curGesture === 'speaking_1') {
        // "Interesting. A new mind..." - curious head tilt, hand to chin
        headPivot.rotation.z = 0.22 // Curious sideways tilt
        headPivot.rotation.y = 0.15 + mouse.curX * 0.25
        headPivot.rotation.x = -0.1 + mouse.curY * 0.2

        // Right hand moves toward chin thoughtfully
        rightArmGroup.rotation.x = 0.9 + Math.sin(t * 2) * 0.05
        rightArmGroup.rotation.y = -0.4
        rightArmGroup.rotation.z = -0.6

        leftArmGroup.rotation.z = 0.2
        leftArmGroup.rotation.x = 0.1
      } else if (curGesture === 'speaking_2') {
        // "This is not just a portfolio..." - both hands open wide expressively
        headPivot.rotation.z = 0
        headPivot.rotation.x = -0.12 + Math.sin(t * 1.5) * 0.05
        headPivot.rotation.y = mouse.curX * 0.35

        // Both arms open forward
        leftArmGroup.rotation.x = 0.6 + Math.sin(t * 2.5) * 0.06
        leftArmGroup.rotation.z = 0.5
        rightArmGroup.rotation.x = 0.6 + Math.sin(t * 2.5) * 0.06
        rightArmGroup.rotation.z = -0.5
      } else if (curGesture === 'speaking_3' || curGesture === 'explore_pointing') {
        // "I'm his little guide. Shall we explore?" - Waving, pointing right toward screen!
        headPivot.rotation.z = -0.15
        headPivot.rotation.y = 0.45 // Looks toward the monitor/right
        headPivot.rotation.x = 0

        // Right arm extends and points toward the screen
        rightArmGroup.rotation.x = 1.1 + Math.sin(t * 4) * 0.08
        rightArmGroup.rotation.y = 0.8
        rightArmGroup.rotation.z = -0.8

        // Left arm waves casually
        leftArmGroup.rotation.x = 0.2
        leftArmGroup.rotation.z = 0.3 + Math.sin(t * 3) * 0.1
      } else {
        // Idle levitation
        headPivot.rotation.y = mouse.curX * 0.4
        headPivot.rotation.x = -mouse.curY * 0.28
        headPivot.rotation.z = -mouse.curX * 0.1

        rightArmGroup.rotation.x = 0.1 + Math.sin(t * 1.8) * 0.05
        rightArmGroup.rotation.z = -0.2
        leftArmGroup.rotation.x = 0.1 - Math.sin(t * 1.8) * 0.05
        leftArmGroup.rotation.z = 0.2
      }

      // Idle floating levitation bobbing
      robotRoot.position.y = -0.2 + Math.sin(t * 2.2) * 0.08
      robotRoot.rotation.y = Math.sin(t * 0.8) * 0.05

      // Chest core pulse
      const corePulse = 1.8 + Math.sin(t * 4) * 0.6
      underGlow.intensity = corePulse

      renderer.render(scene, camera)
    }

    render()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative cursor-pointer ${className}`}
    />
  )
}
