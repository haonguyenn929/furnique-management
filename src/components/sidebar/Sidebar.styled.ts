import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: var(--white-color);
  width: 240px;
  min-width: 240px;
  flex-shrink: 0;
  height: 100%;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;

  @media (max-width: 900px) {
    display: none;
  }
`
export const SideBarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0px 5px 1px rgba(0, 0, 0, 0.15);
`

export const Avatar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 3vh 0;
`
export const Image = styled.img`
  width: 80px;
  aspect-ratio: 1/1;
  background-color: var(--white-color);
  text-align: center;
  overflow: hidden;
  margin: 20px;
`

export const Logo = styled.img`
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
