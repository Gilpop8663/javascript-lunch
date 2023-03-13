import Modal from './Modal';

class AddRestaurantModal extends Modal {
  override connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle({ zIndex: 2 });
    this.closeModalEvent();
  }

  override render() {
    this.shadowRoot!.innerHTML = `
    <div id="modal" class="modal" alt="modal">
        <div id="modalBackdrop" class="backdrop"></div>
       <add-restaurant-form></add-restaurant-form>
    </div>
`;
  }
}

export default AddRestaurantModal;
