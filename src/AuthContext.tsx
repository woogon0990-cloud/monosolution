import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AppContent } from './types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  updateUser: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userToSet: User = { id: foundUser.id, email: foundUser.email, role: foundUser.role };
      setUser(userToSet);
      localStorage.setItem('auth_user', JSON.stringify(userToSet));
      return true;
    }
    
    // Default admin for demo
    if (email === 'admin@1consignment.com' && password === 'admin1234') {
      const adminUser: User = { id: 'admin-1', email: 'admin@1consignment.com', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('auth_user', JSON.stringify(adminUser));
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    if (users.some((u: any) => u.email === email)) return false;
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      role: 'user'
    };
    
    users.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(users));
    return true;
  };

  const updateUser = async (email: string, password: string): Promise<boolean> => {
    if (!user) return false;
    
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex !== -1) {
      const updatedUserData = { ...users[userIndex], email };
      if (password) updatedUserData.password = password;
      users[userIndex] = updatedUserData;
    } else if (user.role === 'admin') {
      // If it's the default admin not yet in registered_users
      const newAdmin = { 
        id: user.id, 
        email, 
        password: password || 'admin1234', 
        role: 'admin' 
      };
      users.push(newAdmin);
    } else {
      return false;
    }
    
    localStorage.setItem('registered_users', JSON.stringify(users));
    const updatedUser = { ...user, email };
    setUser(updatedUser);
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      updateUser,
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Content Context to manage editable content
interface ContentContextType {
  content: AppContent;
  updateContent: (newContent: Partial<AppContent>) => void;
  addPopup: (popup: Omit<AppContent['popups'][0], 'id'>) => void;
  deletePopup: (id: string) => void;
  togglePopup: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const DEFAULT_CONTENT: AppContent = {
  heroTitle: "전국 어디서나, 차량 이동의 종착지는",
  heroSubtitle: "'일류전국탁송'입니다.",
  heroDescription: "24시간 Full-Care: 잠들지 않는 전국 네트워크로 가장 빠르게 움직입니다.\n\n폐차 그 이상의 가치: 낡은 차? 최고가 매입은 기본, 숨은 정부 지원금까지 싹 다 찾아드립니다.\n\n비교 불가한 전문성: 복잡한 절차는 일류가 풉니다. 고객님은 열쇠만 건네세요.",
  services: [
    {
      id: '1',
      title: "일반탁송",
      description: "베테랑 기사의 1:1 맞춤 배차로 전국 어디든 안전하게 도어 투 도어 서비스를 제공합니다.",
      tag: "#1:1 안전 탁송",
      iconName: "Car",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&h=400"
    },
    {
      id: '2',
      title: "캐리어탁송",
      description: "카 캐리어를 이용한 다량 운송 및 무주행 이동이 필요한 차량을 위한 전문 서비스입니다.",
      tag: "#다량/무주행 이동",
      iconName: "Truck",
      image: "https://images.unsplash.com/photo-1586191582151-f73872dfd183?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: '3',
      title: "특수차탁송",
      description: "크레인, 굴착기 등 대형 특수 장비 및 특장 차량 운송을 위한 전문 인력을 배치합니다.",
      tag: "#특수차량 전문",
      iconName: "HardHat",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&h=400"
    },
    {
      id: '4',
      title: "전기차탁송",
      description: "전기차 특성을 고려한 배터리 안전 관리 및 고전압 시스템 보호 운송 매뉴얼을 준수합니다.",
      tag: "#배터리 안전 관리",
      iconName: "Zap",
      image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&w=600&h=400"
    },
    {
      id: '5',
      title: "대형차탁송",
      description: "버스, 대형 트럭, 캠핑카 등 규격이 큰 차량의 안정적인 운행을 위한 전문 면허 기사를 파견합니다.",
      tag: "#버스/트럭 전문",
      iconName: "Bus",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&h=400"
    },
    {
      id: '6',
      title: "제주도탁송",
      description: "육지에서 제주도로, 제주도에서 전국으로 이어지는 내륙-항만 통합 원스톱 운송입니다.",
      tag: "#내륙-제주 원스톱",
      iconName: "Ship",
      image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=600&h=400"
    }
  ],
  popups: []
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(() => {
    const saved = localStorage.getItem('app_content');
    if (saved) {
      const parsed = JSON.parse(saved);
      // If services are missing (e.g. only 3), merge with default or reset
      if (parsed.services && parsed.services.length < 6) {
        return { ...DEFAULT_CONTENT, ...parsed, services: DEFAULT_CONTENT.services };
      }
      // Migration: Update carrier image if it's the old broken one
      if (parsed.services) {
        parsed.services = parsed.services.map((s: any) => 
          s.id === '2' && s.image.includes('yonhapnews') 
            ? { ...s, image: DEFAULT_CONTENT.services.find(ds => ds.id === '2')?.image } 
            : s
        );
      }
      // Migration: Update hero text if it matches the old default
      if (parsed.heroTitle === '전국 어디서던 차량이동은' || parsed.heroTitle === '전국 어디서나, 차량 이동의 종착지는') {
        parsed.heroTitle = DEFAULT_CONTENT.heroTitle;
        parsed.heroSubtitle = DEFAULT_CONTENT.heroSubtitle;
        parsed.heroDescription = DEFAULT_CONTENT.heroDescription;
      }
      return parsed;
    }
    return DEFAULT_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem('app_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: Partial<AppContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const addPopup = (popup: Omit<AppContent['popups'][0], 'id'>) => {
    const newPopup = { ...popup, id: Math.random().toString(36).substr(2, 9) };
    setContent(prev => ({ ...prev, popups: [...prev.popups, newPopup] }));
  };

  const deletePopup = (id: string) => {
    setContent(prev => ({ ...prev, popups: prev.popups.filter(p => p.id !== id) }));
  };

  const togglePopup = (id: string) => {
    setContent(prev => ({
      ...prev,
      popups: prev.popups.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p)
    }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, addPopup, deletePopup, togglePopup }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
