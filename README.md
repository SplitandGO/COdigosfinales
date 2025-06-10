# Split&Go Clientes

Split&Go Clientes es una aplicación moderna diseñada para mejorar la experiencia de los clientes en restaurantes y bares, permitiendo realizar pedidos, pagos y reservas de forma sencilla y eficiente.

## Características Principales

### Para Clientes
* Carta digital interactiva
* Realización de pedidos desde la mesa
* División de cuenta y pagos individuales
* Sistema de reservas
* Programa de fidelización
* Notificaciones personalizadas

### Características Premium
* Pagos múltiples métodos
* Reservas prioritarias
* Solicitudes especiales
* Beneficios exclusivos
* Soporte prioritario

## Tecnologías Utilizadas

* Frontend: Next.js, React
* UI: Chakra UI
* Backend: Supabase
* Pagos: Stripe
* Caché: Redis
* Despliegue: Vercel
* Base de datos: PostgreSQL
* Autenticación: Supabase Auth

## Requisitos del Sistema

* Node.js 18.x o superior
* npm 9.x o superior
* Cuenta de Supabase
* Cuenta de Stripe
* Cuenta de Redis
* Cuenta de Vercel

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/SplitandGO/Split_Go_Clientes.git
```

2. Instalar dependencias:
```bash
cd Split_Go_Clientes
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
Split_Go_Clientes/
├── app/                    # Directorio principal de la aplicación
│   ├── (auth)/            # Rutas de autenticación
│   ├── carta/             # Carta digital
│   ├── pedidos/           # Gestión de pedidos
│   ├── pagos/             # Sistema de pagos
│   ├── reservas/          # Sistema de reservas
│   ├── features/          # Características premium
│   └── components/        # Componentes reutilizables
├── lib/                   # Utilidades y configuraciones
│   ├── supabase.ts       # Configuración de Supabase
│   ├── stripe.ts         # Configuración de Stripe
│   └── redis.ts          # Configuración de Redis
└── public/               # Archivos estáticos
```

## Características Premium

### Plan Free
* Acceso básico a la carta
* Pedidos simples
* Pagos con tarjeta
* Reservas básicas

### Plan Premium
* Múltiples métodos de pago
* Reservas prioritarias
* Solicitudes especiales
* Notificaciones avanzadas
* Beneficios exclusivos

### Plan Enterprise
* Todas las características premium
* Soporte prioritario
* Personalización avanzada
* API access
* Análisis detallado

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE.md para más detalles.

## Contacto

Split&Go Team - @SplitandGO

Link del Proyecto: https://github.com/SplitandGO/Split_Go_Clientes