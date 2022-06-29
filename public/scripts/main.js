import Modal from './modal.js'

function initModal() {
    const checkButtons = document.querySelectorAll('a.check')
    const deleteButtons = document.querySelectorAll('a.delete')
    const cancelButtons = document.querySelectorAll('.cancel')

    const modalTitle = document.querySelector('.modal h2')
    const modalDescription = document.querySelector('.modal p')
    const modalButton = document.querySelector('.modal button:last-of-type')

    function handleClick(event, check) {
        const text = check ? 'Mark as read' : 'Delete'
        const slug = check ? 'check' : 'delete'
        const roomId = document.querySelector('#room-id').dataset.id
        const questionId = event.target.dataset.id

        const form = document.querySelector('.modal form')
        form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

        modalTitle.innerHTML = text
        modalDescription.innerHTML = `Are you sure you want to ${text.toLowerCase()} this question?`
        modalButton.innerHTML = `Yes, ${text.toLowerCase()}`

        check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

        Modal.open()

        event.preventDefault()
    }

    checkButtons.forEach(button => {
        button.addEventListener('click', (event) => handleClick(event, true))
    })

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => handleClick(event, false))
    })

    cancelButtons.forEach(button => {
        button.addEventListener('click', () => Modal.close())
    })
}

initModal()