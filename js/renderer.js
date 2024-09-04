document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('main-table');
    let sourceCell = null;

    const correctPositions = {
        'Desarrollar el acta de constitución del proyecto': '0-0',
        'Desarrollar el Plan para la Dirección del Proyecto': '0-1',
        'Dirigir y gestionar el trabajo del proyecto': '0-2',
        'Monitorear y controlar el trabajo del proyecto': '0-3',
        'Cerrar el proyecto o fase': '0-4',

        'Planificar la gestión del alcance': '1-1',
        'Recopilar requisitos': '1-1',
        'Definir el alcance': '1-1',
        'Crear la EDT/WBS': '1-1',
        'Verificar el alcance': '1-3',
        'Controlar el alcance': '1-3',

        'Planificar la gestión del cronograma': '2-1',
        'Definir las actividades': '2-1',
        'Secuenciar las actividades': '2-1',
        'Estimar la duración de las actividades': '2-1',
        'Desarrollar el cronograma': '2-1',
        'Controlar el cronograma': '2-3',

        'Planificar la gestión de los costos': '3-1',
        'Estimar los costos': '3-1',
        'Determinar el presupuesto': '3-1',
        'Controlar los costos': '3-3',

        'Planificar la gestión de la calidad': '4-1',
        'Gestionar la calidad': '4-2',
        'Controlar la calidad': '4-3',

        'Planificar la gestión de los recursos': '5-1',
        'Estimar los recursos de las actividades': '5-1',
        'Adquirir recursos': '5-2',
        'Desarrollar el equipo': '5-2',
        'Dirigir el equipo': '5-2',
        'Controlar los recursos': '5-3',

        'Planificar la gestión de las comunicaciones': '6-1',
        'Gestionar las comunicaciones': '6-2',
        'Monitorizar las comunicaciones': '6-3',

        'Planificar la gestión de los riesgos': '7-1',
        'Identificar los riesgos': '7-1',
        'Realizar el análisis cualitativo de riesgos': '7-1',
        'Realizar el análisis cuantitativo de riesgos': '7-1',
        'Planificar la respuesta a los riesgos': '7-1',
        'Implementar la respuesta a los riesgos': '7-2',
        'Monitorear los riesgos': '7-3',

        'Planificar la gestión de adquisiciones del proyecto': '8-1',
        'Efectuar las adquisiciones': '8-2',
        'Controlar las adquisiciones': '8-3',

        'Identificar a los interesados': '9-0',
        'Planificar la participación de los interesados': '9-1',
        'Gestionar la participación de los interesados': '9-2',
        'Monitorizar la participación de los interesados': '9-3'
    };

    const rows = [
        'Gestión de la integración del proyecto',
        'Gestión del alcance del proyecto',
        'Gestión del cronograma del proyecto',
        'Gestión de los costos del proyecto',
        'Gestión de la calidad del proyecto',
        'Gestión de los recursos del proyecto',
        'Gestión de las comunicaciones del proyecto',
        'Gestión de los riesgos del proyecto',
        'Gestión de las adquisiciones del proyecto',
        'Gestión de los interesados del proyecto'
    ]

    const colums = [
        'Gestión de procesos de iniciación',
        'Gestión de procesos de planificación',
        'Gestión de procesos de ejecución',
        'Gestión de procesos de monitoreo y control',
        'Gestión de procesos de cierre'
    ]

    // Lista de procesos del PMBOK en español (vacía inicialmente)
    let pmbokProcesses = Object.keys(correctPositions);

    // Mezclar los procesos aleatoriamente
    pmbokProcesses = pmbokProcesses.sort(() => Math.random() - 0.5);

    // Crear las cards para los procesos del PMBOK
    const cardsContainer = document.getElementById('cards-container');
    pmbokProcesses.forEach((process, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.draggable = true;
        card.id = process;
        card.textContent = process;
        cardsContainer.appendChild(card);
    });

    // Crear los encabezados de columna
    const headerRow = document.createElement('tr');
    const emptyHeader = document.createElement('th'); // Celda vacía para la esquina superior izquierda
    headerRow.appendChild(emptyHeader);
    for (let j = 0; j < 5; j++) {
        const header = document.createElement('th');
        header.textContent = colums[j]; // Título de cada columna
        headerRow.appendChild(header);
    }
    table.appendChild(headerRow);

    // Crear una tabla de 10 filas y 5 columnas con encabezados de fila
    for (let i = 0; i < rows.length; i++) {
        const row = document.createElement('tr');

        // Crear encabezado de fila
        const rowHeader = document.createElement('th');
        rowHeader.textContent = rows[i]; // Título de cada fila
        row.appendChild(rowHeader);

        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('td');
            cell.id = `${i}-${j}`;

            cell.addEventListener('dragover', (event) => {
                event.preventDefault();
            });

            cell.addEventListener('drop', (event) => {
                event.preventDefault();
                const cardId = event.dataTransfer.getData('text');
                const card = document.getElementById(cardId);

                if (!cell.contains(card)) {
                    cell.appendChild(card);
                }

                updateCellColor(cell);
            });

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    function handleMouseMove(event) {
        const windowHeight = window.innerHeight;
        const mouseY = event.clientY;
        const scrollOffset = 20; // Velocidad de desplazamiento

        // Si el puntero está cerca del borde inferior, desplaza hacia abajo
        if (mouseY > windowHeight - 50) {
            window.scrollBy(0, scrollOffset);
        }
    }

    document.addEventListener('mousemove', handleMouseMove);

    function updateCellStyle(cell) {
        const cardsInCell = Array.from(cell.children);
        const allCorrect = cardsInCell.every(card => correctPositions[card.textContent] === cell.id);

        if (cardsInCell.length === 0) {
            cell.classList.remove('correct', 'incorrect');
        } else if (allCorrect) {
            cell.classList.add('correct');
            cell.classList.remove('incorrect');
        } else {
            cell.classList.add('incorrect');
            cell.classList.remove('correct');
        }
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('dragstart', (event) => {
            sourceCell = card.parentElement;
            event.dataTransfer.setData('text', event.target.id);
        });

        card.addEventListener('dragend', () => {
            if (sourceCell && sourceCell !== card.parentElement) {
                updateCellColor(sourceCell);
            }
        });
    });

    function updateCellColor(cell) {
        const cardsInCell = cell.querySelectorAll('.card');
        let allCorrect = true;

        cardsInCell.forEach(card => {
            const correctPosition = correctPositions[card.id];
            if (correctPosition !== cell.id) {
                allCorrect = false;
            }
        });

        if (cardsInCell.length === 0) {
            cell.classList.remove('correct', 'incorrect');
        } else if (allCorrect) {
            cell.classList.add('correct');
            cell.classList.remove('incorrect');
        } else {
            cell.classList.add('incorrect');
            cell.classList.remove('correct');
        }
    }
});
