import { Box, Button, Divider, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useProduct } from "../../Hooks/useProduct";
import { ModalChange } from "../Modal/ModalChange";
import { ModalInsufficientBalance } from "../Modal/ModalInsufficientBalance"
import { ModalPayment } from "../Modal/ModalPayment";
import { formatRupiah } from "../../Hooks/useFormatMoney";
import { ModalCancel } from "../Modal/ModalCancel";



export function SelectedProductCard({ selectedProduct, setSelectedProduct }) {
    const { isOpen: paymentModalOpen, onOpen: openPaymentModal, onClose: closePaymentModal } = useDisclosure();

    const { isOpen: insufficientBalanceModalOpen, onOpen: openInsufficientBalanceModal, onClose: closeInsufficientBalanceModal } = useDisclosure();

    const { isOpen: ChangeModalOpen, onOpen: openChangeModal, onClose: closeChangeModal } = useDisclosure();

    const { isOpen: cancelModalOpen, onOpen: openCancelModal, onClose: closeCancelModal } = useDisclosure();

    const { reduceStock } = useProduct()

    const [nominalAmount, setNominalAmount] = useState(0);

    const [changeValue, setChangeValue] = useState(0);

    const [timer, setTimer] = useState(0);

    const [countdownInterval, setCountdownInterval] = useState(null);

    const [originalProduct, setOriginalProduct] = useState(null);

    useEffect(() => {
        // Clear the previous interval when the component unmounts or when a new product is selected
        return () => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    }, [countdownInterval]);


    useEffect(() => {

        if (selectedProduct) {
            // Set the initial countdown value
            setTimer(120);

            // Start the countdown
            const interval = setInterval(() => {
                setTimer((prevTimer) => {

                    if (prevTimer === 0) {
                        // Clear the interval and hide selected product when timer reaches 0
                        clearInterval(interval);
                        setTimer(0);
                        setSelectedProduct(null)

                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            setCountdownInterval(interval);
        }

        setOriginalProduct(selectedProduct);


        return () => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    }, [selectedProduct]);


    useEffect(() => {
        // Check if the timer reaches 0, and perform actions accordingly
        if (timer === 0) {
            // Clear selected product when timer reaches 0
            setTimer(0);
        }
    }, [timer]);

    const checkPrice = async () => {
        if (nominalAmount < selectedProduct.price) {

            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            // Close the payment modal if it's open
            closePaymentModal();

            // Open the insufficient balance modal
            openInsufficientBalanceModal();
        } else {
            // Run the reduce stock logic if the nominal amount is sufficient
            try {
                const result = await reduceStock(selectedProduct.id, selectedProduct.stock, selectedProduct.price, nominalAmount);
                setChangeValue(result.changeValue)
                setSelectedProduct(null)
                setNominalAmount(0)
                setTimer(0)
                openChangeModal()
            } catch (error) {
                console.log('Failed to reduce stock', error);
            }
        }
    };

    const handleInsufficientBalanceModalClose = () => {
        closeInsufficientBalanceModal(); // Close the modal
        // Restart the timer by starting a new interval
        const newInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(newInterval);
                    setTimer(0);
                    setSelectedProduct(null);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        setCountdownInterval(newInterval);
    };

    const handlePaymentModalClose = () => {
        closePaymentModal(); // Close the modal
        // Restart the timer by starting a new interval
        const newInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(newInterval);
                    setTimer(0);
                    setSelectedProduct(null);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        setCountdownInterval(newInterval);
    };

    const handleCancelModalClose = () => {
        closeCancelModal(); // Close the modal
        // Restart the timer by starting a new interval
        const newInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(newInterval);
                    setTimer(0);
                    setSelectedProduct(null);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        setCountdownInterval(newInterval);
    };

    const handleOpenCancelModal = () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        openCancelModal()
    }

    const handleInsertMoney = () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        openPaymentModal()
    };

    return (
        <>
            <Box h={'25%'}>
                <Image objectFit="cover"
                    src={originalProduct?.image || ""}
                    alt={originalProduct?.title || ""}
                    borderRadius={'5px'}
                />
            </Box>
            <Divider border={'1px solid black'} />
            <Box mt={3} mb={3}>
                <Text textAlign={'center'}>
                    {originalProduct?.title || "Item Name"}
                </Text>
            </Box>

            <Box mt={3} mb={3}>
                <Text textAlign={'center'} fontWeight={'bold'}>
                    {originalProduct?.price ? `${formatRupiah(originalProduct.price)}` : "Item Price"}
                </Text>
            </Box>

            <Box mt={3} mb={3}>
                <Text textAlign={'center'}>
                    <Text as={'span'} fontWeight={'bold'}>
                        {timer} {''}
                    </Text>
                    <Text as={'span'}>
                        Seconds
                    </Text>
                </Text>
            </Box>

            {/* MODAL */}
            <ModalPayment
                isOpen={paymentModalOpen}
                onClose={handlePaymentModalClose}
                onNominalSelect={(amount) => {
                    setNominalAmount((prevAmount) => prevAmount + amount);
                    closePaymentModal();
                }}
            />
            <ModalInsufficientBalance
                isOpen={insufficientBalanceModalOpen}
                onClose={handleInsufficientBalanceModalClose}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                setNominalAmount={setNominalAmount}
                nominalAmount={nominalAmount}
                setTimer={setTimer}
            />
            <ModalChange
                isOpen={ChangeModalOpen}
                onClose={closeChangeModal}
                changeValue={changeValue} />

            <ModalCancel
                isOpen={cancelModalOpen}
                onClose={handleCancelModalClose}
                setSelectedProduct={setSelectedProduct}
                setNominalAmount={setNominalAmount}
                nominalAmount={nominalAmount}
                setTimer={setTimer}
            />

            {/*END MODAL*/}

            <Box border="2px solid black"
                borderRadius="3px"
                textAlign="center"
                mt={3}
                mb={3}
                p={3}
                fontSize="lg"
                fontWeight="bold"
                color="#2D3B2D"
                bg="#E1F0DA"
            >
                {formatRupiah(nominalAmount)}
            </Box>
            <Button boxShadow="lg"
                width="100%"
                bg="#B7E5B4"
                color="#2D3B2D"
                fontWeight="bold"
                border="2px solid black"
                borderRadius="3px"
                cursor="pointer"
                onClick={handleInsertMoney}
                textAlign="center"
                mt={3}
                mb={3}
                _hover={{
                    bg: '#8AB58A',
                    color: '#fff',
                }}
                _active={{
                    bg: '#6F916F',
                }}
                isDisabled={!selectedProduct}
            >
                Insert Money
            </Button>
            <Box width={'100%'} textAlign={'center'} display={'flex'} justifyContent={'space-between'}>
                {/* <Button width={'100%'} onClick={() => checkPrice(selectedProduct.id, selectedProduct.stock, selectedProduct.price, nominalAmount)}>OK</Button> */}
                <Button flex={'1'} width={'100%'} mr={'5px'} onClick={checkPrice} isDisabled={!selectedProduct} color={'white'} bg={'#789461'} _hover={{
                    bg: '#436850',
                }}
                >
                    Buy
                </Button>
                <Button onClick={handleOpenCancelModal} flex={'1'} colorScheme={'red'} width={'100%'} isDisabled={!nominalAmount}>Cancel</Button>
            </Box>
        </>
    )
}