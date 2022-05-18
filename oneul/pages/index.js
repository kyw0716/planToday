import styles from '../styles/Home.module.css'
import Phrases from '../components/feature/Phrases'
import Footer from '../components/layout/Footer'
import dynamic from 'next/dynamic'

const MainBox = dynamic(()=>import("../components/feature/mainBox/index"),{ssr : false})

export default function Home() {
  return (
    <div className={styles.container}>
      <Phrases/>
      <MainBox/>
      <Footer/>
    </div>
  )
}
