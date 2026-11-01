"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function ParticleField() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || typeof window === "undefined") return;

    // Performance detection
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = (navigator.hardwareConcurrency || 4) < 4;

    if (isMobile || prefersReducedMotion) {
      setUseFallback(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    let animId: number;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      canvasRef.current.appendChild(renderer.domElement);

      // Particle system
      const particleCount = lowPower ? 1000 : 3000;
      const positions = new Float32Array(particleCount * 3);
      const originalPositions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      const colorOptions = [
        new THREE.Color("#6366f1"), // brand.primary
        new THREE.Color("#06b6d4"), // brand.secondary
        new THREE.Color("#a855f7"), // brand.purple
      ];

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 120;
        const y = (Math.random() - 0.5) * 120;
        const z = (Math.random() - 0.5) * 100;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        const rand = Math.random();
        let colorIdx = 0;
        if (rand > 0.8) colorIdx = 2;
        else if (rand > 0.5) colorIdx = 1;
        
        const c = colorOptions[colorIdx];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = Math.random() * 2 + 1; // Size multiplier
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      
      // Save original position as custom attribute for return physics
      geometry.setAttribute("originalPos", new THREE.BufferAttribute(originalPositions, 3));

      // Custom shader material for particle sizing and soft edges
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            // Soft circle
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float ll = length(xy);
            if (ll > 0.5) discard;
            float alpha = (0.5 - ll) * 2.0;
            gl_FragColor = vec4(vColor, alpha * 0.7);
          }
        `,
        transparent: true,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Mouse tracking
      const mouse = new THREE.Vector2(-1000, -1000);
      const raycaster = new THREE.Raycaster();
      // Invisible plane for raycasting
      const planeGeo = new THREE.PlaneGeometry(1000, 1000);
      const planeMat = new THREE.MeshBasicMaterial({ visible: false });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      scene.add(plane);

      const handleMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);

      // Scroll speed reaction
      let scrollSpeed = 0;
      let lastScrollY = window.scrollY;
      
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        scrollSpeed = (currentScrollY - lastScrollY) * 0.05;
        lastScrollY = currentScrollY;
      };
      window.addEventListener("scroll", handleScroll);

      // Resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      // Animation
      let frame = 0;
      const clock = new THREE.Clock();
      const mouseVec3 = new THREE.Vector3();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        frame += delta;

        // Apply scroll friction
        scrollSpeed *= 0.95; 

        // Update overall rotation based on time + scroll speed
        particles.rotation.y = frame * 0.05 + mouse.x * 0.1;
        particles.rotation.x = frame * 0.03 + mouse.y * 0.1 + scrollSpeed * 0.1;

        // Raycast mouse to plane to find 3D point
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(plane);
        
        if (intersects.length > 0) {
          mouseVec3.copy(intersects[0].point);
          
          // Repel particles
          const posAttribute = geometry.attributes.position;
          const origPosAttribute = geometry.attributes.originalPos;
          
          for (let i = 0; i < particleCount; i++) {
            const px = posAttribute.getX(i);
            const py = posAttribute.getY(i);
            const pz = posAttribute.getZ(i);
            
            const dx = mouseVec3.x - px;
            const dy = mouseVec3.y - py;
            const distSq = dx * dx + dy * dy;
            const radiusSq = 25; // Interaction radius squared
            
            const ox = origPosAttribute.getX(i);
            const oy = origPosAttribute.getY(i);
            const oz = origPosAttribute.getZ(i);

            if (distSq < radiusSq) {
              // Push away
              const force = (radiusSq - distSq) / radiusSq;
              posAttribute.setXYZ(
                i,
                px - dx * force * 0.1,
                py - dy * force * 0.1,
                pz
              );
            } else {
              // Return to original
              posAttribute.setXYZ(
                i,
                px + (ox - px) * 0.05,
                py + (oy - py) * 0.05,
                pz + (oz - pz) * 0.05
              );
            }
          }
          posAttribute.needsUpdate = true;
        }

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
          canvasRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (e) {
      console.warn("WebGL not supported, falling back to gradient");
      setUseFallback(true);
    }
  }, []);

  if (useFallback) {
    return (
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-bg-primary to-bg-primary pointer-events-none" />
    );
  }

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-70"
      style={{ pointerEvents: "none" }}
    />
  );
}
