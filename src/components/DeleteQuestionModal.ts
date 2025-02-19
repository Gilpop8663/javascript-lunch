import DeleteQustion from './DeleteQustion';
import Modal from './Modal';

class DeleteQustionModal extends Modal {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle({ zIndex: 3 });
    this.modalEvent();
  }

  closeModal() {
    this.modalToggle(false);
  }

  render() {
    this.shadowRoot!.innerHTML = `
    <div id="modal" class="modal" alt="modal">
        <div id="modalBackdrop" class="backdrop"></div>
        <delete-question></delete-question>
    </div>
    `;
  }

  modalEvent() {
    this.shadowRoot!.querySelector('#modalBackdrop')?.addEventListener(
      'click',
      () => {
        this.closeModal();
      }
    );

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  setDelete(name: string) {
    const deleteQuestion = this.shadowRoot!.querySelector(
      'delete-question'
    ) as DeleteQustion;

    deleteQuestion.setDeleteName(name);
  }
}

export default DeleteQustionModal;
