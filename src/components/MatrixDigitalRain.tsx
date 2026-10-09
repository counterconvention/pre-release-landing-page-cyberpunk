import React, { useEffect, useRef } from 'react';

// Cyberpunk 2077 Matrix Rain Character Set matching user references:
// - Sharp, angular Cyberpunk Latin glyphs (rendered via Chakra Petch)
// - Clean numbers & Hacker/Netrunner terminal runes (Ø, §, Ξ, λ, Δ, Ω, Ψ, ¥, Σ, etc.)
// - Sleek, frameless Japanese Kanji & standard Katakana (rendered via Noto Sans JP)
// ZERO half-width katakana (ｦ, ｧ, ｨ, ｩ...) - completely removed to prevent any boxed frames
const CHARS = [
  // Cyberpunk Latin glyphs
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  // Cyberpunk numbers
  '0', '1', '2', '3', '4', '5', '7', '8', '9',
  // Netrunner / Hacker glyphs & symbols (clean, frameless)
  'Ø', '§', 'Ξ', 'λ', 'Δ', 'Ω', 'Ψ', '¥', 'Σ', 'Ж', '×', '+', '-', '=', '*', '#', '>', '<', '_', '/', '|', '%',
  // Authentic Japanese Kanji (clean open radicals - Electric, Brain, Net, Red, Night, City, Power, Light, Neo)
  '電', '脳', '網', '赤', '黒', '夜', '街', '光', '力', '新', '生', '死', '道', '鬼', '魂', '心', '天', '火', '零', '壱', '弐', '参', '幻', '影',
  // Sleek standard Katakana (no half-width, zero boxes)
  'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'エ', 'ク', 'シ', 'ツ', 'ネ', 'ミ', 'ル', 'ロ', 'ン'
];
const NUM_CHARS = CHARS.length;

// Netrunner EMP overload tokens on click pulse (strictly Cyberpunk RED)
const EMP_CHARS = ['0x', 'NE', 'TR', 'UN', 'RED', '><', '//', '77', 'FF', 'CY'];
const NUM_EMP_CHARS = EMP_CHARS.length;

// 100% Cyberpunk RED Palette - Zero blue, zero cyan, zero dark block artifacts
const COLOR_WHITE_HOT_LEADER = '#ffebee';
const COLOR_RED_LEADER = '#ff003c';
const COLOR_RED_LEADER_EXCITED = '#ff3366';
const COLOR_RED_NEAR = '#e60036';
const COLOR_RED_HIGH = 'rgba(255, 0, 60, 0.92)';
const COLOR_RED_HIGH_EXCITED = 'rgba(255, 55, 95, 0.98)';
const COLOR_RED_MID = 'rgba(200, 10, 48, 0.65)';
const COLOR_RED_LOW = 'rgba(130, 8, 30, 0.38)';
const COLOR_RED_FADE = 'rgba(80, 5, 18, 0.20)';

// Safe bounds tailored for crisp QHD (2560x1440) 100% scale without huge blurry glyphs:
// Caps canvas resolution to <= 2560x1440 permanently so memory stays capped at ~14.7 MB VRAM
// even on 4K, 8K or 50% FHD zoom!
const MAX_INTERNAL_W = 2560;
const MAX_INTERNAL_H = 1440;
const MAX_COLUMNS = 140;
const MAX_TRAIL = 18;

