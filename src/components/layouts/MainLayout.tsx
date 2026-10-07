import { useRef, useState } from 'react'
import { Drawer } from '@mui/material'
import { ILayoutProps } from '~/global/interfaces/interface'
import Appbar from '../sidebar/Appbar'
import Sidebar from '../sidebar/Sidebar'
import OptionList from '../sidebar/OptionList'
import { SideBarWrapper } from '../sidebar/Sidebar.styled'
import { MainContainer, Wrapper } from './MainLayout.styled'

const MainLayout = ({ children, title }: ILayoutProps) => {
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  return (
    <Wrapper>
      <Sidebar mainContainerRef={mainContainerRef} />
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: 'var(--white-color)'
          }
        }}
      >
        <SideBarWrapper>
          <OptionList prop={mainContainerRef} onClose={handleDrawerToggle} />
        </SideBarWrapper>
      </Drawer>

      <MainContainer ref={mainContainerRef}>
        <Appbar onDrawerToggle={handleDrawerToggle} title={title} />
        <div style={{ padding: '12px 16px', boxSizing: 'border-box', width: '100%' }}>{children}</div>
      </MainContainer>
    </Wrapper>
  )
}

export default MainLayout
