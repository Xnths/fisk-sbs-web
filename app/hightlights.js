const form = document.querySelector('form');
const bulletinBoard = document.getElementById('bulletin-board');

bulletinBoard.addEventListener('click', event => {
    const isEdit = event.target.className === "bulletin-board__item-action bulletin-board__item-edit";
    const isDelete = event.target.className === "bulletin-board__item-action bulletin-board__item-delete";

    if (isDelete) {
        const note = event.target.closest('[data-id]');
        const id = note.dataset.id;

        fetch(`http://localhost:3000/api/bulletinboard/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => updateBulletinBoard())
            .catch(error => alert(error));
    }
})

function dateFormat(date) {
    let regex = /\d{1,4}-\d{1,2}-\d{1,2}/gm
    let selectedDate = date.match(regex)[0];

    let splitedDate = selectedDate.split('-');
    let dayMonthYear = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`

    return dayMonthYear;
}

function createNotes(notes) {
    bulletinBoard.innerHTML = "";

    if (!notes.length > 0) bulletinBoard.innerHTML = "<p class='bulletin-board__empty'>There is no notes</p>";

    notes.forEach(note => {
        const div = document.createElement("div");
        div.classList.add("bulletin-board__item");

        const html = `
            <h3 class="bulletin-board__item-title">${note.title}</h3>
            <p class="bulletin-board__item-message">${note.message}</p>
            <p class="bulletin-board__item-author">${note.author}</p>
            <p class="bulletin-board__item-createdAt">${dateFormat(note.createdAt)}</p>
            <p class="bulletin-board__item-options">
                <a class="bulletin-board__item-action bulletin-board__item-edit" href="#">Edit</a>
                <a class="bulletin-board__item-action bulletin-board__item-delete" href="#">Delete</a>
            </p>
        `

        div.innerHTML = html;
        div.dataset.id = note.id;

        bulletinBoard.appendChild(div);
    })
}

async function updateBulletinBoard() {
    fetch(`http://localhost:3000/api/bulletinboard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const listPromise = response.json();

        listPromise.then(list => createNotes(list));
    }).catch(error => {
        alert(error);
    })
}

form.addEventListener('submit', event => {
    event.preventDefault();

    fetch(`http://localhost:3000/api/bulletinboard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: event.target.querySelector('[data-author]').value,
            title: event.target.querySelector('[data-title]').value,
            message: event.target.querySelector('[data-message]').value
        })
    }).then(() => {
        updateBulletinBoard();
    }).catch(error => {
        alert(error);
    })
})

updateBulletinBoard();