import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
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

const MenuItems = ({ children }) => (
  <Text>
    {children}
  </Text>
);

const Navbar = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
	<Flex>
	<Flex width="100%" display={{ md: "flex", sm:"none" }}>
    <Flex as="nav" width="100%" align="center" justify="space-between" wrap="wrap" padding="10px" bg="lightgrey" color="white"{...props}>
      	<Flex align="center" ml={5} mr={5}>
       		<Link href="/">
          		<a>
            		<Heading as="h1" size="lg">
              			Hack TUES 7
            		</Heading>
          		</a>
        	</Link>
      	</Flex>

      	<Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box display={{ sm: show ? "block" : "none", md: "flex" }} width={{ sm: "full", md: "auto" }} alignItems="center" flexGrow={1}>
        <MenuItems><Button color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px"><Link href="/schedule" >Schedule</Link></Button></MenuItems>
        <MenuItems><Button color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px"><Link href="/regulation">Regulation</Link></Button></MenuItems>
        <MenuItems>
        	<Menu>
        		<MenuButton as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    				Archive
  				</MenuButton>
  				<MenuList>
    				<Link href="/archive/hacktues" ><a><MenuItem>HackTUES</MenuItem></a></Link>
    				<Link href="/archive/hacktues2" ><a><MenuItem>HackTUES2</MenuItem></a></Link>
    				<Link href="/archive/hacktues3" ><a><MenuItem>HackTUES3</MenuItem></a></Link>
    				<Link href="/archive/hacktues30" ><a><MenuItem>HackTUES30</MenuItem></a></Link>
					<Link href="/archive/hacktues365" ><a><MenuItem>HackTUES365</MenuItem></a></Link>
  				</MenuList>
			</Menu>
		</MenuItems>
		<MenuItems><Button color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px"><Link href="/about">About</Link></Button></MenuItems>
      </Box>

      {/* <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box> */}
    </Flex>
	</Flex>

  <Flex zIndex="9999" w="100%" h="100px" position="fixed" bottom="0" display={{ md: "none", sm:"flex" }}>
    <Flex w="100%" as="nav" align="center" justify="space-between" padding="10px" bg="lightgrey" color="white"{...props}>
      <Flex w="100%" flexDirection="row" flexWrap="nowrap" alignContent="center" alignItems="center">
        <MenuItems><Button display="block" padding={["1em", "2.1em", "1.1em"]} margin={["8px", "8px", "8px", "8px"]} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px"><Link href="/schedule" >Schedule</Link></Button></MenuItems>
        <MenuItems><Button display="block" padding={["1em", "2.1em", "1.1em"]} margin={["8px", "8px", "8px", "8px"]} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px"><Link href="/regulation">Regulation</Link></Button></MenuItems>
        <MenuItems>
        	<Menu>
        		<MenuButton display="block" padding={["1em", "2.1em", "1.1em"]} margin={["8px", "8px", "8px", "8px"]} as={Button} color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px" rightIcon="chevron-down">
    				Archive
  				</MenuButton>
  				<MenuList>
    				<Link href="/archive/hacktues" ><a><MenuItem>HackTUES</MenuItem></a></Link>
    				<Link href="/archive/hacktues2" ><a><MenuItem>HackTUES2</MenuItem></a></Link>
    				<Link href="/archive/hacktues3" ><a><MenuItem>HackTUES3</MenuItem></a></Link>
    				<Link href="/archive/hacktues30" ><a><MenuItem>HackTUES30</MenuItem></a></Link>
					<Link href="/archive/hacktues365" ><a><MenuItem>HackTUES365</MenuItem></a></Link>
  				</MenuList>
			</Menu>
		</MenuItems>
		<MenuItems><Button display="block" padding={["1em", "2.1em", "1.1em"]} margin={["8px", "8px", "8px", "8px"]} width="100%" color="white" bg="transparent" _focus="outline: none;" border="0px" borderWidth="0px"><Link href="/about">About</Link></Button></MenuItems>
    </Flex>

      {/* <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box> */}
    </Flex>
	</Flex>


	</Flex>
  );
};

export default Navbar;