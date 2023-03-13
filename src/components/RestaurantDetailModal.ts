import { Restaurant } from '../domain/RestaurantList';
import Modal from './Modal';
import RestaurantDetail from './RestaurantDetail';

class RestaurantDetailModal extends Modal {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle({ zIndex: 2 });
    this.closeModalEvent();
  }

  renderDetailRestaurant(restaurant: Restaurant) {
    const restaurantDetail = this.shadowRoot!.querySelector(
      'restaurant-detail'
    ) as RestaurantDetail;

    restaurantDetail.update(restaurant);
  }

  render() {
    this.shadowRoot!.innerHTML = `
    <div id="modal" class="modal" alt="modal">
        <div id="modalBackdrop" class="backdrop"></div>
        <restaurant-detail></restaurant-detail>
    </div>
`;
  }
}

export default RestaurantDetailModal;
