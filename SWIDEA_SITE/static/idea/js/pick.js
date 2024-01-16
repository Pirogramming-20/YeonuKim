document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pick-btn').forEach((button) =>{
        const ideaId = button.getAttribute('button-pk');
        const url = `pick/${ideaId}/`;
        button.addEventListener('click', () => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                button.innerText = data.pick_status ? 'Pick' : 'Unpick';
            });
        });
    })
});
