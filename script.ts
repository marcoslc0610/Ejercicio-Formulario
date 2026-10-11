function calcularCostoEmpresaA(minutos: number): number {
    const costeBase = 20;
    const minutosGratis = 1000;
    const costeExcesoMinuto = 0.08;
    const exceso = Math.max(0, minutos - minutosGratis);
    return costeBase + (exceso * costeExcesoMinuto);
}

function calcularCostoEmpresaB(minutos: number): number {
    const costeBase = 10;
    const minutosGratis = 500;
    const costeExcesoMinuto = 0.12;
    const exceso = Math.max(0, minutos - minutosGratis);
    return costeBase + (exceso * costeExcesoMinuto);
}

function calcularTarifas(event: Event): void {
    event.preventDefault();

    const min1Elem = document.getElementById('min1') as HTMLInputElement;
    const min2Elem = document.getElementById('min2') as HTMLInputElement;
    const min3Elem = document.getElementById('min3') as HTMLInputElement;

    if (!min1Elem || !min2Elem || !min3Elem) return;

    const meses = [
        { nombre: "Mes 1", minutos: parseFloat(min1Elem.value) || 0 },
        { nombre: "Mes 2", minutos: parseFloat(min2Elem.value) || 0 },
        { nombre: "Mes 3", minutos: parseFloat(min3Elem.value) || 0 }
    ];

    const container = document.getElementById('monthlyResultsContainer');
    if (!container) return;
    container.innerHTML = '';

    let totalA = 0;
    let totalB = 0;

    meses.forEach((mes) => {
        const costoA = calcularCostoEmpresaA(mes.minutos);
        const costoB = calcularCostoEmpresaB(mes.minutos);

        totalA += costoA;
        totalB += costoB;

        let ganadorMes = "";
        if (costoA < costoB) {
            ganadorMes = "Empresa A";
        } else if (costoB < costoA) {
            ganadorMes = "Empresa B";
        } else {
            ganadorMes = "Empate";
        }

        container.innerHTML += `
            <div class="month-result-row">
                <div class="month-result-info">
                    <strong>${mes.nombre}</strong> <span style="color: var(--text-muted); font-size: 0.85rem;">(${mes.minutos} min)</span>
                    <div class="month-result-details">
                        Empresa A: <strong>${costoA.toFixed(2)} €</strong> &nbsp;|&nbsp; Empresa B: <strong>${costoB.toFixed(2)} €</strong>
                    </div>
                </div>
                <div>
                    <span class="winner-badge">Mejor: ${ganadorMes}</span>
                </div>
            </div>
        `;
    });

    let recomendacionFinal = "";
    const diferencia = Math.abs(totalA - totalB);
    if (totalA < totalB) {
        recomendacionFinal = `La compañía que más te interesa es la <strong>Empresa A</strong> (Ahorras ${diferencia.toFixed(2)} € en total frente a la B).`;
    } else if (totalB < totalA) {
        recomendacionFinal = `La compañía que más te interesa es la <strong>Empresa B</strong> (Ahorras ${diferencia.toFixed(2)} € en total frente a la A).`;
    } else {
        recomendacionFinal = `Ambas compañías suponen exactamente el mismo coste total para los tres meses.`;
    }

    const summaryContainer = document.getElementById('globalSummaryContainer');
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <div class="summary-box">
                <h3>Veredicto Final</h3>
                <div class="summary-stats">
                    <span>Total Empresa A: <strong>${totalA.toFixed(2)} €</strong></span>
                    <span>Total Empresa B: <strong>${totalB.toFixed(2)} €</strong></span>
                </div>
                <p class="recommendation-text">${recomendacionFinal}</p>
            </div>
        `;
    }

    const resultsCard = document.getElementById('results');
    if (resultsCard) {
        resultsCard.style.display = 'block';
        resultsCard.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tariffForm');
    if (form) {
        form.addEventListener('submit', calcularTarifas);
    }
});