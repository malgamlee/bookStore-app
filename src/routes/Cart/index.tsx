import styles from './cart.module.scss'
import store from 'store'
import TopNavBar from 'components/TopNavBar'
import { useRecoilValue } from 'hooks/state'
import { cartStoreState } from 'states/storeState'
import ItemList from 'components/ItemList'
import thousandReExp from 'utils/thousandReExp'
import { SearchStructure } from 'types/searchStructure'
import NoDataPage from 'components/NoDataPage'

const Cart = () => {
  const storeData = store.get('cartStore')
  const cartStoreData = useRecoilValue(cartStoreState)
  const countBooks = cartStoreData.filter((book: SearchStructure) => book.sale_price !== -1)

  const price = storeData
    .filter((book: SearchStructure) => book.sale_price !== -1)
    .map((item: SearchStructure) => item.sale_price)
    .reduce((prev: number, curr: number) => prev + curr, 0)

  const postPackage = (allPrice: number) => {
    if (allPrice >= 50000) return 0
    return 2500
  }
  return (
    <div className={styles.cart}>
      <TopNavBar title='장바구니' />
      {cartStoreData.length > 0 ? (
        <div className={styles.cartContent}>
          <ul className={styles.bookList}>
            {cartStoreData.map((item: SearchStructure, idx: number) => {
              const key = `${idx}_${item.isbn}`
              return <ItemList key={key} item={item} type='cartStore' />
            })}
          </ul>
          <div className={styles.allPrice}>
            <ul className={styles.priceList}>
              <li className={styles.priceItem}>
                <dt>총 상품 수</dt>
                <dd>{countBooks.length}개</dd>
              </li>
              <li className={styles.priceItem}>
                <dt>총 상품 금액</dt>
                <dd>{thousandReExp(price)}원</dd>
              </li>
              <li className={styles.priceItem}>
                <dt>총 배송비</dt>
                <dd>{thousandReExp(postPackage(price))}원</dd>
              </li>
              <li className={styles.priceItem}>
                <dt>총 결제 예상 금액</dt>
                <dd>{thousandReExp(price + postPackage(price))}원</dd>
              </li>
            </ul>
            <button type='button' className={styles.allBuyBtn}>
              주문하기
            </button>
          </div>
        </div>
      ) : (
        <NoDataPage type='cart' noDataInfo='장바구니가 비었습니다.' />
      )}
    </div>
  )
}

export default Cart
