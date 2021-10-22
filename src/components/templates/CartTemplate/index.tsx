import styled from "styled-components"

interface CartTemplateProps {
  header: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode
}

export function CartTemplate({header, main, footer}: CartTemplateProps) {
  return (
    <Container>
      <Header>{header}</Header>
      <Section>{main}</Section>
      <Footer>{footer}</Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
`
const Header = styled.header`
  padding: 10px 20px 20px;
`

const Section = styled.section`
  flex: 1;
  padding: 0 20px 30px;
  overflow: scroll;
`

const Footer = styled.footer`
  margin-top: auto;
  padding: 0 20px 30px;
  border-top: 1px solid #eee;
`