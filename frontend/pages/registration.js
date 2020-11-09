
import { Box, Heading, Flex, Text, Button, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Select, Switch } from "@chakra-ui/core";
import { Formik, Field, Form } from 'formik';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
 } from "@chakra-ui/core";
export default function Regulation() {
    
	const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
    <Box pb="25px">
        <Box pl="25px" pr="25px" pt="25px" ml={["25px","100px", "200px","250px","300px","600px"]} mr={["25px","100px", "200px","250px","300px","600px"]} pb="25px" rounded="lg" backgroundColor="#ffff" mb={["160px", "150px"]} mt={["50px", "50px", "50px","100px"]}>
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
  				<Switch _focus={{"background-color":"transparent"}} id="online" />
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
</Box>
</Box>
    );}