// Random helper
function randRange(min, max, decimals = 0) {
  const v = Math.random() * (max - min) + min;
  const f = Math.pow(10, decimals);
  return Math.round(v * f) / f;
}

// Sparkline drawing (neon glow line)
function drawSparkline(canvas, history, color = "#39ff14") {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  // clear
  ctx.clearRect(0, 0, w, h);

  // baseline
  ctx.strokeStyle = "rgba(57,255,20,0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  if (history.length < 2) return;

  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = Math.max(1e-6, max - min);

  // main line
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.beginPath();

  history.forEach((val, i) => {
    const x = (i / (history.length - 1)) * w;
    const yNorm = (val - min) / range;
    const y = h - yNorm * (h - 8) - 4; // padding
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // secondary glow pass
  ctx.shadowBlur = 24;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(57,255,20,0.35)";
  ctx.beginPath();
  history.forEach((val, i) => {
    const x = (i / (history.length - 1)) * w;
    const yNorm = (val - min) / range;
    const y = h - yNorm * (h - 8) - 4;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

// pH bars animation: map pH (4.5–8.0) to 0–100%
function setPhBars(ph) {
  const bars = [
    document.getElementById("ph-bar-1"),
    document.getElementById("ph-bar-2"),
    document.getElementById("ph-bar-3"),
    document.getElementById("ph-bar-4"),
    document.getElementById("ph-bar-5"),
  ];

  const norm = (ph - 4.5) / (8.0 - 4.5); // 0..1
  bars.forEach((el, i) => {
    // subtle variance for visual interest
    const variance = Math.sin((norm + i * 0.18) * Math.PI) * 0.28 + 0.72;
    const height = Math.max(8, Math.min(100, Math.round(100 * norm * variance)));
    el.style.height = height + "%";
    el.style.filter = `drop-shadow(0 0 ${6 + Math.round(10 * norm)}px rgba(57,255,20,0.7))`;
  });
}

// Histories for sparklines
const moistureHistory = new Array(30).fill(50);
const tempHistory = new Array(30).fill(25);

// HiDPI scaling for crisp lines
function scaleCanvas(canvas) {
  const ratio = Math.ceil(window.devicePixelRatio || 1);
  const w = canvas.width;
  const h = canvas.height;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

// Update loop every 2 seconds
function update() {
  // Moisture: 30–70
  const moisture = randRange(30, 70, 0);
  document.getElementById("moisture-value").textContent = moisture;
  moistureHistory.push(moisture);
  if (moistureHistory.length > 40) moistureHistory.shift();
  drawSparkline(document.getElementById("moisture-spark"), moistureHistory);

  // Soil pH: 4.5–8.0
  const ph = randRange(4.5, 8.0, 1);
  document.getElementById("ph-value").textContent = ph.toFixed(1);
  setPhBars(ph);

  // Temperature: 10–40
  const temp = randRange(10, 40, 1);
  document.getElementById("temp-value").textContent = temp.toFixed(1);
  tempHistory.push(temp);
  if (tempHistory.length > 40) tempHistory.shift();
  drawSparkline(document.getElementById("temp-spark"), tempHistory);

  // NPK: N 5–20, P 2–10, K 5–20
  const n = randRange(5, 20, 0);
  const p = randRange(2, 10, 0);
  const k = randRange(5, 20, 0);
  document.getElementById("npk-n").textContent = n;
  document.getElementById("npk-p").textContent = p;
  document.getElementById("npk-k").textContent = k;
}

window.addEventListener("DOMContentLoaded", () => {
  // scale canvases for crisp lines
  const moistureCanvas = document.getElementById("moisture-spark");
  const tempCanvas = document.getElementById("temp-spark");
  scaleCanvas(moistureCanvas);
  scaleCanvas(tempCanvas);

  // initial draw and start interval
  drawSparkline(moistureCanvas, moistureHistory);
  drawSparkline(tempCanvas, tempHistory);

  update();
  setInterval(update, 2000);
});
