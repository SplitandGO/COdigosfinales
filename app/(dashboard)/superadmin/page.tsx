import * as React from 'react';
import { SuperAdminAnalytics } from '@/app/components/SuperAdminAnalytics';

/**
 * Página principal del panel de Superadministrador.
 * Muestra el título y el componente de analítica.
 */
const SuperAdminPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Superadministrador</h1>
      <SuperAdminAnalytics />
    </div>
  );
};

export default SuperAdminPage; 