export const MatrixDigitalRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 100% Transparent canvas context: glyphs only, zero opaque background blocks
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let resizeTimer: number | null = null;

    let width = 1920;
    let height = 1080;
    // Crisp, fine, elegant hacker character size (14px on desktop/QHD instead of gigantic 34px)
    const fontSize = 14;
    const colSpacing = 20;

    // Fixed pre-allocated memory buffers (< 6 KB total RAM, 0 garbage collection pressure)
    const colX = new Float32Array(MAX_COLUMNS);
    const colY = new Float32Array(MAX_COLUMNS);
    const colSpeed = new Float32Array(MAX_COLUMNS);
    const colLength = new Int16Array(MAX_COLUMNS);
    const colMutate = new Uint8Array(MAX_COLUMNS);
    const charIndices = new Uint8Array(MAX_COLUMNS * MAX_TRAIL);

    let activeCols = 0;

    // Fluid pointer physics
    const targetMouse = { x: -2000, y: -2000, active: false };
    const smoothMouse = { x: -2000, y: -2000 };
    const mouseVel = { x: 0, y: 0 };
    let mouseIntensity = 0;
    let lastMoveTime = 0;

    const TURVA_RADIUS = 220;
    const IDLE_TIMEOUT_MS = 3500;

    // Click pulse state (Cyberpunk RED EMP ripple)
    let pulseActive = false;
    let pulseX = 0;
    let pulseY = 0;
    let pulseRadius = 0;
    let pulseMaxRadius = 800;
    let pulseAmplitude = 0;

    // Apply Cyberpunk Google Fonts (Chakra Petch for angular cyber letters, Noto Sans JP for clean Kanji)
    const applyFont = () => {
      ctx.font = `700 ${fontSize}px "Chakra Petch", "Noto Sans JP", "Share Tech Mono", monospace`;
      ctx.textBaseline = 'top';
    };

    const setupDimensions = () => {
      const winW = window.innerWidth || 1920;
      const winH = window.innerHeight || 1080;

      // RESOLUTION CALIBRATION:
      // On QHD (2560x1440) scaleDown = 1.0 -> 1:1 pixel rendering, sharp 14px characters!
      // On 50% FHD or 4K/8K, locked safely to <= 2560x1440 to prevent any memory spike.
      const scaleDown = Math.max(1, Math.max(winW / MAX_INTERNAL_W, winH / MAX_INTERNAL_H));
      width = Math.floor(winW / scaleDown);
      height = Math.floor(winH / scaleDown);

      canvas.width = width;
      canvas.height = height;

      applyFont();

      activeCols = Math.min(MAX_COLUMNS, Math.ceil(width / colSpacing) + 1);

      for (let i = 0; i < activeCols; i++) {
        colX[i] = i * colSpacing;
        colY[i] = Math.random() * -height;
        // Calm, hypnotic, slow Cyberpunk rain speed
        colSpeed[i] = Math.random() * 0.08 + 0.07;
        const len = Math.floor(Math.random() * 6) + 10;
        colLength[i] = len;
        colMutate[i] = Math.floor(Math.random() * 6);

        const base = i * MAX_TRAIL;
        for (let j = 0; j < len; j++) {
          charIndices[base + j] = Math.floor(Math.random() * NUM_CHARS);
        }
      }
    };

    setupDimensions();

    // Re-apply font once Google web fonts are loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        applyFont();
      });
    }

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setupDimensions, 150);
    };

    window.addEventListener('resize', onResize);

    // Mouse coordinates mapped to canvas internal space
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const sx = width / rect.width;
      const sy = height / rect.height;

      targetMouse.x = (e.clientX - rect.left) * sx;
      targetMouse.y = (e.clientY - rect.top) * sy;
      targetMouse.active = true;
      lastMoveTime = performance.now();

      if (smoothMouse.x < -1000) {
        smoothMouse.x = targetMouse.x;
        smoothMouse.y = targetMouse.y;
      }
    };

    const onPointerLeave = () => {
      targetMouse.active = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const sx = width / rect.width;
      const sy = height / rect.height;

      pulseX = (e.clientX - rect.left) * sx;
      pulseY = (e.clientY - rect.top) * sy;
      pulseRadius = 0;
      pulseMaxRadius = Math.max(width, height) * 0.85;
      pulseAmplitude = 1.6;
      pulseActive = true;

      targetMouse.x = pulseX;
      targetMouse.y = pulseY;
      targetMouse.active = true;
      lastMoveTime = performance.now();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    let lastTime = performance.now();

    // 100% TRANSPARENT 60 FPS RENDER LOOP
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse presence & idle fading
      const isInside = targetMouse.active;
      const isIdle = time - lastMoveTime > IDLE_TIMEOUT_MS;

      if (isInside && !isIdle) {
        mouseIntensity = Math.min(1.0, mouseIntensity + dt * 4.0);
      } else {
        mouseIntensity = Math.max(0, mouseIntensity - dt * 2.0);
      }

      // Spring smoothed pointer tracking
      const prevX = smoothMouse.x;
      const prevY = smoothMouse.y;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.14;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.14;

      mouseVel.x = (smoothMouse.x - prevX) * 0.55;
      mouseVel.y = (smoothMouse.y - prevY) * 0.55;

      // Update click shockwave
      if (pulseActive) {
        pulseRadius += 220 * dt;
        pulseAmplitude *= Math.pow(0.982, dt * 60);
        if (pulseRadius > pulseMaxRadius || pulseAmplitude < 0.04) {
          pulseActive = false;
        }
      }

      // CLEAR CANVAS TO 100% TRANSPARENT:
      // Zero blocks, zero opaque dark tiles - matte black & skyline show through cleanly!
      ctx.clearRect(0, 0, width, height);

      const mX = smoothMouse.x;
      const mY = smoothMouse.y;
      const vX = mouseVel.x;
      const vY = mouseVel.y;
      const mInt = mouseIntensity;
      const mActive = mInt > 0.02;
      const timeSec = time * 0.003;

      let currentFillStyle = '';

      // DRAW TRANSPARENT MATRIX RAIN (Delicate, crisp Cyberpunk glyphs)
      for (let i = 0; i < activeCols; i++) {
        // Slow hypnotic vertical flow
        colY[i] += colSpeed[i] * fontSize * dt * 25;
        const trailLen = colLength[i];

        if (colY[i] - trailLen * fontSize > height) {
          colY[i] = -Math.random() * 80;
          colSpeed[i] = Math.random() * 0.08 + 0.07;
        }

        colMutate[i]++;
        const base = i * MAX_TRAIL;
        if (colMutate[i] >= 8) {
          colMutate[i] = 0;
          const pos = Math.floor(Math.random() * trailLen);
          charIndices[base + pos] = Math.floor(Math.random() * NUM_CHARS);
        }

        const colStartX = colX[i];
        const colDistX = Math.abs(colStartX - mX);
        const nearMouse = mActive && colDistX < TURVA_RADIUS;
        const nearPulse = pulseActive && Math.abs(colStartX - pulseX) < (pulseRadius + 50);

        for (let j = 0; j < trailLen; j++) {
          const charY = colY[i] - j * fontSize;
          if (charY < -fontSize || charY > height + fontSize) continue;

          let rx = colStartX;
          let ry = charY;
          let isTurva = false;
          let isWaveCrest = false;
          let isEmpSurge = false;

          // A. FLUID WATER INTERFERENCE
          if (nearMouse) {
            const dy = charY - mY;
            const dist = Math.hypot(colStartX - mX, dy);

            if (dist < TURVA_RADIUS) {
              const norm = dist / TURVA_RADIUS;
              const env = (1 - norm) * (1 - norm) * (3 - 2 * (1 - norm));
              const wave = Math.sin(norm * Math.PI * 3.4 - timeSec * 4.6);
              const disp = (env * 15 + wave * env * 14) * mInt;

              const invD = 1 / Math.max(1, dist);
              rx += (colStartX - mX) * invD * disp + vX * env * 0.55;
              ry += dy * invD * disp + vY * env * 0.55;

              isTurva = true;
              isWaveCrest = wave > 0.35;
            }
          }

          // B. CLICK EMP SURGE (Pure Cyberpunk RED shockwave - zero blue)
          if (nearPulse) {
            const dy = charY - pulseY;
            const pdist = Math.hypot(colStartX - pulseX, dy);
            const pdiff = Math.abs(pdist - pulseRadius);

            if (pdiff < 45) {
              const pfactor = (1 - pdiff / 45) * pulseAmplitude;
              const invP = 1 / Math.max(1, pdist);
              rx += (colStartX - pulseX) * invP * pfactor * 20;
              ry += dy * invP * pfactor * 20;
              isEmpSurge = true;
            }
          }

          let charStr = CHARS[charIndices[base + j]];
          let targetColor = COLOR_RED_LOW;

          if (isEmpSurge) {
            // EMP Shockwave Surge: White-hot leader and neon red
            charStr = EMP_CHARS[(i + j) % NUM_EMP_CHARS];
            targetColor = ((j % 2) === 0) ? COLOR_WHITE_HOT_LEADER : COLOR_RED_LEADER_EXCITED;
          } else {
            // Standard Cyberpunk RED rain hierarchy
            if (j === 0) {
              // Glowing leader head
              targetColor = isTurva ? COLOR_WHITE_HOT_LEADER : COLOR_RED_LEADER;
            } else if (j === 1) {
              targetColor = isTurva ? COLOR_RED_LEADER_EXCITED : COLOR_RED_NEAR;
            } else {
              const fadeRatio = 1 - j / trailLen;
              if (fadeRatio > 0.6) {
                targetColor = isWaveCrest ? COLOR_RED_HIGH_EXCITED : (isTurva ? COLOR_RED_HIGH_EXCITED : COLOR_RED_HIGH);
              } else if (fadeRatio > 0.35) {
                targetColor = isTurva ? COLOR_RED_HIGH : COLOR_RED_MID;
              } else if (fadeRatio > 0.15) {
                targetColor = COLOR_RED_LOW;
              } else {
                targetColor = COLOR_RED_FADE;
              }
            }
          }

          if (targetColor !== currentFillStyle) {
            ctx.fillStyle = targetColor;
            currentFillStyle = targetColor;
          }

          ctx.fillText(charStr, rx, ry);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-crosshair touch-none"
        title="Matriz Digital Cyberpunk RED"
      />
      {/* Matte black vignette for aesthetic depth */}
      <div className="absolute inset-0 cyber-vignette" />
    </div>
  );
};
