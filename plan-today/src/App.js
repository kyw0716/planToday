import MainBox from "./components/MainBox";
import Phrases from "./components/Phrases";
import Footer from "./components/Footer";
import styles from "./css/App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <Phrases/>
      <MainBox/>
      <Footer/>
    </div>
  );
}

export default App;
