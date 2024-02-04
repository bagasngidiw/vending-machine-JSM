import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { ModalTakeMoneyAmount } from "./ModalTakeMoneyAmount";

export function ModalCancel({ isOpen, onClose, setSelectedProduct, setNominalAmount, nominalAmount, setTimer }) {
  const { isOpen: TakeMoneyModalOpen, onOpen: openTakeMoneyModal, onClose: closeTakeMoneyModal } = useDisclosure();

  const handleNo = () => {
    onClose(); // Close the modal
  };

  const handleYes = () => {
    onClose()
    setSelectedProduct(null)
    setTimer(0)
    openTakeMoneyModal()
  }

  return (
    <>
      <ModalTakeMoneyAmount isOpen={TakeMoneyModalOpen} onClose={closeTakeMoneyModal} setNominalAmount={setNominalAmount} nominalAmount={nominalAmount} />

      <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel</ModalHeader>
          <Divider border={'1px solid black'} />
          <ModalBody>
            <Text fontSize={'20px'} fontWeight={'bold'}>
              Do you want to Cancel This Purchase?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='whatsapp' mr={3} onClick={handleYes}>
              Yes
            </Button>
            <Button colorScheme='red' mr={3} onClick={handleNo}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}