const requestLike = new XMLHttpRequest()

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const onClickLike = (id) => {
    const url = 'like/';
    requestLike.open('POST', url, true);
    requestLike.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );
    requestLike.setRequestHeader(
        'X-CSRFToken',
        getCookie('csrftoken')
    );
    requestLike.send(JSON.stringify({id:id}))
}

requestLike.onreadystatechange = ()=>{
    if (requestLike.readyState === XMLHttpRequest.DONE && requestLike.status < 400) {
        const {id, count} = JSON.parse(requestLike.response);
        const likeBtn = document.getElementById(`like-button-${id}`);

        likeBtn.innerText = `${count}`;
    }   
}