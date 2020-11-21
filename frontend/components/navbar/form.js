import { Formik, Field } from 'formik';
import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Switch, Select } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import {PhoneIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const axios = require('axios');

export default function Reg(){

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

    return(
    <Formik initialValues={{first_name: '', last_name: '', email: '', password: ''}}
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
											console.log(JSON.stringify(values, null, 1))
          									actions.setSubmitting(false)
        								}, 1000)
      							}}>
    {props => (
				<form style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}} onSubmit={props.handleSubmit}>
				<Field name="first_name">
					{({ field, form }) => (
					<FormControl mr="5px" flex="1 1 400px" isRequired isInvalid={form.errors.name && form.touched.name}>
						<FormLabel fontFamily="Rubik" fontSize="15px">Име (на кирилица)</FormLabel>
						<Input _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="first_name" />
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
          		</Field>
				<Field name="last_name">
					{({ field, form }) => (
					<FormControl mr="5px" flex="1 1 400px" isRequired isInvalid={form.errors.name && form.touched.name}>
						<FormLabel fontFamily="Rubik" fontSize="15px" htmlFor="text">Фамилия (на кирилица)</FormLabel>
						<Input  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="last_name" />
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>
				<Field name="email">
					{({ field, form }) => (
					<FormControl mr="5px" flex="1 1 400px" isRequired isInvalid={form.errors.email && form.touched.email}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="email">Имейл</FormLabel>
						<Input id="email" _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} type="email"/>
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>

				<Field name="reemail">
					{({ field, form }) => (
					<FormControl borderTop={0} borderRight={0} borderLeft={0} mr="5px" flex="1 1 400px" isRequired isInvalid={form.errors.email && form.touched.email}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px">Повторете имейла</FormLabel>
						<Input  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
					)}
          </Field>
			<Field name="password" >
				{({ field, form }) => (
				<FormControl borderTop={0} borderRight={0} borderLeft={0} mr="5px" flex="1 1 400px" isRequired isInvalid={form.errors.phone && form.touched.phone}>
				<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="password">Парола</FormLabel>
				<InputGroup size="md">
		<Input pr="4.5rem" variant="flushed" type={show ? "text" : "password"} isRequired {...field} isInvalid={form.errors.password && form.touched.password}  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
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
              <FormControl mr="5px" flex="1 1 400px" {...field} isRequired isInvalid={form.errors.password && form.touched.password}>
                <FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="password">Повторете паролата</FormLabel>
                <Input _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} type="password"/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

		  <Field name="form">
            {({ field, form }) => (
				<FormControl mr="5px" flex="1 1 400px" {...field} isRequired>
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
              	<FormControl mr="5px" flex="1 1 400px" {...field} isRequired isInvalid={form.errors.phone && form.touched.phone}>
			  	<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="number">Телефон</FormLabel>
			  	<InputGroup>
			  		<InputLeftElement children={<PhoneIcon color="gray.300" />} />
    				<Input id="phone" _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
  					</InputGroup>
              	</FormControl>
            )}
          	</Field>

			<Field name="alergies" >
				{({ field, form }) => (
				<FormControl mr="5px" flex="1 1 400px" {...field} isInvalid={form.errors.alergies && form.touched.alergies}>
				<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Алергии</FormLabel>
				<Input type="text" id="alergies"  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
				</FormControl>
				)}
			</Field>
			<Field name="tshirt_size">
				{({ field, form }) => (
					<FormControl mr="5px" flex="1 1 400px" {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
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
							<FormControl mr="5px" flex="1 1 400px" {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
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
					<FormControl mr="5px" flex="1 1 400px" {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Искам да съм изцяло онлайн</FormLabel>
					<Switch css={{boxShadow:"none"}} id="online" />
					</FormControl>
				)}
			</Field>

			<Field name="is_active">
				{({ field, form }) => (
					<FormControl mr="5px" flex="1 1 400px" {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">is_active(testing purposes)</FormLabel>
					<Switch id="is_active" />
					</FormControl>
				)}
			</Field>

			<Button variant="ghost">Login with Discord</Button>

			<Button mt={4} colorScheme="green" border="0"
			 isLoading={props.isSubmitting} type="submit"
			>
				Продължи
			</Button>

        </form>
      )}
    </Formik>
    )
}