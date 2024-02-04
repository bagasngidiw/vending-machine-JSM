import { Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { formatRupiah } from "../../Hooks/useFormatMoney";

export function ModalTakeMoneyAmount({ isOpen, onClose, setNominalAmount, nominalAmount }) {

  const handleOk = () => {
    onClose()
    setNominalAmount(0)
  }

  return (
    <>

      <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alright!</ModalHeader>
          <Divider border={'1px solid black'} />
          <ModalBody>
            <Text fontSize={'18px'}>
              Take Your {' '}
              <Text as="span" fontWeight="bold">
                {formatRupiah(nominalAmount)} {''}
              </Text>
                <Text as={'span'}>Here</Text>
            </Text>
            <ModalFooter>
              <Button colorScheme='whatsapp' mr={3} onClick={handleOk}>
                OK
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}