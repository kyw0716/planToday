import Phrases from "../components/feature/Phrases";
import Footer from "../components/layout/Footer";
import dynamic from "next/dynamic";
import styled from "styled-components";

const MainBox = dynamic(() => import("../components/feature/mainBox/index"), {
  ssr: false,
});

const Style = {
  Container: styled.div`
    width: 100%;
    height: 120vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #efe4e0;
  `,
};

export default function Home() {
  return (
    <Style.Container>
      <Phrases />
      <MainBox />
      <Footer />
    </Style.Container>
  );
}
