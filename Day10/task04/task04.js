const form = document.getElementById('form');
const typeInput = document.getElementById('type');
const brandInput = document.getElementById('brand');
const typeStatus = document.getElementById('type-status');
const brandStatus = document.getElementById('brand-status');
let lastRequest = 0;

function showValidation(element, result) {
    element.textContent = result.message;

    if (result.valid) {
        element.className = 'text-success';
    } else {
        element.className = 'text-danger';
    }
}

async function validateFields() {
    // Le numero permet d'ignorer les anciennes reponses si on tape vite.
    lastRequest = lastRequest + 1;
    const requestNumber = lastRequest;
    const parameters = new URLSearchParams();
    parameters.append('type', typeInput.value);
    parameters.append('brand', brandInput.value);

    try {
        const response = await fetch('task04.php?' + parameters);
        const data = await response.json();

        if (requestNumber !== lastRequest) {
            return;
        }
        if (!response.ok) {
            throw new Error(data.error);
        }

        showValidation(typeStatus, data.type);
        showValidation(brandStatus, data.brand);
    } catch (error) {
        if (requestNumber !== lastRequest) {
            return;
        }
        typeStatus.textContent = 'An error occurred: ' + error.message;
        brandStatus.textContent = 'An error occurred: ' + error.message;
        typeStatus.className = 'text-danger';
        brandStatus.className = 'text-danger';
    }
}

function stopSubmit(event) {
    event.preventDefault();
}

form.addEventListener('submit', stopSubmit);
typeInput.addEventListener('input', validateFields);
brandInput.addEventListener('input', validateFields);
validateFields();
