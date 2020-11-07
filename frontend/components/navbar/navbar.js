import React from "react";
import { Box, Heading, Flex, Text, Button, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Select, Switch } from "@chakra-ui/core";
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

import { Formik, Field, Form } from 'formik';

import { useDisclosure } from "@chakra-ui/core";

const MenuItems = ({ children }) => (
	<Button _active="transparent" _hover="transparent" fontFamily="Rubik" color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px">
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

      <Flex flexWrap="wrap" display={{"450px":"none", sm:"none", md:"none", lg: "flex" }} alignItems="center" flexGrow={1}>
        <MenuItems><Link href="/schedule" ><a>Програма</a></Link></MenuItems>
        <MenuItems><Link href="/regulation"><a>Регламент</a></Link></MenuItems>
        	<Menu>
        		<MenuButton cursor="pointer" _hover="transparent" as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    				Архив
  				</MenuButton>
  				<MenuList _hover="transparent" p="0">
    				<Link href="/archive/hacktues" ><a><MenuItem fontSize="1.25rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="white" _focus="outline: none;" border="0px" borderWidth="0px"><span>Hack</span>&nbsp;<span style={{"color":"#446576"}}>TUES</span></MenuItem></a></Link>
    				<Link href="/archive/hacktues2" ><a><MenuItem fontSize="1.25rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="white"  _focus="outline: none;" border="0px" borderWidth="0px"><span>Hack</span>&nbsp;<span style={{"color":"#446576"}}>TUES</span>&nbsp;<span>2</span></MenuItem></a></Link>
    				<Link href="/archive/hacktues3" ><a><MenuItem fontSize="1.25rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#232323"  _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"#fff"}}>Hack</span>&nbsp;<span style={{"color":"#09c0de"}}>TUES</span >&nbsp;<span style={{"color":"#b2006e"}}>3</span></MenuItem></a></Link>
    				<Link href="/archive/hacktues30" ><a><MenuItem fontSize="1.25rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#232323" _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"cyan"}}>Hack&nbsp;<sup>30x</sup>TUES</span></MenuItem></a></Link>
					  <Link href="/archive/hacktues365" ><a><MenuItem fontSize="1.25rem" fontFamily="llpixel" fontWeight="400" color="black" backgroundColor="#343a40"  _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"#d6c6ad"}}>Hack</span>&nbsp;<span style={{"color":"#99d02b"}}>&nbsp;TUES&nbsp;</span><span style={{"color":"#99d02b"}} ><sup>^365</sup></span></MenuItem></a></Link>
  				</MenuList>
			</Menu>
        	<Menu>
        		<MenuButton cursor="pointer" _hover="transparent" as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
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
		<BasicUsage/>
      </Flex>


	<Box width="auto" display={{ md:"flex", lg: "none" }}>
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
    
	<Flex  display={{ md:"flex", lg: "none" }} width={{ "900px": "100%", md: "100%" }} alignItems="center" flexGrow={1}>
    	<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        	<DrawerOverlay />
        	<DrawerContent backgroundColor="#a5cf9f" color="#a5cf9f">
          	<DrawerCloseButton border="0px" backgroundColor="#a5cf9f" _focus="outline:hidden;" />
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
        			<MenuButton  as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    					Архив
  					</MenuButton>
  					<MenuList p="0">
    					<Link href="/archive/hacktues" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="200" color="black" backgroundColor="white" _focus="outline: none;" border="0px" borderWidth="0px"><span>Hack</span>&nbsp;<span style={{"color":"#446576"}}>TUES</span></MenuItem></a></Link>
    					<Link href="/archive/hacktues2" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="200" color="black" backgroundColor="white"  _focus="outline: none;" border="0px" borderWidth="0px"><span>Hack</span>&nbsp;<span style={{"color":"#446576"}}>TUES</span>&nbsp;<span>2</span></MenuItem></a></Link>
    					<Link href="/archive/hacktues3" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="200" color="black" backgroundColor="#232323"  _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"#fff"}}>Hack</span>&nbsp;<span style={{"color":"#09c0de"}}>TUES</span >&nbsp;<span style={{"color":"#b2006e"}}>2</span></MenuItem></a></Link>
    					<Link href="/archive/hacktues30" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="200" color="black" backgroundColor="#232323" _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"cyan"}}>Hack&nbsp;<sup>30x</sup>TUES</span></MenuItem></a></Link>
					  	<Link href="/archive/hacktues365" ><a><MenuItem fontSize="1rem" fontFamily="llpixel" fontWeight="300" color="black" backgroundColor="#343a40"  _focus="outline: none;" border="0px" borderWidth="0px"><span style={{"color":"#d6c6ad"}}>Hack</span>&nbsp;<span style={{"color":"#99d02b"}}>&nbsp;TUES&nbsp;</span><span style={{"color":"#99d02b"}} ><sup>^365</sup></span></MenuItem></a></Link>
  					</MenuList>
				</Menu>
        		<Menu>
        			<MenuButton as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    					Декларации
  					</MenuButton>
  					<MenuList p="0">
    					<a href="http://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.docx"><MenuItem fontSize="1rem" color="white" backgroundColor="#a5cf9f"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за пълнолетни(docx)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_pylnoletni%20uchenici_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="#a5cf9f"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за пълнолетни(pdf)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.docx"><MenuItem fontSize="1rem"  color="white" backgroundColor="#a5cf9f"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за непълнолетни(docx)</MenuItem></a>
    					<a href="https://hacktues.pythonanywhere.com/static/frontend/Declaracia_uchenici%20pod%2018_v.2.pdf"><MenuItem fontSize="1rem" color="white" backgroundColor="#a5cf9f"  _focus="outline: none;" border="0px" borderWidth="0px">Декларация за непълнолетни(pdf)</MenuItem></a>
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
</header>
  )
};



