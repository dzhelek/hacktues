import { Formik, Field } from 'formik';
import { Button, Input, InputGroup,InputRightElement } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const axios = require('axios');

export default function Log({logIn}){
    
    const handleClick = () => setShow(!show);
	const [show, setShow] = React.useState(false);

	function handleClicked(event) {
		logIn(true);
   }

    return(
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
									E-mail
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
    )}
