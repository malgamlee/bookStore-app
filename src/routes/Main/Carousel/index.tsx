import styles from './carousel.module.scss'
import cx from 'classnames'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
  }
  return (
    <div className={styles.carousel}>
      <div>
        <div className={styles.slider}>
          <Slider {...settings}>
            <div className={styles.box1}>
              <h1>책</h1> 잘 읽는 방법
            </div>
            <div className={styles.box2}>개발 잘 하는 방법, 아시나요?</div>
            <div className={styles.box3}>Wanted Preonboading 성공적인 마무리 </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Carousel
