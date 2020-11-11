
import { Box, Button, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Select, Switch } from "@chakra-ui/core";
import { Formik, Field } from 'formik';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
 } from "@chakra-ui/core";

const axios = require('axios');
import Cookies from 'universal-cookie';
import {PhoneIcon} from '@chakra-ui/icons'
const cookies = new Cookies();
 


export default function Regulation() {
    
	const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
    <Box pb="25px">
        <Box pl="25px" pr="25px" pt="25px" ml={["25px","100px", "200px","250px","300px","600px"]} mr={["25px","100px", "200px","250px","300px","600px"]} pb="25px" rounded="lg" backgroundColor="#ffff" mb={["160px", "150px"]} mt={["50px", "50px", "50px","100px"]}>
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
        <form onSubmit={props.handleSubmit}>
          <Field initialValues={{first_name: '', last_name: '', email: '', password: ''}} name="first_name">
            {({ field, form }) => (
              <FormControl isRequired isInvalid={form.errors.name && form.touched.name}>
                <FormLabel paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Име (на кирилица)</FormLabel>
                <Input _focus="none" outline="lightgrey" variant="outline" {...field} id="first_name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
		  <Field name="last_name">
            {({ field, form }) => (
              <FormControl  isRequired isInvalid={form.errors.name && form.touched.name}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Фамилия (на кирилица)</FormLabel>
                <Input _focus="none" outline="lightgrey" variant="outline" {...field} id="last_name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
		  <Field name="email">
            {({ field, form }) => (
              <FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="email">Имейл</FormLabel>
                <Input {...field} id="email" type="email"/>
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
		  <Field name="username">
            {({ field, form }) => (
              <FormControl isRequired isInvalid={form.errors.name && form.touched.name}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Discord username</FormLabel>
                <Input _focus="none" outline="lightgrey" variant="outline" {...field} id="username" />
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
        <Button fontFamily="Rubik" fontSize="15px" border="0" colorScheme="green" _focus="none" h="1.75rem" size="sm" onClick={handleClick}>
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

		  <Field name="form">
            {({ field, form }) => (
				<FormControl {...field} isRequired>
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

		  <Field name="phone" >
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

		  <Field name="alergies" >
            {({ field, form }) => (
              <FormControl {...field} isInvalid={form.errors.alergies && form.touched.alergies}>
			  <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Алергии</FormLabel>
			  <Input type="text" id="alergies" variant="outline"/>
              </FormControl>
            )}
          </Field>

		  <Field name="tshirt_size">
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
	<Field name="food_preferences">
	{({ field, form }) => (
				<FormControl {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
  					<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Консумирате ли месо?</FormLabel>
  					<Select variant="outline" id="food_preferences" type="text" fontFamily="Rubik" placeholder="Избери размер">
  						<option value={0}>Да</option>
  						<option value={2}>Не, веган съм</option>
						<option value={1}>Не, вегетарианец съм</option>
					</Select>
				</FormControl>
            )}
          </Field>
		  <Field name="is_active">
            {({ field, form }) => (
				<FormControl {...field}>
				<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Искам да съм изцяло онлайн</FormLabel>
  				<Switch id="is_active" />
				</FormControl>
            )}
          </Field>

		  <Button
            mt={4}
            colorScheme="green"
			border="0"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Регистрирай ме
          </Button>
        </form>
      )}
    </Formik>
</Box>
</Box>
    );}