import { PlanType, PremiumFeature, UserPlan } from './types';

export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: 'fidelizacion',
    name: 'Programa de Fidelización',
    description: 'Gana puntos y obtén recompensas exclusivas',
    availableIn: ['free', 'premium', 'enterprise'],
    icon: '🎁'
  },
  {
    id: 'notificaciones',
    name: 'Notificaciones Avanzadas',
    description: 'Recibe alertas personalizadas sobre ofertas y eventos',
    availableIn: ['premium', 'enterprise'],
    icon: '🔔'
  },
  {
    id: 'pagos',
    name: 'Pagos Premium',
    description: 'Múltiples métodos de pago y división de cuenta avanzada',
    availableIn: ['premium', 'enterprise'],
    icon: '💳'
  },
  {
    id: 'reservas',
    name: 'Reservas Prioritarias',
    description: 'Acceso anticipado a reservas y beneficios exclusivos',
    availableIn: ['premium', 'enterprise'],
    icon: '📅'
  }
];

export const USER_PLANS: UserPlan[] = [
  {
    type: 'free',
    features: PREMIUM_FEATURES.filter(f => f.availableIn.includes('free')),
    price: 0,
    currency: 'USD',
    billingCycle: 'monthly'
  },
  {
    type: 'premium',
    features: PREMIUM_FEATURES.filter(f => f.availableIn.includes('premium')),
    price: 9.99,
    currency: 'USD',
    billingCycle: 'monthly'
  },
  {
    type: 'enterprise',
    features: PREMIUM_FEATURES.filter(f => f.availableIn.includes('enterprise')),
    price: 29.99,
    currency: 'USD',
    billingCycle: 'monthly'
  }
];

export const getPlanFeatures = (planType: PlanType): PremiumFeature[] => {
  const plan = USER_PLANS.find(p => p.type === planType);
  return plan ? plan.features : [];
};

export const getPlanPrice = (planType: PlanType): number => {
  const plan = USER_PLANS.find(p => p.type === planType);
  return plan ? plan.price : 0;
}; 