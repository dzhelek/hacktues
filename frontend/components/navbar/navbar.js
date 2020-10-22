import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import Link from 'next/link'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/core";

import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
  } from "@chakra-ui/core";

import { useDisclosure } from "@chakra-ui/core";

const MenuItems = ({ children }) => (
	<Button color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px">
    {children}
  </Button>
);

const Navbar = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const btnRef = React.useRef();

	
  return (
	<Box>
    <Flex as="nav" width="100%" align="center" justify="space-between" wrap="wrap" padding="10px" bg="lightgrey" color="white"{...props}>
      	<Flex align="center" ml={5} mr={5}>
       		<Link href="/">
          		<a>
            		<Heading fontFamily="llpixel" color="black" fontWeight="200" size="lg">
              			Hack <span style={{"color":"green"}}>TUES 7</span>
            		</Heading>
          		</a>
        	</Link>
      	</Flex>

      <Box display={{ sm:"none", md: "flex" }} alignItems="center" flexGrow={1}>
        <MenuItems><Link href="/schedule" ><a>Програма</a></Link></MenuItems>
        <MenuItems><Link href="/regulation"><a>Регламент</a></Link></MenuItems>
        	<Menu>
        		<MenuButton as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    				Архив
  				</MenuButton>
  				<MenuList p="0">
    				<Link href="/archive/hacktues" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="white" _focus="outline: none;" border="0px" borderWidth="0px"><span>Hack</span>&nbsp;<span style={{"color":"#446576"}}>TUES</span></MenuItem></a></Link>
    				<Link href="/archive/hacktues2" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="white"  _focus="outline: none;" border="0px" borderWidth="0px"><span>Hack</span>&nbsp;<span style={{"color":"#446576"}}>TUES</span>&nbsp;<span>2</span></MenuItem></a></Link>
    				<Link href="/archive/hacktues3" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#232323"  _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"#fff"}}>Hack</span>&nbsp;<span style={{"color":"#09c0de"}}>TUES</span >&nbsp;<span style={{"color":"#b2006e"}}>2</span></MenuItem></a></Link>
    				<Link href="/archive/hacktues30" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#232323" _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"cyan"}}>Hack&nbsp;<sup>30x</sup>TUES</span></MenuItem></a></Link>
					  <Link href="/archive/hacktues365" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#343a40"  _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"#d6c6ad"}}>Hack</span>&nbsp;<span style={{"color":"#99d02b"}}>&nbsp;TUES&nbsp;</span><span style={{"color":"#99d02b"}} ><sup>^365</sup></span></MenuItem></a></Link>
  				</MenuList>
			</Menu>
        	<Menu>
        		<MenuButton as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    				Декларации
  				</MenuButton>
  				<MenuList p="0">
    				<a href="http://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.docx"><MenuItem fontSize="1rem" color="white" backgroundColor="lightgrey"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за пълнолетни(docx)</MenuItem></a>
    				<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="lightgrey"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за пълнолетни(pdf)</MenuItem></a>
    				<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.docx"><MenuItem fontSize="1rem"  color="white" backgroundColor="lightgrey"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за непълнолетни(docx)</MenuItem></a>
    				<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="lightgrey"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за непълнолетни(pdf)</MenuItem></a>
  				</MenuList>
			</Menu>
		<MenuItems><Link href="/about"><a>За Hack TUES</a></Link></MenuItems>
      </Box>


	<Box display={{ sm:"flex", md: "none" }}>
  	<Button  _focus="outline: none;" display="block" ref={btnRef} backgroundColor="transparent" variantColor="lightgrey" border="0px" onClick={onOpen}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Button>
      </Box>
    </Flex>
    
	<Flex display={{ sm:"flex", md: "none" }} width={{ sm: "full", md: "auto" }} alignItems="center" flexGrow={1}>
    	<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        	<DrawerOverlay />
        	<DrawerContent backgroundColor="lightgrey" color="lightgrey">
          	<DrawerCloseButton border="0px" _focus="outline:hidden;" />
          	<DrawerHeader color="black" fontWeight="400">Hack &nbsp;<span style={{"color":"green"}}>TUES 7</span></DrawerHeader>
	  		<DrawerBody display="flex" flexDirection="column" flexWrap="wrap">
	  			<MenuItems>
					<Link href="/schedule" >
						<a>
							Програма
						</a>
					</Link>
				</MenuItems>
        	<MenuItems><Link href="/regulation"><a>Регламент</a></Link></MenuItems>
        		<Menu>
        			<MenuButton as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    					Архив
  					</MenuButton>
  					<MenuList p="0">
    					<Link href="/archive/hacktues" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="white" _focus="outline: none;" border="0px" borderWidth="0px"><span>Hack</span>&nbsp;<span style={{"color":"#446576"}}>TUES</span></MenuItem></a></Link>
    					<Link href="/archive/hacktues2" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="white"  _focus="outline: none;" border="0px" borderWidth="0px"><span>Hack</span>&nbsp;<span style={{"color":"#446576"}}>TUES</span>&nbsp;<span>2</span></MenuItem></a></Link>
    					<Link href="/archive/hacktues3" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#232323"  _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"#fff"}}>Hack</span>&nbsp;<span style={{"color":"#09c0de"}}>TUES</span >&nbsp;<span style={{"color":"#b2006e"}}>2</span></MenuItem></a></Link>
    					<Link href="/archive/hacktues30" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#232323" _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"cyan"}}>Hack&nbsp;<sup>30x</sup>TUES</span></MenuItem></a></Link>
					  	<Link href="/archive/hacktues365" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#343a40"  _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"#d6c6ad"}}>Hack</span>&nbsp;<span style={{"color":"#99d02b"}}>&nbsp;TUES&nbsp;</span><span style={{"color":"#99d02b"}} ><sup>^365</sup></span></MenuItem></a></Link>
  					</MenuList>
				</Menu>
        		<Menu>
        			<MenuButton as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    					Декларации
  					</MenuButton>
  					<MenuList p="0">
    					<a href="http://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.docx"><MenuItem fontSize="1rem" color="white" backgroundColor="lightgrey"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за пълнолетни(docx)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="lightgrey"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за пълнолетни(pdf)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.docx"><MenuItem fontSize="1rem"  color="white" backgroundColor="lightgrey"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за непълнолетни(docx)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="lightgrey"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за непълнолетни(pdf)</MenuItem></a>
  					</MenuList>
				</Menu>
				<MenuItems>
					<Link href="/about">
						<a>
							За Hack TUES
						</a>
					</Link>
				</MenuItems>
			</DrawerBody>
        </DrawerContent>
    </Drawer>
	</Flex>
</Box>
  )
};

export default Navbar;