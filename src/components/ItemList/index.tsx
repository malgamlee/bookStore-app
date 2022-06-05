import styles from './itemList.module.scss'
import { MouseEvent } from 'react'
import { useRecoil } from 'hooks/state'
import { cartStoreState, likeStoreState } from 'states/storeState'
import store from 'store'
import { SearchStructure } from 'types/searchStructure'
import thousandReExp from 'utils/thousandReExp'

interface Props {
  item: SearchStructure
  type: string
}

const ItemList = ({ item, type }: Props) => {
  const [cartStoreData, setCartStoreData] = useRecoil(cartStoreState)
  const [likeStoreData, setLikeStoreData] = useRecoil(likeStoreState)
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    const { className } = e.currentTarget

    if (className.split('_')[1] === 'deleteBtn') {
      if (type === 'cartStore') {
        store.set(
          type,
          cartStoreData.filter((data: SearchStructure) => data.isbn !== value)
        )
        setCartStoreData(store.get(type))
      } else {
        store.set(
          'likeStore',
          likeStoreData.filter((data: SearchStructure) => data.isbn !== value)
        )
        setLikeStoreData(store.get(type))
      }
    }
  }
  return (
    <li className={styles.item} key={item.isbn}>
      <img className={styles.image} src={item.thumbnail} alt={`${item.title}_img`} />
      <div className={styles.content}>
        <div className={styles.bookWrap}>
          <div className={styles.bookTitle}>{item.title}</div>
          <div className={styles.bookAuthor}>{item.authors}</div>
          <div className={styles.bookPrice}>{thousandReExp(item.price)}원</div>
        </div>
        <div className={styles.buttonWrap}>
          <button type='button' className={styles.deleteBtn} data-value={item.isbn} onClick={handleClick}>
            삭제
          </button>
          <button type='button' className={styles.buyBtn} data-value={item.isbn} onClick={handleClick}>
            구매
          </button>
        </div>
      </div>
    </li>
  )
}

export default ItemList
