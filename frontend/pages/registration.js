
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
import {PhoneIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
const cookies = new Cookies();
import Reg from '../components/navbar/form'


export default function Registration() {

    return (
    <Box pb="25px">
        <Box pl="25px" pr="25px" pt="25px" ml={["25px","100px", "200px","250px","300px","600px"]} mr={["25px","100px", "200px","250px","300px","600px"]} pb="25px" rounded="lg" backgroundColor="#ffff" mb={["160px", "150px"]} mt={["50px", "50px", "50px","100px"]}>
			<Reg/>
		</Box>
	</Box>
    );}