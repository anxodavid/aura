// tests/capture-golden.cjs — captura de referencia contra el backend Express original.
// Arranca server/src/server.js, envía cada caso de golden/cases.json a /api/analyze
// y guarda la respuesta completa en golden/<name>.json.
//
// PROVENIENCIA: este script produjo los ficheros de golden/ y ya no se puede ejecutar:
// el directorio server/ se borró al completar la migración al navegador (recuperable
// desde el historial de git). Se conserva para documentar de dónde salen los golden.
// El test vivo es tests/verify-golden.mjs.
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.join(__dirname, '..');
const GOLDEN = path.join(__dirname, 'golden');
const PORT = 3001;

const cases = JSON.parse(fs.readFileSync(path.join(GOLDEN, 'cases.json'), 'utf8'));

function waitForServer(timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        await fetch(`http://127.0.0.1:${PORT}/api/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: 'ping' }),
        });
        return resolve();
      } catch (e) {
        if (Date.now() > deadline) return reject(new Error('el servidor no arrancó'));
        setTimeout(tick, 200);
      }
    };
    tick();
  });
}

(async () => {
  const server = spawn(process.execPath, [path.join(ROOT, 'server', 'src', 'server.js')], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', (d) => process.stdout.write(`[server] ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));

  try {
    await waitForServer();

    for (const c of cases) {
      const res = await fetch(`http://127.0.0.1:${PORT}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: c.text, cliches: c.cliches }),
      });
      if (!res.ok) throw new Error(`${c.name}: HTTP ${res.status}`);
      const body = await res.json();
      const out = path.join(GOLDEN, `${c.name}.json`);
      fs.writeFileSync(out, JSON.stringify(body, null, 2) + '\n', 'utf8');
      console.log(
        `${c.name.padEnd(26)} score=${String(body.score).padStart(3)} ` +
          `${body.label.padEnd(26)} b=${body.kpis.burstiness.status} ` +
          `s=${body.kpis.specificity.status} f=${body.kpis.forensics.status} ` +
          `e=${body.kpis.structure.status} c=${body.kpis.cliches.status} ` +
          `hl=${body.highlights.length}`
      );
    }
    console.log('\ngolden capturado en tests/golden/');
  } finally {
    server.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
