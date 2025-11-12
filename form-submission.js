let form = document.querySelector('.skins-form');
let skinsTable = document.querySelector('.skins-table');
let clearButton = document.querySelector('.clear');
let template = document.querySelector('#table-row-template');
let editingIndex = null;

document.addEventListener('DOMContentLoaded', function () {
    const savedData = JSON.parse(localStorage.getItem('skinsCollection')) || [];
    savedData.forEach((skin, index) => addTableRow(skin, index));
})

// JS валидация данных
function validateFormData(name, weapon, quality, exterior, price) {
    const errors = [];

    if (!name || name.trim() === '') {
        errors.push('Name is required');
    } else if (name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!weapon || weapon === '') {
        errors.push('Weapon must be selected');
    }

    if (!quality) {
        errors.push('Quality must be selected');
    }

    if (!exterior || exterior === '') {
        errors.push('Exterior must be selected');
    }

    if (!price || price === '') {
        errors.push('Price is required');
    } else {
        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum < 0) {
            errors.push('Price must be a valid positive number');
        }
    }

    return errors;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.querySelector('.name-input').value.trim();
    let weapon = document.querySelector('.weapon-select').value;
    let qualityRadio = document.querySelector('.radio-input:checked');
    let quality = qualityRadio ? qualityRadio.value : null;
    let exterior = document.querySelector('.exterior-select').value;
    let price = document.querySelector('.price-input').value;

    // JS валидация
    const validationErrors = validateFormData(name, weapon, quality, exterior, price);
    if (validationErrors.length > 0) {
        alert('Validation errors:\n' + validationErrors.join('\n'));
        return;
    }

    const newSkin = { name, weapon, quality, exterior, price };

    const currentData = JSON.parse(localStorage.getItem('skinsCollection')) || [];

    if (editingIndex !== null) {
        // Редактирование существующего элемента
        currentData[editingIndex] = newSkin;
        editingIndex = null;
        document.querySelector('.save').textContent = 'Save';
    } else {
        // Добавление нового элемента
        currentData.push(newSkin);
    }

    localStorage.setItem('skinsCollection', JSON.stringify(currentData));

    // Перерисовываем таблицу
    skinsTable.innerHTML = '';
    currentData.forEach((skin, index) => addTableRow(skin, index));

    form.reset();
});

skinsTable.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const row = event.target.closest('.table-row');
        const index = Array.from(skinsTable.children).indexOf(row);

        const currentData = JSON.parse(localStorage.getItem('skinsCollection')) || [];
        currentData.splice(index, 1);
        localStorage.setItem('skinsCollection', JSON.stringify(currentData));

        row.remove();
    } else if (event.target.classList.contains('edit')) {
        const row = event.target.closest('.table-row');
        const index = Array.from(skinsTable.children).indexOf(row);

        const currentData = JSON.parse(localStorage.getItem('skinsCollection')) || [];
        const skin = currentData[index];

        // Заполняем форму данными для редактирования
        document.querySelector('.name-input').value = skin.name;
        document.querySelector('.weapon-select').value = skin.weapon;
        
        // Устанавливаем выбранный radio для quality
        const qualityRadios = document.querySelectorAll('.radio-input');
        qualityRadios.forEach(radio => {
            if (radio.value === skin.quality) {
                radio.checked = true;
            }
        });

        document.querySelector('.exterior-select').value = skin.exterior;
        document.querySelector('.price-input').value = skin.price;

        // Сохраняем индекс редактируемого элемента
        editingIndex = index;

        // Меняем текст кнопки
        document.querySelector('.save').textContent = 'Update';

        // Прокручиваем к форме
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

clearButton.addEventListener('click', function(event) {
    event.preventDefault();
    form.reset();
    editingIndex = null;
    document.querySelector('.save').textContent = 'Save';
});

function addTableRow(skin, index) {
    // Клонируем template
    const clone = template.content.cloneNode(true);
    const row = clone.querySelector('.table-row');
    
    // Заполняем данные
    row.querySelector('.table-cell-name').textContent = skin.name;
    row.querySelector('.table-cell-weapon').textContent = skin.weapon;
    row.querySelector('.table-cell-quality').textContent = skin.quality;
    row.querySelector('.table-cell-exterior').textContent = skin.exterior;
    row.querySelector('.table-cell-price').textContent = skin.price;

    // Сохраняем индекс в data-атрибуте для удобства
    row.setAttribute('data-index', index);

    skinsTable.appendChild(clone);
}
