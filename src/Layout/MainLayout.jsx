import { Box, Button, Divider, Flex, Grid, GridItem, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ModalPayment } from "../Components/Modal/ModalPayment";
import { ProductCard } from "../Components/Product/ProductCard";
import { ProductFinished } from "../Components/Product/ProductFinished";
import { SelectedProductCard } from "../Components/Product/SelectedProductCard";


export default function MainLayout() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    return (
        <Box h={'1200px'}>
            <Grid templateColumns='repeat(6, 1fr)' templateRows='repeat(2, 1fr)' h={'100%'} p={3} bg={'#F8FAE5'}>
                <GridItem colSpan={1} />
                <GridItem colSpan={4} pl={6} pr={6} pt={6} width={'100%'} bg={'#2b2b2b'} borderRadius={'10px'}>
                    <Box width={'100%'} bg={'#747264'} boxShadow={'lg'} mb={4} borderRadius={'5px'}>
                        <Text textAlign={'center'} fontSize={'30px'} fontWeight={'bold'} textColor={'#EFECEC'}>
                            WELCOME TO SNACKPOINT
                        </Text>
                    </Box>
                    <Flex>
                        <Box p={3} w={'80%'} bg={'#FFA447'} borderRadius={'10px'}>
                            <ProductCard onProductSelect={handleProductSelect} />
                        </Box>
                        <Box boxShadow={'md'} h={'100%'} w={'20%'} p={3} bg={'#FFA447'} borderRadius={'10px'} ml={2} mr={1}>
                            <SelectedProductCard selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />

                        </Box>
                    </Flex>
                    {/* <Box boxShadow={'md'} mt={3} p={6} w={'80%'}>
                        <ProductFinished />
                    </Box> */}

                </GridItem>
                <GridItem colSpan={1} />
            </Grid>
        </Box>
    )
}