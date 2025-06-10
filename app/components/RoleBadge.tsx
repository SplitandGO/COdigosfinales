import { Badge, HStack, Text } from '@chakra-ui/react';

const roleConfig: Record<string, { label: string; emoji: string; color: string }> = {
  cliente: { label: 'GoUser', emoji: '🧑‍💼', color: 'blue' },
  mesero: { label: 'GoService', emoji: '🤝', color: 'green' },
  admin: { label: 'GoManager', emoji: '🛡️', color: 'orange' },
  cocina: { label: 'GoKitchen', emoji: '👨‍🍳', color: 'purple' }
};

export function RoleBadge({ role }: { role: string }) {
  const config = roleConfig[role] || { label: role, emoji: '', color: 'gray' };
  return (
    <Badge colorScheme={config.color} px={3} py={1} borderRadius="md" fontSize="md">
      <HStack spacing={2}>
        <Text as="span">{config.emoji}</Text>
        <Text as="span" fontWeight="bold">{config.label}</Text>
      </HStack>
    </Badge>
  );
} 