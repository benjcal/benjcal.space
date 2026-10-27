import * as d3 from "/vendor/d3-7.9.0.mjs";

const BITS = 8;
const SAMPLES_PER_CYCLE = 24;

const WIDTH = 760;
const HEIGHT = 200;
const MARGIN = { top: 16, right: 8, bottom: 52, left: 30 };

const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
const midY = MARGIN.top + plotHeight / 2;
const amplitude = plotHeight / 2 - 6;

const x = d3.scaleLinear().domain([0, BITS]).range([MARGIN.left, WIDTH - MARGIN.right]);
const slotWidth = x(1) - x(0);

const line = d3.line();

function bitsOf(value) {
  return d3.range(BITS).map((i) => (value >> (BITS - 1 - i)) & 1);
}

function carrierPath(bits, cycles) {
  const samples = cycles * SAMPLES_PER_CYCLE;
  const points = [];
  bits.forEach((bit, index) => {
    for (let sample = 0; sample <= samples; sample++) {
      const t = sample / samples;
      points.push([
        x(index + t),
        midY - bit * amplitude * Math.sin(2 * Math.PI * cycles * t),
      ]);
    }
  });
  return line(points);
}

function envelopePath(bits) {
  const segments = [];
  bits.forEach((bit, index) => {
    const top = midY - bit * amplitude;
    const bottom = midY + bit * amplitude;
    segments.push(`M${x(index)},${top}H${x(index + 1)}`);
    segments.push(`M${x(index)},${bottom}H${x(index + 1)}`);
  });
  return segments.join("");
}

const root = document.querySelector('[data-widget="modulation"]');
if (root) init(root);

const frictionRoot = document.querySelector('[data-widget="friction"]');
if (frictionRoot) initFriction(frictionRoot);

