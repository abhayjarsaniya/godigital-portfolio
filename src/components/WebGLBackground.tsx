import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null);
  const count = 500;
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [positions, velocities];
  }, []);
  
  useFrame((state) => {
    if (!ref.current) return;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    const mouseX = mouse.current?.x || 0;
    const mouseY = mouse.current?.y || 0;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Drift movement
      positions[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.002;
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i) * 0.002;
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Mouse influence
      positions[i3] += mouseX * 0.001;
      positions[i3 + 1] += mouseY * 0.001;
      
      // Bounds
      if (Math.abs(positions[i3]) > 10) positions[i3] *= -0.9;
      if (Math.abs(positions[i3 + 1]) > 10) positions[i3 + 1] *= -0.9;
      if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] *= -0.9;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.02;
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#d4a855"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingOrbs({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const orbRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const orbs = useMemo(() => [
    { position: [-3, 2, -2] as [number, number, number], scale: 0.8, speed: 0.5 },
    { position: [4, -1, -3] as [number, number, number], scale: 1.2, speed: 0.3 },
    { position: [-2, -2, -1] as [number, number, number], scale: 0.5, speed: 0.7 },
    { position: [2, 3, -4] as [number, number, number], scale: 0.6, speed: 0.4 },
  ], []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mouseX = mouse.current?.x || 0;
    const mouseY = mouse.current?.y || 0;
    
    orbRefs.current.forEach((orb, i) => {
      if (!orb) return;
      const data = orbs[i];
      
      orb.position.y = data.position[1] + Math.sin(time * data.speed) * 0.5;
      orb.position.x = data.position[0] + Math.cos(time * data.speed * 0.7) * 0.3;
      orb.position.x += mouseX * 0.1;
      orb.position.y += mouseY * 0.1;
    });
  });
  
  return (
    <>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => { orbRefs.current[i] = el; }}
          position={orb.position}
          scale={orb.scale}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#d4a855"
            transparent
            opacity={0.08}
            roughness={0.8}
          />
        </mesh>
      ))}
    </>
  );
}

function GradientFog() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });
  
  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial transparent opacity={0.3}>
        <primitive attach="map" object={createGradientTexture()} />
      </meshBasicMaterial>
    </mesh>
  );
}

function createGradientTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, 'rgba(212, 168, 85, 0.2)');
  gradient.addColorStop(0.5, 'rgba(212, 168, 85, 0.05)');
  gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const mouseX = mouse.current?.x || 0;
    const mouseY = mouse.current?.y || 0;
    
    camera.position.x = mouseX * 0.3;
    camera.position.y = mouseY * 0.3;
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#d4a855" />
      <Particles mouse={mouse} />
      <FloatingOrbs mouse={mouse} />
      <GradientFog />
    </>
  );
}

export default function WebGLBackground() {
  const mouse = useRef({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    };
  };
  
  return (
    <div 
      className="fixed inset-0 z-0"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
