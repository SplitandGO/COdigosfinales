// Tipos de planes
export type Plan = 'basic' | 'premium' | 'enterprise'

// Tipos de usuario
export type UserType = 'restaurant' | 'customer'

// Configuración de roles
export interface Roles {
  superadmin: {
    level: number
    permissions: string[]
  }
  admin: {
    level: number
    permissions: string[]
  }
  restaurant_owner: {
    level: number
    permissions: string[]
  }
  staff: {
    level: number
    permissions: string[]
  }
  customer: {
    level: number
    permissions: string[]
  }
}

// Características premium
export interface PremiumFeatures {
  restaurant: {
    [key in Plan]: {
      price: number
      features: string[]
    }
  }
  customer: {
    [key in Exclude<Plan, 'enterprise'>]: {
      price: number
      features: string[]
    }
  }
}

// Límites y cuotas
export interface PremiumLimits {
  restaurant: {
    [key in Plan]: {
      orders_per_day: number | 'unlimited'
      staff_members: number | 'unlimited'
      menu_items: number | 'unlimited'
      storage: string
    }
  }
  customer: {
    [key in Exclude<Plan, 'enterprise'>]: {
      orders_per_day: number
      storage: string
    }
  }
}

// Análisis y métricas
export interface PremiumAnalytics {
  restaurant: {
    [key in Plan]: string[]
  }
  customer: {
    [key in Exclude<Plan, 'enterprise'>]: string[]
  }
}

// Integraciones
export interface PremiumIntegrations {
  restaurant: {
    [key in Plan]: string[]
  }
  customer: {
    [key in Exclude<Plan, 'enterprise'>]: string[]
  }
}

// Soporte
export interface PremiumSupport {
  restaurant: {
    [key in Plan]: {
      response_time: string
      channels: string[]
      hours: string
    }
  }
  customer: {
    [key in Exclude<Plan, 'enterprise'>]: {
      response_time: string
      channels: string[]
      hours: string
    }
  }
}

// Seguridad
export interface PremiumSecurity {
  restaurant: {
    [key in Plan]: {
      authentication: string
      mfa: boolean
      audit_logs: boolean
    }
  }
  customer: {
    [key in Exclude<Plan, 'enterprise'>]: {
      authentication: string
      mfa: boolean
    }
  }
}

// Personalización
export interface PremiumCustomization {
  restaurant: {
    [key in Plan]: {
      branding: boolean
      themes: boolean
      custom_domain: boolean
      white_label?: boolean
    }
  }
  customer: {
    [key in Exclude<Plan, 'enterprise'>]: {
      themes: boolean
      preferences: boolean
    }
  }
}

// Funciones de utilidad para el panel de superadmin
export interface SuperadminUtils {
  checkPermission: (role: string, permission: string) => boolean
  getRoleLevel: (role: string) => number
  hasFeatureAccess: (userType: UserType, plan: Plan, feature: string) => boolean
  checkLimit: (userType: UserType, plan: Plan, limit: string) => number | string
  getAvailableMetrics: (userType: UserType, plan: Plan) => string[]
  getAvailableIntegrations: (userType: UserType, plan: Plan) => string[]
  getSupportConfig: (userType: UserType, plan: Plan) => {
    response_time: string
    channels: string[]
    hours: string
  }
  getSecurityConfig: (userType: UserType, plan: Plan) => {
    authentication: string
    mfa: boolean
    audit_logs?: boolean
  }
  getCustomizationConfig: (userType: UserType, plan: Plan) => {
    branding?: boolean
    themes: boolean
    preferences?: boolean
    custom_domain?: boolean
    white_label?: boolean
  }
}

// Tipos para características de restaurantes
export interface RestaurantFeatures {
  basic: {
    price: number
    features: string[]
  }
  premium: {
    price: number
    features: string[]
  }
  enterprise: {
    price: number
    features: string[]
  }
}

// Tipos para características de clientes
export interface CustomerFeatures {
  basic: {
    price: number
    features: string[]
  }
  premium: {
    price: number
    features: string[]
  }
}

// Tipos para límites
export interface RestaurantLimits {
  basic: {
    orders_per_day: number
    staff_members: number
    menu_items: number
    storage: string
  }
  premium: {
    orders_per_day: number
    staff_members: number
    menu_items: number
    storage: string
  }
  enterprise: {
    orders_per_day: string
    staff_members: string
    menu_items: string
    storage: string
  }
}

export interface CustomerLimits {
  basic: {
    orders_per_day: number
    storage: string
  }
  premium: {
    orders_per_day: number
    storage: string
  }
}

// Tipos para análisis
export interface RestaurantAnalytics {
  basic: string[]
  premium: string[]
  enterprise: string[]
}

