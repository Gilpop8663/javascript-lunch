import { $ } from '../utils';
import logo from '../assets/add-button.png';
import AddRestaurantModal from './AddRestuarntModal';

class Header extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.openModalEvent();
    this.titleClickEvent();
  }

  openModalEvent() {
    const openModal = this.shadowRoot!.querySelector(
      '#openModal'
    ) as AddRestaurantModal;

    openModal.addEventListener('click', () => {
      const addRestaurantModal = $(
        'add-restaurant-modal'
      ) as AddRestaurantModal;

      addRestaurantModal.openModal();
    });
  }

  render() {
    this.shadowRoot!.innerHTML = `
    <header id="head" >
      <h1 id="title" class="text-title">점심 뭐 먹지</h1>
      <button type="button" id="openModal" aria-label="음식점 추가">
        <img src=${logo} alt="음식점 추가" />
      </button>
    </header>
    `;
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
    .text-title {
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      padding: 0 16px;
      background-color: var(--primary-color);
    }
    
    h1 {
      color: #fcfcfd;
      cursor:pointer;
    }
    
    button {
      height: 40px;
      border: none;
      border-radius: 8px;
      background: transparent;
      font-size: 24px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    img {
      display: block;
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
  `;

    this.shadowRoot!.append(componentStyle);
  }

  titleClickEvent() {
    const title = this.shadowRoot!.querySelector('#title') as HTMLElement;

    title.addEventListener('click', () => {
      window.scrollTo(0, 0);
    });
  }
}

export default Header;
