import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"
import { Box, Avatar, InputRightElement, Flex, Text, Button, ButtonGroup, Input, InputGroup, InputLeftElement, IconButton, Icon, Select, Switch } from "@chakra-ui/react";
import { Formik, Field, Form } from 'formik';
import {PhoneIcon, ViewIcon, ViewOffIcon, EditIcon, CheckIcon, CloseIcon} from '@chakra-ui/icons'
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
 } from "@chakra-ui/react";

import { useControllableProp, useControllableState } from "@chakra-ui/react"

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
  } from "@chakra-ui/react"

const cookies = new Cookies()

import { useRouter } from "next/router";
import * as Yup from 'yup';
function Profile(props) {
	
	const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

	var router = useRouter()

	function EditableControls({isEditing, onSubmit, onCancel, onEdit }) {
		return isEditing ? (
		  <ButtonGroup justifyContent="center" size="sm">
			<IconButton backgroundColor="transparent" borderColor="transparent" icon={<CheckIcon />} onClick={onSubmit} />
			<IconButton backgroundColor="transparent" borderColor="transparent" icon={<CloseIcon />} onClick={onCancel} />
		  </ButtonGroup>
		) : (
			<>
			<Flex>
		  	<EditablePreview/>
			</Flex>
			<Flex marginLeft="auto" marginRight="20px">
			<IconButton backgroundColor="transparent" borderColor="transparent" size="sm" icon={<EditIcon />} onClick={onEdit} />
		  	</Flex>
			</>
		)
	  }

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

	const handleFormPatch = (e) => {

		var form = e.target.attributes.id.value
		var data = e.target.value

		update(form, data)
		router.reload()
	}

	const handlePatch = (input, field, field1) => {
		// console.log(input, field);
		var name = field
		var data = input
		// console.log(field1);
		// console.log({form:form, data:data});

		// update(form, data)
		// router.reload()
	}

	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const cancelRef = React.useRef()

	return(
	<Box paddingBottom="300px" maxW="960px" marginLeft="auto" marginRight="auto">
	<Flex backgroundColor="white" p="25px" rounded="lg" flexDirection="column" flexWrap="wrap" margin="50px">
		<Flex>
			<Avatar name={props.users.first_name}/>
			<Text fontSize="md" pl="15px">{props.users.first_name}&nbsp;{props.users.last_name}</Text>
		</Flex>

		<Formik validationSchema={SignupSchema} initialValues={{ first_name: props.users.first_name , last_name: props.users.last_name, email: props.users.email, form: props.users.form, alergies:props.users.alergies, tshirt_size:props.users.tshirt_size, food_preferences:props.users.food_preferences, online:props.users.is_online}}> 
			{(props) => (
				<Form style={{display:"flex",flexDirection:"row",flexWrap:"wrap", paddingTop:"10px"}} onSubmit={props.handleSubmit}>
				<Field validate={validateUsername} name="first_name">
					{({ field, form}) => (
					<FormControl flexGrow={1} w={["100%","100%","33%","33%", "33%"]} mr="5px" isRequired isInvalid={form.errors.first_name && form.touched.first_name}>
						<FormLabel fontFamily="Rubik" fontSize="15px">Име (на кирилица)</FormLabel>
						<Editable
							pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="fist_name" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
									<EditableInput {...field} border={0} _focus={{outline:"none"}} id="first_name" /><EditableControls {...form} {...props} />
        						</>
      							)}
    					</Editable>
						<FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
					</FormControl>
					)}
          		</Field>
				<Field name="last_name">
					{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","33%","33%", "33%"]} mr="5px" isRequired isInvalid={form.errors.last_name && form.touched.last_name}>
						<FormLabel fontFamily="Rubik" fontSize="15px" htmlFor="text">Фамилия (на кирилица)</FormLabel>
						<Editable  pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="fist_name" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
          							<EditableInput {...field} border={0} _focus={{outline:"none"}} id="first_name" /><EditableControls {...props} />
        						</>
      							)}
    					</Editable>
						<FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>
				<Field name="email">
					{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","33%","33%","33%"]} mr="5px" isRequired isInvalid={form.errors.email && form.touched.email}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="email">Имейл</FormLabel>
						<Editable  pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="fist_name" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
          							<EditableInput {...field} border={0} _focus={{outline:"none"}} id="first_name" /><EditableControls {...props} />
        						</>
      							)}
    					</Editable>
						<FormErrorMessage>{form.errors.email}</FormErrorMessage>
					</FormControl>
					)}
				</Field>
		  <Field name="form">
            {({ field, form }) => (
				<FormControl flexGrow={1} w={["100%","100%","100%","33%"]} mr="5px" {...field} isRequired>
  					<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="country">Клас</FormLabel>
  					<Select onInput={handleFormPatch} borderRadius={0} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} variant="outline" id="form" fontFamily="Rubik" placeholder="Избери клас">
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
				<FormControl  mr="5px" flexGrow={1} w={["100%","100%","100%","33%"]} width="auto" {...field} isRequired isInvalid={form.errors.phone && form.touched.phone}>
			  	<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="number">Телефон</FormLabel>  					
					<Editable  w="100%" pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="phone" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
								<Icon h="inherit" children={<PhoneIcon color="gray.300" />} mr="5px" /><EditableInput {...field} border={0} _focus={{outline:"none"}} id="phone" /><EditableControls {...field} {...props} />
        						</>
      							)}
    					</Editable>  
              	</FormControl>
            )}
          	</Field>

			<Field name="alergies" >
				{({ field, form }) => (
				<FormControl flexGrow={1} w={["100%","100%","33%","33%"]} mr="5px" {...field} isInvalid={form.errors.alergies && form.touched.alergies}>
				<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Алергии</FormLabel>
				<Editable  w="100%" pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="alergies" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
									<EditableInput {...field} border={0} _focus={{outline:"none"}} id="alergies" /><EditableControls {...props} />
        						</>
      							)}
    					</Editable> 
				</FormControl>
				)}
			</Field>
			<Field name="tshirt_size">
				{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","33%","33%"]} mr="5px" {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Размер тениска</FormLabel>
						<Select onInput={handleFormPatch}  borderRadius={0}  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="tshirt_size" type="text" fontFamily="Rubik" placeholder="Избери размер">
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
							<FormControl flexGrow={1} w={["100%","100%","33%","33%"]} w="33%" mr="5px" {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
								<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Консумирате ли месо?</FormLabel>
								<Select onInput={handleFormPatch}  borderRadius={0}  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="food_preferences" type="text" fontFamily="Rubik" placeholder="">
									<option value={0}>Да</option>
									<option value={1}>Не, вегетарианец съм</option>
									<option value={2}>Не, веган съм</option>
								</Select>
							</FormControl>
						)}
					</Field>
			<Field name="online">
				{({ field, form }) => (
					<FormControl display="flex" flexDirection="row" flexGrow={1} w={["100%","100%","33%","33%"]} mr="5px" {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Искам да съм изцяло онлайн</FormLabel>
					<Switch {...field} css={{boxShadow:"none", alignSelf: "center"}} id="online" />
					</FormControl>
				)}
			</Field>

			{/* <Button mt={4} colorScheme="green" border="0"
			 isLoading={props.isSubmitting} type="submit"
			>
				Продължи
			</Button> */}


			{/* <Button colorScheme="green" onClick={() => setIsOpen(true)}>
		  Редактирай
		</Button>
  
		<AlertDialog
		  isOpen={isOpen}
		  leastDestructiveRef={cancelRef}
		  onClose={onClose}
		>
		  <AlertDialogOverlay>
			<AlertDialogContent>
			  <AlertDialogHeader fontSize="lg" fontWeight="bold">
				Delete Customer
			  </AlertDialogHeader>
  
			  <AlertDialogBody>
				Are you sure? You can't undo this action afterwards.
			  </AlertDialogBody>
  
			  <AlertDialogFooter>
				<Button ref={cancelRef} onClick={onClose}>
				  Cancel
				</Button>
				<Button colorScheme="red" mt={4} colorScheme="green" border="0"
			 isLoading={props.isSubmitting} type="submit" onClick={onClose} ml={3}>
				  Delete
				</Button>
			  </AlertDialogFooter>
			</AlertDialogContent>
		  </AlertDialogOverlay>
		</AlertDialog> */}
        </Form>
      )}
    </Formik>
	</Flex>
	</Box>)
}

export async function getServerSideProps(ctx) {
	
	const cookies = new Cookies(ctx.req.headers.cookie);

	var response = await axios({
		method: 'get',
		url: `https://hacktues.pythonanywhere.com/users/${jwt_decode(cookies.get('auth')).user_id}`,
		headers: 
		{ "Content-type": "Application/json",
		  "Authorization": `Bearer ${cookies.get('auth')}`}
		},
		)
	return {props: {users: response.data}}
}


async function update(form, data) {
	console.log(data);
	axios({
		method: 'patch',
		url: `https://hacktues.pythonanywhere.com/users/${jwt_decode(cookies.get('auth')).user_id}/`,
		headers: 
		{ "Content-type": "Application/json",
		  "Authorization": `Bearer ${cookies.get('auth')}`},
		data: {[form] : data},
		strict: false
		},
		)	
}
export default Profile