import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { ModalTakeMoneyAmount } from "./ModalTakeMoneyAmount";
import { formatRupiah } from "../../Hooks/useFormatMoney";


export function ModalInsufficientBalance({ isOpen, onClose, selectedProduct, setSelectedProduct, setNominalAmount, nominalAmount, setTimer }) {
  const { isOpen: TakeMoneyModalOpen, onOpen: openTakeMoneyModal, onClose: closeTakeMoneyModal } = useDisclosure();

  const requiredAmount = selectedProduct ? selectedProduct.price - nominalAmount : 0;


  const handleContinue = () => {
    onClose(); // Close the modal
    // onModalClose(); // Trigger the callback for restarting the timer
  };

  const handleCancel = () => {
    onClose()
    if (nominalAmount === 0) {
      setSelectedProduct(null)
      setTimer(0)
    }
    else {
      setSelectedProduct(null)
      setTimer(0)
      openTakeMoneyModal()
    }
  }

  return (
    <>
      <ModalTakeMoneyAmount isOpen={TakeMoneyModalOpen} onClose={closeTakeMoneyModal} setNominalAmount={setNominalAmount} nominalAmount={nominalAmount} />
      <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Insufficient Balance!</ModalHeader>
          <Divider border={'1px solid black'} />
          <ModalBody>
            <Text fontSize={'18px'}>
              You Need {' '}
              <Text as="span" fontWeight="bold">
                {formatRupiah(requiredAmount)} {''}
              </Text>
              <Text as={'span'}>To Continue, Do you want to Continue This Purchase?</Text>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='whatsapp' mr={3} onClick={handleContinue}>
              Yes
            </Button>
            <Button colorScheme='red' mr={3} onClick={handleCancel}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}