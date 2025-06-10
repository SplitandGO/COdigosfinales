'use client'

import { Box, Container, Heading, SimpleGrid, Button, Text, VStack, useColorModeValue, Image } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const features = [
    {
      title: 'Carta Digital',
      description: 'Explora el menú completo con fotos, descripciones y precios actualizados',
      icon: '📱',
      path: '/carta'
    },
    {
      title: 'Pedidos',
      description: 'Realiza pedidos directamente desde tu mesa',
      icon: '🍽️',
      path: '/pedidos'
    },
    {
      title: 'Pagos',
      description: 'Divide la cuenta y paga tu parte de forma individual',
      icon: '💳',
      path: '/pagos'
    },
    {
      title: 'Reservas',
      description: 'Reserva tu mesa con anticipación',
      icon: '📅',
      path: '/reservas'
    }
  ]

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" py={10}>
          <Heading as="h1" size="2xl" mb={4}>
            Bienvenido a Split&Go
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Tu experiencia gastronómica, simplificada
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {features.map((feature) => (
            <Box
              key={feature.title}
              p={6}
              bg={bgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              transition="all 0.3s"
            >
              <VStack spacing={4} align="stretch">
                <Text fontSize="4xl" textAlign="center">
                  {feature.icon}
                </Text>
                <Heading as="h3" size="lg" textAlign="center">
                  {feature.title}
                </Heading>
                <Text color="gray.600" textAlign="center">{feature.description}</Text>
                <Button
                  colorScheme="blue"
                  onClick={() => router.push(feature.path)}
                  mt={4}
                >
                  Explorar
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        <Box textAlign="center" py={10}>
          <Heading as="h2" size="xl" mb={4}>
            ¿Eres un restaurante?
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Únete a Split&Go y mejora la experiencia de tus clientes
          </Text>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => window.location.href = 'https://splitandgo.com/locales'}
          >
            Regístrate como Restaurante
          </Button>
        </Box>
      </VStack>
    </Container>
  )
} 