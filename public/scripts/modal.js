const Modal = {
    window: document.querySelector('.modal-wrapper'),

    open() {
        Modal.window.classList.add('active')
    },

    close() {
        Modal.window.classList.remove('active')
    }
}

export default Modal