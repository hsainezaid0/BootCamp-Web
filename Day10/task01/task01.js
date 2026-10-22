const form = document.getElementById('form');

async function sendForm(event) { // async to use await inside the function
    // Empecher le rechargement de la page.
    event.preventDefault();

    // Recuperer le champ et preparer les donnees a envoyer.
    const value = document.getElementById('name').value;
    const parameters = new URLSearchParams();//kanwjdo le nom for transmission.
    parameters.append('name', value); //kanwjdo le nom for transmission.

    try {
        const response = await fetch('task01.php?' + parameters); //Hadi katseft demande l-PHP.
        const data = await response.json();
                                              // // Work that might fail.
        if (!response.ok) {
            alert(data.error);
            return;
        }

        alert(data.name);
    } catch (error) {            // // What to do if it fails.
        alert('An error occurred: ' + error.message);
    }
}

form.addEventListener('submit', sendForm);
