import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export const HeroScene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [rotationTelemetry, setRotationTelemetry] = useState({ y: 0, fps: 60 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- LUXURY ARCHITECTURAL SCULPTURAL MESH (BEZIER PARAMETRIC CLOTH FORM) ---
    // Instead of crude boxes/cylinders, we generate a parametric architectural haute-couture silhouette:
    // A flowing, multifaceted architectural garment torso with pagoda shoulders, tailored waist suppression,
    // and undulating structural pleats created via parametric mathematical surface formulas.

    const createArchitecturalGarmentGeometry = () => {
      const radialSegments = 72;
      const heightSegments = 80;
      const geom = new THREE.BufferGeometry();

      const positions: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];

      for (let yIdx = 0; yIdx <= heightSegments; yIdx++) {
        const v = yIdx / heightSegments; // 0 (bottom) to 1 (top/shoulders)
        const y = (v - 0.5) * 3.2; // height span from -1.6 to +1.6

        // Anatomical waist suppression and broad pagoda shoulder curve
        let radiusX = 0.55;
        let radiusZ = 0.38;

        if (v < 0.35) {
          // Hem / lower coat flare
          const t = 1.0 - v / 0.35;
          radiusX = 0.58 + t * 0.22;
          radiusZ = 0.40 + t * 0.15;
        } else if (v < 0.6) {
          // Suppressed waist zone
          const t = (v - 0.35) / 0.25;
          const waistDip = Math.sin(t * Math.PI) * 0.12;
          radiusX = 0.55 - waistDip;
          radiusZ = 0.38 - waistDip * 0.8;
        } else {
          // Broadening into Pagoda / Roped Architectural Shoulders
          const t = (v - 0.6) / 0.4;
          radiusX = 0.48 + Math.pow(t, 1.4) * 0.68; // Broad flared shoulders
          radiusZ = 0.32 + Math.pow(t, 1.2) * 0.22;
        }

        for (let xIdx = 0; xIdx <= radialSegments; xIdx++) {
          const u = xIdx / radialSegments;
          const angle = u * Math.PI * 2;

          // Architectural faceted pleats & lapel ridge modulation
          const pleatModulation =
            Math.sin(angle * 8) * 0.025 * (1.0 - v * 0.5) +
            Math.cos(angle * 2) * 0.04;

          // Lapel fold opening at front (angle ~ PI/2)
          const frontFactor = Math.exp(-Math.pow((angle - Math.PI / 2) * 2.2, 2));
          const lapelRoll = frontFactor * (v > 0.45 ? 0.09 * Math.sin((v - 0.45) * Math.PI * 1.8) : 0);

          const px = Math.cos(angle) * (radiusX + pleatModulation) + (angle > Math.PI ? 0.02 : -0.02);
          const py = y + Math.sin(angle * 4 + v * 5) * 0.02;
          const pz = Math.sin(angle) * (radiusZ + pleatModulation) + lapelRoll;

          positions.push(px, py, pz);
          uvs.push(u, v);
        }
      }

      // Build face indices
      for (let yIdx = 0; yIdx < heightSegments; yIdx++) {
        for (let xIdx = 0; xIdx < radialSegments; xIdx++) {
          const a = yIdx * (radialSegments + 1) + xIdx;
          const b = a + radialSegments + 1;
          const c = a + 1;
          const d = b + 1;

          indices.push(a, b, d);
          indices.push(a, d, c);
        }
      }

      geom.setIndex(indices);
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geom.computeVertexNormals();

      return geom;
    };

    // --- ADVANCED BESPOKE MATERIAL: SUPER 160S WORSTED WOOL WITH IRIDESCENT SHEEN ---
    const coutureWoolMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111114,
      emissive: 0x050506,
      roughness: 0.68,
      metalness: 0.12,
      clearcoat: 0.45,
      clearcoatRoughness: 0.25,
      sheen: 1.0,
      sheenRoughness: 0.45,
      sheenColor: new THREE.Color(0xc5a880), // Champagne micro-fiber luster
      reflectivity: 0.8,
      wireframe: false,
    });

    const garmentMesh = new THREE.Mesh(createArchitecturalGarmentGeometry(), coutureWoolMaterial);
    garmentMesh.castShadow = true;
    garmentMesh.receiveShadow = true;
    garmentMesh.position.y = 0.1;
    masterGroup.add(garmentMesh);

    // Architectural Wireframe Accent Layer (Subtle brutalist couture structural lines)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc5a880,
      wireframe: true,
      transparent: true,
      opacity: 0.045,
    });
    const wireframeMesh = new THREE.Mesh(garmentMesh.geometry, wireframeMaterial);
    wireframeMesh.position.y = 0.1;
    wireframeMesh.scale.set(1.003, 1.003, 1.003);
    masterGroup.add(wireframeMesh);

    // --- FLOATING TITANIUM MONOGRAM ACCENT ORBS / HARDWARE ---
    const hardwareGroup = new THREE.Group();
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      roughness: 0.18,
      metalness: 0.92,
    });

    // Central closure ring / fastener
    const ringGeom = new THREE.TorusGeometry(0.12, 0.022, 24, 48);
    const ring = new THREE.Mesh(ringGeom, titaniumMat);
    ring.position.set(0, 0.05, 0.42);
    ring.castShadow = true;
    hardwareGroup.add(ring);

    // Collar clasp stud
    const studGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 24);
    studGeom.rotateX(Math.PI / 2);
    const stud = new THREE.Mesh(studGeom, titaniumMat);
    stud.position.set(0, 1.15, 0.35);
    hardwareGroup.add(stud);

    masterGroup.add(hardwareGroup);

    // --- FLOATING ATMOSPHERIC GOLD/TITANIUM PARTICULATES (COUTURE ATOM CLOUD) ---
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const dist = 0.8 + Math.random() * 2.2;
      particlePositions[i3] = Math.cos(angle) * dist;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 3.8;
      particlePositions[i3 + 2] = Math.sin(angle) * dist;
      particleScales[i] = Math.random() * 0.03 + 0.01;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMaterial);
    scene.add(particleSystem);

    // --- PEDESTAL & SHADOW DISC ---
    const pedestalGeom = new THREE.CylinderGeometry(1.6, 1.8, 0.04, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x070709,
      roughness: 0.95,
      metalness: 0.1,
    });
    const pedestal = new THREE.Mesh(pedestalGeom, pedestalMat);
    pedestal.position.y = -1.65;
    pedestal.receiveShadow = true;
    masterGroup.add(pedestal);

    // Shadow plane
    const shadowPlaneGeom = new THREE.PlaneGeometry(8, 8);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.55 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeom, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.67;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // --- HIGH-FASHION STUDIO LIGHTING RIG ---
    // 1. Key Directional Studio Light (Crisp, directional)
    const keyLight = new THREE.DirectionalLight(0xf5f3ee, 2.8);
    keyLight.position.set(3.5, 4.5, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // 2. Cool Architectural Rim Light (Defining the pagoda shoulders)
    const coolRim = new THREE.DirectionalLight(0x7890a8, 1.8);
    coolRim.position.set(-4.0, 2.5, -2.5);
    scene.add(coolRim);

    // 3. Warm Champagne Edge Halo (Backlight)
    const champagneBacklight = new THREE.DirectionalLight(0xc5a880, 3.2);
    champagneBacklight.position.set(0, 3.0, -4.0);
    scene.add(champagneBacklight);

    // 4. Soft Ambient Studio Bounce
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // 5. Interactive Cursor Spotlight (Specular highlights follow mouse)
    const cursorFollowLight = new THREE.PointLight(0xfff8ee, 2.2, 9);
    cursorFollowLight.position.set(0, 0, 3);
    scene.add(cursorFollowLight);

    // --- INTERACTION & MOTION PHYSICS ---
    let targetRotationY = 0;
    let targetRotationX = 0;
    let targetCameraZ = 5.0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      cursorFollowLight.position.x = nx * 3.2;
      cursorFollowLight.position.y = ny * 2.8 + 0.2;

      if (!isDragging) {
        targetRotationY = nx * 0.65;
        targetRotationX = -ny * 0.25;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleDragMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      targetRotationY += dx * 0.007;
      targetRotationX += dy * 0.004;
      startX = e.clientX;
      startY = e.clientY;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      targetCameraZ = 5.0 + scrollY * 0.0022;
      masterGroup.position.y = -scrollY * 0.001;
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // --- RENDER LOOP WITH VELOCITY INTERPOLATION ---
    let animationId: number;
    const clock = new THREE.Clock();
    let frameCounter = 0;
    let lastTime = performance.now();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Organic breathing float motion
      masterGroup.position.y += (Math.sin(elapsed * 1.3) * 0.04 - masterGroup.position.y) * 0.04;

      // Heavy inertia spring damping
      masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.055;
      masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.055;

      // Subtle slow auto-revolution when idle
      if (!isDragging) {
        targetRotationY += 0.0015;
      }

      // Camera smooth zoom
      camera.position.z += (targetCameraZ - camera.position.z) * 0.07;

      // Particle system gentle orbiting
      particleSystem.rotation.y = elapsed * 0.05;
      particleSystem.position.y = Math.sin(elapsed * 0.8) * 0.06;

      // Telemetry update throttled
      frameCounter++;
      const now = performance.now();
      if (now - lastTime >= 500) {
        const fps = Math.round((frameCounter * 1000) / (now - lastTime));
        const deg = Math.round(((masterGroup.rotation.y * 180) / Math.PI) % 360);
        setRotationTelemetry({
          y: deg < 0 ? 360 + deg : deg,
          fps: Math.min(60, fps),
        });
        frameCounter = 0;
        lastTime = now;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="DRAG 360°"
      className="w-full h-full cursor-grab active:cursor-grabbing relative select-none"
    >
      {/* Editorial Telemetry HUD (Minimalist, brutalist haute precision) */}
      <div className="absolute top-6 right-6 z-20 hidden sm:flex flex-col items-end space-y-1 font-mono text-[10px] tracking-[0.25em] text-titanium/80 pointer-events-none uppercase">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          <span>BEARING: {String(rotationTelemetry.y).padStart(3, '0')}°</span>
        </div>
        <div className="text-white/40 text-[9px]">
          FIBER: SUPER 160S WORSTED • 140/2 TWILL
        </div>
        <div className="text-white/30 text-[9px]">
          TENSION: 0.88 N/M • RECOVERY: 99.4%
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-3 text-[10px] font-mono tracking-widest text-titanium/70 uppercase pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
        <span>PARAMETRIC ARCHITECTURAL SCULPTURE • ORBIT / DRAG ENABLED</span>
      </div>
    </div>
  );
};
