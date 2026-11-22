/**
 * PARABOLearn - Interactive Simulation Engine (FITUR UTAMA)
 * Eksperimen Laboratorium Virtual Gerak Parabola Kelas XI SMA
 * Dilengkapi rotasi moncong meriam, multi-trajectory trace, real-time telemetry, dan analisis fisis otomatis.
 */

class ParabolaSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Default simulation parameters
    this.v0 = 20; // m/s
    this.angleDeg = 45; // derajat
    this.g = 9.8; // m/s^2

    // Simulation runtime state
    this.currentTime = 0;
    this.isPlaying = false;
    this.animationFrameId = null;
    this.lastTimestamp = null;
    this.speedMultiplier = 1.0;

    // Feature toggles
    this.showVectors = true;
    this.showGrid = true;
    this.savedTrajectories = []; // History for trajectory comparison

    // Interactive probe
    this.hoverPoint = null;

    // Initialize physics
    this.updatePhysics();

    // Setup viewport
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());

    // Canvas mouse events for interactive probe
    this.setupCanvasInteractions();

    // Initial render
    this.draw();
  }

  updatePhysics() {
    this.theta = (this.angleDeg * Math.PI) / 180;
    this.vx0 = this.v0 * Math.cos(this.theta);
    this.vy0 = this.v0 * Math.sin(this.theta);

    this.tPeak = this.vy0 / this.g;
    this.tTotal = (2 * this.vy0) / this.g;
    this.hMax = (this.vy0 * this.vy0) / (2 * this.g);
    this.rangeMax = (this.vx0 * this.tTotal);

    this.updateTelemetryDOM();
    this.updatePhysicsInsights();
  }

  handleResize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height || 480;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    this.padLeft = 70;
    this.padRight = 50;
    this.padBottom = 65;
    this.padTop = 50;

    this.originX = this.padLeft;
    this.originY = this.height - this.padBottom;

    this.calculateScale();
    this.draw();
  }

  calculateScale() {
    const plotWidth = this.width - this.padLeft - this.padRight;
    const plotHeight = this.height - this.padTop - this.padBottom;

    // Cari nilai jangkauan dan ketinggian maksimum terbesar dari trajectory aktif dan tersimpan
    let maxR = Math.max(this.rangeMax, 25);
    let maxH = Math.max(this.hMax, 15);

    this.savedTrajectories.forEach(traj => {
      if (traj.rangeMax > maxR) maxR = traj.rangeMax;
      if (traj.hMax > maxH) maxH = traj.hMax;
    });

    const scaleX = plotWidth / (maxR * 1.15);
    const scaleY = plotHeight / (maxH * 1.25);
    this.scale = Math.min(scaleX, scaleY);
  }

  toScreenX(x) {
    return this.originX + x * this.scale;
  }

  toScreenY(y) {
    return this.originY - y * this.scale;
  }

  toPhysicsX(screenX) {
    return (screenX - this.originX) / this.scale;
  }

  setupCanvasInteractions() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Cek apakah mouse dekat dengan kurva
      const physX = this.toPhysicsX(mouseX);
      if (physX >= 0 && physX <= this.rangeMax) {
        const t = physX / this.vx0;
        const physY = this.vy0 * t - 0.5 * this.g * t * t;
        const curveScreenY = this.toScreenY(physY);

        if (Math.abs(mouseY - curveScreenY) < 25) {
          this.hoverPoint = {
            t,
            x: physX,
            y: Math.max(0, physY),
            vx: this.vx0,
            vy: this.vy0 - this.g * t,
            scrX: mouseX,
            scrY: curveScreenY
          };
          this.draw();
          return;
        }
      }
      if (this.hoverPoint) {
        this.hoverPoint = null;
        this.draw();
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      if (this.hoverPoint) {
        this.hoverPoint = null;
        this.draw();
      }
    });
  }

  launch() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.currentTime = 0;
    this.isPlaying = true;
    this.lastTimestamp = null;
    this.calculateScale();

    if (window.SoundEffects) SoundEffects.playLaunch();
    const btnPause = document.getElementById('btn-sim-pause');
    if (btnPause) btnPause.innerHTML = '<span>⏸ Jeda</span>';
    this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
  }

  pause() {
    this.isPlaying = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.lastTimestamp = null;
  }

  resume() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.currentTime >= this.tTotal || isNaN(this.currentTime)) {
      this.currentTime = 0;
    }
    this.isPlaying = true;
    this.lastTimestamp = null;
    this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
  }

  reset() {
    this.pause();
    this.currentTime = 0;
    this.draw();
    const btnPause = document.getElementById('btn-sim-pause');
    if (btnPause) btnPause.innerHTML = '<span>⏸ Jeda</span>';
  }

  saveCurrentTrajectory() {
    // Warna beragam untuk perbandingan visual
    const colors = ['#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#F97316'];
    const assignedColor = colors[this.savedTrajectories.length % colors.length];

    this.savedTrajectories.push({
      v0: this.v0,
      angleDeg: this.angleDeg,
      g: this.g,
      rangeMax: this.rangeMax,
      hMax: this.hMax,
      tTotal: this.tTotal,
      vx0: this.vx0,
      vy0: this.vy0,
      color: assignedColor
    });

    this.calculateScale();
    this.draw();
    if (window.Toast) {
      Toast.show(`Lintasan (v₀=${this.v0}m/s, θ=${this.angleDeg}°) disimpan untuk perbandingan`, 'info');
    }
  }

  clearSavedTrajectories() {
    this.savedTrajectories = [];
    this.calculateScale();
    this.draw();
    if (window.Toast) {
      Toast.show('Semua perbandingan lintasan dibersihkan', 'warning');
    }
  }

  loop(timestamp) {
    if (!this.isPlaying) return;

    if (!timestamp) timestamp = performance.now();
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;

    let dt = (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;

    if (isNaN(dt) || dt <= 0 || dt > 0.1) {
      dt = 1 / 60;
    }

    this.currentTime += dt * this.speedMultiplier;

    if (this.currentTime >= this.tTotal) {
      this.currentTime = this.tTotal;
      this.isPlaying = false;
      this.animationFrameId = null;
      this.draw();
      if (window.SoundEffects) SoundEffects.playCorrect();
      const btnPause = document.getElementById('btn-sim-pause');
      if (btnPause) btnPause.innerHTML = '<span>⏸ Jeda</span>';
      return;
    }

    this.draw();

    if (this.isPlaying) {
      this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Grid
    if (this.showGrid) this.drawGrid();

    // 2. Saved Trajectories (Perbandingan)
    this.drawSavedTrajectories();

    // 3. Active Trajectory Line
    this.drawActiveTrajectory();

    // 4. Ground Launcher Cannon (Rotates with angle θ)
    this.drawCannon();

    // 5. Reference Markers
    this.drawKeyMarkers();

    // 6. Projectile Ball & Vectors
    this.drawProjectileState();

    // 7. Interactive Hover Probe
    if (this.hoverPoint) {
      this.drawHoverProbe();
    }
  }

  drawGrid() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#64748B';

    let maxPlotDist = this.rangeMax * 1.2;
    this.savedTrajectories.forEach(t => { if (t.rangeMax * 1.2 > maxPlotDist) maxPlotDist = t.rangeMax * 1.2; });

    const step = this.scale > 10 ? 5 : (this.scale > 3 ? 10 : 25);

    // Vertical Lines (X meters)
    for (let x = 0; x <= maxPlotDist; x += step) {
      const scrX = this.toScreenX(x);
      if (scrX > this.width - 20) break;

      ctx.beginPath();
      ctx.moveTo(scrX, this.padTop);
      ctx.lineTo(scrX, this.originY);
      ctx.stroke();

      ctx.fillText(`${x}m`, scrX - 10, this.originY + 18);
    }

    // Horizontal Lines (Y meters)
    let maxPlotHeight = this.hMax * 1.35;
    this.savedTrajectories.forEach(t => { if (t.hMax * 1.35 > maxPlotHeight) maxPlotHeight = t.hMax * 1.35; });

    for (let y = 0; y <= maxPlotHeight; y += step) {
      const scrY = this.toScreenY(y);
      if (scrY < this.padTop - 10) break;

      ctx.beginPath();
      ctx.moveTo(this.originX, scrY);
      ctx.lineTo(this.width - this.padRight, scrY);
      ctx.stroke();

      if (y > 0) ctx.fillText(`${y}m`, this.originX - 35, scrY + 4);
    }

    // Ground line
    ctx.fillStyle = '#334155';
    ctx.fillRect(this.originX - 20, this.originY, this.width, 4);

    // Axis indicators
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.originX, this.originY);
    ctx.lineTo(this.width - 25, this.originY);
    ctx.stroke();
    ctx.fillStyle = '#38BDF8';
    ctx.fillText('Jarak X (m)', this.width - 70, this.originY - 8);

    ctx.beginPath();
    ctx.moveTo(this.originX, this.originY);
    ctx.lineTo(this.originX, 20);
    ctx.stroke();
    ctx.fillText('Tinggi Y (m)', this.originX + 8, 25);

    ctx.restore();
  }

  drawSavedTrajectories() {
    const ctx = this.ctx;
    this.savedTrajectories.forEach((traj) => {
      ctx.save();
      ctx.strokeStyle = traj.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.globalAlpha = 0.7;

      ctx.beginPath();
      const steps = 80;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * traj.tTotal;
        const x = traj.vx0 * t;
        const y = Math.max(0, traj.vy0 * t - 0.5 * traj.g * t * t);
        const scrX = this.toScreenX(x);
        const scrY = this.toScreenY(y);
        if (i === 0) ctx.moveTo(scrX, scrY);
        else ctx.lineTo(scrX, scrY);
      }
      ctx.stroke();

      // Label at landing
      const endX = this.toScreenX(traj.rangeMax);
      ctx.fillStyle = traj.color;
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(`[${traj.angleDeg}°] R=${traj.rangeMax.toFixed(1)}m`, endX - 25, this.originY + 34);

      ctx.restore();
    });
  }

  drawActiveTrajectory() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#0891B2';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * this.tTotal;
      const x = this.vx0 * t;
      const y = Math.max(0, this.vy0 * t - 0.5 * this.g * t * t);
      const scrX = this.toScreenX(x);
      const scrY = this.toScreenY(y);
      if (i === 0) ctx.moveTo(scrX, scrY);
      else ctx.lineTo(scrX, scrY);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawCannon() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.originX, this.originY);

    // Base Mount
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(0, 0, 14, Math.PI, 0, false);
    ctx.fill();

    // Rotated Barrel
    ctx.save();
    ctx.rotate(-this.theta); // Negative because canvas Y is down

    // Barrel body
    ctx.fillStyle = '#1E293B';
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(0, -6, 32, 12);
    ctx.strokeRect(0, -6, 32, 12);

    // Muzzle rim
    ctx.fillStyle = '#06B6D4';
    ctx.fillRect(30, -7.5, 4, 15);
    ctx.restore();

    // Pivot bolt
    ctx.fillStyle = '#94A3B8';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawKeyMarkers() {
    const ctx = this.ctx;
    ctx.save();

    // 1. Titik Puncak
    const peakX = this.toScreenX(this.vx0 * this.tPeak);
    const peakY = this.toScreenY(this.hMax);

    ctx.strokeStyle = '#A855F7';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(peakX, this.originY);
    ctx.lineTo(peakX, peakY);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.fillStyle = '#A855F7';
    ctx.beginPath();
    ctx.arc(peakX, peakY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Peak badge
    ctx.fillStyle = '#EDE9FE';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`H maks = ${this.hMax.toFixed(2)} m`, peakX - 40, peakY - 12);

    // 2. Jarak Maksimum R
    const endX = this.toScreenX(this.rangeMax);
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(endX, this.originY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FCA5A5';
    ctx.fillText(`R = ${this.rangeMax.toFixed(2)} m`, endX - 30, this.originY + 34);

    ctx.restore();
  }

  drawProjectileState() {
    const ctx = this.ctx;
    const t = isNaN(this.currentTime) ? 0 : this.currentTime;
    const currX = this.vx0 * t;
    const currY = Math.max(0, this.vy0 * t - 0.5 * this.g * t * t);
    const currVx = this.vx0;
    const currVy = this.vy0 - this.g * t;

    const scrX = this.toScreenX(currX);
    const scrY = this.toScreenY(currY);

    // Gambar jejak proyektil yang sedang terbang
    if (t > 0) {
      ctx.save();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#06B6D4';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const totalSegments = 100;
      const currentSegment = Math.min(totalSegments, Math.floor((t / this.tTotal) * totalSegments));
      for (let i = 0; i <= currentSegment; i++) {
        const stepT = (i / totalSegments) * this.tTotal;
        const tx = this.vx0 * stepT;
        const ty = Math.max(0, this.vy0 * stepT - 0.5 * this.g * stepT * stepT);
        const px = this.toScreenX(tx);
        const py = this.toScreenY(ty);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Draw Vector arrows if enabled
    if (this.showVectors) {
      const vScale = 1.8;
      // Vx
      this.drawVectorArrow(scrX, scrY, scrX + currVx * vScale, scrY, '#06B6D4', 'Vx');
      // Vy
      this.drawVectorArrow(scrX, scrY, scrX, scrY - currVy * vScale, '#A855F7', 'Vy');
      // Resultant V
      this.drawVectorArrow(scrX, scrY, scrX + currVx * vScale, scrY - currVy * vScale, '#10B981', 'v');
    }

    // Projectile Ball
    ctx.save();
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 14;

    const ballGradient = ctx.createRadialGradient(scrX - 3, scrY - 3, 2, scrX, scrY, 11);
    ballGradient.addColorStop(0, '#FEF08A');
    ballGradient.addColorStop(0.7, '#F59E0B');
    ballGradient.addColorStop(1, '#B45309');

    ctx.fillStyle = ballGradient;
    ctx.beginPath();
    ctx.arc(scrX, scrY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  drawVectorArrow(fromX, fromY, toX, toY, color, label) {
    const ctx = this.ctx;
    const headLength = 7;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length < 2) return;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(label, toX + 5, toY + (dy < 0 ? -4 : 10));
    ctx.restore();
  }

  drawHoverProbe() {
    const ctx = this.ctx;
    const hp = this.hoverPoint;

    ctx.save();
    // Indicator ring on curve
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(hp.scrX, hp.scrY, 7, 0, Math.PI * 2);
    ctx.stroke();

    // Tooltip popup
    const boxW = 160;
    const boxH = 90;
    const boxX = Math.min(hp.scrX + 12, this.width - boxW - 10);
    const boxY = Math.max(hp.scrY - boxH - 10, 10);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`Titik Posisi (Probe):`, boxX + 10, boxY + 18);

    ctx.font = '10px monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(`t  : ${hp.t.toFixed(2)} s`, boxX + 10, boxY + 34);
    ctx.fillText(`x  : ${hp.x.toFixed(2)} m`, boxX + 10, boxY + 48);
    ctx.fillText(`y  : ${hp.y.toFixed(2)} m`, boxX + 10, boxY + 62);
    ctx.fillText(`vx : ${hp.vx.toFixed(1)} | vy : ${hp.vy.toFixed(1)}`, boxX + 10, boxY + 76);

    ctx.restore();
  }

  updateTelemetryDOM() {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setVal('sim-vx0', this.vx0.toFixed(2));
    setVal('sim-vy0', this.vy0.toFixed(2));
    setVal('sim-tpeak', this.tPeak.toFixed(2));
    setVal('sim-ttotal', this.tTotal.toFixed(2));
    setVal('sim-hmax', this.hMax.toFixed(2));
    setVal('sim-range', this.rangeMax.toFixed(2));
  }

  updatePhysicsInsights() {
    const el = document.getElementById('sim-insight-note');
    if (!el) return;

    let insightText = '';
    if (this.angleDeg === 45) {
      insightText = '🎯 <strong>Kondisi Khusus 45°:</strong> Sudut elevasi 45° menghasilkan <em>jarak jangkauan terjauh (R maksimum)</em> untuk kecepatan awal yang diberikan (pada kondisi datar tanpa hambatan udara)!';
    } else if (this.angleDeg < 45) {
      insightText = `📈 <strong>Sudut Rendah (${this.angleDeg}°):</strong> Lintasan lebih mendatar, waktu di udara lebih singkat (${this.tTotal.toFixed(2)} s), dan tinggi maksimum lebih rendah (${this.hMax.toFixed(2)} m).`;
    } else {
      insightText = `🚀 <strong>Sudut Curam (${this.angleDeg}°):</strong> Benda melambung sangat tinggi (${this.hMax.toFixed(2)} m) dan berada di udara lebih lama (${this.tTotal.toFixed(2)} s), tetapi jangkauan horizontalnya lebih pendek.`;
    }

    el.innerHTML = insightText;
  }
}

window.ParabolaSimulator = ParabolaSimulator;

