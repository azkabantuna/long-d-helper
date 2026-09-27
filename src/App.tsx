import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { Character, type AnimationName } from './Character'
import './App.css'

const SKIN_COLORS = ['#f2c19d', '#c68863', '#8d5524', '#ffe0bd']
const OUTFIT_COLORS = ['#4f6df5', '#e0526b', '#2fa876', '#a35fe8']

function App() {
  const [skinColor, setSkinColor] = useState(SKIN_COLORS[0])
  const [outfitColor, setOutfitColor] = useState(OUTFIT_COLORS[0])
  const [animation, setAnimation] = useState<AnimationName>('idle')

  return (
    <div className="app">
      <div className="viewport">
        <Canvas shadows camera={{ position: [0, 1.4, 3.2], fov: 45 }}>
          <color attach="background" args={['#12141c']} />
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[3, 5, 2]}
            intensity={1.4}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} />
          <Character skinColor={skinColor} outfitColor={outfitColor} animation={animation} />
          <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={4} blur={2} far={2} />
          <OrbitControls
            target={[0, 1.1, 0]}
            minDistance={1.5}
            maxDistance={6}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>

      <div className="panel">
        <h1>3D 캐릭터 커스터마이저</h1>

        <div className="control-group">
          <span className="label">애니메이션</span>
          <div className="button-row">
            {(['idle', 'wave', 'walk'] as AnimationName[]).map((name) => (
              <button
                key={name}
                className={animation === name ? 'active' : ''}
                onClick={() => setAnimation(name)}
              >
                {name === 'idle' ? '대기' : name === 'wave' ? '손흔들기' : '걷기'}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <span className="label">피부색</span>
          <div className="swatch-row">
            {SKIN_COLORS.map((color) => (
              <button
                key={color}
                className={`swatch ${skinColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSkinColor(color)}
                aria-label={`피부색 ${color}`}
              />
            ))}
          </div>
        </div>

        <div className="control-group">
          <span className="label">옷 색상</span>
          <div className="swatch-row">
            {OUTFIT_COLORS.map((color) => (
              <button
                key={color}
                className={`swatch ${outfitColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setOutfitColor(color)}
                aria-label={`옷 색상 ${color}`}
              />
            ))}
          </div>
        </div>

        <p className="hint">드래그로 회전 · 스크롤로 확대/축소</p>
      </div>
    </div>
  )
}

export default App
