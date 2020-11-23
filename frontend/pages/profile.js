import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"
import { Box, Avatar, Heading, Flex, Text, Button, ButtonGroup, Input, InputGroup, InputLeftElement, IconButton, Icon, Select, Switch } from "@chakra-ui/react";
import { Formik, Field } from 'formik';
import {PhoneIcon, ViewIcon, ViewOffIcon, EditIcon, CheckIcon, CloseIcon} from '@chakra-ui/icons'
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
 } from "@chakra-ui/react";

 import { useControllableProp, useControllableState } from "@chakra-ui/react"
 const cookies = new Cookies()


function Profile(props) {
	
	const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

	function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
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

	  function EditableSelectControls({ isEditing, onSubmit, onCancel, onEdit, field }, def) {

		const [value, setValue] = useControllableState({ defaultValue: def })
 		const handleChange = (e) => {
    		setValue(e.target.value)
  		}

		return isEditing ? (
		  <ButtonGroup justifyContent="center" size="sm">
		  	 <Select value={value} onChange={handleChange} borderRadius={0} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} variant="outline" id="form" fontFamily="Rubik" placeholder="Избери клас">
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
			<IconButton backgroundColor="transparent" borderColor="transparent" icon={<CheckIcon />} onClick={onSubmit} />
			<IconButton backgroundColor="transparent" borderColor="transparent" icon={<CloseIcon />} onClick={onCancel} />
		  </ButtonGroup>
		) : (
			<>
			<Flex>
			<EditableInput {...field} border={0} _focus={{outline:"none"}} id="form" />
		  	<EditablePreview/>
			</Flex>
			<Flex marginLeft="auto" marginRight="20px">
			<IconButton backgroundColor="transparent" borderColor="transparent" size="sm" icon={<EditIcon />} onClick={onEdit} />
		  	</Flex>
			  </>
		)
	  }


	return(
	<Flex backgroundColor="white" p="25px" rounded="lg" flexDirection="column" flexWrap="wrap" margin="50px" marginLeft="100px" marginRight="100px">
		<Flex>
			<Avatar name={props.users.first_name}/>
			<Text fontSize="md" pl="15px">{props.users.first_name}&nbsp;{props.users.last_name}</Text>
		</Flex>

		<Formik initialValues={{ first_name: props.users.first_name , last_name: props.users.last_name, email: props.users.email, form: props.users.form, alergies:props.users.alergies, tshirt_size:props.users.tshirt_size, food_preferences:props.users.food_preferences, online:props.users.online, is_active:props.users.is_active }} 
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
        					    })
        					    .catch(function (error) {
        					    console.log(error);
        					    })
        					    .then(function () {
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
				<form style={{display:"flex",flexDirection:"column",flexWrap:"wrap", paddingTop:"15px"}} onSubmit={props.handleSubmit}>
				<Flex>
				<Field initialValues={{first_name: '', last_name: '', email: '', password: ''}} name="first_name">
					{({ field, form }) => (
					<FormControl width="auto" mr="5px" flexGrow={1} flexShrink={1} flexBasis="50%" isInvalid={form.errors.name && form.touched.name}>
						<FormLabel fontFamily="Rubik" fontSize="15px">Име (на кирилица)</FormLabel>
						<Editable  pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="fist_name" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
          							<EditableInput {...field} border={0} _focus={{outline:"none"}} id="first_name" /><EditableControls {...props} />
        						</>
      							)}
    					</Editable>
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
          		</Field>

				<Field name="last_name">
					{({ field, form }) => (
					<FormControl mr="5px" flexGrow={1} flexShrink={1} flexBasis="auto" width="50%" isRequired isInvalid={form.errors.name && form.touched.name}>
						<FormLabel fontFamily="Rubik" fontSize="15px" htmlFor="text">Фамилия (на кирилица)</FormLabel>
						<Editable  pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="last_name" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
          							<EditableInput {...field} border={0} _focus={{outline:"none"}} id="last_name" /><EditableControls {...props} />
        						</>
      							)}
    					</Editable>
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>
				</Flex>
				<Flex>
				<Field name="email">
					{({ field, form }) => (
					<FormControl mr="5px" flexGrow={1} flexShrink={1} flexBasis="auto" width="50%" isRequired isInvalid={form.errors.email && form.touched.email}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="email">Имейл</FormLabel>
						
						<Editable  pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="email" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
          							<EditableInput {...field} border={0} _focus={{outline:"none"}} id="email" /><EditableControls {...props} />
        						</>
      							)}
    					</Editable>
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>

		  <Field name="form">
            {({ field, form }) => (
				<FormControl mr="5px" flexGrow={1} flexShrink={1} flexBasis="auto" width="50%" {...field} isRequired>
  					<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="country">Клас</FormLabel>
					<Editable  pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="email" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
          							<EditableSelectControls {...props} />
        						</>
      							)}
    				</Editable>

				</FormControl>
            )}
          </Field>
		  </Flex>
		  <Flex>
		  	<Field name="phone" >
            	{({ field, form }) => (
              	<FormControl  mr="5px" flexGrow={1} flexShrink={1} flexBasis="50%" width="auto" {...field} isRequired isInvalid={form.errors.phone && form.touched.phone}>
			  	<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="number">Телефон</FormLabel>  					
					<Editable  w="100%" pt="5px" borderColor="inherit" borderBottom="1px solid" display="flex" fontFamily="Rubik" variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="phone" isPreviewFocusable={false} submitOnBlur={false}>
      						{(props) => (
        						<>
								<Icon children={<PhoneIcon color="gray.300" />} mr="5px" /><EditableInput {...field} border={0} _focus={{outline:"none"}} id="phone" /><EditableControls {...props} />
        						</>
      							)}
    					</Editable>  
              	</FormControl>
            )}
          	</Field>
			<Field name="alergies" >
				{({ field, form }) => (
				<FormControl mr="5px" flexGrow={1} flexShrink={1} flexBasis="50%" width="auto" {...field} isInvalid={form.errors.alergies && form.touched.alergies}>
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
			</Flex>
			<Flex>
			<Field name="tshirt_size">
				{({ field, form }) => (
					<FormControl mr="5px" flexGrow={1} flexShrink={1} flexBasis="auto" width="50%"  {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
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
							<FormControl mr="5px" flexGrow={1} flexShrink={1} flexBasis="auto" width="50%"  {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
								<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Консумирате ли месо?</FormLabel>
								<Select borderRadius={0}  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="food_preferences" type="text" fontFamily="Rubik" placeholder="">
									<option value={0}>Да</option>
									<option value={2}>Не, веган съм</option>
									<option value={1}>Не, вегетарианец съм</option>
								</Select>
							</FormControl>
						)}
					</Field>
					</Flex>
					<Flex>
			<Field name="online">
				{({ field, form }) => (
					<FormControl mr="5px" flexGrow={1} flexShrink={1} flexBasis="auto" width="50%"  {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Искам да съм изцяло онлайн</FormLabel>
					<Switch {...field} css={{boxShadow:"none"}} id="online" />
					</FormControl>
				)}
			</Field>

			<Field name="is_active">
				{({ field, form }) => (
					<FormControl mr="5px" flexGrow={1} flexShrink={1} flexBasis="auto" width="50%"  {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">is_active(testing purposes)</FormLabel>
					<Switch {...field} id="is_active" />
					</FormControl>
				)}
			</Field>
</Flex>
			{/* <Button alignSelf="center" mt={4} colorScheme="green" border="0" isLoading={props.isSubmitting} type="submit">
				Регистрирай ме
			</Button> */}
        </form>
      )}
    </Formik>
	</Flex>)
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

const update = () => {
	var response = axios({
			method: 'post',
			url: `https://hacktues.pythonanywhere.com/users/${jwt_decode(cookies.get('auth')).user_id}`,
			header: {'Content-Type': 'application/json',
			"Authorization": `Bearer ${cookies.get('auth')}`},
			data: {"email": "hacktues","password": "Go Green"}
		})

	return response
}

export default Profile