import * as LucideIcons from 'lucide-react';

export function DynamicIcon({ name, ...props }: { name: string; [key: string]: any }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
