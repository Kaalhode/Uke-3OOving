async function fetchViews() {
    const response = await fetch('/views', {
        headers: {
            'session-id': localStorage.getItem('session-id') || ''
        }
    });

    const data = await response.json();
    document.getElementById('views-count').innerText = data.views;
    
    const sessionId = response.headers.get('Set-Session-Id');
    if (sessionId) {
        localStorage.setItem('session-id', sessionId);
    }
}

window.onload = fetchViews;