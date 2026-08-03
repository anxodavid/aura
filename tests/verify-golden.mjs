// tests/verify-golden.mjs — criterio de aceptación de la migración al navegador.
// Ejecuta analyze() del cliente sobre los mismos textos que se enviaron al backend
// Express y exige que la salida sea idéntica byte a byte a la capturada en golden/.
// Cualquier diferencia es un bug de la migración, no una mejora.
//
//   node tests/verify-golden.mjs        (o: npm test, desde client/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyze } from '../client/src/analyzers/analyze.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const GOLDEN = path.join(HERE, 'golden');

const cases = JSON.parse(fs.readFileSync(path.join(GOLDEN, 'cases.json'), 'utf8'));

let failed = 0;

for (const c of cases) {
  const expected = fs.readFileSync(path.join(GOLDEN, `${c.name}.json`));
  const actual = Buffer.from(JSON.stringify(analyze(c.text, c.cliches), null, 2) + '\n', 'utf8');

  if (actual.equals(expected)) {
    console.log(`  ok   ${c.name}  (${expected.length} bytes idénticos)`);
    continue;
  }

  failed++;
  console.log(`  FAIL ${c.name}`);
  const e = expected.toString('utf8').split('\n');
  const a = actual.toString('utf8').split('\n');
  for (let i = 0; i < Math.max(e.length, a.length); i++) {
    if (e[i] !== a[i]) {
      console.log(`       línea ${i + 1}`);
      console.log(`       golden: ${JSON.stringify(e[i])}`);
      console.log(`       actual: ${JSON.stringify(a[i])}`);
    }
  }
}

// Las dos validaciones que en el backend eran HTTP 400 ahora lanzan Error
// con el mismo mensaje en castellano.
const errorCases = [
  { arg: undefined, mensaje: 'Texto inválido o ausente' },
  { arg: 42, mensaje: 'Texto inválido o ausente' },
  { arg: '   \n  ', mensaje: 'El texto está vacío' },
];

for (const { arg, mensaje } of errorCases) {
  let thrown = null;
  try {
    analyze(arg);
  } catch (e) {
    thrown = e;
  }
  if (thrown instanceof Error && thrown.message === mensaje) {
    console.log(`  ok   error ${JSON.stringify(arg)} -> "${mensaje}"`);
  } else {
    failed++;
    console.log(`  FAIL error ${JSON.stringify(arg)}: se esperaba "${mensaje}", se obtuvo ${thrown}`);
  }
}

// El análisis no puede hacer ni una sola petición de red. En vez de comprobarlo a ojo
// en la pestaña del navegador, se sabotean todas las APIs de red y se exige que el
// análisis siga dando exactamente el mismo resultado.
const apisDeRed = ['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'sendBeacon', 'navigator'];
const originales = {};
for (const api of apisDeRed) {
  originales[api] = globalThis[api];
  Object.defineProperty(globalThis, api, {
    configurable: true,
    get() {
      throw new Error(`el análisis intentó usar la red: ${api}`);
    },
  });
}

let redOk = true;
try {
  for (const c of cases) {
    const salida = JSON.stringify(analyze(c.text, c.cliches), null, 2) + '\n';
    const esperado = fs.readFileSync(path.join(GOLDEN, `${c.name}.json`), 'utf8');
    if (salida !== esperado) throw new Error(`${c.name}: salida distinta sin red`);
  }
} catch (e) {
  redOk = false;
  failed++;
  console.log(`  FAIL sin red: ${e.message}`);
} finally {
  for (const api of apisDeRed) {
    Object.defineProperty(globalThis, api, { configurable: true, writable: true, value: originales[api] });
  }
}
if (redOk) console.log(`  ok   sin red: ${cases.length} análisis con fetch/XHR/WebSocket/EventSource/navigator saboteados`);

console.log(
  failed === 0
    ? `\n${cases.length} golden + ${errorCases.length} validaciones + 0 red: todo idéntico al backend original.`
    : `\n${failed} comprobaciones fallidas.`
);
process.exit(failed === 0 ? 0 : 1);
