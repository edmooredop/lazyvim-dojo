// LazyVim Dojo — app: course stepper, key capture, drill (spaced repetition-ish), reference.
(() => {
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const KM = window.KEYMAPS || [];
const LESSONS = window.LESSONS;

// ---------------------------------------------------------------- persistence
const KEY = "lazyvim-dojo-v1";
const st = Object.assign({ done: {}, cur: LESSONS[0].id, drill: {}, scope: "learned" }, JSON.parse(localStorage.getItem(KEY) || "{}"));
const save = () => localStorage.setItem(KEY, JSON.stringify(st));

// ---------------------------------------------------------------- keys
// Parse a vim key notation string into tokens comparable with browser events.
const NAMED = { space: " ", leader: " ", esc: "Esc", cr: "Enter", enter: "Enter", tab: "Tab", bs: "Backspace", right: "ArrowRight", left: "ArrowLeft", up: "ArrowUp", down: "ArrowDown", "/": "/", "_": "/" };
function tokens(spec) {
  const out = [];
  for (let i = 0; i < spec.length; ) {
    if (spec[i] === "<") {
      const j = spec.indexOf(">", i);
      if (j > i + 1) {
        const inner = spec.slice(i + 1, j); i = j + 1;
        const m = inner.match(/^([CSAM])-(.+)$/i);
        if (m) {
          const mod = m[1].toUpperCase(), k = m[2];
          const base = NAMED[k.toLowerCase()] ?? (k.length === 1 ? k.toLowerCase() : k);
          if (mod === "S" && base.length === 1) out.push(base.toUpperCase());
          else out.push((mod === "M" ? "A" : mod) + "-" + base);
        } else out.push(NAMED[inner.toLowerCase()] ?? inner);
        continue;
      }
    }
    out.push(spec[i]); i++;
  }
  return out;
}
function evToken(e) {
  if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Dead"].includes(e.key)) return null;
  let k = e.key === "Escape" ? "Esc" : e.key;
  if (e.ctrlKey) { if (k === "_" || k === "?") k = "/"; return "C-" + (k.length === 1 ? k.toLowerCase() : k); }
  if (e.altKey) return "A-" + (k.length === 1 ? k.toLowerCase() : k);
  return k;
}
const label = (t) => {
  if (t === " ") return "Space";
  const m = t.match(/^([CA])-(.+)$/);
  const pretty = (x) => ({ ArrowRight: "→", ArrowLeft: "←", ArrowUp: "↑", ArrowDown: "↓" })[x] || x;
  if (m) return (m[1] === "C" ? "Ctrl-" : "Alt-") + pretty(m[2]);
  return pretty(t);
};
const kbds = (spec) => tokens(spec).map((t) => `<kbd>${esc(label(t))}</kbd>`).join("");

// Is this mapping present in the live dump of your nvim?
const norm = (s) => s.replace(/^<space>/i, "<leader>").replace(/<(space|leader)>/gi, (x) => x.toLowerCase() === "<leader>" ? "<leader>" : "<space>").replace(/<S-(\w)>/g, (_, c) => c.toUpperCase()).replace(/<C-_>/gi, "<C-/>").replace(/<([CAM])-(\w+)>/gi, (_, m, k) => "<" + m.toUpperCase() + "-" + k.toLowerCase() + ">").replace(/<(right|left|up|down|cr|esc|tab|bs)>/gi, (_, k) => "<" + k.toLowerCase() + ">");
const CTX = { global: "global", neotree: "neotree", lsp: "lua-buffer", git: "lua-buffer", term: "global" };
function live(step) {
  const ctx = CTX[step.src]; if (!ctx) return null;
  const want = norm(step.keys);
  return KM.find((m) => m.ctx === ctx && norm(m.lhs) === want) || null;
}

// one active key-capture at a time
let capture = null; // {want:[tokens], got:0, el, done()}
document.addEventListener("keydown", (e) => {
  if (!capture) return;
  if (e.target.tagName === "INPUT") return;
  const t = evToken(e); if (!t) return;
  e.preventDefault(); e.stopPropagation();
  const c = capture, slots = c.el.querySelectorAll(".slot");
  if (t === "Tab" && c.onTab && c.want[c.got] !== "Tab") { c.onTab(); return; }
  if (t === c.want[c.got]) {
    slots[c.got].className = "slot hit"; c.got++;
    if (c.got === c.want.length) { capture = null; setTimeout(() => c.done(true), 120); }
  } else {
    c.miss = (c.miss || 0) + 1;
    const s = slots[c.got]; s.className = "slot miss"; s.textContent = label(t);
    setTimeout(() => { if (s.className === "slot miss") { s.className = "slot"; s.textContent = "·"; } }, 600);
    // a wrong key restarts the sequence (like vim would)
    if (c.got) { slots.forEach((x, i) => { if (i < c.got) { x.className = "slot"; x.textContent = "·"; } }); c.got = 0; }
    if (c.onMiss) c.onMiss(c.miss);
  }
}, true);
function arm(el, spec, done, onMiss) {
  const want = tokens(spec);
  el.innerHTML = want.map(() => `<span class="slot">·</span>`).join("") + `<span class="hint">type it</span>`;
  capture = { want, got: 0, el, done, onMiss };
}
window.addEventListener("blur", () => { $("#fc").style.display = capture ? "block" : "none"; });
window.addEventListener("focus", () => { $("#fc").style.display = "none"; });

// ---------------------------------------------------------------- tabs
document.querySelectorAll("nav button").forEach((b) => b.onclick = () => tab(b.dataset.tab));
function tab(name) {
  capture = null;
  document.querySelectorAll("nav button").forEach((b) => b.classList.toggle("on", b.dataset.tab === name));
  for (const id of ["course", "drill", "ref"]) $("#" + id).style.display = id === name ? "grid" : "none";
  ({ course: renderCourse, drill: renderDrill, ref: renderRef })[name]();
}

// ---------------------------------------------------------------- course
const lessonDone = (L) => (st.done[L.id] || 0) >= L.steps.length;
function progress() {
  const n = LESSONS.filter(lessonDone).length;
  $("#prog").innerHTML = `<b>${n}</b>/${LESSONS.length} lessons`;
}
function renderList() {
  $("#lessonlist").innerHTML = LESSONS.map((L, i) => {
    const d = Math.min(st.done[L.id] || 0, L.steps.length), pct = Math.round((d / L.steps.length) * 100);
    return `<button class="l ${L.id === st.cur ? "cur" : ""} ${lessonDone(L) ? "done" : ""}" data-id="${L.id}">
      <span class="ck">${lessonDone(L) ? "✓" : pct ? pct + "%" : ""}</span>${i + 1}. ${esc(L.title)}<small>${esc(L.blurb)}</small>
      <div class="bar"><i style="width:${pct}%"></i></div></button>`;
  }).join("");
  document.querySelectorAll("aside .l").forEach((b) => b.onclick = () => { st.cur = b.dataset.id; save(); renderCourse(); });
  progress();
}
function renderCourse() {
  renderList();
  const L = LESSONS.find((x) => x.id === st.cur) || LESSONS[0];
  const idx = LESSONS.indexOf(L);
  const at = Math.min(st.done[L.id] || 0, L.steps.length);
  const box = $("#lesson");
  box.innerHTML = `<h2>${idx + 1}. ${esc(L.title)}</h2><p class="sub">${esc(L.blurb)}</p>` +
    L.steps.map((s, i) => stepHtml(s, i, at)).join("") +
    (at >= L.steps.length ? `<div class="done-banner">✓ Lesson complete. ${idx + 1 < LESSONS.length ? `<button class="go" id="next">Next: ${esc(LESSONS[idx + 1].title)} →</button>` : "You've finished the course. Use the Drill tab to keep the keys fresh."} <button class="go ghost" id="redo">Redo this lesson</button></div>` : "");
  box.querySelectorAll(".step").forEach((el) => wire(el, L));
  const nx = $("#next"); if (nx) nx.onclick = () => { st.cur = LESSONS[idx + 1].id; save(); renderCourse(); window.scrollTo(0, 0); };
  const rd = $("#redo"); if (rd) rd.onclick = () => { st.done[L.id] = 0; save(); renderCourse(); window.scrollTo(0, 0); };
  const cur = box.querySelector(".step.cur"); if (cur && at > 0) cur.scrollIntoView({ block: "center", behavior: "smooth" });
}
function stepHtml(s, i, at) {
  const cls = i < at ? "ok" : i === at ? "cur" : "future";
  if (s.t === "say") return `<div class="step ${cls}" data-i="${i}">${s.html}${i === at ? `<button class="go">Got it</button>` : ""}</div>`;
  if (s.t === "nvim") return `<div class="step ${cls}" data-i="${i}"><div class="tag n">▶ do it in nvim</div>${s.html}${i === at ? `<div><button class="go">Done it</button> <button class="go ghost skip">Skip for now</button></div>` : ""}</div>`;
  const lv = live(s);
  const src = lv ? `<span class="src live" title="found in your live keymaps">✓ in your config: “${esc(lv.desc)}”</span>`
    : { vim: "built-in vim", picker: "inside a picker", inside: "inside the window" }[s.src] ? `<span class="src">${({ vim: "built-in vim", picker: "inside a picker", inside: "inside the window" })[s.src]}</span>` : "";
  return `<div class="step ${cls}" data-i="${i}">${src}<div class="tag k">⌨ keys</div>
    <p class="say">${esc(s.say)}</p><div class="keys">${kbds(s.keys)}</div>
    ${i === at ? `<div class="typed"></div>` : ""}
    <div class="see">${s.see || "✓"}</div></div>`;
}
function wire(el, L) {
  if (!el.classList.contains("cur")) return;
  const i = +el.dataset.i, s = L.steps[i];
  const advance = () => { st.done[L.id] = i + 1; save(); renderCourse(); };
  if (s.t === "keys") {
    arm(el.querySelector(".typed"), s.keys, () => { el.classList.add("ok"); setTimeout(advance, s.see ? 900 : 300); },
      (miss) => { if (miss >= 3) el.querySelector(".hint").innerHTML = `stuck? <a href="#" class="sk">skip</a>`; const a = el.querySelector(".sk"); if (a) a.onclick = (e) => { e.preventDefault(); capture = null; advance(); }; });
  } else {
    el.querySelector(".go").onclick = advance;
    const sk = el.querySelector(".skip"); if (sk) sk.onclick = advance;
  }
}

// ---------------------------------------------------------------- drill
// Cards are every "keys" step. Each card keeps a box (0..5); misses send it back to 0.
const CARDS = LESSONS.flatMap((L) => L.steps.filter((s) => s.t === "keys").map((s) => ({ id: L.id + ":" + s.keys + ":" + s.say, lesson: L.id, ...s })));
let card = null, streak = 0, seen = 0, right = 0;
function pool() {
  const learned = CARDS.filter((c) => (st.done[c.lesson] || 0) > 0);
  return st.scope === "all" || !learned.length ? CARDS : learned;
}
function pick() {
  const p = pool();
  const w = p.map((c) => { const b = st.drill[c.id]?.box ?? 0; return c === card ? 0 : Math.pow(2, 5 - Math.min(b, 5)); });
  let r = Math.random() * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < p.length; i++) { r -= w[i]; if (r <= 0) return p[i]; }
  return p[0];
}
function renderDrill() {
  const p = pool();
  const strong = p.filter((c) => (st.drill[c.id]?.box ?? 0) >= 3).length;
  card = pick();
  const box = $("#drillbox");
  box.innerHTML = `<h2>Drill</h2><p class="sub">Read the action and type the keys. Cards you miss come back more often. A few minutes a day is plenty.</p>
    <div class="opts"><label><input type="radio" name="sc" value="learned" ${st.scope !== "all" ? "checked" : ""}> lessons I've started</label>
    <label><input type="radio" name="sc" value="all" ${st.scope === "all" ? "checked" : ""}> everything</label></div>
    <div class="card"><div class="tag">${esc(LESSONS.find((l) => l.id === card.lesson).title)}</div>
      <p class="say">${esc(card.say)}</p><div class="typed"></div><div class="ans"></div>
      <button class="go ghost" id="reveal">show me (Tab)</button></div>
    <div class="stats"><div><b>${right}/${seen}</b>this session</div><div><b>${streak}</b>streak</div><div><b>${strong}/${p.length}</b>cards known well</div></div>
    <button class="go ghost" id="rst">reset drill stats</button>`;
  box.querySelectorAll("input[name=sc]").forEach((r) => r.onchange = () => { st.scope = r.value; save(); renderDrill(); });
  $("#rst").onclick = () => { if (confirm("Reset drill stats?")) { st.drill = {}; save(); renderDrill(); } };
  let missed = false;
  const reveal = () => { missed = true; box.querySelector(".ans").innerHTML = kbds(card.keys) + `<div class="hint" style="margin-top:8px">${card.see || ""}</div>`; };
  $("#reveal").onclick = reveal;
  const t = box.querySelector(".typed");
  const go = () => arm(t, card.keys, () => {
    const d = (st.drill[card.id] = st.drill[card.id] || { box: 0 });
    seen++;
    if (missed) { d.box = 0; streak = 0; } else { d.box++; streak++; right++; }
    save();
    box.querySelector(".card").style.borderColor = missed ? "var(--orange)" : "var(--green)";
    setTimeout(renderDrill, missed ? 1100 : 450);
  }, (m) => { if (m >= 2) reveal(); });
  go();
  capture.onTab = reveal;
}

// ---------------------------------------------------------------- reference
let refCtx = "all";
const TAUGHT = new Set(CARDS.map((c) => norm(c.keys)));
const GROUPS = { b: "buffer", c: "code", d: "debug", f: "file/find", g: "git", q: "quit/session", s: "search", u: "ui toggles", w: "windows", x: "diagnostics", "<tab>": "tabs" };
function groupOf(m) {
  if (m.ctx === "neotree") return "neo-tree";
  if (m.ctx === "lua-buffer") return "lsp";
  const g = m.lhs.match(/^<leader>(<tab>|.)/i);
  if (g) return GROUPS[g[1].toLowerCase()] || "leader";
  return "other";
}
function renderRef() {
  const box = $("#refbox");
  const groups = ["all", ...new Set(KM.filter((m) => m.mode === "n").map(groupOf))];
  box.innerHTML = `<h2>Reference</h2><p class="sub">Every normal-mode mapping from a live dump of LazyVim (run <code>./practice --keys</code> to replace it with your own config). <span style="color:var(--green)">●</span> marks keys the course covers. Inside nvim, <kbd>Space</kbd><kbd>s</kbd><kbd>k</kbd> searches the same list.</p>
    <input id="q" placeholder="search: split, buffer, rename, <leader>g …" autofocus>
    <div class="chips">${groups.map((g) => `<button data-g="${g}" class="${g === refCtx ? "on" : ""}">${g}</button>`).join("")}</div>
    <div class="count"></div><table><tbody></tbody></table>`;
  const draw = () => {
    const q = $("#q").value.toLowerCase().trim();
    const rows = KM.filter((m) => m.mode === "n" && m.desc && (refCtx === "all" || groupOf(m) === refCtx) &&
      (!q || (m.lhs + " " + m.desc).toLowerCase().includes(q)))
      .sort((a, b) => groupOf(a).localeCompare(groupOf(b)) || a.lhs.localeCompare(b.lhs));
    box.querySelector(".count").textContent = rows.length + " mappings";
    box.querySelector("tbody").innerHTML = rows.map((m) => `<tr class="${TAUGHT.has(norm(m.lhs)) ? "taught" : ""}"><td>${kbds(m.lhs)}</td><td>${esc(m.desc)}</td><td class="ctx">${groupOf(m)}</td></tr>`).join("");
  };
  $("#q").oninput = draw;
  box.querySelectorAll(".chips button").forEach((b) => b.onclick = () => { refCtx = b.dataset.g; renderRef(); });
  draw();
}

renderCourse();
})();
