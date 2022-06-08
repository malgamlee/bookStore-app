import { useRef } from 'react'
import type { MouseEvent } from 'react'
import styles from './modal.module.scss'

const Modal = () => {
  const outerRef = useRef<HTMLDivElement>(null)

  const handleClickOuterArea = (e: MouseEvent<HTMLDivElement>) => {
    if (outerRef.current && e.target === outerRef.current) {
      //   setDetail(false)
    }
  }

  const handleClickClose = () => {
    // setDetail(false)
  }

  return (
    <div className={styles.wrapper} ref={outerRef} onClick={handleClickOuterArea} role='button' tabIndex={-1}>
      <article className={styles.contentWrapper}>
        <button type='button' className={styles.back} aria-label='뒤로 가기' onClick={handleClickClose}>
          뒤로 가기
        </button>
        {/* {children} */}
      </article>
    </div>
  )
}

export default Modal