function init(root) {
  const state = { value: 0b10110010, cycles: 3 };

  const controls = document.createElement("div");
  controls.className = "widget-controls";
  controls.innerHTML = `
    <label class="widget-field">
      <span class="widget-label">value</span>
      <input class="widget-input" type="number" min="0" max="255" step="1" inputmode="numeric" />
    </label>
    <label class="widget-field">
      <span class="widget-label">frequency</span>
      <input class="widget-range" type="range" min="1" max="12" step="1" value="${state.cycles}" aria-label="Waves per bit" />
      <span class="widget-value"><span data-cycles></span> waves / bit</span>
    </label>
    <p class="widget-readout">
      <span data-dec></span><span class="widget-unit">dec</span>
      <span class="widget-unit">&middot;</span>
      <span data-hex></span><span class="widget-unit">hex</span>
    </p>`;
  root.append(controls);

  const input = controls.querySelector(".widget-input");
  const range = controls.querySelector(".widget-range");
  const cycles = controls.querySelector("[data-cycles]");
  const dec = controls.querySelector("[data-dec]");
  const hex = controls.querySelector("[data-hex]");

  const svg = d3
    .select(root)
    .append("svg")
    .attr("class", "widget-plot")
    .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
    .attr("role", "img")
    .attr(
      "aria-label",
      "Wave amplitude across eight time slots: bits set to one switch the wave on, zero switches it off.",
    );

  const grid = svg.append("g");

  grid
    .selectAll("line.widget-slot")
    .data(d3.range(BITS + 1))
    .join("line")
    .attr("class", "widget-slot")
    .attr("x1", (d) => x(d))
    .attr("x2", (d) => x(d))
    .attr("y1", MARGIN.top)
    .attr("y2", midY + amplitude + 6);

  grid
    .selectAll("line.widget-level")
    .data([-1, 1])
    .join("line")
    .attr("class", "widget-level")
    .attr("x1", MARGIN.left)
    .attr("x2", WIDTH - MARGIN.right)
    .attr("y1", (d) => midY - d * amplitude)
    .attr("y2", (d) => midY - d * amplitude);

  grid
    .append("line")
    .attr("class", "widget-zero")
    .attr("x1", MARGIN.left)
    .attr("x2", WIDTH - MARGIN.right)
    .attr("y1", midY)
    .attr("y2", midY);

  svg
    .append("g")
    .selectAll("text")
    .data([
      { y: midY - amplitude, text: "+1" },
      { y: midY, text: "0" },
      { y: midY + amplitude, text: "−1" },
    ])
    .join("text")
    .attr("class", "widget-axis-label")
    .attr("x", MARGIN.left - 8)
    .attr("y", (d) => d.y)
    .attr("dy", "0.32em")
    .text((d) => d.text);

  const envelope = svg.append("path").attr("class", "widget-envelope");
  const wave = svg.append("path").attr("class", "widget-wave");

  const chipTop = midY + amplitude + 16;
  const chipHeight = 24;
  const chipPad = 6;
  const chipWidth = slotWidth - 2 * chipPad;

  const chips = svg
    .append("g")
    .selectAll("g")
    .data(d3.range(BITS))
    .join("g")
    .attr("class", "widget-chip")
    .attr("role", "button")
    .attr("tabindex", 0)
    .attr("transform", (i) => `translate(${x(i) + chipPad},${chipTop})`);

  chips
    .append("rect")
    .attr("width", chipWidth)
    .attr("height", chipHeight)
    .attr("rx", 6);

  chips
    .append("text")
    .attr("class", "widget-chip-value")
    .attr("x", chipWidth / 2)
    .attr("y", chipHeight / 2)
    .attr("dy", "0.35em");

  svg
    .append("g")
    .selectAll("text")
    .data(d3.range(BITS))
    .join("text")
    .attr("class", "widget-chip-index")
    .attr("x", (i) => x(i) + slotWidth / 2)
    .attr("y", chipTop + chipHeight + 12)
    .text((i) => `bit ${BITS - 1 - i}`);

  function toggle(index) {
    setValue(state.value ^ (1 << (BITS - 1 - index)));
  }

  chips.on("click", (event, index) => toggle(index));
  chips.on("keydown", (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(index);
    }
  });

  input.addEventListener("input", () => {
    const next = Number.parseInt(input.value, 10);
    if (Number.isNaN(next) || next < 0 || next > 255) return;
    setValue(next, { syncInput: false });
  });

  input.addEventListener("change", () => {
    const next = Number.parseInt(input.value, 10);
    setValue(Number.isNaN(next) ? 0 : next);
  });

  range.addEventListener("input", () => {
    state.cycles = Number.parseInt(range.value, 10);
    render();
  });

  function setValue(value, { syncInput = true } = {}) {
    state.value = Math.max(0, Math.min(255, value));
    if (syncInput) input.value = String(state.value);
    render();
  }

  function render() {
    const bits = bitsOf(state.value);

    wave.attr("d", carrierPath(bits, state.cycles));
    envelope.attr("d", envelopePath(bits));

    chips
      .classed("is-set", (i) => bits[i] === 1)
      .attr("aria-pressed", (i) => String(bits[i] === 1))
      .attr("aria-label", (i) => `Bit ${BITS - 1 - i}`)
      .select("text.widget-chip-value")
      .text((i) => bits[i]);

    cycles.textContent = String(state.cycles);
    dec.textContent = String(state.value);
    hex.textContent = `0x${state.value.toString(16).toUpperCase().padStart(2, "0")}`;
  }

  setValue(state.value);
}

