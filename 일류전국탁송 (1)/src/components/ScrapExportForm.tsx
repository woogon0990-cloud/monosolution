import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Car, 
  Calendar, 
  Gauge, 
  AlertTriangle, 
  Zap, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  PhoneCall,
  ChevronRight,
  Truck
} from 'lucide-react';

const ScrapExportForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    carModel: '',
    year: '',
    mileage: '',
    accident: '무',
    drivable: '유',
    contact: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scrap/Export Form submitted:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] shadow-2xl p-10 lg:p-16 text-center border border-slate-100 mb-12"
      >
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">차량 정보 접수 완료!</h2>
        <p className="text-slate-500 font-medium mb-10">
          입력하신 정보를 바탕으로 최고가 견적을 산출 중입니다.<br />
          잠시만 기다려주시면 전문가가 바로 연락드리겠습니다.
        </p>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <a 
            href="tel:1668-3221"
            className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-600/30 animate-pulse"
          >
            <PhoneCall className="w-6 h-6" /> 지금 바로 전화 상담
          </a>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-slate-400 font-bold hover:text-slate-600 transition-colors"
          >
            새로 접수하기
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden mb-16">
      <div className="bg-slate-900 p-8 lg:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Truck className="w-10 h-10 text-blue-400" />
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">폐차/수출 최고가 견적 신청</h2>
          </div>
          <p className="text-slate-400 font-medium">차량 정보를 입력하시면 실시간 시세를 확인해 드립니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Car Model */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
              <Car className="w-4 h-4 text-blue-600" /> 차종
            </label>
            <input 
              required
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              placeholder="예: 그랜저, 아반떼"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
            />
          </div>

          {/* Year */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
              <Calendar className="w-4 h-4 text-blue-600" /> 년식
            </label>
            <input 
              required
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="예: 2015년식"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
            />
          </div>

          {/* Mileage */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
              <Gauge className="w-4 h-4 text-blue-600" /> 최종주행거리 (km)
            </label>
            <input 
              required
              type="text"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="예: 150,000"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
            />
          </div>

          {/* Accident */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> 사고 유무
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['무', '유'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, accident: option }))}
                  className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                    formData.accident === option 
                      ? 'bg-rose-50 border-rose-500 text-rose-600' 
                      : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Drivable */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
              <Zap className="w-4 h-4 text-emerald-500" /> 운행 가능 여부
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['유', '무'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, drivable: option }))}
                  className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                    formData.drivable === option 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600' 
                      : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
              <Phone className="w-4 h-4 text-blue-600" /> 의뢰인 연락처
            </label>
            <input 
              required
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="010-0000-0000"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
            <MapPin className="w-4 h-4 text-blue-600" /> 차량 위치
          </label>
          <input 
            required
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="시/군/구 상세 위치를 입력해 주세요"
            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
          />
        </div>

        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-2xl font-black text-xl transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3"
          >
            견적 접수하기 <ChevronRight className="w-6 h-6" />
          </button>
          <a 
            href="tel:1668-3221"
            className="bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3"
          >
            <PhoneCall className="w-6 h-6" /> 지금 바로 전화하기
          </a>
        </div>
        <p className="text-center text-slate-400 text-xs font-medium">
          접수 즉시 전문가가 배정되어 최고가 시세를 안내해 드립니다.
        </p>
      </form>
    </div>
  );
};

export default ScrapExportForm;
