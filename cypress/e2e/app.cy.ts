import { LOCAL_STORAGE_KEY } from '../../src/constants/index';

describe('점심 뭐 먹지 사이트 전체 테스트', () => {
  it('페이지에 접속하여 음식점을 추가한다. 즐겨찾기를 한 후 자주 가는 음식점 탭에 있는 지 확인하며 즐겨찾기를 해제한다. 자주 가는 음식점 목록이 비었는 지 확인한다.', () => {
    //given
    cy.visit('http://localhost:8080/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(LOCAL_STORAGE_KEY, '[]');
      },
    });

    //when
    cy.get('lunch-header').shadow().find('#openModal').click();

    cy.get('#addRestaurantModal')
      .shadow()
      .find('add-restaurant-form')
      .shadow()
      .find('#category')
      .shadow()
      .find('select')
      .select('중식');

    cy.get('#addRestaurantModal')
      .shadow()
      .find('add-restaurant-form')
      .shadow()
      .find('#name')
      .shadow()
      .find('input')
      .type('중화반점');

    cy.get('#addRestaurantModal')
      .shadow()
      .find('add-restaurant-form')
      .shadow()
      .find('#distance')
      .shadow()
      .find('select')
      .select('30');

    cy.get('#addRestaurantModal')
      .shadow()
      .find('add-restaurant-form')
      .shadow()
      .find('#description')
      .shadow()
      .find('textarea')
      .type('10년 간 주방에서 갈고 닦은 실력을 여러분에게 선보입니다!');

    cy.get('#addRestaurantModal')
      .shadow()
      .find('add-restaurant-form')
      .shadow()
      .find('#link')
      .shadow()
      .find('input')
      .type('www.china-mat.com');

    cy.get('#addRestaurantModal')
      .shadow()
      .find('add-restaurant-form')
      .shadow()
      .find('#addRestraunt')
      .click();

    //then
    cy.get('restaurant-boxes')
      .shadow()
      .find('restaurant-box')
      .shadow()
      .contains('중화반점')
      .should('have.text', '중화반점');

    cy.get('restaurant-boxes')
      .shadow()
      .find('restaurant-box')
      .shadow()
      .contains('30')
      .should('have.text', '캠퍼스부터 30분 내');

    // 즐겨찾기 추가

    //when
    cy.get('restaurant-boxes')
      .shadow()
      .find('#중화반점')
      .shadow()
      .find('favorite-image')
      .click();

    //then
    cy.get('#favoriteTab').click();

    cy.get('restaurant-boxes')
      .shadow()
      .find('restaurant-box')
      .shadow()
      .contains('중화반점')
      .should('have.text', '중화반점');

    cy.get('restaurant-boxes')
      .shadow()
      .find('restaurant-box')
      .shadow()
      .contains('30')
      .should('have.text', '캠퍼스부터 30분 내');

    // 즐겨찾기 해제

    cy.get('restaurant-boxes')
      .shadow()
      .find('#중화반점')
      .shadow()
      .find('favorite-image')
      .click();

    cy.get('restaurant-boxes')
      .shadow()
      .find('div')
      .should('have.text', '음식점 목록이 비었습니다');
  });

  it('음식점을 눌러 상세 정보를 확인한다. 닫기를 눌러 창을 닫는다. 다시 음식점을 눌러 상세 정보 창을 띄워 삭제를 한다.', () => {
    //given
    cy.visit('http://localhost:8080/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(LOCAL_STORAGE_KEY, '[]');
      },
    });

    //when
    cy.get('restaurant-boxes')
      .shadow()
      .find('#이승재참치')
      .shadow()
      .find('li')
      .click();

    cy.get('restaurant-detail-modal')
      .shadow()
      .find('restaurant-detail')
      .shadow()
      .find('#cancelModal')
      .click();

    cy.get('restaurant-boxes')
      .shadow()
      .find('#이승재참치')
      .shadow()
      .find('li')
      .click();

    cy.get('restaurant-detail-modal')
      .shadow()
      .find('restaurant-detail')
      .shadow()
      .find('#deleteRestaurant')
      .click();

    cy.get('delete-question-modal')
      .shadow()
      .find('delete-question')
      .shadow()
      .find('#deleteRestaurant')
      .click();
  });
});