function initFriction(root) {
  const width = 760;
  const height = 200;
  const railLeft = 72;
  const railRight = 688;
  const railY = 92;
  const padWidth = 26;
  const padHeight = 34;
  const buckets = 64;
  const bucketWidth = (railRight - railLeft) / buckets;
  const maxHeat = 56;
  const heatGain = 0.1;

  const center = (railLeft + railRight) / 2;
  const state = { x: center, origin: center, rubbed: 0 };
  const heat = new Array(buckets).fill(0);

  const controls = document.createElement("div");
  controls.className = "widget-controls";
  controls.innerHTML = `
    <button class="widget-button" type="button" data-cool>cool it</button>
    <p class="widget-readout">
      <span data-rubbed>0</span><span class="widget-unit">rubbed</span>
      <span class="widget-unit">&middot;</span>
      <span data-net>0</span><span class="widget-unit">net</span>
    </p>`;
  root.append(controls);

  const rubbedOut = controls.querySelector("[data-rubbed]");
  const netOut = controls.querySelector("[data-net]");
  const cool = controls.querySelector("[data-cool]");

  const svg = d3
    .select(root)
    .append("svg")
    .attr("class", "widget-plot")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "group")
    .attr(
      "aria-label",
      "A pad you drag along a surface. The surface heats up as you rub, even if the pad returns to where it started.",
    );

  svg
    .append("line")
    .attr("class", "widget-wire")
    .attr("x1", railLeft)
    .attr("x2", railRight)
    .attr("y1", railY)
    .attr("y2", railY);

  for (const x of [railLeft, railRight]) {
    svg
      .append("line")
      .attr("class", "widget-wire")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", railY - 5)
      .attr("y2", railY + 5);
  }

  const bars = svg
    .append("g")
    .selectAll("rect")
    .data(heat)
    .join("rect")
    .attr("class", "widget-heat")
    .attr("x", (d, i) => railLeft + i * bucketWidth + 0.5)
    .attr("y", railY + 6)
    .attr("width", bucketWidth - 1);

  const pad = svg
    .append("g")
    .attr("class", "widget-hand")
    .attr("role", "slider")
    .attr("tabindex", 0)
    .attr("aria-label", "Rubbing pad")
    .attr("aria-valuemin", 0)
    .attr("aria-valuemax", 100);

  pad
    .append("rect")
    .attr("class", "widget-hand-hit")
    .attr("x", -padWidth / 2 - 10)
    .attr("y", -padHeight - 14)
    .attr("width", padWidth + 20)
    .attr("height", padHeight + 14)
    .attr("fill", "transparent");

  pad
    .append("rect")
    .attr("x", -padWidth / 2)
    .attr("y", -padHeight - 6)
    .attr("width", padWidth)
    .attr("height", padHeight)
    .attr("rx", 3);

  for (const y of [-33, -23, -13]) {
    pad
      .append("line")
      .attr("class", "widget-hand-grip")
      .attr("x1", -6)
      .attr("x2", 6)
      .attr("y1", y)
      .attr("y2", y);
  }

  const minX = railLeft + padWidth / 2;
  const maxX = railRight - padWidth / 2;

  function heatScaleFor(theme) {
    const styles = getComputedStyle(theme);
    const stop = (name) => styles.getPropertyValue(name).trim();
    const up = d3.interpolateLab(
      stop("--widget-heat-low"),
      stop("--widget-heat-mid"),
    );
    const down = d3.interpolateLab(
      stop("--widget-heat-mid"),
      stop("--widget-heat-high"),
    );
    return (t) => (t < 0.65 ? up(t / 0.65) : down((t - 0.65) / 0.35));
  }

  let heatScale = heatScaleFor(document.documentElement);

  new MutationObserver(() => {
    heatScale = heatScaleFor(document.documentElement);
    render();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  let cooling = null;
  let cooledAt = 0;

  function startCooling() {
    if (cooling) return;
    cooledAt = performance.now();
    cooling = d3.timer(() => {
      const now = performance.now();
      const dt = Math.min(0.12, (now - cooledAt) / 1000);
      cooledAt = now;
      const factor = Math.exp(-dt / 7);

      let total = 0;
      for (let i = 0; i < buckets; i++) {
        heat[i] *= factor;
        if (heat[i] < 0.004) heat[i] = 0;
        total += heat[i];
      }

      render();

      if (total === 0) {
        cooling.stop();
        cooling = null;
      }
    });
  }

  function rub(from, to) {
    const lo = Math.min(from, to);
    const hi = Math.max(from, to);
    const first = Math.max(0, Math.floor((lo - railLeft) / bucketWidth));
    const last = Math.min(buckets - 1, Math.floor((hi - railLeft) / bucketWidth));
    const share =
      (Math.abs(to - from) / bucketWidth / (last - first + 1)) * heatGain;
    for (let i = first; i <= last; i++) {
      heat[i] = Math.min(1, heat[i] + share);
    }
  }

  function moveTo(next) {
    const x = Math.max(minX, Math.min(maxX, next));
    if (x === state.x) return;
    rub(state.x, x);
    state.rubbed += Math.abs(x - state.x);
    state.x = x;
    startCooling();
    render();
  }

  pad.call(d3.drag().on("drag", (event) => moveTo(state.x + event.dx)));

  pad.on("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTo(state.x - 6);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTo(state.x + 6);
    }
  });

  cool.addEventListener("click", () => {
    heat.fill(0);
    render();
  });

  function render() {
    pad
      .attr("transform", `translate(${state.x},${railY})`)
      .attr(
        "aria-valuenow",
        Math.round(((state.x - minX) / (maxX - minX)) * 100),
      );

    bars
      .attr("height", (d, i) => heat[i] * maxHeat)
      .attr("fill", (d, i) => heatScale(heat[i]))
      .attr("fill-opacity", (d, i) => 0.35 + heat[i] * 0.65);

    rubbedOut.textContent = String(Math.round(state.rubbed / 10));

    const net = Math.round((state.x - state.origin) / 10);
    netOut.textContent = net === 0 ? "0" : `${net > 0 ? "+" : "\u2212"}${Math.abs(net)}`;
  }

  render();
}
