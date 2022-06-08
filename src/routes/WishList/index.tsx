import styles from './wishList.module.scss'
import TopNavBar from 'components/TopNavBar'
import { useRecoilValue } from 'hooks/state'
import { likeStoreState } from 'states/storeState'
import { SearchStructure } from 'types/searchStructure'
import ItemList from 'components/ItemList'
import SearchForm from 'components/SearchForm'
import { useEffect, useState } from 'react'
import { fuzzyFilter } from 'utils/fuzzystring'
import { searchValue } from 'states/inputSearchValue'
import NoDataPage from 'components/NoDataPage'

const WishList = () => {
  const likeStoreData = useRecoilValue(likeStoreState)
  const [, setIsSearchListShow] = useState(false)
  const [filteredData, setFilteredData] = useState(likeStoreData)
  const search = useRecoilValue(searchValue)

  useEffect(() => {
    setFilteredData(fuzzyFilter(likeStoreData, search))
  }, [likeStoreData, search])

  return (
    <div className={styles.wish}>
      <TopNavBar title='좋아요 목록' />
      {filteredData.length > 0 ? (
        <div className={styles.wishContent}>
          <ul className={styles.wishList}>
            <div className={styles.searchForm}>
              <SearchForm isPopup={false} setIsSearchListShow={setIsSearchListShow} />
            </div>
            {filteredData.map((item: SearchStructure, idx: number) => {
              const key = `${idx}_${item.isbn}`
              return <ItemList key={key} item={item} type='likeStore' />
            })}
          </ul>
        </div>
      ) : (
        <NoDataPage type='like' noDataInfo='좋아요를 누른 항목이 없습니다.' />
      )}
    </div>
  )
}

export default WishList
