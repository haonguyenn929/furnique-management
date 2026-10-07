import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;
  padding: 1rem;
`
export const Image = styled.div`
  width: 40rem;
  max-width: 100%;

  & img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 900px) {
    display: none;
  }
`

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  padding: 1rem;
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  height: fit-content;
  padding-bottom: 1rem;

  @media (min-height: 700px) and (min-width: 901px) {
    position: absolute;
    bottom: 0;
  }
`
export const FooterText = styled.p`
  font-size: 0.85rem;
  margin-right: 0.5rem;
  font-weight: 500;
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 380px;
  margin-top: 1.5rem;
`
