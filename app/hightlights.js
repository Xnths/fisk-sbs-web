const txt_title = document.getElementById('title');
const txt_message = document.getElementById('message');
const txt_author = document.getElementById('author');
const btn_post = document.getElementById('post');
const bulletinBoard = document.getElementById('bulletin-board');

const xhr = new XMLHttpRequest();

function dateFormat(date) {
    let regex = /\d{1,4}-\d{1,2}-\d{1,2}/gm
    let selectedDate = date.match(regex)[0];

    let splitedDate = selectedDate.split('-');
    let dayMonthYear = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`

    return dayMonthYear;
}

function createNotes() {
    bulletinBoard.innerHTML = "";

    let response = xhr.response;
    let notes = JSON.parse(response);

    if (!notes.length > 0) bulletinBoard.innerHTML = "<p class='bulletin-board__empty'>There is no notes</p>";

    notes.forEach(note => {
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const p4 = document.createElement("p");
        const a1 = document.createElement("a");
        const a2 = document.createElement("a");

        div.classList.add("bulletin-board__item");
        h3.classList.add("bulletin-board__item-title");
        p1.classList.add("bulletin-board__item-message");
        p2.classList.add("bulletin-board__item-author");
        p3.classList.add("bulletin-board__item-createdAt");
        a1.classList.add("bulletin-board__item-action");
        a2.classList.add("bulletin-board__item-action");
        p4.classList.add("bulletin-board__item-options");
        a1.classList.add("bulletin-board__item-edit");
        a2.classList.add("bulletin-board__item-delete");

        h3.innerHTML = note.title;
        p1.innerHTML = note.message;
        p2.innerHTML = note.author;
        p3.innerHTML = dateFormat(note.createdAt);

        a1.setAttribute("href", "#");
        a1.innerHTML = "Edit";
        a2.setAttribute("href", "#");
        a2.innerHTML = "Delete";

        p4.appendChild(a1);
        p4.appendChild(a2);

        [h3, p1, p2, p3, p4].forEach(element => {
            div.appendChild(element);
        })

        bulletinBoard.appendChild(div);
    })
}

async function updateBulletinBoard() {
    xhr.open('GET', 'http://localhost:3000/api/bulletinboard');

    xhr.send();

    xhr.onload = () => createNotes();
}

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

    xhr.open('POST', 'http://localhost:3000/api/bulletinboard', true);

    xhr.send(data);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 201) {
                updateBulletinBoard();
            } else {
                console.log(xhr.responseText);
            }
        }
    }
})

updateBulletinBoard();