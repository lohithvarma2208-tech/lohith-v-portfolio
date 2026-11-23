import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { sound } from '../../utils/sound'
import { Sparkles, Hand } from 'lucide-react'

interface SkillSphere {
  mesh: THREE.Mesh
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  rotSpeedX: number
  rotSpeedY: number
}

export const TechBallsPhysics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeGrab, setActiveGrab] = useState<string | null>(null)

  const skillsList = [
    { name: 'JAVA', color: '#ea580c', bg: '#2e1005' },
    { name: 'REACT', color: '#61dafb', bg: '#07212b' },
    { name: 'TS', color: '#3178c6', bg: '#081d33' },
    { name: 'THREE.JS', color: '#ffffff', bg: '#1a1a1a' },
    { name: 'PYTHON', color: '#3776ab', bg: '#0b1f30' },
    { name: 'SUPABASE', color: '#3ecf8e', bg: '#062618' },
    { name: 'POSTGRES', color: '#336791', bg: '#071f33' },
    { name: 'TAILWIND', color: '#38bdf8', bg: '#06212e' },
    { name: 'DOCKER', color: '#2496ed', bg: '#042238' },
    { name: 'C++', color: '#00599c', bg: '#03192e' },
    { name: 'GIT', color: '#f05032', bg: '#2b0b06' },
    { name: 'LINUX', color: '#eab308', bg: '#261c02' }
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 14)

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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5)
    dirLight1.position.set(10, 15, 10)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0)
    dirLight2.position.set(-10, -10, 5)
    scene.add(dirLight2)

    // Sphere Physics Array
    const spheres: SkillSphere[] = []
    const sphereRadius = 0.95
    const geom = new THREE.SphereGeometry(sphereRadius, 32, 32)

    // Create high-res canvas textures for each skill ball
    skillsList.forEach((skill, i) => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = skill.bg
        ctx.fillRect(0, 0, 256, 256)

        // Outer glowing ring
        ctx.strokeStyle = skill.color
        ctx.lineWidth = 14
        ctx.beginPath()
        ctx.arc(128, 128, 110, 0, Math.PI * 2)
        ctx.stroke()

        // Center badge label
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 44px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(skill.name, 128, 128)
      }

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.85,
        roughness: 0.18
      })

      const mesh = new THREE.Mesh(geom, material)

      // Initial distributed positions
      const angle = (i / skillsList.length) * Math.PI * 2
      const dist = 3.2 + Math.random() * 1.5
      mesh.position.set(
        Math.cos(angle) * dist,
        Math.sin(angle) * dist * 0.7,
        (Math.random() - 0.5) * 2.0
      )

      scene.add(mesh)

      spheres.push({
        mesh,
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        vz: (Math.random() - 0.5) * 0.02,
        radius: sphereRadius,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02
      })
    })

    // Raycasting & Drag Interaction
    const raycaster = new THREE.Raycaster()
    const mousePos = new THREE.Vector2()
    let draggedSphere: SkillSphere | null = null
    let prevMouseWorld = new THREE.Vector3()

    const getMouseWorldPos = (e: MouseEvent): THREE.Vector3 => {
      const rect = container.getBoundingClientRect()
      mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mousePos.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      raycaster.setFromCamera(mousePos, camera)
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const target = new THREE.Vector3()
      raycaster.ray.intersectPlane(plane, target)
      return target
    }

    const onMouseDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mousePos.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      raycaster.setFromCamera(mousePos, camera)
      const intersects = raycaster.intersectObjects(spheres.map((s) => s.mesh))

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh
        draggedSphere = spheres.find((s) => s.mesh === hitMesh) || null
        if (draggedSphere) {
          prevMouseWorld = getMouseWorldPos(e)
          sound.playClick()
          setActiveGrab(hitMesh.uuid)
        }
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (draggedSphere) {
        const currentWorld = getMouseWorldPos(e)
        const dx = currentWorld.x - prevMouseWorld.x
        const dy = currentWorld.y - prevMouseWorld.y

        draggedSphere.vx = dx * 0.7
        draggedSphere.vy = dy * 0.7
        draggedSphere.x = currentWorld.x
        draggedSphere.y = currentWorld.y

        prevMouseWorld = currentWorld
      }
    }

    const onMouseUp = () => {
      if (draggedSphere) {
        sound.playHover()
        draggedSphere = null
        setActiveGrab(null)
      }
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Physics Boundary limits
    const boundX = 6.2
    const boundY = 3.6
    const boundZ = 2.0

    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)

      for (let i = 0; i < spheres.length; i++) {
        const s = spheres[i]

        if (s !== draggedSphere) {
          // Apply velocity
          s.x += s.vx
          s.y += s.vy
          s.z += s.vz

          // Damping friction
          s.vx *= 0.985
          s.vy *= 0.985
          s.vz *= 0.985

          // Gentle ambient float when near rest
          if (Math.abs(s.vx) < 0.005) s.vx += (Math.random() - 0.5) * 0.003
          if (Math.abs(s.vy) < 0.005) s.vy += (Math.random() - 0.5) * 0.003

          // Boundary Bounces
          if (s.x > boundX - s.radius) {
            s.x = boundX - s.radius
            s.vx *= -0.8
            sound.playCollision()
          } else if (s.x < -boundX + s.radius) {
            s.x = -boundX + s.radius
            s.vx *= -0.8
            sound.playCollision()
          }

          if (s.y > boundY - s.radius) {
            s.y = boundY - s.radius
            s.vy *= -0.8
          } else if (s.y < -boundY + s.radius) {
            s.y = -boundY + s.radius
            s.vy *= -0.8
          }

          if (s.z > boundZ) {
            s.z = boundZ
            s.vz *= -0.8
          } else if (s.z < -boundZ) {
            s.z = -boundZ
            s.vz *= -0.8
          }

          // Sphere-to-sphere collisions
          for (let j = i + 1; j < spheres.length; j++) {
            const s2 = spheres[j]
            const dx = s2.x - s.x
            const dy = s2.y - s.y
            const dz = s2.z - s.z
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
            const minDist = s.radius + s2.radius

            if (dist < minDist && dist > 0) {
              const nx = dx / dist
              const ny = dy / dist
              const nz = dz / dist

              // Separate spheres
              const overlap = (minDist - dist) * 0.5
              s.x -= nx * overlap
              s.y -= ny * overlap
              s.z -= nz * overlap
              s2.x += nx * overlap
              s2.y += ny * overlap
              s2.z += nz * overlap

              // Impulse exchange
              const kx = s.vx - s2.vx
              const ky = s.vy - s2.vy
              const kz = s.vz - s2.vz
              const p = 2 * (nx * kx + ny * ky + nz * kz) * 0.5

              s.vx -= p * nx * 0.85
              s.vy -= p * ny * 0.85
              s.vz -= p * nz * 0.85
              s2.vx += p * nx * 0.85
              s2.vy += p * ny * 0.85
              s2.vz += p * nz * 0.85
            }
          }
        }

        // Rotation spin
        s.mesh.rotation.x += s.rotSpeedX + s.vy * 0.2
        s.mesh.rotation.y += s.rotSpeedY + s.vx * 0.2

        // Sync mesh position
        s.mesh.position.set(s.x, s.y, s.z)
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative w-full rounded-2xl bg-[#090b14]/80 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl p-4 sm:p-6">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-heading">
              Interactive 3D Skill Spheres (Physics Engine)
            </h4>
            <p className="text-[11px] text-neutral-400 font-mono">
              Click and drag any sphere to throw and bounce across the zero-gravity field.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          <Hand className="w-3.5 h-3.5 animate-bounce" />
          <span>DRAGGABLE 3D PHYSICS</span>
        </div>
      </div>

      {/* Three.js Interactive Canvas Viewport */}
      <div
        ref={containerRef}
        className={`w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing relative z-10 ${
          activeGrab ? 'cursor-grabbing' : ''
        }`}
      />

      {/* Bottom Technology Pills Ticker */}
      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400 relative z-20">
        <div className="flex flex-wrap gap-1.5">
          {skillsList.map((skill) => (
            <span
              key={skill.name}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[11px] text-neutral-300"
            >
              {skill.name}
            </span>
          ))}
        </div>
        <span className="text-[10px] text-neutral-400">
          PHYSICS: THREE.JS + VERLET INTEGRATION
        </span>
      </div>
    </div>
  )
}
