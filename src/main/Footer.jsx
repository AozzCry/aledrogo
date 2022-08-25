import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, InfoIcon } from "@chakra-ui/icons";

const Footer = () => {
  return (
    <Flex bg={"gray.700"} p={2} wrap="wrap">
      <Box>
        <Text fontSize={"2xl"}>Marketplace</Text>
        <Text> Our Products</Text>
      </Box>
      <Box>
        <Text fontSize={"2xl"}>Any questions?</Text>
        <Text>Contact us! </Text>
        <Text>
          Click this link to connect to our
          <a href="https://www.youtube.com/watch?v=maAFcEU6atk"> celer</a>
        </Text>
      </Box>
      <Box>
        <Text fontSize={"2xl"}>Localization</Text>
        <Text fontSize={"sm"}>
          <InfoIcon />
          Here we are!
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Text fontSize={"2xl"}>Social Media</Text>
        <Text>moodle2137.pcz</Text>
        <Text>gadugadu.pl</Text>
        <Text>gov.pl</Text>
      </Box>
      <Spacer />
      <Box>
        <Text fontSize={"2xl"}>Contact</Text>
        <Text fontSize={"xl"}>
          <PhoneIcon /> 2137 2137
        </Text>
        <Text fontSize={"sm"}>pon. - pt. 13:00 - 18:59</Text>
        <Text fontSize={"sm"}>sob. - niedz. 14:00 - 17:59 </Text>
        <Text fontSize={"sm"}>
          <EmailIcon mr={1} />
          aledrogo@aledrogo.aq
        </Text>
      </Box>
      <Spacer />
    </Flex>
  );
};

export default Footer;
