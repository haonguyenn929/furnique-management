import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100vw;
`
export const Image = styled.div`
  width: 40rem;
`

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  height: fit-content;
  position: absolute;
  bottom: 0;
`
export const FooterText = styled.p`
  font-size: 0/5rem;
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
