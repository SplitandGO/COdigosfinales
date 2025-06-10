import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import { Box, Text, VStack } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Split&Go - Gestión de Restaurantes',
  description: 'Aplicación moderna para la gestión de restaurantes y bares',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ChakraProvider>
          <VStack minH="100vh" spacing={0} bg="gray.50">
            <Box as="header" w="100%" py={6} align="center">
              <Image src="/logo-splitgo.png" alt="Split&Go" width={120} height={120} />
              <Text fontSize="2xl" fontWeight="bold" mt={2}>Split&Go</Text>
              <Box display="flex" alignItems="center" mt={1}>
                <Text fontSize="md" color="gray.500" mr={2}>by</Text>
                <Image src="/logo-lefko.png" alt="Lefko" width={60} height={24} />
              </Box>
            </Box>
            <Box as="main" flex="1" w="100%">
              {children}
            </Box>
          </VStack>
        </ChakraProvider>
      </body>
    </html>
  )
} 