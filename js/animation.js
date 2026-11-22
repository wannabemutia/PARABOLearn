/**
 * PARABOLearn - Animation Engine
 * Visualisasi gerak parabola halus berbasis Canvas dengan Play, Pause, Replay, dan Vektor Real-time.
 */

class ParabolaAnimator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Default Physics Parameters
    this.v0 = 25; // m/s
    this.angleDeg = 45; // derajat
    this.g = 9.8; // m/s^2

    // Animation state
    this.currentTime = 0; // detik fisis
    this.isPlaying = false;
    this.speedMultiplier = 1.0;
    this.showVectors = true;
    this.showTrail = true;
    this.lastTimestamp = null;
    this.animationFrameId = null;

    // Derived physics values
    this.calculatePhysics();

    // Setup viewport
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());

    // Initial draw and HUD update
    this.draw();
    this.updateHUD();
  }

  calculatePhysics() {
    this.theta = (this.angleDeg * Math.PI) / 180;
    this.vx0 = this.v0 * Math.cos(this.theta);
    this.vy0 = this.v0 * Math.sin(this.theta);

    this.tPeak = this.vy0 / this.g;
    this.tTotal = (2 * this.vy0) / this.g;
    this.hMax = (this.vy0 * this.vy0) / (2 * this.g);
    this.rangeMax = (this.v0 * this.v0 * Math.sin(2 * this.theta)) / this.g;
  }

  handleResize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 800;
    this.height = rect.height || 420;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    // Padding inside canvas
    this.padLeft = 70;
    this.padRight = 50;
    this.padBottom = 60;
    this.padTop = 50;

    // Compute coordinate scaling
    const plotWidth = this.width - this.padLeft - this.padRight;
    const plotHeight = this.height - this.padTop - this.padBottom;

    // Scale so max range and max height fit comfortably
    const scaleX = plotWidth / Math.max(this.rangeMax * 1.15, 30);
    const scaleY = plotHeight / Math.max(this.hMax * 1.3, 15);
    this.scale = Math.min(scaleX, scaleY);

    this.originX = this.padLeft;
    this.originY = this.height - this.padBottom;

    this.draw();
  }

  toScreenX(physicsX) {
    return this.originX + physicsX * this.scale;
  }

  toScreenY(physicsY) {
    return this.originY - physicsY * this.scale;
  }

  start() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    // Jika waktu sudah mencapai akhir atau tidak valid, ulangi dari 0
    if (this.currentTime >= this.tTotal || isNaN(this.currentTime)) {
      this.currentTime = 0;
    }
    this.isPlaying = true;
    this.lastTimestamp = null;
    if (window.SoundEffects) SoundEffects.playLaunch();
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

  reset() {
    this.pause();
    this.currentTime = 0;
    this.draw();
    this.updateHUD();
  }

  setSpeed(speed) {
    this.speedMultiplier = speed;
  }

  setParameters(v0, angleDeg) {
    this.v0 = v0;
    this.angleDeg = angleDeg;
    this.calculatePhysics();
    this.handleResize();
    this.reset();
  }

  loop(timestamp) {
    if (!this.isPlaying) return;

    if (!timestamp) timestamp = performance.now();
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;

    let dt = (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;

    // Batasi dt jika terjadi lag atau tab tidak aktif agar animasi tetap stabil
    if (isNaN(dt) || dt <= 0 || dt > 0.1) {
      dt = 1 / 60;
    }

    // Majukan waktu fisik proyektil
    this.currentTime += dt * this.speedMultiplier;

    if (this.currentTime >= this.tTotal) {
      this.currentTime = this.tTotal;
      this.isPlaying = false;
      this.animationFrameId = null;
      this.draw();
      this.updateHUD();
      if (window.SoundEffects) SoundEffects.playCorrect();
      return;
    }

    this.draw();
    this.updateHUD();

    if (this.isPlaying) {
      this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Gambar kisi dan latar koordinat
    this.drawGrid();

    // 2. Gambar garis lintasan parabola teoretis
    this.drawTheoreticalPath();

    // 3. Gambar penanda titik kritis (Awal, Puncak, Akhir)
    this.drawKeyMarkers();

    // 4. Gambar posisi bola proyektil, jejak lintasan, & panah vektor
    this.drawCurrentState();
  }

  drawGrid() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    ctx.font = '11px monospace';
    ctx.fillStyle = '#64748B';

    const meterStep = this.scale > 8 ? 5 : (this.scale > 3 ? 10 : 20);

    // Garis kisi vertikal (Sumbu X)
    for (let x = 0; x <= this.rangeMax * 1.25; x += meterStep) {
      const scrX = this.toScreenX(x);
      if (scrX > this.width - 20) break;

      ctx.beginPath();
      ctx.moveTo(scrX, this.padTop);
      ctx.lineTo(scrX, this.originY);
      ctx.stroke();

      ctx.fillText(`${x}m`, scrX - 8, this.originY + 18);
    }

    // Garis kisi horizontal (Sumbu Y)
    for (let y = 0; y <= this.hMax * 1.4; y += meterStep) {
      const scrY = this.toScreenY(y);
      if (scrY < this.padTop - 10) break;

      ctx.beginPath();
      ctx.moveTo(this.originX, scrY);
      ctx.lineTo(this.width - this.padRight, scrY);
      ctx.stroke();

      if (y > 0) ctx.fillText(`${y}m`, this.originX - 35, scrY + 4);
    }

    // Landasan tanah
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(this.originX - 20, this.originY, this.width, 4);

    // Sumbu X & Y
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.originX, this.originY);
    ctx.lineTo(this.width - 20, this.originY);
    ctx.stroke();
    ctx.fillStyle = '#38BDF8';
    ctx.fillText('X (meter)', this.width - 55, this.originY - 8);

    ctx.beginPath();
    ctx.moveTo(this.originX, this.originY);
    ctx.lineTo(this.originX, 20);
    ctx.stroke();
    ctx.fillText('Y (meter)', this.originX + 8, 28);

    ctx.restore();
  }

  drawTheoreticalPath() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 6]);

    ctx.beginPath();
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * this.tTotal;
      const x = this.vx0 * t;
      const y = this.vy0 * t - 0.5 * this.g * t * t;
      const scrX = this.toScreenX(x);
      const scrY = this.toScreenY(Math.max(0, y));

      if (i === 0) ctx.moveTo(scrX, scrY);
      else ctx.lineTo(scrX, scrY);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawKeyMarkers() {
    const ctx = this.ctx;
    ctx.save();

    // 1. Titik Awal (0, 0)
    const startX = this.toScreenX(0);
    const startY = this.toScreenY(0);
    ctx.fillStyle = '#3B82F6';
    ctx.beginPath();
    ctx.arc(startX, startY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#93C5FD';
    ctx.fillText('Titik Awal (0,0)', startX - 20, startY + 32);

    // 2. Titik Puncak (H maks)
    const peakX = this.toScreenX(this.vx0 * this.tPeak);
    const peakY = this.toScreenY(this.hMax);

    ctx.strokeStyle = '#A855F7';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(peakX, this.originY);
    ctx.lineTo(peakX, peakY);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.fillStyle = '#A855F7';
    ctx.beginPath();
    ctx.arc(peakX, peakY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#E9D5FF';
    ctx.fillText(`Puncak (H = ${this.hMax.toFixed(1)}m)`, peakX - 45, peakY - 14);

    // 3. Titik Akhir / Jarak Maksimum
    const endX = this.toScreenX(this.rangeMax);
    const endY = this.toScreenY(0);
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(endX, endY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FCA5A5';
    ctx.fillText(`Titik Jatuh (R = ${this.rangeMax.toFixed(1)}m)`, endX - 45, endY + 32);

    ctx.restore();
  }

  drawCurrentState() {
    const ctx = this.ctx;
    const t = isNaN(this.currentTime) ? 0 : this.currentTime;
    const currX = this.vx0 * t;
    const currY = Math.max(0, this.vy0 * t - 0.5 * this.g * t * t);
    const currVx = this.vx0;
    const currVy = this.vy0 - this.g * t;
    const currV = Math.sqrt(currVx * currVx + currVy * currVy);

    const scrX = this.toScreenX(currX);
    const scrY = this.toScreenY(currY);

    // Gambar jejak lintasan yang telah dilalui
    if (this.showTrail && t > 0) {
      ctx.save();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#0284C7';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const totalSegments = 120;
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

    // Gambar panah vektor
    if (this.showVectors) {
      const vectorScale = 1.8;
      // Vektor Vx (horizontal cyan)
      this.drawArrow(scrX, scrY, scrX + currVx * vectorScale, scrY, '#06B6D4', 'Vx');

      // Vektor Vy (vertikal ungu)
      const vyScreenLen = -currVy * vectorScale;
      this.drawArrow(scrX, scrY, scrX, scrY + vyScreenLen, '#A855F7', 'Vy');

      // Vektor kecepatan total v (hijau)
      this.drawArrow(scrX, scrY, scrX + currVx * vectorScale, scrY + vyScreenLen, '#22C55E', 'v');
    }

    // Gambar bola proyektil
    ctx.save();
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 12;
    const gradient = ctx.createRadialGradient(scrX - 3, scrY - 3, 2, scrX, scrY, 11);
    gradient.addColorStop(0, '#FEF08A');
    gradient.addColorStop(0.6, '#F59E0B');
    gradient.addColorStop(1, '#D97706');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(scrX, scrY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  drawArrow(fromX, fromY, toX, toY, color, label) {
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
    ctx.lineWidth = 2.2;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Kepala panah
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    // Label teks
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(label, toX + 6, toY + (dy < 0 ? -4 : 12));
    ctx.restore();
  }

  updateHUD() {
    const t = isNaN(this.currentTime) ? 0 : this.currentTime;
    const x = this.vx0 * t;
    const y = Math.max(0, this.vy0 * t - 0.5 * this.g * t * t);
    const vx = this.vx0;
    const vy = this.vy0 - this.g * t;
    const v = Math.sqrt(vx * vx + vy * vy);

    const setElemText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setElemText('hud-time', t.toFixed(2) + ' s');
    setElemText('hud-x', x.toFixed(2) + ' m');
    setElemText('hud-y', y.toFixed(2) + ' m');
    setElemText('hud-vx', vx.toFixed(2) + ' m/s');
    setElemText('hud-vy', vy.toFixed(2) + ' m/s');
    setElemText('hud-v', v.toFixed(2) + ' m/s');
  }
}

// Global initialization helper for animation page
window.ParabolaAnimator = ParabolaAnimator;
