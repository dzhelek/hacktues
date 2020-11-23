import React from "react";
import { Box, Input, InputGroup, InputRightElement, Select, InputLeftElement, Switch, Heading, Flex, Button, useToast} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, MenuOptionGroup, MenuItemOption } from "@chakra-ui/react";
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

import { Formik, Field } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import {PhoneIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import Cookies from 'universal-cookie'

import * as Yup from 'yup';

import Router from 'next/router'
import Link from 'next/link'
import Reg from './form'
import Log from './login'
import { useRouter } from "next/router";

const cookies = new Cookies();
const axios = require('axios');

const MenuItems = ({ children }) => (
	<Button _active={{bg:"transparent"}} _hover={{bg:"transparent"}} _focus={{outline:"none"}} fontFamily="Rubik" color="white" bg="transparent" border="0px" borderWidth="0px">
    {children}
  </Button>
);

function equalTo(ref, msg) {
	return Yup.mixed().test({
	  name: 'equalTo',
	  exclusive: false,
	  message: msg || '${path} must be the same as ${reference}',
	  params: {
		reference: ref.path,
	  },
	  test: function(value) {
		return value === this.resolve(ref);
	  },
	});
  }
Yup.addMethod(Yup.string, 'equalTo', equalTo);

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
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	var router = useRouter()
	const toast = useToast()

	const SignupSchema = Yup.object().shape({
		first_name: Yup.string()
			.min(2, 'Твърде кратко!')
		  	.max(50, 'Твърде дълго!')
			.matches(/^[^\w]+$/, 'използвай кирилица')
		  	.matches(/[а-я]/, 'използвай поне една малка буква')
			.matches(/[А-Я]/, 'използвай поне една голяма буква')
		  	.required('Задължително'),
		last_name: Yup.string()
		  	.min(2, 'Too Short!')
		  	.max(50, 'Too Long!')
		  	.matches(/^[^\w]+$/, 'използвай кирилица')
			.matches(/[а-я]/, 'използвай поне една малка буква')
			.matches(/[А-Я]/, 'използвай поне една голяма буква')
		 	.required('Задължително'),
		email: Yup.string().email('Невалиден имейл').required('Задължително'),
		reemail: Yup.string().email('Невалиден имейл').equalTo(Yup.ref('email'), 'Имейлите не са еднакви').required('Задължително'),
		password: Yup.string()
				.matches(/[A-Z]/, 'използвай минимум 1 главна буква')
				.matches(/[a-z]/, 'използвай минимум 1 малка буква')
				.matches(/\d/, 'използвай минимум 1 цифра')
				.matches(/[^\d\w\s]/, 'използвай минимум 1 специален символ')
				.matches(/.{8}/, 'използвай минимум 8 символа'),
		repassword: Yup.string().equalTo(Yup.ref('password'), 'Паролите не са еднакви').required('Задължително'),
		phone: Yup.string()
				.matches(/^0\d{9}$/, 'използвай валиден телефон')
	});


	function validateUsername(value) {
		let error;
		if (value === 'admin') {
		  error = 'Nice try!';
		}
		return error;
	}

    return (
      <>
        <Button _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" onClick={onOpen}>Регистрация</Button>
        <Modal motionPreset="slideInBottom" closeOnOverlayClick={false} isOpen={isOpen} size="xl" onEsc={onClose} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent style={{width:"1000px", minWidth:"55rem"}}>
            <ModalHeader fontFamily="Rubik">Регистрация</ModalHeader>
            <ModalCloseButton _focus={{outline: "none"}} backgroundColor="transparent" border="white" />
            <ModalBody>
			<Formik initialValues={{first_name: '', last_name: '', email: '', password: ''}} validationSchema={SignupSchema}
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
        					        if(response.status == 201){
										toast({
        									  title: "Създаване на акаунт",
        									  description: "Акаунтът беше успешно създаден.",
        									  status: "success",
        									  duration: 9000
        									})
											onClose(true)							
										}
        					    	})
        					    .catch(function (error) {
        					    console.log(error);
        					    })							
											console.log(JSON.stringify(values, null, 1))
          									actions.setSubmitting(false)
        								}, 1000)
      							}}>
    {props => (
				<form style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}} onSubmit={props.handleSubmit}>
				<Field validate={validateUsername} name="first_name">
					{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" isRequired isInvalid={form.errors.first_name && form.touched.first_name}>
						<FormLabel fontFamily="Rubik" fontSize="15px">Име (на кирилица)</FormLabel>
						<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="first_name" />
						<FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
					</FormControl>
					)}
          		</Field>
				<Field name="last_name">
					{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" isRequired isInvalid={form.errors.last_name && form.touched.last_name}>
						<FormLabel fontFamily="Rubik" fontSize="15px" htmlFor="text">Фамилия (на кирилица)</FormLabel>
						<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 1px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="last_name" />
						<FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>
				<Field name="email">
					{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" isRequired isInvalid={form.errors.email && form.touched.email}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="email">Имейл</FormLabel>
						<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} id="email" _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} type="email"/>
						<FormErrorMessage>{form.errors.email}</FormErrorMessage>
					</FormControl>
					)}
				</Field>

				<Field name="reemail">
					{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" isRequired isInvalid={form.errors.reemail && form.touched.reemail}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px">Повторете имейла</FormLabel>
						<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
						<FormErrorMessage>{form.errors.reemail}</FormErrorMessage>
					</FormControl>
					)}
          </Field>
			<Field name="password" >
				{({ field, form }) => (
				<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" isRequired isInvalid={form.errors.password && form.touched.password}>
				<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="password">Парола</FormLabel>
				<InputGroup size="md">
					<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} pr="4.5rem" variant="flushed" type={show ? "text" : "password"} isRequired {...field} isInvalid={form.errors.password && form.touched.password}  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
					<InputRightElement width="4.5rem">
						<Button fontFamily="Rubik" fontSize="15px" border="0" colorScheme="green" _focus={{outline:"none"}} h="1.75rem" size="sm" onClick={handleClick}>
							{show ? <ViewOffIcon/> : <ViewIcon/>}
						</Button>
					</InputRightElement>
				</InputGroup>
				<FormErrorMessage>{form.errors.password}</FormErrorMessage>
				</FormControl>)}
		</Field>

		  <Field name="repassword">
            {({ field, form }) => (
              <FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" {...field} isRequired isInvalid={form.errors.repassword && form.touched.repassword}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="password">Повторете паролата</FormLabel>
                <Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} type="password"/>
                <FormErrorMessage>{form.errors.repassword}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

		  <Field name="form">
            {({ field, form }) => (
				<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" {...field} isRequired>
  					<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="country">Клас</FormLabel>
  					<Select borderRadius={0} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} variant="outline" id="form" fontFamily="Rubik" placeholder="Избери клас">
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

		  	<Field name="phone" >
            	{({ field, form }) => (
              	<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" {...field} isRequired isInvalid={form.errors.phone && form.touched.phone}>
			  	<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="number">Телефон</FormLabel>
			  	<InputGroup>
			  		<InputLeftElement children={<PhoneIcon color="gray.300" />} />
    				<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} id="phone" _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
  					</InputGroup>
					<FormErrorMessage>{form.errors.phone}</FormErrorMessage>
              	</FormControl>
            )}
          	</Field>

			<Field name="alergies" >
				{({ field, form }) => (
				<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" {...field} isInvalid={form.errors.alergies && form.touched.alergies}>
				<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Алергии</FormLabel>
				<Input type="text" id="alergies"  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
				</FormControl>
				)}
			</Field>
			<Field name="tshirt_size">
				{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Размер тениска</FormLabel>
						<Select borderRadius={0}  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="tshirt_size" type="text" fontFamily="Rubik" placeholder="Избери размер">
							<option value="s">S</option>
							<option value="m">M</option>
							<option value="l">L</option>
							<option value="xl">XL</option>
						</Select>
					</FormControl>
				)}
			</Field>
				<Field name="food_preferences">
				{({ field, form }) => (
							<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} w="33%" mr="5px" {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
								<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Консумирате ли месо?</FormLabel>
								<Select borderRadius={0}  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="food_preferences" type="text" fontFamily="Rubik" placeholder="">
									<option value={0}>Да</option>
									<option value={2}>Не, веган съм</option>
									<option value={1}>Не, вегетарианец съм</option>
								</Select>
							</FormControl>
						)}
					</Field>
			<Field name="online">
				{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Искам да съм изцяло онлайн</FormLabel>
					<Switch css={{boxShadow:"none"}} id="online" />
					</FormControl>
				)}
			</Field>

			<Field name="is_active">
				{({ field, form }) => (
					<FormControl mr="5px" flexGrow={1} w={["100%","100%","100%","33%"]}{...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">is_active(testing purposes)</FormLabel>
					<Switch id="is_active" />
					</FormControl>
				)}
			</Field>

			{/* <Button variant="ghost">Login with Discord</Button> */}

			<Button mt={4} colorScheme="green" border="0"
			 isLoading={props.isSubmitting} type="submit"
			>
				Продължи
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

	function handleLog(){
		logIn(true)
	}

	const toast = useToast()
	const router = useRouter()

	return(
	  	<Popover onClose={onClose} autoFocus="false" placement="bottom">
			<PopoverTrigger>
		  		<Button marginLeft={["none","none","none","auto"]} _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" >Влез</Button>
			</PopoverTrigger>
			<PopoverContent _focus={{outline:"none"}} color="white" bg="white"  borderColor="#a5cf9f">
		  		<PopoverArrow />
		  			<PopoverBody >
					  <Formik initialValues={{ email: "", password: "" }} 
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
						router.push('/')
						toast({
        					  title: "Влизането успешно.",
        					  description: "Влизането в профила е успешно.",
        					  status: "success",
        					  duration: 9000
        					})
						onClose(true)
					})
					.catch(function (error) {
						// console.log(error.response.data.detail);
						toast({
        					  title: "Влизането не е успешно.",
        					  description: error.response.data.detail,
        					  status: "error",
        					  duration: 9000
        					})
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
					<FormLabel color="black" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">
							E-mail
					</FormLabel>
					<Input _focus={{outline:"none"}} outline="lightgrey" variant="outline" {...field} id="email1" />
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
						<Input id="password1" pr="4.5rem" type={show ? "text" : "password"} isRequired {...field} isInvalid={form.errors.password && form.touched.password}/>
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