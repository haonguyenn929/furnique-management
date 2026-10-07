import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const MainContainer = styled.div`
  background-color: var(--background-color);
  flex: 1;
  width: 100%;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  scrollbar-face-color: transparent;
`
