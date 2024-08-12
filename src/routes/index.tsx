import { Badge, Card, CardBody, HStack, Image, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Home() {
    const apps = [
        {
            name: "TODO",
            description: "DBを使用した簡単なチェックリスト",
            href: "/todo",
            imageURL: "https://www.timedoctor.com/blog/images/2020/10/task-list-template-1024x576.jpg",
            isNew: true,
            isInProgress: true,
        },
        {
            name: "film-note",
            description: "見た映画を記録するアプリ",
            href: "/film",
            imageURL: "https://kettleheroes.com/wp-content/uploads/2022/02/Why-is-Popcorn-a-Movie-Food.jpg",
            isNew: true,
            isInProgress: true,
        },
    ];
    return (
        <>
            <SimpleGrid spacing={4} columns={{ base: 1, md: 2, "2xl": 3 }}>
                {apps.map((app, i) => {
                    return (
                        <Card
                            as={LinkBox}
                            variant="elevated"
                            direction={{ base: "column", sm: "row" }}
                            borderRadius={8}
                            overflow="hidden"
                            key={i}
                            minH="120px"
                        >
                            <Image
                                src={app.imageURL}
                                alt="task list"
                                aspectRatio="2/1"
                                objectFit="cover"
                                w={{ base: "100%", sm: "40%" }}
                                maxW={{ base: "100%", sm: "200px" }}
                            />
                            <CardBody>
                                <LinkOverlay href={app.href} as={NextLink}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        {app.name}
                                    </Text>
                                </LinkOverlay>
                                <Text>{app.description}</Text>
                            </CardBody>
                            <HStack position="absolute" left={2} top={2}>
                                {app.isNew && (
                                    <Badge color="white" bgColor="red.500" fontSize="sm">
                                        New
                                    </Badge>
                                )}
                                {app.isInProgress && (
                                    <Badge color="white" bgColor="blue.500" fontSize="sm">
                                        In progress
                                    </Badge>
                                )}
                            </HStack>
                        </Card>
                    );
                })}
            </SimpleGrid>
        </>
    );
}
