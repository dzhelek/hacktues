import React, { Component} from 'react';
import { Box, Heading, Flex, Text, Button, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Select, Switch } from "@chakra-ui/core";

const Facebook = (props) =>  {
    return (
        <Box>
        <div id="fb-root"></div>
            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v8.0" nonce="3nV6Ml9Y"></script>
        <div class="fb-page" data-href="https://www.facebook.com/HackTUES" data-tabs="timeline" data-width="500" data-height="200" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/HackTUES" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/HackTUES">Hack TUES</a></blockquote></div>
        </Box>
    );
  }

export default Facebook;