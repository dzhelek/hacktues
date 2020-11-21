import React from "react";
import { Box, Heading, Flex, Button} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, MenuOptionGroup, MenuItemOption } from "@chakra-ui/react";
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

import Router from 'next/router'
import Link from 'next/link'
import Reg from './form'
import Log from './login'

import Cookies from 'universal-cookie';

const cookies = new Cookies();
const axios = require('axios');

const MenuItems = ({ children }) => (
	<Button _active={{bg:"transparent"}} _hover={{bg:"transparent"}} _focus={{outline:"none"}} fontFamily="Rubik" color="white" bg="transparent" border="0px" borderWidth="0px">
    {children}
  </Button>
);

const Navbar = props => {
  	const [show, setShow] = React.useState(false);
  	const handleToggle = () => setShow(!show);

  	const { isOpen, onOpen, onClose } = useDisclosure();
  	const firstField = React.useRef();
  	const btnRef = React.useRef();

	
	const { isMobile } = useDeviceDetect();

	var login;
	var logout;

	function handleChildClick(event) {
		login = <ProfileButton marginLeft={["none","none","none","auto"]}/>
		logout = <LogoutButton/>
		Router.reload(window.location.pathname);
   }

	if(props.loggedin && !isMobile){
		login = <ProfileButton/>
		logout = <LogoutButton click={onClose}/>
	}
	else if(props.loggedin && isMobile){
		login = <ProfileButton click={onClose}/>
		logout = <LogoutButton click={onClose}/>	
	}
	else if(isMobile){
		login = 
			<>
				<MenuItems><Link href="/login"><a onClick={onClose}>Вход</a></Link></MenuItems>
				<MenuItems marginLeft={["none","none","none","auto"]}><Link href="/registration"><a onClick={onClose}>Регистрация</a></Link></MenuItems>
			</>;
	}
	else{
		login = 
			<>
				<Login logIn={handleChildClick} />
				<Register/>
			</>;
	}
		
  	return (
	<header>
    <Flex as="nav" align="center" justify="space-between" padding="10px" bg="#a5cf9f" color="white"{...props}>
      	<Flex width="auto" align="center" ml={5} mr={5}>
       		<Link href="/">
          		<a>
            		<Heading fontFamily="llpixel" color="black" fontSize="1.25rem" fontWeight="200" size="lg">
              			Hack <span style={{"color":"green"}}>TUES 7</span>
            		</Heading>
          		</a>
        	</Link>
      	</Flex>

      <Flex flexWrap="wrap" display={{base:"none", sm:"none", md:"none", lg: "flex" }} alignItems="center" flexGrow={1}>
        <MenuItems><Link href="/schedule" ><a>Програма</a></Link></MenuItems>
        <MenuItems><Link href="/regulation"><a>Регламент</a></Link></MenuItems>
		<MenuItems><Link href="/archive"><a>Архив</a></Link></MenuItems>
        	<Menu>
        		<MenuButton cursor="pointer" _hover={{bg:"transparent"}}  _active={{background:"#a5cf9f"}} as={Button} color="white" background="transparent" _focus={{outline: "none", bg:"transparent"}} border="0px" borderWidth="0px" rightIcon={<ChevronDownIcon/>}>
    				Декларации
  				</MenuButton>
  				<MenuList p="0">
    				<a href="http://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.docx"><MenuItem fontSize="1rem" color="white" backgroundColor="#a5cf9f"   _focus={{outline: "none"}} border="0px" borderWidth="0px">Декларация за пълнолетни(docx)</MenuItem></a>
    				<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="#a5cf9f"   _focus={{outline: "none"}} border="0px" borderWidth="0px">Декларация за пълнолетни(pdf)</MenuItem></a>
    				<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.docx"><MenuItem fontSize="1rem"  color="white" backgroundColor="#a5cf9f"   _focus={{outline: "none"}} border="0px" borderWidth="0px">Декларация за непълнолетни(docx)</MenuItem></a>
    				<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.pdf"><MenuItem fontSize="1rem" color="white"   backgroundColor="#a5cf9f"   _focus={{outline: "none"}} border="0px" borderWidth="0px">Декларация за непълнолетни(pdf)</MenuItem></a>
  				</MenuList>
			</Menu>
		<MenuItems><Link href="/about"><a>За Hack TUES</a></Link></MenuItems>
		{login}
		{logout}
      </Flex>
	<Box width="auto" display={{ md:"flex", lg: "none" }}>
	<Button  _focus={{outline: "none"}} display="block" ref={btnRef} backgroundColor="transparent" colorScheme="lightgrey" border="0px" onClick={onOpen}>
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
    
	<Flex display={{ md:"flex", lg: "none" }} width={{ xl: "100%", md: "100%" }} alignItems="center" flexGrow={1}>
    	<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        	<DrawerOverlay />
        	<DrawerContent style={{width:"200px", minWidth:"1rem"}} backgroundColor="#a5cf9f" color="#a5cf9f">
          	<DrawerCloseButton border="0px" color="white" backgroundColor="#a5cf9f" _focus={{outline: "none"}} />
          	<DrawerHeader color="black" fontFamily="llpixel" fontWeight="400">Hack &nbsp;<span style={{"color":"green"}}>TUES 7</span></DrawerHeader>
	  		<DrawerBody display="flex" flexDirection="column" flexWrap="wrap">
	  			<MenuItems>
					<Link href="/schedule" >
						<a onClick={onClose}>
							Програма
						</a>
					</Link>
				</MenuItems>
        	<MenuItems><Link href="/regulation"><a onClick={onClose}>Регламент</a></Link></MenuItems>
        	<MenuItems><Link href="/archive"><a onClick={onClose}>Архив</a></Link></MenuItems>
        		<Menu>
        			<MenuButton rightIcon={<ChevronDownIcon />} as={Button} _active={{background:"#a5cf9f"}}  _hover={{background:"#a5cf9f"}} color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px">
    					Декларации
  					</MenuButton>
  					<MenuList p="0">
    					<a href="http://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.docx"><MenuItem fontSize="1rem" color="white" backgroundColor="#a5cf9f" _focus={{outline: "none"}} border="0px" borderWidth="0px">Декларация за пълнолетни(docx)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="#a5cf9f" _focus={{outline: "none"}} border="0px" borderWidth="0px">Декларация за пълнолетни(pdf)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.docx"><MenuItem fontSize="1rem"  color="white" backgroundColor="#a5cf9f" _focus={{outline: "none"}} border="0px" borderWidth="0px">Декларация за непълнолетни(docx)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="#a5cf9f"   _focus={{outline: "none"}} border="0px" borderWidth="0px">Декларация за непълнолетни(pdf)</MenuItem></a>
  					</MenuList>
				</Menu>
				<MenuItems>
					<Link href="/about">
						<a onClick={onClose}>
							За Hack TUES
						</a>
					</Link>
				</MenuItems>
				{login}
				{logout}
			</DrawerBody>
        </DrawerContent>
    </Drawer>
	</Flex>
</header>
  )
};

