import styles from './wishList.module.scss'
import TopNavBar from 'components/TopNavBar'
import { HeartIcon } from 'assets/svgs'
import ItemList from 'components/ItemList'
import { useRecoilValue } from 'hooks/state'
import { likeStoreState } from 'states/storeState'
import { SearchStructure } from 'types/searchStructure'

const WishList = () => {
  const likeStoreData = useRecoilValue(likeStoreState)
  return (
    <div className={styles.wish}>
      <TopNavBar title='좋아요 목록' />
      {likeStoreData.length > 0 ? (
        <div className={styles.wishContent}>
          <ul className={styles.wishList}>
            {likeStoreData.map((item: SearchStructure, idx: number) => {
              const key = `${idx}_${item.isbn}`
              return <ItemList key={key} item={item} type='likeStore' />
            })}
          </ul>
        </div>
      ) : (
        <div className={styles.wishContent}>
          <div className={styles.nobookList}>
            <div>
              <HeartIcon className={styles.emptyImage} />
            </div>
            좋아요를 누른 항목이 없습니다.
          </div>
        </div>
      )}
    </div>
  )
}

export default WishList
