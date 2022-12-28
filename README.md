## 쇼핑몰 만들기

- 목표: 전역 상태 관리(using `redux`), firebase, heroku, vercel 배포

## Day1

- `react with typescript`
- bundling: `vite`
  - `vite`는 개발환경에서 ESModule을 그대로 쓰고 bundling을 하지 않고, rollup
  - `next` -> `webpack`(default)
- `routing`
- `queryClient`
- `/products`, `/products/:id`
- `scss`
- `gnb`
- `MSW`: mock service worker

## Day2

- 장바구니(`/cart`) page & api

## Day3

- `/cart` 목록, 수정(update), 삭제 page & api
- update -> `invalidateQuires`, `Opimistic update`
- `redux`로 장바구니 내역 전역 관리
- `/payment` page & api

## Day4

- ？ redux와 비동기 요청(`graphql & react-query`)을 동기적으로 통합해서 처리할 수 있는 방법은 없을까? `redux middleware -> redux-thunck or redux-sage`
- 결제 페이지(`/payment`)
- 서버 환경 설정: `json server`, `firebase`
