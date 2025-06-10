import { SuperAdminAnalytics } from '@/app/components/SuperAdminAnalytics';

export default function SuperAdminPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Superadministrador</h1>
      <SuperAdminAnalytics />
    </div>
  );
} 