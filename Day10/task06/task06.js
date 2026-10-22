const form = document.getElementById('form');
const status = document.getElementById('status');

async function sendForm(event) {
    event.preventDefault();
    // Bloquer un deuxieme envoi pendant le traitement du premier.
    const button = form.querySelector('button');
    button.disabled = true;
    status.textContent = 'Loading...';
    status.className = 'mt-3';

    const parameters = new URLSearchParams();
    parameters.append('type', document.getElementById('type').value);
    parameters.append('brand', document.getElementById('brand').value);
    parameters.append('price', document.getElementById('price').value);
    parameters.append('number', document.getElementById('number').value);

    try {
        const response = await fetch('task06.php', {
            method: 'POST',
            body: parameters
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
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
