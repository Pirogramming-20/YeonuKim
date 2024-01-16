function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function togglePickBtn(){
    document.querySelectorAll('.pick-btn').forEach((button) =>{
        const ideaId = button.getAttribute('button-pk');
        const url = `pick/${ideaId}/`;
        button.addEventListener('click', () => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
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
}

function changeInterest() {
    document.querySelectorAll('.interest-container').forEach((container) => {
        const minusBtn = container.children[0];
        const plusBtn = container.children[2];
        const interestValue = container.children[1];
        const ideaId = container.getAttribute('button-pk');
        const plusUrl = `/idea/${ideaId}/add_interest/`;
        const minusUrl = `/idea/${ideaId}/minus_interest/`;

        plusBtn.addEventListener('click', () => {
            if (parseInt(interestValue.innerText) < 5){
                fetch(plusUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                    body: JSON.stringify({}),
                })
                .then(response => response.json())
                .then(data => {
                    interestValue.innerText = data.interest_status;
                });
            }
        });

        minusBtn.addEventListener('click', () => {
            if (parseInt(interestValue.innerText) > 0){
                fetch(minusUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                    body: JSON.stringify({}),
                })
                .then(response => response.json())
                .then(data => {
                    interestValue.innerText = data.interest_status;
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    togglePickBtn();
    changeInterest();
});
