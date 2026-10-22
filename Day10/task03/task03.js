const button = document.getElementById('load');
const table = document.getElementById('countries');
const status = document.getElementById('status');

async function loadCountries() {
    button.disabled = true;

    try {
        const response = await fetch('../countries.json');

        if (!response.ok) {
            throw new Error('Could not load countries.');
        }

        const countries = await response.json();
        table.textContent = '';
        let count = 0;

        // countries contient des paires : code du pays / nom du pays.
        for (const code in countries) {
            const row = table.insertRow();
            row.insertCell().textContent = code;
            row.insertCell().textContent = countries[code];
            count = count + 1;
        }

        status.textContent = count + ' countries loaded.';
    } catch (error) {
        status.textContent = error.message;
    }

    button.disabled = false;
}

button.addEventListener('click', loadCountries);
