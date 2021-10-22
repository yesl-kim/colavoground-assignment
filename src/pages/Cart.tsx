import styled from "styled-components"
import { IoIosArrowDown } from "react-icons/io";
import { HiPlusCircle } from 'react-icons/hi';

const testArr = new Array(10).fill('')

export function Cart() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <span>고객님</span>
          <Detail>결제 목록</Detail>
        </TitleWrapper>
      </Header>

      <Section>
        <ButtonWrapper>
          <GrayButton><HiPlusCircle color='#999' size='15' /> <span>시술</span></GrayButton>
          <GrayButton><HiPlusCircle color='#999' size='15' /> <span>할인</span></GrayButton>
        </ButtonWrapper>
        <ul style={{padding: '5px 0'}}>
          {testArr.map(e => <Item>
            <LabelWrapper>
              <Label>스타일링</Label>
              <ValueLabel>60,000원</ValueLabel>
            </LabelWrapper>
            <TooltipButton> <span>3</span><IoIosArrowDown /></TooltipButton>
          </Item>)}
        </ul>
      </Section>

    <Footer>
      <ValueWrapper>
        <Detail>합계</Detail>
        <Value>169,000원</Value>
      </ValueWrapper>
      <NextButton>다음</NextButton>
    </Footer>
  </Container>
  )
}

const Container = styled.div`
  padding: 50px 20px calc(130px + 30px);

`
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding: 10px 20px 0;
  background-color: #fff;
  z-index: 999;
`

const Section = styled.section`
  /* padding: 50px 0; */
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
`

const GrayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49%;
  padding: 15px 0;
  border-radius: 12px;
  background-color: #eee;

  span {
    margin: 0 2px;
    font-size: 13px;
    line-height: 1.5;
    color: #666;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Detail = styled.span`
  font-size: 13px;
  color: #999;
`

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 130px;
  padding: 0 20px;
  border-top: 1px solid #eee;
  background-color: #fff;
  z-index: 999;
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
`

const Value = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`

const NextButton = styled(GrayButton)`
  width: 100%;
  background-color: royalblue;
  font-size: 15px;
  color: white;
  text-align: center;
`

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`

const LabelWrapper = styled.p`
  display: flex;
  flex-direction: column;
`

const Label = styled.span`
  font-size: 15px;
  line-height: 1.5;
  color: #666;
`

const ValueLabel = styled.span`
  font-size: 16px;
  line-height: 1.5;
  font-weight: bold;
  color: #000;
`

const TooltipButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 15px;
  background-color: #f5f5f5;
  text-align: center;
  color: #999;

  span {
    margin: 0 3px;
    line-height: 1.5;
  }
`