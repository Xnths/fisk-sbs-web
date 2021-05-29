const txt_title = document.getElementById('title');
const txt_message = document.getElementById('message');
const txt_author = document.getElementById('author');
const btn_post = document.getElementById('post');

btn_post.addEventListener('click', (event) => {
    event.preventDefault();

    const title = txt_title.value;
    const message = txt_message.value;
    const author = txt_author.value;

    const data = JSON.stringify({
        author: author,
        title: title,
        message: message
    })

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/bulletinboard', true);

    xhr.send(data)

    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 201) {
                alert("Done");
            } else {
                console.log(xhr.responseText);
            }
        }
    }
})