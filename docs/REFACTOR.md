### 1단계 리팩터링 목록

- 웹 컴포넌트를 컴포넌트답게 사용하기 (컨트롤러에서 모두 찾는 것이 아닌 attribute 변경으로 내부 로직 실행되도록 하기)
- 타입스크립트 적극 활용하기
- view 와 components의 차이
- components 의 대한 내 생각
- view 의 대한 내 생각
- MVC 패턴에서 components는 어디에 위치하는 것이 좋을지
- custom-elements에서 kebab 케이스를 사용해야 하는지 고민을 하지 않았다.
- 컴포넌트의 이름과 custom-elements를 일치시켜 통일성을 주고, 파스칼케이스로 작성한다
- 각 컴포넌트에서 define하는 방법을 시도해보고 가능하다면 분리한다
- $$$의 재귀적으로 무조건 찾는(쉐도우돔을 깨트리는 행위)를 그만두고 html에 노출되어있는 custom-elements와 통신한다.
- 함수는 한 가지 역할만 하도록 한다. (역할의 분리)
- 생성자에서 해주는 역할이 없다면 만들지 않기
