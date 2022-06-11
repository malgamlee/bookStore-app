import { BookList } from 'components'
import TopNavBar from 'components/TopNavBar'
import { useParams } from 'react-router-dom'
import styles from './searchResult.module.scss'

const SearchResult = () => {
  const { paramValue } = useParams()

  if (paramValue === undefined) return <div>error</div>

  return (
    <div className={styles.searchResult}>
      <TopNavBar title='검색결과' />
      <div className={styles.bookList}>
        <BookList search={paramValue} title='' next />
      </div>
    </div>
  )
}

export default SearchResult
