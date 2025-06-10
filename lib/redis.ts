import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL

if (!redisUrl) {
  throw new Error('Falta la variable de entorno REDIS_URL')
}

export const redis = new Redis(redisUrl)

// Funciones de utilidad para el caché
export const getCachedData = async <T>(key: string): Promise<T | null> => {
  const data = await redis.get(key)
  return data ? JSON.parse(data) : null
}

export const setCachedData = async <T>(
  key: string,
  data: T,
  expirationInSeconds: number = 3600
): Promise<void> => {
  await redis.setex(key, expirationInSeconds, JSON.stringify(data))
}

export const deleteCachedData = async (key: string): Promise<void> => {
  await redis.del(key)
}

// Funciones específicas para el caché de la aplicación
export const cacheUserData = async (userId: string, userData: any): Promise<void> => {
  await setCachedData(`user:${userId}`, userData)
}

export const getCachedUserData = async (userId: string): Promise<any | null> => {
  return getCachedData(`user:${userId}`)
}

export const cacheRestaurantData = async (
  restaurantId: string,
  restaurantData: any
): Promise<void> => {
  await setCachedData(`restaurant:${restaurantId}`, restaurantData)
}

export const getCachedRestaurantData = async (
  restaurantId: string
): Promise<any | null> => {
  return getCachedData(`restaurant:${restaurantId}`)
}

export const cacheMenuData = async (
  restaurantId: string,
  menuData: any
): Promise<void> => {
  await setCachedData(`menu:${restaurantId}`, menuData)
}

export const getCachedMenuData = async (
  restaurantId: string
): Promise<any | null> => {
  return getCachedData(`menu:${restaurantId}`)
}

// Función para limpiar el caché de un restaurante
export const clearRestaurantCache = async (restaurantId: string): Promise<void> => {
  const keys = await redis.keys(`*:${restaurantId}`)
  if (keys.length > 0) {
    await redis.del(...keys)
  }
}

// Función para limpiar el caché de un usuario
export const clearUserCache = async (userId: string): Promise<void> => {
  const keys = await redis.keys(`user:${userId}*`)
  if (keys.length > 0) {
    await redis.del(...keys)
  }
}

// Funciones de utilidad para caché
export const cacheUtils = {
  // Obtener datos del caché
  get: async (key: string) => {
    try {
      const data = await redis.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error al obtener datos del caché:', error)
      return null
    }
  },

  // Guardar datos en el caché
  set: async (key: string, value: any, ttl?: number) => {
    try {
      const stringValue = JSON.stringify(value)
      if (ttl) {
        await redis.setex(key, ttl, stringValue)
      } else {
        await redis.set(key, stringValue)
      }
      return true
    } catch (error) {
      console.error('Error al guardar datos en el caché:', error)
      return false
    }
  },

  // Eliminar datos del caché
  del: async (key: string) => {
    try {
      await redis.del(key)
      return true
    } catch (error) {
      console.error('Error al eliminar datos del caché:', error)
      return false
    }
  },

  // Limpiar todo el caché
  clear: async () => {
    try {
      await redis.flushdb()
      return true
    } catch (error) {
      console.error('Error al limpiar el caché:', error)
      return false
    }
  },

  // Obtener múltiples claves
  mget: async (keys: string[]) => {
    try {
      const data = await redis.mget(keys)
      return data.map(item => item ? JSON.parse(item) : null)
    } catch (error) {
      console.error('Error al obtener múltiples datos del caché:', error)
      return []
    }
  },

  // Guardar múltiples claves
  mset: async (items: { key: string; value: any; ttl?: number }[]) => {
    try {
      const pipeline = redis.pipeline()
      items.forEach(({ key, value, ttl }) => {
        const stringValue = JSON.stringify(value)
        if (ttl) {
          pipeline.setex(key, ttl, stringValue)
        } else {
          pipeline.set(key, stringValue)
        }
      })
      await pipeline.exec()
      return true
    } catch (error) {
      console.error('Error al guardar múltiples datos en el caché:', error)
      return false
    }
  },

  // Incrementar contador
  increment: async (key: string, amount: number = 1) => {
    try {
      return await redis.incrby(key, amount)
    } catch (error) {
      console.error('Error al incrementar contador en el caché:', error)
      return null
    }
  },

  // Decrementar contador
  decrement: async (key: string, amount: number = 1) => {
    try {
      return await redis.decrby(key, amount)
    } catch (error) {
      console.error('Error al decrementar contador en el caché:', error)
      return null
    }
  },

  // Establecer tiempo de expiración
  expire: async (key: string, ttl: number) => {
    try {
      await redis.expire(key, ttl)
      return true
    } catch (error) {
      console.error('Error al establecer tiempo de expiración en el caché:', error)
      return false
    }
  },

  // Verificar si una clave existe
  exists: async (key: string) => {
    try {
      return await redis.exists(key)
    } catch (error) {
      console.error('Error al verificar existencia de clave en el caché:', error)
      return false
    }
  }
}

// Middleware para caché de rutas
export const cacheMiddleware = (ttl: number = 300) => {
  return async (req: any, res: any, next: any) => {
    const key = `route:${req.originalUrl}`
    const cachedData = await cacheUtils.get(key)

    if (cachedData) {
      return res.json(cachedData)
    }

    res.sendResponse = res.json
    res.json = (body: any) => {
      cacheUtils.set(key, body, ttl)
      res.sendResponse(body)
    }

    next()
  }
}

// Función para invalidar caché por patrón
export const invalidateCacheByPattern = async (pattern: string) => {
  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
    return true
  } catch (error) {
    console.error('Error al invalidar caché por patrón:', error)
    return false
  }
}

// Función para caché de consultas a base de datos
export const cacheQuery = async (key: string, queryFn: () => Promise<any>, ttl: number = 300) => {
  const cachedData = await cacheUtils.get(key)
  if (cachedData) {
    return cachedData
  }

  const data = await queryFn()
  await cacheUtils.set(key, data, ttl)
  return data
} 