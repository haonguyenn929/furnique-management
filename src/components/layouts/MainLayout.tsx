import { useRef } from 'react'
import { ILayoutProps } from '~/global/interfaces/interface'
import Appbar from '../sidebar/Appbar'
import Sidebar from '../sidebar/Sidebar'
import { MainContainer, Wrapper } from './MainLayout.styled'

const MainLayout = ({ children }: ILayoutProps) => {
  const mainContainerRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <Wrapper>
        <Sidebar mainContainerRef={mainContainerRef} />
        <MainContainer ref={mainContainerRef}>
          <Appbar />
          {children}
        </MainContainer>
      </Wrapper>
    </>
  )
}

export default MainLayout
