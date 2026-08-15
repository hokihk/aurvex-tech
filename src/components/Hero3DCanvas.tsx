import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Phones pay the most for this scene and see the least of it. Cap the
    // resolution and drop shadows there rather than rendering a desktop-grade
    // scene into a 350px box on a thermally-limited GPU.
    const isCompact = window.matchMedia('(max-width: 767px)').matches;
    const maxPixelRatio = isCompact ? 1.5 : 2;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // Renderer — a WebGL context is not guaranteed (old GPUs, blocklisted
    // drivers, hardware acceleration disabled), so degrade instead of crashing.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isCompact,
        powerPreference: 'high-performance'
      });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
    renderer.shadowMap.enabled = !isCompact;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Metallic Black Chrome Material
    const blackChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0F1115'),
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      wireframe: false
    });

    // Dark Brushed Platinum Material
    const platinumMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#22252A'),
      metalness: 0.8,
      roughness: 0.25,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2
    });

    // Subtle Cobalt Accent Material
    const cobaltAccentMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1D4ED8'),
      emissive: new THREE.Color('#1E3A8A'),
      emissiveIntensity: 0.2,
      metalness: 0.9,
      roughness: 0.2
    });

    // Central Architectural Sculptural Geometry: Torus Knot + Intersecting Rings
    const mainGeometry = new THREE.TorusKnotGeometry(3.2, 0.85, 120, 32, 2, 3);
    const mainMesh = new THREE.Mesh(mainGeometry, blackChromeMaterial);
    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    mainGroup.add(mainMesh);

    // Secondary Floating Outer Architectural Ring
    const ringGeometry1 = new THREE.TorusGeometry(5.8, 0.12, 32, 100);
    const ringMesh1 = new THREE.Mesh(ringGeometry1, platinumMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    mainGroup.add(ringMesh1);

    // Accent Thin Precision Ring
    const ringGeometry2 = new THREE.TorusGeometry(6.6, 0.05, 16, 100);
    const ringMesh2 = new THREE.Mesh(ringGeometry2, cobaltAccentMaterial);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 5;
    mainGroup.add(ringMesh2);

    // Floating Geometries around center (Architectural Cubes & Pyramids)
    const subGeometries = [
      new THREE.IcosahedronGeometry(0.7, 0),
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.BoxGeometry(0.8, 0.8, 0.8)
    ];

    const floatingGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const geo = subGeometries[i % subGeometries.length];
      const mesh = new THREE.Mesh(geo, i % 2 === 0 ? platinumMaterial : blackChromeMaterial);
      const angle = (i / 6) * Math.PI * 2;
      const radius = 6.2 + (i % 3) * 0.5;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (i % 2 === 0 ? 1 : -1) * 2
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      floatingGroup.add(mesh);
    }
    mainGroup.add(floatingGroup);

    // Lighting Setup
    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(10, 15, 12);
    keyLight.castShadow = !isCompact;
    scene.add(keyLight);

    // Blue Rim Light
    const rimLight = new THREE.DirectionalLight(0x2563eb, 3.5);
    rimLight.position.set(-12, -10, -8);
    scene.add(rimLight);

    // Soft Ambient Light
    const ambientLight = new THREE.AmbientLight(0x0a0a0a, 1.2);
    scene.add(ambientLight);

    // Cursor Following Spotlight
    const spotlight = new THREE.SpotLight(0x3b82f6, 4, 30, Math.PI / 4, 0.5, 1);
    spotlight.position.set(0, 0, 15);
    scene.add(spotlight);

    // Mouse Movement Handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -(((e.clientY - rect.top) / container.clientHeight) * 2 - 1);
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer for Container
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Animation Loop.
    // Time is accumulated manually from per-frame deltas rather than read from
    // clock.getElapsedTime(), so pausing and resuming never rewinds or skips
    // the sculpture's pose.
    let animationFrameId = 0;
    let elapsedTime = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      // Smooth mouse interpolation (ease-out)
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Rotate Main Sculpture slowly
      mainMesh.rotation.x = elapsedTime * 0.12 + mousePos.current.y * 0.3;
      mainMesh.rotation.y = elapsedTime * 0.18 + mousePos.current.x * 0.4;

      // Rotate Rings
      ringMesh1.rotation.z = -elapsedTime * 0.08;
      ringMesh2.rotation.z = elapsedTime * 0.14;

      // Rotate Floating Sub-Geometries
      floatingGroup.rotation.y = elapsedTime * 0.05;
      floatingGroup.children.forEach((child, idx) => {
        child.rotation.x = elapsedTime * 0.2 + idx;
        child.rotation.y = elapsedTime * 0.3 + idx;
        child.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.003;
      });

      // Update Cursor Spotlight Position
      spotlight.position.x = mousePos.current.x * 10;
      spotlight.position.y = mousePos.current.y * 10;

      // Parallax effect on mainGroup
      mainGroup.rotation.y = mousePos.current.x * 0.15;
      mainGroup.rotation.x = -mousePos.current.y * 0.15;

      renderer.render(scene, camera);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      elapsedTime += clock.getDelta();
      renderFrame();
    };

    // Only burn GPU cycles while the canvas is actually on screen and the tab is
    // visible. Without this the loop keeps running behind other tabs and after
    // the visitor has scrolled far past the hero.
    let isOnScreen = true;
    let isRunning = false;

    const stop = () => {
      if (!isRunning) return;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      isRunning = false;
    };

    const start = () => {
      if (isRunning || prefersReducedMotion) return;
      isRunning = true;
      // Discard the gap accumulated while paused so the first frame is small.
      clock.getDelta();
      animate();
    };

    const sync = () => {
      if (isOnScreen && document.visibilityState === 'visible') start();
      else stop();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isOnScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    document.addEventListener('visibilitychange', sync);

    if (prefersReducedMotion) {
      // Draw a single static frame so the composition is still there.
      renderFrame();
    } else {
      sync();
    }

    // Cleanup
    return () => {
      stop();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', sync);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();

      renderer.domElement.remove();
      renderer.dispose();

      blackChromeMaterial.dispose();
      platinumMaterial.dispose();
      cobaltAccentMaterial.dispose();
      mainGeometry.dispose();
      ringGeometry1.dispose();
      ringGeometry2.dispose();
      subGeometries.forEach((geo) => geo.dispose());
    };
  }, []);

  if (failed) {
    // Graceful degradation: keep the framed composition, drop the WebGL scene.
    return (
      <div className="relative w-full h-full min-h-[450px] flex items-center justify-center">
        <div className="w-56 h-56 rounded-full border border-accent/40 bg-gradient-to-br from-accent/20 to-transparent blur-[2px]" />
        <div className="absolute w-40 h-40 rounded-full border border-white/10" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[450px] flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Subtle overlay reflection light effect */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-ground/30 to-ground" />
    </div>
  );
};
