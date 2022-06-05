# BookStore-App

## 배포 링크
[🔗 링크](https://book-store-app-xi.vercel.app/)

## 구현 상세 설명

### 메인 화면

<img width="508" alt="image" src="https://user-images.githubusercontent.com/88325253/172038939-a5a4d7de-2f64-4905-be16-a6f37faf518d.png">

- `bookStore-App`의 메인화면 입니다.
- 상단에는 로고, 장바구니, 좋아요, 마이 페이지 버튼이 있고, 클릭 시 해당 영역으로 이동합니다.
- 장바구니 버튼은 목록이 비어 있을 경우 0을 출력하고, 목록에 데이터가 있을 경우 데이터의 수 만큼 숫자가 출력됩니다.
  - `recoil`을 이용하여 실시간으로 장바구니 버튼을 클릭할 때마다 출력하는 수가 바뀌도록 구현했습니다. 

<img width="497" alt="image" src="https://user-images.githubusercontent.com/88325253/172039006-3b484beb-2054-451b-9f07-f520f3bfeffd.png">

### 검색 화면

- 입력창을 클릭하면 위와 같이 입력하는 창이 등장합니다. 모바일 화면에서 원활한 검색을 위해 위와 같이 구현했습니다.

<img width="502" alt="image" src="https://user-images.githubusercontent.com/88325253/172039120-43dd4c85-6b02-4c1a-bbae-d4f2516eb630.png">

- 입력창에 타이핑을 하면 `카카오 도서 검색 api`에서 받아온 데이터들이 아래에 출력됩니다. 

<img width="502" alt="image" src="https://user-images.githubusercontent.com/88325253/172039133-d8f02919-8366-49e4-a330-11e96c217ad1.png">

- 데이터 목록 위에 커서를 가져다 대면 어느 부분을 가리키고 있는지 알 수 있습니다.
- 데이터 목록 중 하나를 클릭하면 해당 도서에 대한 상세 페이지로 이동합니다.

### 도서 상세 페이지

<img width="502" alt="image" src="https://user-images.githubusercontent.com/88325253/172039141-576a1306-b442-4f33-8333-85f1f1803828.png">

- 앞서 검색 화면에서 선택했던 도서의 상세 내용이 담긴 페이지입니다.
- 첵 표지, 제목, 작가, 츨핀사, 출판 날짜, 판매가, 작품 소개글과 좋아요, 장바구니, 구매하기 버튼으로 이루어져 있습니다.

<img width="494" alt="image" src="https://user-images.githubusercontent.com/88325253/172039218-0ead612c-a787-46fe-b6f6-ed6c17431758.png">

- 하트 모양의 좋아요 버튼을 클릭하면 `localstorage`를 이용해 `좋아요 목록`에 저장됩니다.

<img width="499" alt="image" src="https://user-images.githubusercontent.com/88325253/172039242-8254bbd4-2a38-4e85-a1d5-e97276eed777.png">

- 카트 모양의 장바구니 버튼을 클릭하면 `localstorage`를 이용해 `장바구니 목록`에 저장됩니다.
- 상단의 nav의 장바구니 버튼 옆에 수가 증가하게 됩니다.

### 장바구니 페이지

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88325253/172039335-351fbd5a-f9ad-4d10-b9cb-cc58f2f63779.png">

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88325253/172039361-e42f1359-a461-4a15-ae40-a3711029ed5e.png">

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88325253/172039377-3f0303e6-f3cb-443a-bb69-bde7475ecc38.png">


- 앞서 저장했던 장바구니 데이터가 출력되는 목록입니다.
- 실제 장바구니 화면과 동일하게 상품의 수, 총 금액, 배송비, 결제 예상 금액을 보여줍니다.
- 삭제 버튼을 클릭하면 목록에서 사라집니다.
