import React from 'react'
import { Box, Center } from '@chakra-ui/react'
import Logo from "../assets/logo.png"

const Header = () => {
  return (
       <Box bg={'#1890ff'} p={3} >
          <header>
              <Center>
                <img src={Logo} alt="Logo"/>
              </Center>
          </header>
       </Box>
  )
}

export default Header