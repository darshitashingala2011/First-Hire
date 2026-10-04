import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, ArrowRight, UserCheck, Layers, Award, Building2 } from 'lucide-react';

interface StageInfo {
  title: string;
  stageName: string;
  badge: string;
  description: string;
  color: string;
  icon: typeof UserCheck;
}

const STAGES: StageInfo[] = [
  {
    title: 'College Student',
    stageName: 'STUDENT',
    badge: 'Step 01 · Foundation',
    description: 'Fresh engineering coursework, campus projects, and raw technical curiosity.',
    color: '#38bdf8', // sky
    icon: UserCheck
  },
  {
    title: 'Industry-Vetted Skills',
    stageName: 'SKILLS',
    badge: 'Step 02 · Capability',
    description: 'Type-safe architectures, DSA mastery, system design, and production workflows.',
    color: '#34d399', // emerald
    icon: Layers
  },
  {
    title: 'Target Engineering Role',
    stageName: 'ROLE',
    badge: 'Step 03 · Alignment',
    description: 'ATS-optimized resume, STAR interview fluency, and tailored portfolio proof.',
    color: '#818cf8', // indigo
    icon: Award
  },
  {
    title: 'Top Tech Company',
    stageName: 'COMPANY',
    badge: 'Step 04 · Dream Offer',
    description: 'Tier-1 tech internships and high-impact early career new grad offers.',
    color: '#f59e0b', // amber
    icon: Building2
  }
];

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      const scene = new THREE.Scene();

      const width = container.clientWidth || 800;
      const height = container.clientHeight || 380;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 1.2, 10);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';

      // Clear any prior canvas and append renderer
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0x6366f1, 2.5);
      dirLight1.position.set(5, 8, 5);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2);
      dirLight2.position.set(-6, -4, 4);
      scene.add(dirLight2);

      // Node Positions
      const nodeCoords = [
        new THREE.Vector3(-4.2, -0.2, 0), // Student
        new THREE.Vector3(-1.4, 0.4, 0.5), // Skills
        new THREE.Vector3(1.4, -0.3, 0.5), // Role
        new THREE.Vector3(4.2, 0.3, 0) // Company
      ];

      const nodeColors = [0x38bdf8, 0x34d399, 0x818cf8, 0xf59e0b];
      const nodeMeshes: THREE.Group[] = [];

      // Create 4 distinct thematic 3D node objects
      nodeCoords.forEach((pos, idx) => {
        const nodeGroup = new THREE.Group();
        nodeGroup.position.copy(pos);

        // Core sphere
        const sphereGeo = new THREE.SphereGeometry(idx === 3 ? 0.7 : 0.65, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: nodeColors[idx],
          roughness: 0.15,
          metalness: 0.8,
          emissive: nodeColors[idx],
          emissiveIntensity: 0.35
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        nodeGroup.add(sphere);

        // Orbital Rings
        const ringGeo = new THREE.TorusGeometry(0.95 + idx * 0.05, 0.02, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: nodeColors[idx],
          transparent: true,
          opacity: 0.55
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / (2.2 + idx * 0.3);
        ring.rotation.y = idx * 0.4;
        nodeGroup.add(ring);

        // Satellites & Prisms
        if (idx === 1) {
          for (let s = 0; s < 4; s++) {
            const angle = (s / 4) * Math.PI * 2;
            const satGeo = new THREE.IcosahedronGeometry(0.12, 0);
            const satMat = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.2 });
            const sat = new THREE.Mesh(satGeo, satMat);
            sat.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 0.4, Math.sin(angle) * 1.15);
            nodeGroup.add(sat);
          }
        } else if (idx === 3) {
          const crownGeo = new THREE.ConeGeometry(0.4, 0.7, 4);
          const crownMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.1 });
          const crown = new THREE.Mesh(crownGeo, crownMat);
          crown.position.y = 0.9;
          nodeGroup.add(crown);
        }

        scene.add(nodeGroup);
        nodeMeshes.push(nodeGroup);
      });

      // Connecting Energy Pathways (Curves)
      for (let i = 0; i < nodeCoords.length - 1; i++) {
        const p1 = nodeCoords[i];
        const p2 = nodeCoords[i + 1];
        const mid = new THREE.Vector3()
          .addVectors(p1, p2)
          .multiplyScalar(0.5)
          .add(new THREE.Vector3(0, i % 2 === 0 ? 0.6 : -0.6, 0.4));

        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const points = curve.getPoints(50);
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
          color: 0x818cf8,
          transparent: true,
          opacity: 0.4,
          linewidth: 2
        });
        const line = new THREE.Line(geo, mat);
        scene.add(line);
      }

      // Floating Data Particles traveling along the conduit
      const particleCount = 60;
      const particlePositions = new Float32Array(particleCount * 3);
      const particleProgress = new Float32Array(particleCount);
      const particleSpeeds = new Float32Array(particleCount);

      for (let p = 0; p < particleCount; p++) {
        particleProgress[p] = Math.random();
        particleSpeeds[p] = 0.0015 + Math.random() * 0.003;
      }

      const particlesGeo = new THREE.BufferGeometry();
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particlesMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.12,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const particleSystem = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particleSystem);

      // Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetX = x * 0.8;
        targetY = y * 0.5;
      };

      window.addEventListener('mousemove', onMouseMove);

      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;
        camera.position.x = mouseX * 2.2;
        camera.position.y = 1.2 + mouseY * 1.2;
        camera.lookAt(0, 0, 0);

        nodeMeshes.forEach((group, idx) => {
          group.rotation.y = elapsedTime * (0.5 + idx * 0.1);
          group.position.y = nodeCoords[idx].y + Math.sin(elapsedTime * 1.5 + idx * 1.2) * 0.12;

          const isSelected = activeStage === idx;
          const targetScale = isSelected ? 1.18 + Math.sin(elapsedTime * 4) * 0.04 : 1.0;
          group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        });

        // Update conduits & particles
        const positions = particlesGeo.attributes.position.array as Float32Array;
        for (let p = 0; p < particleCount; p++) {
          particleProgress[p] = (particleProgress[p] + particleSpeeds[p]) % 1;
          const prog = particleProgress[p];

          const totalSegments = 3;
          const segFloat = prog * totalSegments;
          const segIdx = Math.min(Math.floor(segFloat), totalSegments - 1);
          const segT = segFloat - segIdx;

          const p1 = nodeCoords[segIdx];
          const p2 = nodeCoords[segIdx + 1];
          const midY = segIdx % 2 === 0 ? 0.6 : -0.6;
          const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5).add(new THREE.Vector3(0, midY, 0.4));

          const invT = 1 - segT;
          const x = invT * invT * p1.x + 2 * invT * segT * mid.x + segT * segT * p2.x;
          const y = invT * invT * p1.y + 2 * invT * segT * mid.y + segT * segT * p2.y;
          const z = invT * invT * p1.z + 2 * invT * segT * mid.z + segT * segT * p2.z;

          positions[p * 3] = x;
          positions[p * 3 + 1] = y;
          positions[p * 3 + 2] = z;
        }
        particlesGeo.attributes.position.needsUpdate = true;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();
      setHasWebGL(true);

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.warn('WebGL initialization caught gracefully:', err);
      setHasWebGL(false);
    }
  }, [activeStage]);

  const currentStage = STAGES[activeStage];
  const CurrentIcon = currentStage.icon;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="relative z-10 px-6 pt-5 pb-2 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-indigo-400">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>The FirstHire Pipeline Engine</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 normal-case font-normal">Interactive 3D Career Projection</span>
        </div>

        {/* Stage Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-lg border border-slate-700/60">
          {STAGES.map((s, idx) => (
            <button
              key={s.stageName}
              onClick={() => setActiveStage(idx)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeStage === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {s.stageName}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Viewport Container */}
      <div className="relative h-72 sm:h-84 md:h-96 w-full cursor-grab active:cursor-grabbing overflow-hidden">
        {/* Three.js attaches its canvas directly to containerRef */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />

        {/* Graceful 2D Fallback if WebGL fails */}
        {!hasWebGL && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 bg-slate-900/95 z-20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
              {STAGES.map((s, idx) => {
                const Icon = s.icon;
                const isSelected = activeStage === idx;
                return (
                  <button
                    key={s.stageName}
                    onClick={() => setActiveStage(idx)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/60 text-white shadow-lg'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">{s.stageName}</p>
                    <p className="text-xs font-bold text-white mt-0.5">{s.title}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive Floating Context Overlay Card */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-4 rounded-xl shadow-xl transition-all z-20 pointer-events-auto">
          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${currentStage.color}20`, color: currentStage.color }}
            >
              <CurrentIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium tracking-wide uppercase" style={{ color: currentStage.color }}>
                  {currentStage.badge}
                </span>
                <span className="text-slate-600 text-xs">·</span>
                <span className="text-xs font-semibold text-slate-300">{currentStage.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStage.description}
              </p>
            </div>
          </div>
        </div>

        {/* Floating Quick Action hint */}
        <div className="hidden md:flex absolute top-4 right-6 items-center gap-2 text-xs text-slate-400 bg-slate-900/70 backdrop-blur px-3 py-1.5 rounded-md border border-slate-800 z-10">
          <span>Click nodes or drag mouse to tilt perspective</span>
        </div>
      </div>

      {/* Pathway Progression Indicators */}
      <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-medium">Trajectory:</span>
          <span>UC Berkeley Senior</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span>TypeScript & Distributed Systems</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span>Full-Stack Engineer</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-400 font-medium">Stripe / Linear 2026</span>
        </div>
        <div className="text-slate-500 text-[11px]">
          Interactive WebGL pipeline: <span className="text-indigo-400 font-mono">60 FPS</span>
        </div>
      </div>
    </div>
  );
};
