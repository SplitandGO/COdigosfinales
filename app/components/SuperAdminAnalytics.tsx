'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { getSystemAnalytics, createRestaurant, createAdminUser } from '@/lib/supabase-admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AnalyticsData {
  restaurant: string
  count: number
  sum: number
  avg: number
}

const data: AnalyticsData[] = [
  { restaurant: 'Ene', count: 100, sum: 1000, avg: 10 },
  { restaurant: 'Feb', count: 150, sum: 1500, avg: 10 },
  { restaurant: 'Mar', count: 200, sum: 2000, avg: 10 },
  { restaurant: 'Abr', count: 250, sum: 2500, avg: 10 },
  { restaurant: 'May', count: 300, sum: 3000, avg: 10 },
  { restaurant: 'Jun', count: 350, sum: 3500, avg: 10 },
]

export const SuperAdminAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  })
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    restaurant_id: '',
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const data = await getSystemAnalytics()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRestaurant = async () => {
    try {
      const restaurant = await createRestaurant(newRestaurant)
      await createAdminUser({
        email: newAdmin.email,
        restaurant_id: restaurant.id,
      })
      onClose()
      fetchAnalytics()
    } catch (error) {
      console.error('Error creating restaurant:', error)
    }
  }

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Usuarios y Ingresos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="restaurant" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Pedidos" />
                <Bar yAxisId="right" dataKey="sum" fill="#82ca9d" name="Ingresos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Container maxW="container.xl" py={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Heading>Panel de Super Administrador</Heading>
          <Button colorScheme="blue" onClick={onOpen}>
            Añadir Restaurante
          </Button>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Stat
            px={4}
            py={5}
            bg={bgColor}
            shadow="base"
            rounded="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <StatLabel>Total Restaurantes</StatLabel>
            <StatNumber>{analytics.length}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={5}
            bg={bgColor}
            shadow="base"
            rounded="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <StatLabel>Total Pedidos</StatLabel>
            <StatNumber>
              {analytics.reduce((acc, curr) => acc + curr.count, 0)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              9.05%
            </StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={5}
            bg={bgColor}
            shadow="base"
            rounded="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <StatLabel>Ingresos Totales</StatLabel>
            <StatNumber>
              ${analytics.reduce((acc, curr) => acc + curr.sum, 0).toFixed(2)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              14.05%
            </StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={5}
            bg={bgColor}
            shadow="base"
            rounded="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <StatLabel>Promedio por Pedido</StatLabel>
            <StatNumber>
              ${(analytics.reduce((acc, curr) => acc + curr.avg, 0) / analytics.length).toFixed(2)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              7.05%
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Restaurante</Th>
                <Th isNumeric>Pedidos</Th>
                <Th isNumeric>Ingresos</Th>
                <Th isNumeric>Promedio</Th>
              </Tr>
            </Thead>
            <Tbody>
              {analytics.map((data, index) => (
                <Tr key={index}>
                  <Td>{data.restaurant}</Td>
                  <Td isNumeric>{data.count}</Td>
                  <Td isNumeric>${data.sum.toFixed(2)}</Td>
                  <Td isNumeric>${data.avg.toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Añadir Nuevo Restaurante</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Nombre del Restaurante</FormLabel>
                <Input
                  value={newRestaurant.name}
                  onChange={(e) =>
                    setNewRestaurant({ ...newRestaurant, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Dirección</FormLabel>
                <Input
                  value={newRestaurant.address}
                  onChange={(e) =>
                    setNewRestaurant({ ...newRestaurant, address: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  value={newRestaurant.phone}
                  onChange={(e) =>
                    setNewRestaurant({ ...newRestaurant, phone: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email del Restaurante</FormLabel>
                <Input
                  value={newRestaurant.email}
                  onChange={(e) =>
                    setNewRestaurant({ ...newRestaurant, email: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email del Administrador</FormLabel>
                <Input
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                />
              </FormControl>

              <Button colorScheme="blue" onClick={handleCreateRestaurant} width="full">
                Crear Restaurante
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
} 