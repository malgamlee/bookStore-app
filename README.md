# 📚 BookStore-App 📚

## 배포 링크
[🔗 링크](https://book-store-app-xi.vercel.app/)

## 구현 상세 설명

### 메인 화면

<img width="377" alt="main" src="https://user-images.githubusercontent.com/88325253/173997113-2630cc53-56a9-4395-ac46-a40e1d0dfec1.png">

- `bookStore-App`의 메인화면 입니다.
- 상단에는 로고, 장바구니, 좋아요, 마이 페이지 버튼이 있고, 클릭 시 해당 영역으로 이동합니다.
- 장바구니 버튼은 목록이 비어 있을 경우 0을 출력하고, 목록에 데이터가 있을 경우 데이터의 수 만큼 숫자가 출력됩니다.
  - `recoil`을 이용하여 실시간으로 장바구니 버튼을 클릭할 때마다 출력하는 수가 바뀌도록 구현했습니다. 

### 검색 화면

* 입력창을 클릭하면 위와 같이 입력하는 창이 등장합니다. 모바일 화면에서 원활한 검색을 위해 위와 같이 구현했습니다.
* 입력창에 타이핑을 하면 `카카오 도서 검색 api`에서 받아온 데이터들이 아래에 출력됩니다. 

#### 검색창에서 엔터키를 눌렀을 때
<span>
<img src="https://user-images.githubusercontent.com/88325253/173997393-31cc7ffe-75f0-4afc-b449-b936433a470c.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/173998308-bc7d199c-b7db-419f-a906-fd960be5d0b7.gif" width="30%" height="30%"/>
</span>

* 검색 결과가 1 ~ 9개 사이일 때, 로딩 없이 검색 결과가 출력됩니다.
* 검색 결과가 10개 이상일 때, 로딩이 발생하며 `무한 스크롤`을 통해 결과가 출력됩니다.

#### 검색창에서 클릭했을 때, 검색 결과가 없을 때

<span>
<img src="https://user-images.githubusercontent.com/88325253/173997382-6d87ee13-f16e-4a2a-9424-78cea8703b8b.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/173997359-7c948f8c-f218-480f-8ead-c631bad842bd.gif" width="30%" height="30%"/>
</span>

* 검색창에 입력한 후, 엔터키를 누르지 않으면 데이터 목록이 출력됩니다.
  * 데이터 목록은 책 제목, 저자 순서로 출력됩니다.
  * 데이터 목록 위에 커서를 가져다 대면 어느 부분을 가리키고 있는지 알 수 있습니다.
  * 데이터 목록 중 하나를 클릭하면 해당 도서에 대한 상세 페이지로 이동합니다.
* 검색 결과가 없을 때, 해당 검색어에 대한 결과가 없다는 페이지가 출력됩니다.


### 도서 상세 페이지

<span>
<img width="377" alt="sale book detail page " src="https://user-images.githubusercontent.com/88325253/174001612-3138e6ed-a2de-435e-a011-b2885b50631b.png">
<img width="367" alt="soldout book detail page" src="https://user-images.githubusercontent.com/88325253/174001601-203e5c59-f80e-4895-a77e-50600f1454bf.png">
</span>

- 앞서 검색 화면에서 선택했던 도서의 상세 내용이 담긴 페이지입니다.
- 첵 표지, 제목, 작가, 츨핀사, 출판 날짜, 판매가, 작품 소개글과 좋아요, 장바구니, 구매하기 버튼으로 이루어져 있습니다.
- 판매중이거나 품절일 경우 가격이나 버튼 부분이 달라집니다.
  - 판매 중일 경우, 판매 가격이 출력되고, 구매 버튼이 활성화됩니다.
  - 품절일 경우, 정가가 출력되고 그 위에 가로줄이 그어집니다. 또한 구매 버튼이 비활성화됩니다.


![click_like_cart](https://user-images.githubusercontent.com/88325253/174002201-8ef302f4-708e-49e2-ba4e-d2b5a8160627.gif)

- 하트 모양의 좋아요 버튼을 클릭하면 `localstorage`를 이용해 `좋아요 목록`에 저장됩니다.
- 카트 모양의 장바구니 버튼을 클릭하면 `localstorage`를 이용해 `장바구니 목록`에 저장됩니다.
- 상단의 nav의 장바구니 버튼 옆에 수가 증가하게 됩니다.

### 장바구니 페이지

<span>
<img src="https://user-images.githubusercontent.com/88325253/174002449-76f849cc-4d53-498c-997d-da7798545b0e.png" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/174002461-365f87a3-25ad-4b9a-9105-7131f73642f4.gif" width="30%" height="30%"/>
</span>

- 앞서 저장했던 장바구니 데이터가 출력되는 목록입니다.
- 상품의 수, 총 금액, 배송비, 결제 예상 금액을 보여줍니다.
  - 품절일 경우, 상품의 수, 총 금액, 결제 예상 금액에 포함되지 않습니다.
- 삭제 버튼을 클릭하면 목록에서 사라집니다.
- 품절 상품일 경우, `품절된 상품입니다.` 라는 문구가 등장합니다.

### 좋아요 페이지

<span>
<img src="https://user-images.githubusercontent.com/88325253/174003931-aa575cec-8735-4dd7-bc09-ffd9fbbdbc1c.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/174004043-53353247-bb8f-4c49-9f8e-75647d2808d2.gif" width="30%" height="30%"/>
</span>

