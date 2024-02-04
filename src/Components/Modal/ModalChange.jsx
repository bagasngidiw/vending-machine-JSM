import { Button, Divider, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { formatRupiah } from "../../Hooks/useFormatMoney";

export function ModalChange({ isOpen, onClose, changeValue }) {


    return (
        <>
            <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>TRANSACTION SUCCESS !</ModalHeader>
                    <Divider border={'1px solid black'} />
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src="https://i.gifer.com/7efs.gif" />
                        <Text>
                            You've Successfully bought this item. Your Change is {' '}
                            <Text as="span" fontWeight="bold">
                                {formatRupiah(changeValue)}
                            </Text>
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}