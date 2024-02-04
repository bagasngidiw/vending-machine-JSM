import { Button, Card, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import { formatRupiah } from "../../Hooks/useFormatMoney";

export function ModalPayment({ isOpen, onClose, onNominalSelect }) {

    const moneyValues = [2000, 5000, 10000, 20000, 50000];
    const handleNominalSelect = (money) => {
        onNominalSelect(money);
        // Close the modal and clear the interval
        onClose();
    };


    return (
        <>

            <Modal size={'lg'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight={'bold'}>Insert Money</ModalHeader>
                    <Divider border={'1px solid black'} />
                    <ModalBody>
                        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                            {moneyValues.map((money) => (
                                <Card key={money}
                                    border="1px solid black"
                                    width="100%"
                                    height="50px"
                                    boxShadow="md"
                                    borderRadius="5px"
                                    cursor="pointer"
                                    _hover={{
                                        bg: '#B7E5B4',
                                    }}
                                    onClick={() => {
                                        handleNominalSelect(money);
                                    }}
                                >
                                    <Text textAlign="center" fontWeight="bold" lineHeight="50px">
                                        {formatRupiah(money)}
                                    </Text>
                                </Card>
                            ))}

                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}