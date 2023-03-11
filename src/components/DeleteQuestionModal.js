import Modal from './Modal';

class DeleteQustionModal extends Modal {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.closeModalEvent();
  }

  closeModalEvent() {
    this.shadowRoot
      .querySelector('#modalBackdrop')
      .addEventListener('click', () => {
        this.closeModal();
      });
  }

  closeModal() {
    this.modalToggle(false);
  }

  render() {
    this.shadowRoot.innerHTML = `
    <div id="modal" class="modal" alt="modal">
        <div id="modalBackdrop" class="backdrop"></div>
        <delete-question></delete-question>
    </div>
`;
  }
}

export default DeleteQustionModal;