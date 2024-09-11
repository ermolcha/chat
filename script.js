let url = 'https://jsonplaceholder.typicode.com/users'
let users = null
let textArea = null
let selectedUser = null
let fromWho = 'me'

let chatInfo = {
    userId: null,
    messages: []
}

const localData = []

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
            selectedUser = users.find(user => {
                return user.id === Number(target.id)
            })
            getLocalStorageData()
            let titleChat = document.querySelector('.title-chat')
            titleChat.innerHTML = selectedUser.name
            titleChat.parentNode.classList.add('active')
            chatInfo.userId = selectedUser.id
        }
        renderMessage(chatInfo.messages)
    })
}

renderUserName()

function renderMessage(messages) {
    let messageWrappers = document.querySelectorAll('.message-wrapper')
    messageWrappers.forEach((elem) => elem.innerHTML = '')

    messages.forEach((elem) => {

        if (elem.from === 'me') {
            messageWrappers.forEach((el) => el.insertAdjacentHTML('afterbegin', `<div class="me">
                            ${elem.text}
                        </div>`))
        } else {
            messageWrappers.forEach((el) => el.insertAdjacentHTML('afterbegin', `<div class="other">
                            ${elem.text}
                        </div>`))
        }
    })
}

function sendMessage() {
    textArea = document.querySelector('.text-area')
    let submit = document.querySelector('.submit')

    submit.addEventListener('click', function () {
        if (selectedUser === null) {
            alert('Выберите пользователя!')
        }
        if (textArea.value === '') {
            alert('Введите сообщение!')
        }
        else {
            chatInfo.messages.unshift({from: fromWho, text: textArea.value})
            updateLocalStorageData()
            //  вот тут обновляем localStorage
            renderMessage(chatInfo.messages)
            textArea.value = ''
        }
            })

    textArea.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            if (selectedUser === null) {
                alert('Выберите пользователя!')
            } else if (textArea.value === '') {
                alert('Введите сообщение!')
            } else {
                chatInfo.messages.unshift({from: fromWho, text: textArea.value})
                updateLocalStorageData()
                renderMessage(chatInfo.messages)
                textArea.value = ''
            }
        }
    })
}


sendMessage()


function addActiveClass() {
    const chatsWrappers = document.querySelectorAll('.chat-wrapper')
    chatsWrappers.forEach((chat) => {
       chat.addEventListener('click', (event) => {
           if (selectedUser === null) {
               return alert('Выберите пользователя!')
           } else {
               chatsWrappers.forEach(c => {
                   c.classList.remove("active")
               })
               chat.classList.add(`active`)
           }
           const hasChat1 = chat.querySelector('.chat1')
           if (hasChat1) {
               fromWho = 'me'
           } else {
               fromWho = 'other'
           }
       })
    })
}

addActiveClass()



function getLocalStorageData() {
    const data = localStorage.getItem('chatInfo')
    if (data) {
        chatInfo = JSON.parse(data)
    }
}


function updateLocalStorageData() {
    localStorage.setItem('chatInfo', JSON.stringify(chatInfo))
    // тут ты идешь и обновляешь localStorage
    // в localStorage у тебя лежит массив из chatInfo
}



// 1 При загрузке страницы, идем в localStorage, забираем оттуда данные, если они есть
// 2 При выборе пользователя, если есть данные в localData по userId, которого выбрали, то берем эти данные и засовываем в chatInfo
// 3 При отправке сообщения, берем chatInfo и засовываем в localStorage



