import { Heading, Text } from "@chakra-ui/react";

export default function Logo({size = "lg"}) {
    return (
        <Heading
            as="h1"
            fontSize={size === "lg" ? "70px" : "50px"}
            size={size === "lg" ? "7xl" : "2xl"}
            textAlign="center"
            fontFamily="'Nunito', sans-serif"
            fontWeight={"400"}
            marginBottom={"20px"}
        >
            <Text as="span" color="var(--secondary-color)">Search </Text>
            <Text as="span" color="var(--primary-color)">d_evs</Text>
        </Heading>
    )
}
