import { Badge, Box, Card, CardBody, Heading, HStack, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <>
            <LinkBox>
                <Card variant="elevated" direction={{ base: "column", sm: "row" }} borderRadius={8} overflow="hidden">
                    <Image
                        src="https://www.timedoctor.com/blog/images/2020/10/task-list-template-1024x576.jpg"
                        alt="task list"
                        aspectRatio="2/1"
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "200px" }}
                    />
                    <CardBody>
                        <LinkOverlay href="/todo">
                            <Text fontSize="2xl" fontWeight="bold">
                                TODO
                            </Text>
                        </LinkOverlay>
                        <Text>DBを使用した簡単なチェックリスト</Text>
                    </CardBody>
                    <HStack position="absolute" left={2} top={2}>
                        <Badge colorScheme="red" variant="solid" fontSize="sm">
                            New
                        </Badge>
                        <Badge colorScheme="blue" variant="solid" fontSize="sm">
                            In progress
                        </Badge>
                    </HStack>
                </Card>
            </LinkBox>
        </>
    );
}
