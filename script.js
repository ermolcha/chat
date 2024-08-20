let url = 'https://jsonplaceholder.typicode.com/users'
let users = null


async function getUsers() {
    try {
        let response = await fetch(url)
        let data = await response.json()
        users = data
        renderUsersList(data)
    } catch (error) {
        console.log(error)
    }
}

function renderUsersList(data) {
    data.forEach(function (elem) {
        let list = document.getElementById('list')
        list.insertAdjacentHTML('afterbegin', `<li id="${elem.id}">${elem.name}</li>`)
    })
}

getUsers()

function renderUserName() {

    const list = document.getElementById('list')
    list.addEventListener('click', function (event) {
        let target = event.target;
        if (target.id) {
            const result = users.find(user => {
                return user.id === Number(target.id)
            })
            let titleChat = document.querySelector('.title-chat')
            titleChat.innerHTML = result.name
            // + получить тут массив сообщений с этим пользователем (пока что статический)
            // [{from: 'self', tet: 'какойто текст сооббщения'}, {from: 'self', tet: 'какойто текст сооббщения'}]
            //
        }
    })

}

renderUserName()

function findTextElem() {
    let textArea = document.querySelector('.text-area')
    let submit = document.querySelector('.submit')

    submit.addEventListener('click', )
}
