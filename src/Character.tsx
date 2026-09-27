import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

export type AnimationName = 'idle' | 'wave' | 'walk'

interface CharacterProps {
  skinColor: string
  outfitColor: string
  animation: AnimationName
}

export function Character({ skinColor, outfitColor, animation }: CharacterProps) {
  const root = useRef<Group>(null)
  const head = useRef<Group>(null)
  const leftArm = useRef<Group>(null)
  const rightArm = useRef<Group>(null)
  const leftLeg = useRef<Group>(null)
  const rightLeg = useRef<Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (root.current) {
      root.current.position.y = animation === 'walk' ? Math.abs(Math.sin(t * 6)) * 0.05 : Math.sin(t * 2) * 0.03
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.8) * 0.15
    }

    if (animation === 'idle') {
      if (leftArm.current) leftArm.current.rotation.x = Math.sin(t * 1.5) * 0.08
      if (rightArm.current) rightArm.current.rotation.x = Math.sin(t * 1.5 + Math.PI) * 0.08
      if (leftLeg.current) leftLeg.current.rotation.x = 0
      if (rightLeg.current) rightLeg.current.rotation.x = 0
    } else if (animation === 'wave') {
      if (rightArm.current) {
        rightArm.current.rotation.x = -2.4
        rightArm.current.rotation.z = Math.sin(t * 8) * 0.5
      }
      if (leftArm.current) leftArm.current.rotation.x = Math.sin(t * 1.5) * 0.08
      if (leftLeg.current) leftLeg.current.rotation.x = 0
      if (rightLeg.current) rightLeg.current.rotation.x = 0
    } else if (animation === 'walk') {
      if (leftArm.current) leftArm.current.rotation.x = Math.sin(t * 6) * 0.6
      if (rightArm.current) rightArm.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.6
      if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.6
      if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t * 6) * 0.6
    }
  })

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* Head */}
      <group ref={head} position={[0, 1.65, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        {/* Eyes */}
        <mesh position={[0.1, 0.03, 0.24]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-0.1, 0.03, 0.24]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>

      {/* Torso */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.55, 8, 16]} />
        <meshStandardMaterial color={outfitColor} />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArm} position={[0.4, 1.35, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
          <meshStandardMaterial color={outfitColor} />
        </mesh>
        <mesh position={[0, -0.62, 0]} castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArm} position={[-0.4, 1.35, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
          <meshStandardMaterial color={outfitColor} />
        </mesh>
        <mesh position={[0, -0.62, 0]} castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLeg} position={[0.15, 0.72, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
          <meshStandardMaterial color="#3a3a5c" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLeg} position={[-0.15, 0.72, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
          <meshStandardMaterial color="#3a3a5c" />
        </mesh>
      </group>
    </group>
  )
}
