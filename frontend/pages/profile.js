import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import {Box, Avatar, Flex, Text, Input, InputGroup, InputLeftElement, Select, Switch, useToast } from "@chakra-ui/react";
import { Formik, Field, Form, useFormikContext, useField } from 'formik';
import { PhoneIcon } from '@chakra-ui/icons'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText,
 } from "@chakra-ui/react";

import {useCallback, useEffect, useState} from 'react'
import _ from 'lodash';
const cookies = new Cookies()
import * as Yup from 'yup';

function Profile(props) {

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
	 	phone: Yup.string()
			.matches(/^0\d{9}$/, 'използвай валиден телефон')
	});


	return(
	<Box paddingBottom="300px" maxW="960px" marginLeft="auto" marginRight="auto">
	<Flex backgroundColor="white" p="25px" rounded="lg" flexDirection="column" flexWrap="wrap" margin="50px">
		<Flex>
			<Avatar name={props.users.first_name}/>
			<Text fontSize="md" pl="15px">{props.users.first_name}&nbsp;{props.users.last_name}</Text>
		</Flex>
		<Formik validationSchema={SignupSchema} initialValues={{ first_name: props.users.first_name , last_name: props.users.last_name, email: props.users.email, form: props.users.form, alergies:props.users.alergies, tshirt_size:props.users.tshirt_size, food_preferences:props.users.food_preferences, is_online:props.users.is_online, phone: props.users.phone}}
		onSubmit={(values, actions) => {
        	setTimeout(() => {
					var data = JSON.stringify(values, null, 1)
					console.log(data)
        			axios({
        				method: 'patch',
        				url: `https://hacktues.pythonanywhere.com/users/${jwt_decode(cookies.get('auth')).user_id}/`,
        				headers: 
        				{ "Content-type": "Application/json",
        				  "Authorization": `Bearer ${cookies.get('auth')}`},
						data: data  
						  },)
        			    .then(function (response) {
							// console.log(response)

							toast({ title: "Промени по акаунт", description: "Промените бяха направени успешно.", status: "success", duration: 4500})
        			    	})
        			    .catch(function (error) {
        			    console.log(error);
        			    })							
          				actions.setSubmitting(false)
        			}, 1000)
      		}}> 
			{(props) => (
				<Form style={{display:"flex",flexDirection:"row",flexWrap:"wrap", paddingTop:"10px"}} onSubmit={props.handleSubmit}>
				<Field name="first_name">
					{({ field, form}) => (
					<FormControl flexGrow={1} w={["100%","100%","33%","33%", "33%"]} mr="5px" isRequired isInvalid={form.errors.first_name && form.touched.first_name}>
						<FormLabel fontFamily="Rubik" fontSize="15px">Име (на кирилица)</FormLabel>
						<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="first_name" />
						<FormErrorMessage border={0}>{form.errors.first_name}</FormErrorMessage>
					</FormControl>
					)}
          		</Field>
				<Field name="last_name">
					{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","33%","33%", "33%"]} mr="5px" isRequired isInvalid={form.errors.last_name && form.touched.last_name}>
						<FormLabel fontFamily="Rubik" fontSize="15px" htmlFor="text">Фамилия (на кирилица)</FormLabel>
							<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="last_name" />
						<FormErrorMessage border={0}>{form.errors.last_name}</FormErrorMessage>
					</FormControl>
					)}
				</Field>
				<Field name="email">
					{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","33%","33%","33%"]} mr="5px" isRequired isInvalid={form.errors.email && form.touched.email}>
						<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="email">Имейл</FormLabel>
							<Input isDisabled _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="email" />
						<FormErrorMessage border={0}>{form.errors.email}</FormErrorMessage>
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
				<FormControl  mr="5px" flexGrow={1} w={["100%","100%","100%","33%"]} width="auto" {...field} isRequired isInvalid={form.errors.phone && form.touched.phone}>
			  	<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="number">Телефон</FormLabel>  					
				  <InputGroup>
			  		<InputLeftElement children={<PhoneIcon color="gray.300" />} />
    				<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} id="phone" _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
  					</InputGroup> 
              	</FormControl>
            )}
          	</Field>

			<Field name="alergies" >
				{({ field, form }) => (
				<FormControl flexGrow={1} w={["100%","100%","33%","33%"]} mr="5px" {...field} isInvalid={form.errors.alergies && form.touched.alergies}>
				<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Алергии</FormLabel>
				<Input _invalid={{boxShadow: "0 1px 0 0 #E53E3E", borderColor:"#E53E3E"}} id="alergies" _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field}/>
				</FormControl>
				)}
			</Field>
			<Field name="tshirt_size">
				{({ field, form }) => (
					<FormControl flexGrow={1} w={["100%","100%","33%","33%"]} mr="5px" {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
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
							<FormControl flexGrow={1} w={["100%","100%","33%","33%"]} w="33%" mr="5px" {...field} isInvalid={form.errors.tshirt && form.touched.tshirt} isRequired>
								<FormLabel paddingTop="15px" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Консумирате ли месо?</FormLabel>
								<Select borderRadius={0}  _focus={{borderColor:"#a5cf9f", boxShadow: "0px 2px 0px 0px #a5cf9f"}} variant="flushed" borderTop={0} borderRight={0} borderLeft={0} {...field} id="food_preferences" type="text" fontFamily="Rubik" placeholder="">
									<option value={"0"}>Да</option>
									<option value={"Vgtn"}>Не, вегетарианец съм</option>
									<option value={"Vgn"}>Не, веган съм</option>
								</Select>
							</FormControl>
						)}
					</Field>
			<Field name="is_online">
				{({ field, form }) => (
					<FormControl display="flex" flexDirection="row" flexGrow={1} w={["100%","100%","33%","33%"]} mr="5px" isInvalid={form.errors.tshirt && form.touched.tshirt} {...field}>
					<FormLabel paddingTop="15px" paddingBottom="10px" fontFamily="Rubik" fontSize="15px" htmlFor="text">Искам да съм изцяло онлайн</FormLabel>
						<CheckboxArrayControl name="is_online" value="is_online">:D</CheckboxArrayControl>
					</FormControl>
				)}
			</Field>
			<AutoSave debounceMs={2000} />
        </Form>
      )}
    </Formik>
	</Flex>
	</Box>)
}

