const steps = ['Medidas', 'Material', 'Proceso', 'Resumen'];

const materiales = [
  { id: 1, nombre: 'Acero', espesorMin: 1, espesorMax: 20, unidadEspesor: 'mm' },
  { id: 2, nombre: 'Aluminio', espesorMin: 0.5, espesorMax: 15, unidadEspesor: 'mm' },
  { id: 3, nombre: 'MDF', espesorMin: 3, espesorMax: 30, unidadEspesor: 'mm' },
];

const procesos = [
  { id: 1, nombre: 'Láser', costoMaquinaMin: 3.5, desperdicioPorcentaje: 0.05 },
  { id: 2, nombre: 'Corte plasma', costoMaquinaMin: 2.8, desperdicioPorcentaje: 0.08 },
  { id: 3, nombre: 'Router CNC', costoMaquinaMin: 2.2, desperdicioPorcentaje: 0.03 },
];

const state = {
  step: 0,
  data: {
    ancho: 500,
    alto: 400,
    espesor: 5,
    unidadDimension: 'mm',
    tiempoEstimadoMin: 10,
    insumos: 50,
    desperdicio: 20,
    margen: 0.2,
    materialId: 1,
    procesoId: 1,
  },
  error: '',
};

function setError(message = '') {
  state.error = message;
  const errorBox = document.getElementById('error');
  if (errorBox) {
    errorBox.textContent = message;
  }
}

function renderStepper() {
  const stepper = document.getElementById('stepper');
  stepper.innerHTML = '';
  steps.forEach((title, index) => {
    const div = document.createElement('div');
    div.className = `step ${index === state.step ? 'active' : ''} ${index < state.step ? 'done' : ''}`;
    div.textContent = `${index + 1}. ${title}`;
    stepper.appendChild(div);
  });
}

function validate() {
  setError('');
  const { ancho, alto, espesor, materialId } = state.data;
  const material = materiales.find((m) => m.id === Number(materialId));
  if (!material) return false;
  if (ancho <= 0 || alto <= 0) {
    setError('Las dimensiones deben ser mayores que cero');
    return false;
  }
  if (ancho > 3000 || alto > 3000) {
    setError('Las dimensiones exceden el máximo de 3000mm');
    return false;
  }
  if (espesor < material.espesorMin || espesor > material.espesorMax) {
    setError(`Espesor permitido para ${material.nombre}: ${material.espesorMin}-${material.espesorMax}${material.unidadEspesor}`);
    return false;
  }
  return true;
}

function calcularCosto() {
  const proceso = procesos.find((p) => p.id === Number(state.data.procesoId));
  if (!proceso) return 0;
  const desperdicioFactor = 1 + proceso.desperdicioPorcentaje;
  const base =
    state.data.tiempoEstimadoMin * proceso.costoMaquinaMin +
    state.data.insumos +
    state.data.desperdicio * desperdicioFactor;
  return base * (1 + state.data.margen);
}

function renderMedidas() {
  return `
    <div class="form-grid">
      <div>
        <label>Ancho (mm)</label>
        <input type="number" id="ancho" value="${state.data.ancho}" />
      </div>
      <div>
        <label>Alto (mm)</label>
        <input type="number" id="alto" value="${state.data.alto}" />
      </div>
      <div>
        <label>Espesor (mm)</label>
        <input type="number" id="espesor" value="${state.data.espesor}" />
      </div>
    </div>`;
}

function renderMateriales() {
  const options = materiales
    .map((m) => `<option value="${m.id}" ${m.id === Number(state.data.materialId) ? 'selected' : ''}>${m.nombre}</option>`) 
    .join('');
  return `
    <div>
      <label>Material</label>
      <select id="material">${options}</select>
      <p class="badge">Respeta el espesor permitido por material</p>
    </div>`;
}

function renderProcesos() {
  const options = procesos
    .map(
      (p) => `<option value="${p.id}" ${p.id === Number(state.data.procesoId) ? 'selected' : ''}>${p.nombre} · $${p.costoMaquinaMin}/min</option>`,
    )
    .join('');
  return `
    <div class="form-grid">
      <div>
        <label>Proceso</label>
        <select id="proceso">${options}</select>
      </div>
      <div>
        <label>Tiempo estimado (min)</label>
        <input type="number" id="tiempo" value="${state.data.tiempoEstimadoMin}" />
      </div>
      <div>
        <label>Insumos ($)</label>
        <input type="number" id="insumos" value="${state.data.insumos}" />
      </div>
      <div>
        <label>Desperdicio ($)</label>
        <input type="number" id="desperdicio" value="${state.data.desperdicio}" />
      </div>
      <div>
        <label>Margen (%)</label>
        <input type="number" id="margen" value="${state.data.margen * 100}" />
      </div>
    </div>`;
}

function renderResumen() {
  const material = materiales.find((m) => m.id === Number(state.data.materialId));
  const proceso = procesos.find((p) => p.id === Number(state.data.procesoId));
  const costo = calcularCosto();
  return `
    <div class="summary">
      <p><strong>Dimensiones:</strong> ${state.data.ancho} x ${state.data.alto} x ${state.data.espesor} ${state.data.unidadDimension}</p>
      <p><strong>Material:</strong> ${material?.nombre}</p>
      <p><strong>Proceso:</strong> ${proceso?.nombre}</p>
      <p><strong>Tiempo estimado:</strong> ${state.data.tiempoEstimadoMin} min</p>
      <p><strong>Insumos:</strong> $${state.data.insumos.toFixed(2)}</p>
      <p><strong>Desperdicio:</strong> $${state.data.desperdicio.toFixed(2)}</p>
      <p><strong>Margen:</strong> ${(state.data.margen * 100).toFixed(1)}%</p>
      <hr />
      <h2>Total estimado: $${costo.toFixed(2)}</h2>
    </div>`;
}

function render() {
  renderStepper();
  const content = document.getElementById('content');
  const views = [renderMedidas, renderMateriales, renderProcesos, renderResumen];
  content.innerHTML = `${views[state.step]()}<div id="error" class="error">${state.error}</div>`;
  attachHandlers();
  document.getElementById('prev').disabled = state.step === 0;
  document.getElementById('next').textContent = state.step === steps.length - 1 ? 'Confirmar' : 'Siguiente';
}

function attachHandlers() {
  const { data } = state;
  const ids = ['ancho', 'alto', 'espesor', 'material', 'proceso', 'tiempo', 'insumos', 'desperdicio', 'margen'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.oninput = (e) => {
      const value = Number(e.target.value);
      switch (id) {
        case 'ancho':
        case 'alto':
        case 'espesor':
          data[id] = value;
          break;
        case 'material':
          data.materialId = Number(e.target.value);
          break;
        case 'proceso':
          data.procesoId = Number(e.target.value);
          break;
        case 'tiempo':
          data.tiempoEstimadoMin = value;
          break;
        case 'insumos':
          data.insumos = value;
          break;
        case 'desperdicio':
          data.desperdicio = value;
          break;
        case 'margen':
          data.margen = value / 100;
          break;
        default:
          break;
      }
    };
  });
}

function nextStep() {
  if (!validate()) return;
  state.step = Math.min(state.step + 1, steps.length - 1);
  render();
}

function prevStep() {
  state.step = Math.max(state.step - 1, 0);
  render();
}

document.getElementById('next').onclick = nextStep;
document.getElementById('prev').onclick = prevStep;

render();
