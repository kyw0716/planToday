import styled from "styled-components";

const Style = {
  Footer: styled.div`
    margin: 25px 0px;
    @media (max-width: 900px) {
      margin: 10px 0px;
    }
  `,
};

function Footer() {
  return (
    <Style.Footer>© 2022 Kim - Young Woo. All rights reserved.</Style.Footer>
  );
}

export default Footer;
