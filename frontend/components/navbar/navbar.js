import React, {useEffect, useState} from "react";
import { Box, Heading, Flex, Text, Button, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Select, Switch, ButtonGroup } from "@chakra-ui/core";
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
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from "@chakra-ui/core";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
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

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
} from "@chakra-ui/popover"

import jwt_decode from 'jwt-decode'

import { Formik, Field, Form } from 'formik';
import { useDisclosure, useControllableState } from "@chakra-ui/core";
const axios = require('axios');
import Cookies from 'universal-cookie';
import { ChevronDownIcon } from "@chakra-ui/icons";
import {PhoneIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

import Router from 'next/router'

const cookies = new Cookies();

const MenuItems = ({ children }) => (
	<Button _active={{bg:"transparent"}} _hover={{bg:"transparent"}} _focus={{outline:"none"}} fontFamily="Rubik" color="white" bg="transparent" border="0px" borderWidth="0px">
    {children}
  </Button>
);

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

const Navbar = props => {
  	const [show, setShow] = React.useState(false);
  	const handleToggle = () => setShow(!show);

  	const { isOpen, onOpen, onClose } = useDisclosure();
  	const firstField = React.useRef();
  	const btnRef = React.useRef();

	var login;
	var logout;

	function handleChildClick(event) {
		login = <ProfileButton marginLeft="auto"/>
		logout = <LogoutButton/>
		Router.reload(window.location.pathname);
   }


	if(props.loggedin){
		login = <ProfileButton/>
		logout = <LogoutButton/>
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
		{/* <LoginStatus cookie={token}/> */}
		{login}
		{logout}
		{/* <Parent/> */}
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
	<Button marginLeft={["none","none","none","auto"]} _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px"><Link href="/profile" ><a>Профил</a></Link></Button>
	)
}

function LogoutButton(params) {
	return(
	<Button _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" onClick={Logout} ><Link href="/" ><a>Излез</a></Link></Button>
	)
}

function Register(props) {

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

    return (
      <>
        <Button _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" onClick={onOpen}>Регистрация</Button>

        <Modal motionPreset="slideInBottom" style={{width:"1000px"}} closeOnOverlayClick={false} isOpen={isOpen} size="xl" onEsc={onClose} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent style={{width:"1000px", minWidth:"55rem"}}>
            <ModalHeader fontFamily="Rubik">Регистрация</ModalHeader>
            <ModalCloseButton _focus={{outline: "none"}} backgroundColor="transparent" border="white" />
            <ModalBody>
			<Formik initialValues={{ name: "", email: "" }} 
				onSubmit={(values, actions) => {
        			setTimeout(() => {
							var data = JSON.stringify(values, null, 1)
        					axios({
        						method: 'post',
        						url: 'https://hacktues.pythonanywhere.com/users/',
        						headers: 
        						{ "Content-type": "Application/json",
        						  "Authorization": `Bearer ${cookies.get('auth')}`},
								data: data  
								  },)
        					    .then(function (response) {
        					        console.log(response);
        					      // cookies.set('auth1', response.data.access, { path: '/' })
        					    })
        					    .catch(function (error) {
        					    console.log(error);
        					    })
        					    .then(function () {
        					    console.log(cookies.get('auth'))

								axios({
        						method: 'get',
        						url: 'https://hacktues.pythonanywhere.com/users/',
        						headers: 
        						{ "Content-type": "Application/json",
        						  "Authorization": `Bearer ${cookies.get('auth')}`}
								  },)
        					    })							
											console.log(JSON.stringify(values, null, 1))
          									actions.setSubmitting(false)
        								}, 1000)
      							}}>
    {props => (
				<form style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}} onSubmit={props.handleSubmit}>
				<Field initialValues={{first_name: '', last_name: '', email: '', password: ''}} name="first_name">
					{({ field, form }) => (
					<FormControl mr="5px" flex="1 1 400px" isRequired isInvalid={form.errors.name && form.touched.name}>
						<FormLabel fontFamily="Rubik" fontSize="15px" htmlFor="text">Име (на кирилица)</FormLabel>
						<Input _focus={{outline:"none"}} outline="lightgrey" variant="outline" {...field} id="first_name" />
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
          		</Field>
				<Field name="last_name">
					{({ field, form }) => (
					<FormControl flex="1 1 400px" isRequired isInvalid={form.errors.name && form.touched.name}>
						<FormLabel fontFamily="Rubik" fontSize="15px" htmlFor="text">Фамилия (на кирилица)</FormLabel>
						<Input _focus={{outline:"none"}} outline="lightgrey" variant="outline" {...field} id="last_name" />
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>
				<Field name="email">
					{({ field, form }) => (
					<FormControl flex="1 1 120px" isRequired isInvalid={form.errors.email && form.touched.email}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="email">Имейл</FormLabel>
						<Input {...field} id="email" type="email"/>
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>

				<Field name="reemail">
					{({ field, form }) => (
					<FormControl flex="1 1 120px" isRequired isInvalid={form.errors.email && form.touched.email}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Повторете имейла</FormLabel>
						<Input type="text"/>
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
          </Field>
		  <Field name="username">
            {({ field, form }) => (
              <FormControl flex="1 1 120px" isRequired isInvalid={form.errors.name && form.touched.name}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Discord username</FormLabel>
                <Input _focus={{outline:"none"}} outline="lightgrey" variant="outline" {...field} id="username" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
			<Field name="password" >
				{({ field, form }) => (
				<FormControl flex="1 1 120px" isRequired isInvalid={form.errors.phone && form.touched.phone}>
				<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="password">Парола</FormLabel>
				<InputGroup size="md">
		<Input pr="4.5rem" type={show ? "text" : "password"} isRequired {...field} isInvalid={form.errors.password && form.touched.password}/>
			<InputRightElement width="4.5rem">
				<Button fontFamily="Rubik" fontSize="15px" border="0" colorScheme="green" _focus={{outline:"none"}} h="1.75rem" size="sm" onClick={handleClick}>
					{show ? <ViewOffIcon/> : <ViewIcon/>}
				</Button>
			</InputRightElement>
			</InputGroup>
		</FormControl>)}
		</Field>

		  <Field  name="repassword">
            {({ field, form }) => (
              <FormControl flex="1 1 120px" {...field} isRequired isInvalid={form.errors.password && form.touched.password}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="password">Повторете паролата</FormLabel>
                <Input type="password"/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

		  <Field name="form">
            {({ field, form }) => (
				<FormControl flex="1 1 120px" {...field} isRequired>
  					<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="country">Клас</FormLabel>
  					<Select variant="outline" id="form" fontFamily="Rubik" placeholder="Избери клас">
					  	<option value="8a">8А</option>
  						<option value="8b">8Б</option>
  						<option value="8v">8В</option>
						<option value="8g">8Г</option>
					  	<option value="9a">9А</option>
  						<option value="9b">9Б</option>
  						<option value="9v">9В</option>
						<option value="9g">9Г</option>
					  	<option value="10a">10А</option>
  						<option value="10b">10Б</option>
  						<option value="10v">10В</option>
						<option value="10g">10Г</option>
					  	<option value="11a">11А</option>
  						<option value="11b">11Б</option>
  						<option value="11v">11В</option>
						<option value="11g">11Г</option>
					  	<option value="12a">12А</option>
  						<option value="12b">12Б</option>
  						<option value="12v">12В</option>
						<option value="12g">12Г</option>
					</Select>
				</FormControl>
            )}
          </Field>

		  	<Field flex="1 1 120px" name="phone" >
            	{({ field, form }) => (
              	<FormControl {...field} isRequired isInvalid={form.errors.phone && form.touched.phone}>
			  	<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="number">Телефон</FormLabel>
			  	<InputGroup>
			  		<InputLeftElement children={<PhoneIcon color="gray.300" />} />
    				<Input/>
  					</InputGroup>
              	</FormControl>
            )}
          	</Field>

			<Field flex="1 1 120px" name="alergies" >
				{({ field, form }) => (
				<FormControl {...field} isInvalid={form.errors.alergies && form.touched.alergies}>
				<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Алергии</FormLabel>
				<Input type="text" id="alergies" variant="outline"/>
				</FormControl>
				)}
			</Field>
			<Field flex="1 1 120px" name="tshirt_size">
				{({ field, form }) => (
					<FormControl {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Размер тениска</FormLabel>
						<Select variant="outline" id="tshirt_size" type="text" fontFamily="Rubik" placeholder="Избери размер">
							<option value="s">S</option>
							<option value="m">M</option>
							<option value="l">L</option>
							<option value="xl">XL</option>
						</Select>
					</FormControl>
				)}
			</Field>
				<Field flex="1 1 120px" name="food_preferences">
				{({ field, form }) => (
							<FormControl {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
								<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Консумирате ли месо?</FormLabel>
								<Select variant="outline" id="food_preferences" type="text" fontFamily="Rubik" placeholder="">
									<option value={0}>Да</option>
									<option value={2}>Не, веган съм</option>
									<option value={1}>Не, вегетарианец съм</option>
								</Select>
							</FormControl>
						)}
					</Field>
			<Field flex="1 1 120px" name="online">
				{({ field, form }) => (
					<FormControl {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Искам да съм изцяло онлайн</FormLabel>
					<Switch id="online" />
					</FormControl>
				)}
			</Field>

			<Field flex="1 1 120px" name="is_active">
				{({ field, form }) => (
					<FormControl {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">is_active(testing purposes)</FormLabel>
					<Switch id="is_active" />
					</FormControl>
				)}
			</Field>

			<Button mt={4} colorScheme="green" border="0" isLoading={props.isSubmitting} type="submit">
				Регистрирай ме
			</Button>
        </form>
      )}
    </Formik>
	</ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }


  function Login({logIn}) {

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	function handleClicked(event) {
		logIn(true);
   }

	return(
	  	<Popover autoFocus="false" placement="bottom">
			<PopoverTrigger>
		  		<Button marginLeft="auto" _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" >Влез</Button>
			</PopoverTrigger>
			<PopoverContent color="white" bg="white" borderColor="#a5cf9f">
		  		<PopoverArrow/>
		  			<PopoverBody>
					  <Formik initialValues={{ username: "", password: "" }} 
				onSubmit={(values, actions) => {
        			setTimeout(() => {
							var data = JSON.stringify(values, null, 1)
        					axios({
        						method: 'post',
        						url: 'https://hacktues.pythonanywhere.com/token/',
        						headers: 
        						{ "Content-type": "Application/json"},
								data: data  
								  },)
        					    .then(function (response) {
        					        console.log(response);
        					      	cookies.set('auth', response.data.access, { path: '/' })
									cookies.set('refresh', response.data.refresh, { path: '/' })
									handleClicked()
        					    })
        					    .catch(function (error) {
        					    console.log(error);
        					    })
											console.log(JSON.stringify(values, null, 1))
											actions.setSubmitting(false)
        								}, 1000);
      							}}>
    {props => (
				<form onSubmit={props.handleSubmit}>
				<Field name="email">
    		        {({ field, form }) => (
    		          	<FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
    		            	<FormLabel paddingTop="15px" color="black" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">
									Discord username
							</FormLabel>
    		            	<Input _focus={{outline:"none"}} outline="lightgrey" variant="outline" {...field} id="email" />
    		            	<FormErrorMessage>{form.errors.email}</FormErrorMessage>
    		          	</FormControl>
    		        )}
    		    </Field>
					<Field name="password" >
						{({ field, form }) => (
						<FormControl isRequired isInvalid={form.errors.password && form.touched.password}>
							<FormLabel paddingTop="15px" paddingBottom="5px" color="black" fontFamily="Rubik" fontSize="15px" htmlFor="password">
								Парола
							</FormLabel>
							<InputGroup size="md">
								<Input pr="4.5rem" type={show ? "text" : "password"} isRequired {...field} isInvalid={form.errors.password && form.touched.password}/>
									<InputRightElement width="4.5rem">
										<Button fontFamily="Rubik" fontSize="15px" border="0" colorScheme="green" _focus={{outline:"none"}} h="1.75rem" size="sm" onClick={handleClick}>
											{show ? <ViewIcon/> : <ViewOffIcon/>}
										</Button>
									</InputRightElement>
								</InputGroup>
						</FormControl>)}
					</Field>
					<Button mt={4} colorScheme="green" border="0" isLoading={props.isSubmitting} type="submit">
						Логин
					</Button>
        		</form>
      			)}
    			</Formik>
			</PopoverBody>
		</PopoverContent>
	</Popover>
	)
}

export default Navbar;