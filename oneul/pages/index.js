import styles from '../styles/Home.module.css'
import Phrases from '../pages/Phrases'
import MainBox from '../pages/MainBox'
import Footer from '../pages/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Phrases/>
      <MainBox/>
      <Footer/>
    </div>
  )
}
