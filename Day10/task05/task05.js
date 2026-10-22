const form = document.getElementById('form');
const status = document.getElementById('status');
const table = document.getElementById('results');

async function sendForm(event) {
    event.preventDefault();
    // Bloquer un deuxieme envoi pendant le traitement du premier.
    const button = form.querySelector('button');
    button.disabled = true;
    table.textContent = '';
    status.textContent = 'Loading...';
    status.className = 'mt-3';

    const parameters = new URLSearchParams();
    parameters.append('type', document.getElementById('type').value);
    parameters.append('brand', document.getElementById('brand').value);
    parameters.append('price', document.getElementById('price').value);
    parameters.append('number', document.getElementById('number').value);

    try {
        const response = await fetch('task05.php?' + parameters);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        // Une ligne par produit, avec les cinq colonnes demandees.
        for (let i = 0; i < data.products.length; i = i + 1) {
            const product = data.products[i];
            const row = table.insertRow();
            row.insertCell().textContent = product.type;
            row.insertCell().textContent = product.brand;
            row.insertCell().textContent = product.price;
            row.insertCell().textContent = product.number;
            row.insertCell().textContent = product.stock;
        }

        status.textContent = data.message;
        status.className = 'mt-3 text-success';
    } catch (error) {
        status.textContent = error.message;
        status.className = 'mt-3 text-danger';
    }

    button.disabled = false;
}

form.addEventListener('submit', sendForm);
