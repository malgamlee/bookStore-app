import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getSearchListApi } from 'services/bookSearchApi'
import styles from './bookList.module.scss'

interface Props {
  author: string
  title: string
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

const BookList = ({ author, title }: Props) => {
  const { data } = useQuery(['getSearchListApi', author], () => getSearchListApi(author).then((res) => res.data), {
    enabled: !!author,
  })

  const bookItems =
    data !== undefined &&
    data.documents
      .filter((item: Items) => item.title !== title)
      .map((item: Items) => (
        <li key={item.isbn} className={styles.item}>
          <Link to={`../bookdetail/${item.publisher} ${item.title}`}>
            <img className={styles.bookImg} src={item.thumbnail} alt={`${item.title} book cover`} />
            <div className={styles.bookTitle}>{item.title}</div>
          </Link>
        </li>
      ))

  return <ul className={styles.bookList}>{bookItems}</ul>
}

export default BookList
