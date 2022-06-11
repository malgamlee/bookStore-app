import Loading from 'components/Loading'
import NoDataPage from 'components/NoDataPage'
import { uniqBy } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSearchListApi } from 'services/bookSearchApi'
import styles from './bookList.module.scss'

interface Props {
  search: string
  title: string
  next: boolean
}

interface Items {
  authors: string[]
  contents: string
  datetime: Date
  isbn: string
  price: number
  publisher: string
  sale_price: number
  status: string
  thumbnail: string
  title: string
  translators: any[]
  url: string
}

const BookList = ({ search, title, next }: Props) => {
  const [pageNum, setPageNum] = useState(1)
  const [itemList, setItemList] = useState<Array<Items>>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [moreData, setMoreData] = useState(false)
  const [dataExist, setDataExist] = useState(true)

  const target = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getSearchListApi(search, pageNum).then((res) => {
      if (res.data.meta.total_count === 0) {
        setDataExist(false)
        return
      }
      setItemList((prev) => uniqBy([...prev, ...res.data.documents], 'isbn'))
      setMoreData(res.data.meta.is_end)
    })
  }, [pageNum, search])

  useEffect(() => {
    let observer: IntersectionObserver
    const getMoreItem = async () => {
      setIsLoaded(true)
      await new Promise((resolve) => {
        setTimeout(resolve, 2500)
      })
      setPageNum((prev) => prev + 1)
      setIsLoaded(false)
    }
    const handleObserve = async ([entry]: IntersectionObserverEntry[]) => {
      if (!next || pageNum === 0 || moreData) return

      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        await getMoreItem()
        observer.observe(entry.target)
      }
    }
    if (target?.current) {
      observer = new IntersectionObserver(handleObserve, {
        threshold: 0.7,
      })
      observer.observe(target.current)
    }
    return () => observer && observer.disconnect()
  }, [moreData, next, pageNum, target])

  const bookItems =
    itemList.length > 0 &&
    itemList
      .filter((item: Items) => item.title !== title)
      .map((item: Items) => (
        <li key={item.isbn} className={styles.item}>
          <Link to={`../bookdetail/${item.publisher} ${item.title}`}>
            <img className={styles.bookImg} src={item.thumbnail} alt={`${item.title} book cover`} />
            <div className={styles.bookTitle}>{item.title}</div>
          </Link>
        </li>
      ))

  return (
    <div>
      {dataExist ? (
        <div>
          <ul className={styles.bookList}>{bookItems}</ul>
          <div ref={target}>
            {!moreData && isLoaded && (
              <div className={styles.loadingIcon}>
                <Loading />
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoDataPage type='announcement' noDataInfo={`검색하신 '${search}'에 대한 정보가 없습니다.`} />
      )}
    </div>
  )
}

export default BookList
