import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las tablas de la base de datos
export type User = {
  id: string
  email: string
  name: string
  plan: 'free' | 'premium' | 'enterprise'
  created_at: string
}

export type Reservation = {
  id: string
  user_id: string
  restaurant_id: string
  date: string
  time: string
  guests: number
  special_requests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export type Payment = {
  id: string
  user_id: string
  restaurant_id: string
  amount: number
  currency: string
  method: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export type LoyaltyPoints = {
  id: string
  user_id: string
  restaurant_id: string
  points: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  created_at: string
  updated_at: string
}

// Funciones de utilidad para la base de datos
export const getUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as User
}

export const createReservation = async (reservation: Omit<Reservation, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservation])
    .select()
    .single()

  if (error) throw error
  return data as Reservation
}

export const createPayment = async (payment: Omit<Payment, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('payments')
    .insert([payment])
    .select()
    .single()

  if (error) throw error
  return data as Payment
}

export const updateLoyaltyPoints = async (
  userId: string,
  restaurantId: string,
  points: number
) => {
  const { data, error } = await supabase
    .from('loyalty_points')
    .upsert({
      user_id: userId,
      restaurant_id: restaurantId,
      points,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data as LoyaltyPoints
} 