export async function getServerSideProps(ctx){
	
	const cookies = new Cookies(ctx.req.headers.cookie);

	var response = await axios({
			method: 'get',
			url: `https://hacktues.pythonanywhere.com/users/${jwt_decode(cookies.get('auth')).user_id}`,
			headers: 
			{ "Content-type": "Application/json",
			  "Authorization": `Bearer ${cookies.get('auth')}`}
			},
			)

			axios({
                method: 'get',
                url: 'https://discordapp.com/api/users/@me',
                headers: 
                {
                  "Authorization": `Bearer ${cookies.get('discord_auth')}`}},)
                .then(function (response){
                    
                    var profile = axios({
                        method: 'get',
                        url: `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png`,
                        },)
                        .then(function (response){
                            console.log(response.config.url);
                        })

	return {props: {users: response.data, profile: profile }}

}

const CheckboxArrayControl = (props, {children}) => {

	const [field] = useField(props);

	return (
	  <Switch css={{boxShadow:"none", alignSelf: "center", outline: "none"}} {...field} isChecked={field.value} {...props}>
		{children}
	  </Switch>
	)
  }

const AutoSave = ({ debounceMs = 2000 }) => {
	const formik = useFormikContext();
	const [isSaved, setIsSaved] = useState(null);
	const debouncedSubmit = useCallback(
	  _.debounce(() => {
		  if(formik.isValid){ return formik.submitForm().then(() => setIsSaved(true),);}
	  }, debounceMs),
	  [formik.submitForm, debounceMs]
	);
  
	useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values],);
	return(<Box></Box>)
  };

  


export default Profile