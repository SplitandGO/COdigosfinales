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
  useColorModeValue,
  Textarea
} from '@chakra-ui/react'
import { getPlanFeatures } from '../features/premium/config'

export default function ReservasPage() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleReservation = () => {
    if (!date || !time || !guests) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos requeridos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Aquí iría la lógica de reserva
    toast({
      title: 'Reserva realizada',
      description: 'Tu reserva ha sido confirmada',
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
            Reservas
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Reserva tu mesa con anticipación
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Detalles de la Reserva</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <Select
                  placeholder="Número de comensales"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'persona' : 'personas'}
                    </option>
                  ))}
                </Select>
                {isPremium && (
                  <Textarea
                    placeholder="Solicitudes especiales"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                )}
                <Button
                  colorScheme="blue"
                  width="full"
                  onClick={handleReservation}
                >
                  Reservar
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Beneficios Premium</Heading>
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