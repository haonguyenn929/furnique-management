/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { optionSidebarAuth } from './Option'
import { Avatar, Image } from './Sidebar.styled'
import useAuth from '~/hooks/useAuth'

interface SidebarProps {
  prop: React.RefObject<HTMLDivElement | null>
}

const OptionList: React.FC<SidebarProps> = ({ prop }) => {
  const { user } = useAuth()

  const [btn, setButton] = useState<number | null>(null) //dashboard is default option
  const [optionsSidebar, _setOptionsSidebar] = useState(() => optionSidebarAuth(user?.role))
  const handleClick = (id: number) => {
    setButton(id)
    if (prop.current) {
      prop.current.scrollTo(0, 0)
    }
  }

  const location = useLocation()
  useEffect(() => {
    const option = optionsSidebar.find((option) => location.pathname.includes(`/${option.link}`))
    if (option) {
      setButton(option.id)
    } else {
      setButton(null)
    }
  }, [optionsSidebar])

  return (
    <>
      <Avatar>
        <Image src='/assets/Logo.svg' alt='Logo' />
      </Avatar>
      {optionsSidebar.map((option) => (
        <Link
          key={option.id}
          to={`/${option.link}`}
          style={{
            width: '100%',
            minHeight: 'fit-content'
          }}
        >
          <Button
            onClick={() => handleClick(option.id)}
            sx={{
              width: '100%',
              height: '100%',
              color: option.id === btn ? 'var(--primary-color)' : 'var(--gray-color)',
              backgroundColor: option.id === btn ? 'var(--primary-light-color)' : 'none',
              fontWeight: option.id === btn ? '600' : '0',
              borderRadius: 0,
              padding: '5% 10%',
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontFamily: 'inherit',
              boxShadow: 'none',
              '&:hover': {
                color: option.id === btn ? 'var(--white-color)' : 'var(--primary-color)'
              },
              '&:focus': {
                outline: 'none'
              }
            }}
            startIcon={React.createElement(option.icon)}
            variant={option.id === btn ? 'contained' : 'text'}
          >
            {option.text}
          </Button>
        </Link>
      ))}
    </>
  )
}

export default OptionList
