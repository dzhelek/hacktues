import Card from '../components/teams/card'
import { Box, Heading, Flex, Text, Button, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Select, Switch } from "@chakra-ui/core";

export default function Teams() {
    var i;
    var label = [0, 3 ,4]
    var peeps = ["ivan ivanov", "gosho goshov", "misho mishov", "pesho peshov"]
    for(i = 1; i < peeps.length; i++){
        peeps[i] = " " + peeps[i]
    }
    var jeez = peeps.join()

    return (
        <Flex justifyContent="center" flexDirection="row" flexWrap="wrap" pb={["160px", "150px"]} pt="50px">
            <Card  teammates={jeez} label={label} size={label.length}/>
            <Card label={label} size={label.length}/>
            <Card label={label} size={label.length}/>
            <Card label={label} size={label.length}/>
            <Card label={label} size={label.length}/>

        </Flex>
    )
}