const getURL = new URL(window.location);

const id = getURL.searchParams.get('id');

const form = document.querySelector('form');
const inputTitle = document.querySelector('[data-title');
const inputMessage = document.querySelector('[data-message');
const inputAuthor = document.querySelector('[data-author');

fetch(`http://localhost:3000/api/bulletinboard/${id}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
}).then(data => {
    data.json().then(data => {
        inputTitle.value = data[0].title;
        inputMessage.value = data[0].message;
        inputAuthor.value = data[0].author;
    })
})

form.addEventListener('submit', event => {
    event.preventDefault();

    const title = event.target.querySelector('[data-title]').value;
    const message = event.target.querySelector('[data-message]').value;
    const author = event.target.querySelector('[data-author]').value;

    fetch(`http://localhost:3000/api/bulletinboard/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: author,
            title: title,
            message: message
        })
    })
})