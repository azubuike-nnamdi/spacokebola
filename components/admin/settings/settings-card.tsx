import { CREATE_USER_URL } from '@/config/routes';
import { Shield, Users } from 'lucide-react';
import Link from 'next/link';

interface SettingsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const SettingsCard = ({ title, description, icon, href }: SettingsCardProps) => {
  return (
    <Link href={href} className="block">
      <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const SettingsCards = () => {
  const cards = [
    {
      title: 'User Management',
      description: 'Create, edit, and manage user accounts',
      icon: <Users className="w-6 h-6 " />,
      href: CREATE_USER_URL,
    },
    {
      title: 'Roles & Permissions',
      description: 'Configure user roles and access permissions',
      icon: <Shield className="w-6 h-6 " />,
      href: '/admin/roles',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <SettingsCard key={index} {...card} />
      ))}
    </div>
  );
};

export default SettingsCards;
