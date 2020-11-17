import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

import { Box, Avatar, Heading, Flex, Text, Button, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Select, Switch } from "@chakra-ui/core";

const cookies = new Cookies()

function Profile(props) {
	console.log(props.users.email);
	
	return(
	<Flex>
		 <Avatar name={props.users.first_name}/>
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

export default Profile