function BasicUsage() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	
	const [show, setShow] = React.useState(false);
  	const handleClick = () => setShow(!show);

    return (
      <>
        <Button marginLeft="auto" _active="transparent" cursor="pointer" _hover="transparent" fontFamily="Rubik" color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" onClick={onOpen}>Регистрация</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontFamily="Rubik">Регистрация</ModalHeader>
            <ModalCloseButton _focus="outline: none;" backgroundColor="transparent" border="white" />
            <ModalBody>
			<Formik initialValues={{ name: "", email: "" }} 
				onSubmit={(values, actions) => {
        			setTimeout(() => {
          			alert(JSON.stringify(values))
          			actions.setSubmitting(false)
        		}, 1000)
      		}}
    		>
    {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name">
            {({ field, form }) => (
              <FormControl isRequired isInvalid={form.errors.name && form.touched.name}>
                <FormLabel paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Име (на кирилица)</FormLabel>
                <Input _focus="none" outline="lightgrey" variant="outline" {...field} id="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
		  <Field name="lastname">
            {({ field, form }) => (
              <FormControl  isRequired isInvalid={form.errors.name && form.touched.name}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Фамилия (на кирилица)</FormLabel>
                <Input _focus="none" outline="lightgrey" variant="outline" {...field} id="lastname" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
		  <Field name="email">
            {({ field, form }) => (
              <FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="email">Имейл</FormLabel>
                <Input {...field} type="email"/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

		  <Field name="reemail">
            {({ field, form }) => (
              <FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Повторете имейла</FormLabel>
                <Input type="text"/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
			
		  <Field name="password" >
            {({ field, form }) => (
              <FormControl isRequired isInvalid={form.errors.phone && form.touched.phone}>
			  <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="password">Парола</FormLabel>
			  <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
		isRequired {...field} isInvalid={form.errors.password && form.touched.password}
      />
      <InputRightElement width="4.5rem">
        <Button fontFamily="Rubik" fontSize="15px" border="0" variantColor="green" _focus="none" h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
    </FormControl>)}
    </Field>

		  <Field name="repassword">
            {({ field, form }) => (
              <FormControl {...field} isRequired isInvalid={form.errors.password && form.touched.password}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="password">Повторете паролата</FormLabel>
                <Input type="password"/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

		  <Field name="class">
            {({ field, form }) => (
				<FormControl {...field} isRequired>
  					<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="country">Клас</FormLabel>
  					<Select variant="outline" id="class" fontFamily="Rubik" placeholder="Избери клас">
					  	<option value="8A">8А</option>
  						<option value="8Б">8Б</option>
  						<option value="8В">8В</option>
						<option value="8Г">8Г</option>
					  	<option value="9А">9А</option>
  						<option value="9Б">9Б</option>
  						<option value="9В">9В</option>
						<option value="9Г">9Г</option>
					  	<option value="10А">10А</option>
  						<option value="10Б">10Б</option>
  						<option value="10В">10В</option>
						<option value="10Г">10Г</option>
					  	<option value="11А">11А</option>
  						<option value="11Б">11Б</option>
  						<option value="11В">11В</option>
						<option value="11Г">11Г</option>
					  	<option value="12А">12А</option>
  						<option value="12Б">12Б</option>
  						<option value="12В">12В</option>
						<option value="12Г">12Г</option>
					</Select>
				</FormControl>
            )}
          </Field>

		  <Field name="phone" >
            {({ field, form }) => (
              <FormControl {...field} isRequired isInvalid={form.errors.phone && form.touched.phone}>
			  <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="number">Телефон</FormLabel>
			  <InputGroup>
			  	<InputLeftElement children={<Icon name="phone" color="gray.300" />} />
    			<Input/>
  				</InputGroup>
              </FormControl>
            )}
          </Field>

		  <Field name="alergies" >
            {({ field, form }) => (
              <FormControl {...field} isInvalid={form.errors.alergies && form.touched.alergies}>
			  <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Алергии</FormLabel>
			  <Input type="text" id="alergies" variant="outline"/>
              </FormControl>
            )}
          </Field>

		  <Field name="tshirt">
            {({ field, form }) => (
				<FormControl {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
  					<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Размер тениска</FormLabel>
  					<Select variant="outline" id="tshirt" type="text" fontFamily="Rubik" placeholder="Избери размер">
					  	<option value="XS">XS</option>
  						<option value="S">S</option>
  						<option value="M">M</option>
						<option value="L">L</option>
					  	<option value="XL">XL</option>
  						<option value="XXL">XXL</option>
					</Select>
				</FormControl>
            )}
          </Field>
	<Field name="meat">
            {({ field, form }) => (
				<FormControl {...field}>
				<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Консумирате ли месо?</FormLabel>
  				<Switch id="meat" />
				</FormControl>
            )}
          </Field>
		  <Field name="online">
            {({ field, form }) => (
				<FormControl>
				<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Искам да съм изцяло онлайн</FormLabel>
  				<Switch id="online" />
				</FormControl>
            )}
          </Field>

		  <Button
            mt={4}
            variantColor="green"
			border="0"
            isLoading={props.isSubmitting}
            type="submit"
          >
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


export default Navbar;