function ProfileButton(props){
	return(
	<Button marginLeft={["none","none","none","auto"]} _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" onClick={props.click}><Link href="/profile" ><a>Профил</a></Link></Button>
	)
}

function LogoutButton(props) {
	return(
	<Button _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" onClick={Logout}><Link href="/" ><a>Излез</a></Link></Button>
	)
}

function Register(props) {

	const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" onClick={onOpen}>Регистрация</Button>
        <Modal motionPreset="slideInBottom" style={{width:"1000px"}} closeOnOverlayClick={false} isOpen={isOpen} size="xl" onEsc={onClose} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent style={{width:"1000px", minWidth:"55rem"}}>
            <ModalHeader fontFamily="Rubik">Регистрация</ModalHeader>
            <ModalCloseButton _focus={{outline: "none"}} backgroundColor="transparent" border="white" />
            <ModalBody>
				<Reg/>
			</ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}


  function Login({logIn}) {
  
	function handleLog(){
		logIn(true)
	}

	return(
	  	<Popover autoFocus="false" placement="bottom">
			<PopoverTrigger>
		  		<Button marginLeft={["none","none","none","auto"]} _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" >Влез</Button>
			</PopoverTrigger>
			<PopoverContent color="white" bg="white"  borderColor="#a5cf9f">
		  		<PopoverArrow/>
		  			<PopoverBody>
					  <Log logIn={handleLog}/>
			</PopoverBody>
		</PopoverContent>
	</Popover>
	)
}

function Logout() {
	axios({
		method: 'post',
		url: 'https://hacktues.pythonanywhere.com/token/',
		header: 'Content-Type: application/json',
		data: {"email": "hacktues","password": "Go Green"}
	})
	.then(function (response) {
		cookies.set('auth', response.data.access, { path: '/' })
		cookies.set('refresh', response.data.refresh, { path: '/' })
		Router.reload(window.location.pathname);
	})
}

function useDeviceDetect() {
	const [isMobile, setMobile] = React.useState(false);
  
	React.useEffect(() => {
	  const userAgent =
		typeof window.navigator === "undefined" ? "" : navigator.userAgent;
	  const mobile = Boolean(
		userAgent.match(
		  /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
		)
	  );
	  setMobile(mobile);
	}, []);
  
	return { isMobile };
  }

export default Navbar;