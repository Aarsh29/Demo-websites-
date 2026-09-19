import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PRODUCTS } from '../../data/productsData';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { RotateCw, ZoomIn, ChevronLeft, ChevronRight, Check, Eye } from 'lucide-react';

export const ProductGallery3D: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // The Architect Blazer
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeMaterialTab, setActiveMaterialTab] = useState<'fabric' | 'origin' | 'craft'>('fabric');
  const [isMacroZoom, setIsMacroZoom] = useState(false);
  const [bearingDeg, setBearingDeg] = useState(0);

  const mountRef = useRef<HTMLDivElement>(null);
  const rotationYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  const { addToCart, formatPrice } = useCommerce();
  const { playClick, playHover, playSliderTick } = useSound();

  const product = PRODUCTS[selectedIndex];

  // --- THREE.JS REAL 3D TURNTABLE STAGE ---
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0.4, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Turntable Master Pedestal
    const turntableGroup = new THREE.Group();
    scene.add(turntableGroup);

    // Sculpted Exhibition Cylinder Pedestal
    const pedestalGeom = new THREE.CylinderGeometry(1.2, 1.35, 0.12, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0d,
      roughness: 0.88,
      metalness: 0.15,
    });
    const pedestal = new THREE.Mesh(pedestalGeom, pedestalMat);
    pedestal.position.y = -1.25;
    pedestal.receiveShadow = true;
    turntableGroup.add(pedestal);

    // Monolithic Accent Ring on Pedestal
    const ringGeom = new THREE.TorusGeometry(1.22, 0.015, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      roughness: 0.25,
      metalness: 0.85,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.2;
    turntableGroup.add(ring);

    // Shadow plane
    const shadowGeom = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.5 });
    const shadow = new THREE.Mesh(shadowGeom, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.3;
    shadow.receiveShadow = true;
    scene.add(shadow);

    // --- PROCEDURAL 3D PIECE AVATAR / TOKEN ---
    // Tailored sculpture dynamically reflecting product category
    const pieceGroup = new THREE.Group();
    turntableGroup.add(pieceGroup);

    // 1. Torso Silhouette
    const bodyGeom = new THREE.CylinderGeometry(0.55, 0.38, 1.6, 48);
    bodyGeom.scale(1.15, 1, 0.65);
    const pieceMat = new THREE.MeshPhysicalMaterial({
      color: 0x121215,
      roughness: 0.65,
      metalness: 0.1,
      clearcoat: 0.3,
      sheen: 0.8,
      sheenColor: new THREE.Color(0xc5a880),
    });
    const bodyMesh = new THREE.Mesh(bodyGeom, pieceMat);
    bodyMesh.position.y = -0.3;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    pieceGroup.add(bodyMesh);

    // Roped Pagoda Shoulders
    const shoulderLGeom = new THREE.SphereGeometry(0.26, 24, 24);
    shoulderLGeom.scale(1.2, 0.5, 0.8);
    const shoulderL = new THREE.Mesh(shoulderLGeom, pieceMat);
    shoulderL.position.set(-0.68, 0.45, 0);
    pieceGroup.add(shoulderL);

    const shoulderRGeom = new THREE.SphereGeometry(0.26, 24, 24);
    shoulderRGeom.scale(1.2, 0.5, 0.8);
    const shoulderR = new THREE.Mesh(shoulderRGeom, pieceMat);
    shoulderR.position.set(0.68, 0.45, 0);
    pieceGroup.add(shoulderR);

    // Architectural Lapel Accents
    const lapelGeom = new THREE.BoxGeometry(0.18, 0.85, 0.06);
    const lapelMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.4,
      metalness: 0.15,
    });
    const lapelL = new THREE.Mesh(lapelGeom, lapelMat);
    lapelL.position.set(-0.18, 0.12, 0.28);
    lapelL.rotation.z = -0.2;
    pieceGroup.add(lapelL);

    const lapelR = new THREE.Mesh(lapelGeom, lapelMat);
    lapelR.position.set(0.18, 0.12, 0.28);
    lapelR.rotation.z = 0.2;
    pieceGroup.add(lapelR);

    // Central Titanium Button
    const buttonGeom = new THREE.CylinderGeometry(0.028, 0.028, 0.02, 16);
    buttonGeom.rotateX(Math.PI / 2);
    const buttonMesh = new THREE.Mesh(buttonGeom, ringMat);
    buttonMesh.position.set(0, -0.05, 0.32);
    pieceGroup.add(buttonMesh);

    // --- STUDIO LIGHTING RIG ---
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5a880, 2.6);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    // Mouse & Touch Drag Event Handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      rotationYRef.current += dx * 0.008;
      startXRef.current = e.clientX;
      const deg = Math.round(((rotationYRef.current * 180) / Math.PI) % 360);
      setBearingDeg(deg < 0 ? 360 + deg : deg);
      playSliderTick();
    };

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // Animation loop with zoom camera positioning
    let animId: number;
    const animate = () => {
      // Smooth turntable rotation interpolation
      turntableGroup.rotation.y += (rotationYRef.current - turntableGroup.rotation.y) * 0.08;

      // Slow auto rotation if not dragging
      if (!isDraggingRef.current) {
        rotationYRef.current += 0.002;
        const deg = Math.round(((turntableGroup.rotation.y * 180) / Math.PI) % 360);
        setBearingDeg(deg < 0 ? 360 + deg : deg);
      }

      // Camera target distance based on Macro Zoom
      const targetCamZ = isMacroZoom ? 2.2 : 4.2;
      const targetCamY = isMacroZoom ? 0.1 : 0.4;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [isMacroZoom, selectedIndex, playSliderTick]);

  const prevPiece = () => {
    playClick();
    setSelectedIndex((prev) => (prev === 0 ? PRODUCTS.length - 1 : prev - 1));
    setActiveColorIdx(0);
  };

  const nextPiece = () => {
    playClick();
    setSelectedIndex((prev) => (prev === PRODUCTS.length - 1 ? 0 : prev + 1));
    setActiveColorIdx(0);
  };

  return (
    <section id="gallery" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-obsidian border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-champagne/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-3 text-xs tracking-[0.3em] font-mono text-champagne uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span>EXHIBITION TURNTABLE (WEBGL)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight uppercase">
            360° MATERIAL & FORM INSPECTION
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={prevPiece}
            onMouseEnter={playHover}
            data-cursor="PREV"
            className="p-3 border border-white/20 hover:border-champagne text-ivory hover:text-champagne transition-colors"
            title="Previous Piece"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-mono text-xs text-titanium tracking-widest">
            {String(selectedIndex + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}
          </span>
          <button
            onClick={nextPiece}
            onMouseEnter={playHover}
            data-cursor="NEXT"
            className="p-3 border border-white/20 hover:border-champagne text-ivory hover:text-champagne transition-colors"
            title="Next Piece"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Exhibition Stage */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: True WebGL 3D Turntable (Cols 1-7) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            ref={mountRef}
            data-cursor="DRAG 360°"
            className="relative w-full max-w-xl aspect-[4/5] bg-charcoal/60 border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing select-none shadow-2xl"
          >
            {/* Overlaid Turntable Gauge */}
            <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-[10px] font-mono tracking-widest text-titanium bg-obsidian/80 px-3 py-1.5 border border-white/10 backdrop-blur-md">
              <RotateCw size={12} className="text-champagne" />
              <span>BEARING: {String(bearingDeg).padStart(3, '0')}°</span>
            </div>

            {/* Macro Zoom Toggle */}
            <button
              onClick={() => {
                playClick();
                setIsMacroZoom((prev) => !prev);
              }}
              className={`absolute top-6 right-6 z-20 p-2.5 border backdrop-blur-md transition-colors flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase ${
                isMacroZoom
                  ? 'bg-champagne text-obsidian border-champagne font-bold'
                  : 'bg-obsidian/80 text-ivory border-white/10 hover:border-champagne hover:text-champagne'
              }`}
              title="Toggle Macro Camera Zoom"
            >
              <ZoomIn size={14} />
              <span>{isMacroZoom ? 'MACRO ON' : 'MACRO ZOOM'}</span>
            </button>

            {/* Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] tracking-widest text-titanium/80 bg-obsidian/80 px-4 py-1.5 border border-white/10 pointer-events-none uppercase">
              INTERACTIVE 3D TURNTABLE • DRAG TO ROTATE
            </div>
          </div>

          {/* Product Thumbnails Carousel */}
          <div className="flex space-x-3 mt-6 overflow-x-auto max-w-full pb-2">
            {PRODUCTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  playClick();
                  setSelectedIndex(idx);
                  setActiveColorIdx(0);
                }}
                className={`w-14 h-16 border transition-all shrink-0 bg-charcoal overflow-hidden ${
                  selectedIndex === idx
                    ? 'border-champagne opacity-100 scale-105'
                    : 'border-white/10 opacity-40 hover:opacity-80'
                }`}
              >
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Spec Dossier & Material Provenance (Cols 8-12) */}
        <div className="lg:col-span-5 text-left flex flex-col justify-between h-full space-y-8">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-champagne uppercase block mb-2">
              EXHIBIT PIECE {product.number}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory tracking-wide uppercase mb-2">
              {product.name}
            </h3>
            <p className="font-sans text-xs text-titanium font-light mb-4">
              {product.subtitle}
            </p>
            <div className="font-mono text-2xl text-ivory tracking-widest mb-6">
              {formatPrice(product.price)}
            </div>

            <p className="font-sans text-xs sm:text-sm text-titanium/90 leading-relaxed font-light border-l border-white/15 pl-4 mb-8">
              {product.description}
            </p>

            {/* Finish / Shade Selector */}
            <div className="mb-8">
              <span className="font-mono text-xs tracking-widest text-titanium uppercase block mb-3">
                FINISH / SHADE: <strong className="text-ivory font-normal">{product.colors[activeColorIdx]?.name}</strong>
              </span>
              <div className="flex space-x-3">
                {product.colors.map((c, cIdx) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      playClick();
                      setActiveColorIdx(cIdx);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                      activeColorIdx === cIdx
                        ? 'border-champagne scale-110 shadow-lg'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    title={c.name}
                  >
                    {activeColorIdx === cIdx && (
                      <Check size={12} className={c.hex === '#F7F6F2' ? 'text-black' : 'text-white'} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Tabs */}
            <div className="border border-white/10 bg-noir p-6 mb-8">
              <div className="flex border-b border-white/10 pb-3 mb-4 space-x-6 text-xs font-mono tracking-widest uppercase">
                <button
                  onClick={() => {
                    playClick();
                    setActiveMaterialTab('fabric');
                  }}
                  className={`pb-1 transition-colors ${
                    activeMaterialTab === 'fabric' ? 'text-champagne border-b border-champagne' : 'text-titanium hover:text-ivory'
                  }`}
                >
                  MATERIAL
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setActiveMaterialTab('origin');
                  }}
                  className={`pb-1 transition-colors ${
                    activeMaterialTab === 'origin' ? 'text-champagne border-b border-champagne' : 'text-titanium hover:text-ivory'
                  }`}
                >
                  PROVENANCE
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setActiveMaterialTab('craft');
                  }}
                  className={`pb-1 transition-colors ${
                    activeMaterialTab === 'craft' ? 'text-champagne border-b border-champagne' : 'text-titanium hover:text-ivory'
                  }`}
                >
                  ATELIER CRAFT
                </button>
              </div>

              <div className="text-xs text-titanium/90 leading-relaxed font-light min-h-[70px]">
                {activeMaterialTab === 'fabric' && (
                  <div>
                    <p className="font-semibold text-ivory mb-1 font-mono text-[11px]">{product.materials.composition}</p>
                    <p>{product.materials.texture}</p>
                  </div>
                )}
                {activeMaterialTab === 'origin' && (
                  <div>
                    <p className="font-semibold text-ivory mb-1 font-mono text-[11px]">{product.materials.origin}</p>
                    <p>{product.materials.care}</p>
                  </div>
                )}
                {activeMaterialTab === 'craft' && (
                  <div>
                    <p>{product.craftNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action */}
          <div>
            <button
              onClick={() => {
                playClick();
                addToCart(product, product.colors[activeColorIdx]?.name);
              }}
              data-cursor="ACQUIRE"
              className="w-full bg-ivory text-obsidian py-4 px-6 text-xs font-sans font-semibold tracking-[0.25em] uppercase hover:bg-champagne transition-colors duration-300 shadow-2xl flex items-center justify-center space-x-3"
            >
              <span>ACQUIRE PIECE — {formatPrice(product.price)}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