export interface CustomerAnalytics {
  basic: string[]
  premium: string[]
}

// Tipos para integraciones
export interface RestaurantIntegrations {
  basic: string[]
  premium: string[]
  enterprise: string[]
}

export interface CustomerIntegrations {
  basic: string[]
  premium: string[]
}

// Tipos para soporte
export interface RestaurantSupport {
  basic: {
    response_time: string
    channels: string[]
    hours: string
  }
  premium: {
    response_time: string
    channels: string[]
    hours: string
  }
  enterprise: {
    response_time: string
    channels: string[]
    hours: string
  }
}

export interface CustomerSupport {
  basic: {
    response_time: string
    channels: string[]
    hours: string
  }
  premium: {
    response_time: string
    channels: string[]
    hours: string
  }
}

// Tipos para seguridad
export interface RestaurantSecurity {
  basic: {
    authentication: string
    mfa: boolean
    audit_logs: boolean
  }
  premium: {
    authentication: string
    mfa: boolean
    audit_logs: boolean
  }
  enterprise: {
    authentication: string
    mfa: boolean
    audit_logs: boolean
  }
}

export interface CustomerSecurity {
  basic: {
    authentication: string
    mfa: boolean
  }
  premium: {
    authentication: string
    mfa: boolean
  }
}

// Tipos para personalización
export interface RestaurantCustomization {
  basic: {
    branding: boolean
    themes: boolean
    custom_domain: boolean
  }
  premium: {
    branding: boolean
    themes: boolean
    custom_domain: boolean
  }
  enterprise: {
    branding: boolean
    themes: boolean
    custom_domain: boolean
    white_label: boolean
  }
}

export interface CustomerCustomization {
  basic: {
    themes: boolean
    preferences: boolean
  }
  premium: {
    themes: boolean
    preferences: boolean
  }
}

// Tipos para roles
export interface Role {
  level: number
  permissions: string[]
}

export interface Roles {
  superadmin: Role
  admin: Role
  restaurant_owner: Role
  staff: Role
  customer: Role
}

// Tipos para utilidades de superadmin
export interface SuperadminUtils {
  checkPermission: (role: string, permission: string) => boolean
  getRoleLevel: (role: string) => number
  hasFeatureAccess: (userType: UserType, plan: Plan, feature: string) => boolean
  checkLimit: (userType: UserType, plan: Plan, limit: string) => number | string
  getAvailableMetrics: (userType: UserType, plan: Plan) => string[]
  getAvailableIntegrations: (userType: UserType, plan: Plan) => string[]
  getSupportConfig: (userType: UserType, plan: Plan) => RestaurantSupport[keyof RestaurantSupport] | CustomerSupport[keyof CustomerSupport]
  getSecurityConfig: (userType: UserType, plan: Plan) => RestaurantSecurity[keyof RestaurantSecurity] | CustomerSecurity[keyof CustomerSecurity]
  getCustomizationConfig: (userType: UserType, plan: Plan) => RestaurantCustomization[keyof RestaurantCustomization] | CustomerCustomization[keyof CustomerCustomization]
}

// Tipos para características premium por tipo de usuario
export type PremiumFeatures = {
  restaurant: RestaurantFeatures
  customer: CustomerFeatures
}

export type PremiumLimits = {
  restaurant: RestaurantLimits
  customer: CustomerLimits
}

export type PremiumAnalytics = {
  restaurant: RestaurantAnalytics
  customer: CustomerAnalytics
}

export type PremiumIntegrations = {
  restaurant: RestaurantIntegrations
  customer: CustomerIntegrations
}

export type PremiumSupport = {
  restaurant: RestaurantSupport
  customer: CustomerSupport
}

export type PremiumSecurity = {
  restaurant: RestaurantSecurity
  customer: CustomerSecurity
}

export type PremiumCustomization = {
  restaurant: RestaurantCustomization
  customer: CustomerCustomization
}

export type PlanType = 'free' | 'premium' | 'enterprise';

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  availableIn: PlanType[];
  icon: string;
}

export interface UserPlan {
  type: PlanType;
  features: PremiumFeature[];
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
}

export interface FidelizacionFeature extends PremiumFeature {
  pointsMultiplier: number;
  exclusiveRewards: boolean;
  prioritySupport: boolean;
}

export interface NotificacionFeature extends PremiumFeature {
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  customPreferences: boolean;
}

export interface PagoFeature extends PremiumFeature {
  multipleMethods: boolean;
  splitPayment: boolean;
  recurringPayments: boolean;
  priorityProcessing: boolean;
}

export interface ReservaFeature extends PremiumFeature {
  priorityBooking: boolean;
  customRequests: boolean;
  reminderNotifications: boolean;
  cancellationPolicy: string;
} 