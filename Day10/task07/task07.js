const form = document.getElementById('form');
const messages = document.getElementById('messages');
const status = document.getElementById('status');
let loading = false;
let refreshFailed = false;

async function loadMessages() {
    // Eviter deux chargements de l'historique en meme temps.
    if (loading) {
        return;
    }
    loading = true;

    try {
        const response = await fetch('task07.php', {cache: 'no-store'});
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        const atBottom = messages.scrollHeight - messages.scrollTop - messages.clientHeight < 30;
        messages.textContent = '';

        for (let i = 0; i < data.messages.length; i = i + 1) {
            const message = data.messages[i];
            const article = document.createElement('article');
            article.className = 'chat-message';

            const author = document.createElement('strong');
            author.textContent = message.name;
            const time = document.createElement('small');
            time.className = 'ms-3 text-secondary';
            time.textContent = message.created_at + ' UTC';
            const text = document.createElement('p');
            // textContent affiche le message sans executer du HTML.
            text.textContent = message.message;

            article.appendChild(author);
            article.appendChild(time);
            article.appendChild(text);
            messages.appendChild(article);
        }

        if (data.messages.length === 0) {
            messages.textContent = 'No messages yet. Start the conversation!';
        }
        if (atBottom) {
            messages.scrollTop = messages.scrollHeight;
        }
        if (refreshFailed) {
            status.textContent = '';
            refreshFailed = false;
        }
    } catch (error) {
        status.textContent = 'Could not refresh: ' + error.message;
        status.className = 'text-danger';
        refreshFailed = true;
    }

    loading = false;
}

async function sendMessage(event) {
    event.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;

    const parameters = new URLSearchParams();
    parameters.append('name', document.getElementById('name').value);
    parameters.append('message', document.getElementById('message').value);

    try {
        const response = await fetch('task07.php', {
            method: 'POST',
            body: parameters
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        document.getElementById('message').value = '';
        refreshFailed = false;
        status.textContent = data.message;
        status.className = 'text-success';
        await loadMessages();
    } catch (error) {
        status.textContent = error.message;
        status.className = 'text-danger';
    }

    button.disabled = false;
}

form.addEventListener('submit', sendMessage);
loadMessages();
// 4000 millisecondes = 4 secondes.
setInterval(loadMessages, 4000);
