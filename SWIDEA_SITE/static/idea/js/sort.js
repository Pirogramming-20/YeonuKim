function sendSortRequest(keyword){
    const resultContainer = document.getElementById('idea-container')
    const sortForm = document.getElementById('sort-form');
    const url = `/?order=${encodeURIComponent(keyword.value)}`;
    fetch(url,{
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        resultContainer.innerHTML = data.html_from_view;
    })
}

function sortIdea() {
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', ()=>{        
        sendSortRequest(sortSelect);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    sortIdea();
});