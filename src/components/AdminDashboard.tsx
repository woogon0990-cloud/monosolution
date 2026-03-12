import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth, useContent } from '../AuthContext';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Type, 
  Bell, 
  Save, 
  Plus, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  ChevronRight,
  X,
  Check,
  UserCog
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { content, updateContent, addPopup, deletePopup, togglePopup } = useContent();
  const [activeTab, setActiveTab] = useState<'content' | 'services' | 'popups' | 'account'>('content');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const [adminEmail, setAdminEmail] = useState(user?.email || '');
  const [adminPassword, setAdminPassword] = useState('');

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  const [newPopup, setNewPopup] = useState({ title: '', content: '', imageUrl: '', isActive: true });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl font-black text-blue-900 tracking-tighter">관리자 모드</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'content', name: '기본 텍스트 관리', icon: <Type className="w-5 h-5" /> },
            { id: 'services', name: '서비스/이미지 관리', icon: <ImageIcon className="w-5 h-5" /> },
            { id: 'popups', name: '팝업창 관리', icon: <Bell className="w-5 h-5" /> },
            { id: 'account', name: '계정 관리', icon: <UserCog className="w-5 h-5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleSave}
            className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all"
          >
            {saveStatus === 'saving' ? '저장 중...' : saveStatus === 'saved' ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saveStatus === 'saved' ? '저장 완료' : '변경사항 저장'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              {activeTab === 'content' ? '기본 텍스트 관리' : activeTab === 'services' ? '서비스/이미지 관리' : activeTab === 'popups' ? '팝업창 관리' : '계정 관리'}
            </h1>
            <p className="text-slate-500 font-medium mt-2">웹사이트의 주요 콘텐츠를 실시간으로 수정할 수 있습니다.</p>
          </div>
        </header>

        {activeTab === 'content' && (
          <div className="space-y-8 max-w-4xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-4">메인 히어로 섹션</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">메인 타이틀 (상단)</label>
                  <input 
                    type="text" 
                    value={content.heroTitle}
                    onChange={(e) => updateContent({ heroTitle: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">메인 타이틀 (강조)</label>
                  <input 
                    type="text" 
                    value={content.heroSubtitle}
                    onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">설명 문구</label>
                  <textarea 
                    rows={3}
                    value={content.heroDescription}
                    onChange={(e) => updateContent({ heroDescription: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {content.services.map((service, idx) => (
              <div key={service.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <h3 className="text-lg font-black text-slate-900">서비스 #{idx + 1}: {service.title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">제목</label>
                      <input 
                        type="text" 
                        value={service.title}
                        onChange={(e) => {
                          const newServices = [...content.services];
                          newServices[idx].title = e.target.value;
                          updateContent({ services: newServices });
                        }}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">태그</label>
                      <input 
                        type="text" 
                        value={service.tag}
                        onChange={(e) => {
                          const newServices = [...content.services];
                          newServices[idx].tag = e.target.value;
                          updateContent({ services: newServices });
                        }}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">설명</label>
                    <textarea 
                      rows={2}
                      value={service.description}
                      onChange={(e) => {
                        const newServices = [...content.services];
                        newServices[idx].description = e.target.value;
                        updateContent({ services: newServices });
                      }}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">이미지 설정</label>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          placeholder="이미지 URL 입력"
                          value={service.image}
                          onChange={(e) => {
                            const newServices = [...content.services];
                            newServices[idx].image = e.target.value;
                            updateContent({ services: newServices });
                          }}
                          className="flex-1 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                        />
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                          <img src={service.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (base64) => {
                            const newServices = [...content.services];
                            newServices[idx].image = base64;
                            updateContent({ services: newServices });
                          })}
                          className="hidden" 
                          id={`file-service-${service.id}`}
                        />
                        <label 
                          htmlFor={`file-service-${service.id}`}
                          className="flex items-center justify-center gap-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-xl font-bold cursor-pointer transition-all border-2 border-dashed border-blue-200"
                        >
                          <ImageIcon className="w-4 h-4" />
                          내 컴퓨터에서 이미지 업로드
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'popups' && (
          <div className="space-y-8">
            {/* Add New Popup */}
            <div className="bg-blue-50 p-8 rounded-3xl border-2 border-dashed border-blue-200 space-y-6">
              <h3 className="text-lg font-black text-blue-900 flex items-center gap-2">
                <Plus className="w-5 h-5" /> 새 팝업창 등록
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-blue-400 uppercase tracking-widest">팝업 제목</label>
                  <input 
                    type="text" 
                    placeholder="공지사항 제목"
                    value={newPopup.title}
                    onChange={(e) => setNewPopup({...newPopup, title: e.target.value})}
                    className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-xl py-3 px-4 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-blue-400 uppercase tracking-widest">이미지 설정 (선택)</label>
                  <div className="flex flex-col gap-3">
                    <input 
                      type="text" 
                      placeholder="이미지 URL (https://...)"
                      value={newPopup.imageUrl}
                      onChange={(e) => setNewPopup({...newPopup, imageUrl: e.target.value})}
                      className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-xl py-3 px-4 outline-none transition-all font-bold"
                    />
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (base64) => setNewPopup({...newPopup, imageUrl: base64}))}
                        className="hidden" 
                        id="file-popup-new"
                      />
                      <label 
                        htmlFor="file-popup-new"
                        className="flex items-center justify-center gap-2 w-full bg-white hover:bg-blue-50 text-blue-600 py-3 rounded-xl font-bold cursor-pointer transition-all border-2 border-dashed border-blue-200"
                      >
                        <Plus className="w-4 h-4" />
                        파일 업로드
                      </label>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-blue-400 uppercase tracking-widest">팝업 내용</label>
                  <textarea 
                    rows={3}
                    placeholder="팝업에 표시될 상세 내용을 입력하세요."
                    value={newPopup.content}
                    onChange={(e) => setNewPopup({...newPopup, content: e.target.value})}
                    className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-xl py-3 px-4 outline-none transition-all font-bold"
                  />
                </div>
              </div>
              <button 
                onClick={() => {
                  if (!newPopup.title) return;
                  addPopup(newPopup);
                  setNewPopup({ title: '', content: '', imageUrl: '', isActive: true });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black transition-all shadow-lg shadow-blue-600/20"
              >
                등록하기
              </button>
            </div>

            {/* Popup List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.popups.map((popup) => (
                <div key={popup.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-black text-slate-900">{popup.title}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">ID: {popup.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => togglePopup(popup.id)}
                        className={`p-2 rounded-lg transition-all ${popup.isActive ? 'text-green-600 bg-green-50' : 'text-slate-400 bg-slate-50'}`}
                      >
                        {popup.isActive ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                      <button 
                        onClick={() => deletePopup(popup.id)}
                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium text-sm line-clamp-2 mb-4 flex-1">{popup.content}</p>
                  {popup.imageUrl && (
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
                      <img src={popup.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${popup.isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      {popup.isActive ? '현재 노출 중' : '비활성화됨'}
                    </span>
                  </div>
                </div>
              ))}
              {content.popups.length === 0 && (
                <div className="md:col-span-2 py-20 text-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">등록된 팝업창이 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-8 max-w-4xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-4">관리자 계정 정보 변경</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">새 아이디 (이메일)</label>
                  <input 
                    type="email" 
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                    placeholder="새 관리자 이메일"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">새 비밀번호</label>
                  <input 
                    type="password" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                    placeholder="새 관리자 비밀번호"
                  />
                  <p className="text-xs text-slate-400 font-medium">* 비밀번호를 입력하지 않으면 기존 비밀번호가 유지됩니다.</p>
                </div>
              </div>

              <button 
                onClick={async () => {
                  if (!adminEmail) return alert('이메일을 입력해주세요.');
                  setSaveStatus('saving');
                  const success = await updateUser(adminEmail, adminPassword || '');
                  if (success) {
                    setSaveStatus('saved');
                    setTimeout(() => setSaveStatus('idle'), 2000);
                    setAdminPassword('');
                  } else {
                    setSaveStatus('idle');
                    alert('변경에 실패했습니다.');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black transition-all shadow-lg shadow-blue-600/20"
              >
                계정 정보 업데이트
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
