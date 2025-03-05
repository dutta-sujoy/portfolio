import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create geometric particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 8000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(2000), // x
        THREE.MathUtils.randFloatSpread(2000), // y
        THREE.MathUtils.randFloatSpread(2000)  // z
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 3,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 1000;

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.0003;
      points.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full opacity-60 pointer-events-none"
    />
  );
}