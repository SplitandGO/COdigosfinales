'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  useColorModeValue
} from '@chakra-ui/react'
import { getPlanFeatures } from '../features/premium/config'

export default function PagosPage() {
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handlePayment = () => {
    if (!amount || !paymentMethod) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Aquí iría la lógica de pago con Stripe
    toast({
      title: 'Pago procesado',
      description: 'Tu pago ha sido procesado correctamente',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const premiumFeatures = getPlanFeatures('premium')

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Pagos
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Realiza pagos de forma segura y rápida
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Detalles del Pago</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Monto"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Select
                  placeholder="Método de pago"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="card">Tarjeta de crédito/débito</option>
                  <option value="transfer">Transferencia bancaria</option>
                  {isPremium && (
                    <>
                      <option value="crypto">Criptomonedas</option>
                      <option value="wallet">Billetera digital</option>
                    </>
                  )}
                </Select>
                <Button
                  colorScheme="blue"
                  width="full"
                  onClick={handlePayment}
                >
                  Pagar
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Características Premium</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {premiumFeatures.map((feature) => (
                  <Box key={feature.id}>
                    <HStack>
                      <Text fontSize="2xl">{feature.icon}</Text>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">{feature.name}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {feature.description}
                        </Text>
                      </VStack>
                    </HStack>
                    <Divider my={4} />
                  </Box>
                ))}
                <Button
                  colorScheme="green"
                  onClick={() => setIsPremium(!isPremium)}
                >
                  {isPremium ? 'Desactivar Premium' : 'Activar Premium'}
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  )
} 