const form = document.getElementById('form');

async function sendForm(event) {
    // Empecher le rechargement de la page.
    event.preventDefault();

    // Recuperer le champ et preparer les donnees a envoyer.
    const value = document.getElementById('email').value;
    const parameters = new URLSearchParams();
    parameters.append('email', value);

    try {
        const response = await fetch('task02.php', {
            method: 'POST',
            body: parameters
        });
        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        }

        alert(data.message);
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
}

form.addEventListener('submit', sendForm);
