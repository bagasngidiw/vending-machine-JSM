import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import productData from "../../Database/db.json"
import { useProduct } from "../../Hooks/useProduct";

export function ProductCard({ onProductSelect }) {
    const { product } = useProduct()
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (item) => {
        if (item.stock > 0) {
            setSelectedProduct(item);
            onProductSelect(item);
        }
    };

    return (
        <Box>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
                {product.map((item) => (
                    <Card
                        key={item.id}
                        width="100%"
                        boxShadow={item.stock === 0 ? 'none' : 'md'}
                        opacity={item.stock === 0 ? 0.5 : 1}
                        onClick={() => handleProductClick(item)}
                        cursor={item.stock === 0 ? 'not-allowed' : 'pointer'}
                        transition="transform 0.3s ease-in-out"
                        _hover={{
                            transform: "scale(1.05)",
                        }}

                        position="relative"
                    >
                        <Image p={3} src={item.image} />
                        {item.stock === 0 && (
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                width="100%"
                                height="100%"
                                backgroundColor="gray.500"
                                opacity={0.7}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text color="white" fontWeight="bold">
                                    Out of Stock
                                </Text>
                            </Box>
                        )}
                        <Divider />
                        <Flex alignItems="center" justifyContent="center">
                            <Text textAlign="center">
                               STOCK : {item.stock}
                            </Text>
                        </Flex>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    )
}