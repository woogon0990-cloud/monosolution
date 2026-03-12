import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { Truck, User, Lock, Mail, ChevronRight, Loader2 } from 'lucide-react';

interface LoginPageProps {
  onSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        const success = await register(email, password);
        if (success) {
          setIsRegister(false);
          setError('회원가입이 완료되었습니다. 로그인해주세요.');
        } else {
          setError('이미 존재하는 이메일입니다.');
        }
      } else {
        const success = await login(email, password);
        if (success) {
          onSuccess();
        } else {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl text-blue-600 mb-6">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
            {isRegister ? '회원가입' : '로그인'}
          </h1>
          <p className="text-slate-500 font-medium">
            {isRegister ? '일류전국탁송의 새로운 회원이 되어보세요.' : '관리자 및 회원 서비스를 이용하시려면 로그인하세요.'}
          </p>
        </div>

        {error && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${error.includes('완료') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">이메일 주소</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-slate-900"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-slate-900"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                {isRegister ? '가입하기' : '로그인'}
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-slate-500 hover:text-blue-600 font-bold transition-colors"
          >
            {isRegister ? '이미 계정이 있으신가요? 로그인하기' : '아직 회원이 아니신가요? 회원가입하기'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
            Admin Demo: admin@1consignment.com / admin1234
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
