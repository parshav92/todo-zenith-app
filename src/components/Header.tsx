
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const userEmail = currentUser?.email || '';
  const displayName = currentUser?.displayName || userEmail.split('@')[0] || 'User';
  const initials = currentUser?.displayName ? getInitials(currentUser.displayName) : displayName.charAt(0).toUpperCase();

  return (
    <header className="py-4 px-4 sm:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <CheckSquare className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-xl font-semibold">Zen Todo</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser?.photoURL || ''} alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{displayName}</span>
        </div>
        
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign Out</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
