const requestLike = new XMLHttpRequest();
const requestComment = new XMLHttpRequest();
const requestDelete = new XMLHttpRequest();

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
    requestLike.send(JSON.stringify({id:id}));
}

requestLike.onreadystatechange = ()=>{
    if (requestLike.readyState === XMLHttpRequest.DONE && requestLike.status < 400) {
        const {id, state} = JSON.parse(requestLike.response);
        const likeBtn = document.getElementById(`like-button-${id}`);

        if (state === true)
        likeBtn.innerText = `좋아요 취소`;
        else
        likeBtn.innerText = `좋아요`;
    }   
}

const onClickComment = (id) => {
    const url = '/create/comment/';
    const content = document.getElementById('comment-content').value;
    
    requestComment.open('POST', url, true);    
    requestComment.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );
    requestComment.setRequestHeader(
        'X-CSRFToken',
        getCookie('csrftoken')
    );

    const context = {
        id: id,
        content: content,
    }
    requestComment.send(JSON.stringify(context));

    document.getElementById('comment-content').value = '';
}

requestComment.onreadystatechange = ()=>{
    if (requestComment.readyState === XMLHttpRequest.DONE && requestComment.status < 400) {
        const {id, new_comment} = JSON.parse(requestComment.response);
        const container = document.getElementById(`comment-container`);

        const li = document.createElement('li');
        li.id = `comment-${new_comment.id}`
        li.innerHTML = `
        <span>${new_comment.content}</span>
        <button class='comment-delete-button' onClick='onClickDelete(${new_comment.id})'>댓글 삭제</button>
        `;
        container.appendChild(li);
    }   
}

const onClickDelete = (id) => {
    const url = '/delete/comment/';
    const comment = document.getElementById(`comment-${id}`);

    requestDelete.open('POST', url, true);    
    requestDelete.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );
    requestDelete.setRequestHeader(
        'X-CSRFToken',
        getCookie('csrftoken')
    );

    const context = {
        id: id,
    }
    requestDelete.send(JSON.stringify(context));
}

requestDelete.onreadystatechange = ()=>{
    if (requestDelete.readyState === XMLHttpRequest.DONE && requestDelete.status < 400) {
        const {id} = JSON.parse(requestDelete.response);
        const comment = document.getElementById(`comment-${id}`);
        const container = comment.parentElement;

        container.removeChild(comment);
    }   
}
