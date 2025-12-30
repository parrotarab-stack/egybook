'use client'

import { useState } from 'react'
import { 
  Users, Map, TrendingUp, AlertCircle, 
  Settings, Globe, Shield, Building,
  Menu, X, Pyramid, EgyptianPyramid,
  PlusCircle, Edit3, Trash2,
  Eye, EyeOff, Download
} from 'lucide-react'
import dynamic from 'next/dynamic'

// مكونات ديناميكية
const EgyptMap = dynamic(() => import('@/components/EgyptMap'), { ssr: false })

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [builderMode, setBuilderMode] = useState(false)

  // بيانات تجريبية للمحافظات
  const provinces = [
    { id: 'cairo', name: 'القاهرة', users: 12500, posts: 456, growth: 15 },
    { id: 'alexandria', name: 'الإسكندرية', users: 8900, posts: 234, growth: 12 },
    { id: 'giza', name: 'الجيزة', users: 7500, posts: 189, growth: 10 },
    { id: 'aswan', name: 'أسوان', users: 3200, posts: 145, growth: 25 },
    { id: 'luxor', name: 'الأقصر', users: 2800, posts: 132, growth: 22 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* شريط التنقل العلوي */}
      <nav className="bg-egy-white border-b border-egy-gold/20 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-egy-gold/10 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-egy-red to-egy-gold rounded-lg">
                <Pyramid size={24} className="text-egy-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-pharaoh-blue">
                  <span className="text-egy-red">𓂀</span> EgyBook Builder
                </h1>
                <p className="text-sm text-pharaoh-blue/70">لوحة التحكم الموحدة</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* زر تفعيل Builder Mode */}
            <button
              onClick={() => setBuilderMode(!builderMode)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                builderMode 
                  ? 'bg-gradient-to-r from-nile-green to-pharaoh-blue text-white shadow-lg' 
                  : 'bg-gradient-to-r from-egy-red to-egy-gold text-white hover:opacity-90'
              }`}
            >
              {builderMode ? '🔨 وضع البناء نشط' : '🔨 تفعيل وضع البناء'}
            </button>

            {/* زر الطوارئ */}
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
              <AlertCircle size={20} />
              طوارئ
            </button>

            {/* زر المستخدم */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-egy-red to-egy-gold rounded-full flex items-center justify-center text-white font-bold">
                IP
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* الشريط الجانبي */}
        {sidebarOpen && (
          <aside className="w-64 bg-egy-white border-r border-egy-gold/20 min-h-[calc(100vh-73px)]">
            <div className="p-4 space-y-2">
              {/* أقسام لوحة التحكم */}
              {[
                { id: 'overview', label: 'نظرة عامة', icon: <Globe /> },
                { id: 'identity', label: 'نظام الهوية', icon: <Shield /> },
                { id: 'provinces', label: 'المحافظات', icon: <Map /> },
                { id: 'users', label: 'المستخدمين', icon: <Users /> },
                { id: 'financial', label: 'النظام المالي', icon: <TrendingUp /> },
                { id: 'communities', label: 'المجتمعات', icon: <Building /> },
                { id: 'emergency', label: 'نظام الطوارئ', icon: <AlertCircle /> },
                { id: 'settings', label: 'الإعدادات', icon: <Settings /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-egy-red/10 to-egy-gold/10 text-egy-red border-r-4 border-egy-red'
                      : 'hover:bg-egy-gold/5 text-pharaoh-blue'
                  }`}
                >
                  <div className={`${activeTab === item.id ? 'text-egy-red' : 'text-egy-gold'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* مؤشر نظام الهوية */}
            <div className="mt-8 p-4 border-t border-egy-gold/20">
              <div className="bg-pharaoh-blue/5 p-4 rounded-lg">
                <h3 className="font-bold text-pharaoh-blue mb-2 flex items-center gap-2">
                  <Shield size={18} /> نظام الهوية
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">المستخدمون الموثقون</span>
                    <span className="font-bold text-nile-green">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">في الانتظار</span>
                    <span className="font-bold text-egy-gold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* المحتوى الرئيسي */}
        <main className={`flex-1 p-6 ${!sidebarOpen ? 'ml-0' : ''}`}>
          {builderMode ? (
            {/* وضع البناء - Builder Mode */}
            <div className="bg-gradient-to-br from-papyrus-yellow/30 to-egy-white/50 border-2 border-dashed border-egy-gold rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-egy-red to-egy-gold rounded-full mb-4">
                  <EgyptianPyramid size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-pharaoh-blue mb-2">
                  <span className="text-egy-red">🔨</span> وضع البناء نشط
                </h2>
                <p className="text-pharaoh-blue/70">يمكنك الآن بناء واجهة المستخدم</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* مكتبة المكونات */}
                <div className="col-span-2 bg-white rounded-xl shadow-lg p-6 border border-egy-gold/20">
                  <h3 className="font-bold text-lg text-pharaoh-blue mb-4 flex items-center gap-2">
                    <span className="text-egy-red">📚</span> مكتبة المكونات
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'نموذج تسجيل', icon: '📝' },
                      { name: 'صندوق منشور', icon: '💬' },
                      { name: 'بطاقة مستخدم', icon: '👤' },
                      { name: 'خريطة تفاعلية', icon: '🗺️' },
                      { name: 'شريط تنقل', icon: '🧭' },
                      { name: 'قائمة مجتمعات', icon: '🏛️' },
                    ].map((comp, idx) => (
                      <div 
                        key={idx}
                        className="border-2 border-dashed border-egy-gold/30 rounded-lg p-4 text-center hover:border-egy-red hover:bg-egy-red/5 transition-all cursor-pointer"
                        draggable
                      >
                        <div className="text-2xl mb-2">{comp.icon}</div>
                        <div className="text-sm font-medium text-pharaoh-blue">{comp.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* معاينة حية */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-egy-gold/20">
                  <h3 className="font-bold text-lg text-pharaoh-blue mb-4 flex items-center gap-2">
                    <span className="text-egy-red">👁️</span> معاينة حية
                  </h3>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-egy-red/10 to-egy-gold/10 rounded-lg hover:opacity-90 transition-opacity">
                      <Eye size={20} /> معاينة كمستخدم
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-pharaoh-blue/10 to-nile-green/10 rounded-lg hover:opacity-90 transition-opacity">
                      <EyeOff size={20} /> معاينة كزائر
                    </button>
                  </div>
                </div>
              </div>

              {/* منطقة التصميم */}
              <div className="bg-white border-4 border-dashed border-egy-gold/50 rounded-xl min-h-[400px] p-8">
                <div className="text-center py-16 text-pharaoh-blue/50">
                  <div className="text-5xl mb-4">𓃭</div>
                  <p className="text-lg">اسحب المكونات هنا لتصميم واجهة المستخدم</p>
                  <p className="text-sm mt-2">يمكنك تعديل أي مكون بالنقر عليه مرتين</p>
                </div>
              </div>
            </div>
          ) : (
            {/* الوضع العادي - نظرة عامة */}
            <div className="space-y-6">
              {/* بطاقات الإحصائيات */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-egy-red/10 to-egy-red/5 border border-egy-red/20 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-pharaoh-blue/70">المستخدمون الكليون</p>
                      <h3 className="text-2xl font-bold text-pharaoh-blue mt-1">0</h3>
                    </div>
                    <div className="p-3 bg-egy-red/20 rounded-lg">
                      <Users className="text-egy-red" size={24} />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-egy-red/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-pharaoh-blue/70">الهدف: 1,000,000</span>
                      <span className="font-bold text-egy-red">0%</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-egy-red to-egy-gold" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-egy-gold/10 to-egy-gold/5 border border-egy-gold/20 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-pharaoh-blue/70">المحافظات</p>
                      <h3 className="text-2xl font-bold text-pharaoh-blue mt-1">5/27</h3>
                    </div>
                    <div className="p-3 bg-egy-gold/20 rounded-lg">
                      <Map className="text-egy-gold" size={24} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-pharaoh-blue/70">المضافون: {provinces.length}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pharaoh-blue/10 to-pharaoh-blue/5 border border-pharaoh-blue/20 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-pharaoh-blue/70">المرحلة المالية</p>
                      <h3 className="text-2xl font-bold text-pharaoh-blue mt-1">Phase 1</h3>
                    </div>
                    <div className="p-3 bg-pharaoh-blue/20 rounded-lg">
                      <TrendingUp className="text-pharaoh-blue" size={24} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-pharaoh-blue/70">أسعار رمزية</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-nile-green/10 to-nile-green/5 border border-nile-green/20 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-pharaoh-blue/70">نظام الهوية</p>
                      <h3 className="text-2xl font-bold text-pharaoh-blue mt-1">نشط</h3>
                    </div>
                    <div className="p-3 bg-nile-green/20 rounded-lg">
                      <Shield className="text-nile-green" size={24} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-pharaoh-blue/70">بالبطاقة/الهوية</p>
                  </div>
                </div>
              </div>

              {/* خريطة مصر التفاعلية */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-egy-gold/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-pharaoh-blue flex items-center gap-2">
                      <span className="text-egy-red">🗺️</span> خريطة مصر التفاعلية
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-egy-red/10 to-egy-gold/10 text-egy-red rounded-lg hover:opacity-90 transition-opacity">
                      <Download size={18} /> تصدير البيانات
                    </button>
                  </div>
                  {/* هنا ستكون خريطة مصر */}
                  <div className="h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-egy-gold/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-4">𓅃</div>
                      <p className="text-pharaoh-blue/70">خريطة مصر التفاعلية قيد التطوير</p>
                      <p className="text-sm mt-2">ستظهر هنا نقاط حرارة النشاط</p>
                    </div>
                  </div>
                </div>

                {/* قائمة المحافظات */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-egy-gold/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-pharaoh-blue flex items-center gap-2">
                      <span className="text-egy-gold">🏛️</span> المحافظات المضافة
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-egy-red to-egy-gold text-white rounded-lg hover:opacity-90 transition-opacity">
                      <PlusCircle size={18} /> إضافة محافظة
                    </button>
                  </div>

                  <div className="space-y-4">
                    {provinces.map((province) => (
                      <div 
                        key={province.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border border-egy-gold/20 rounded-lg hover:border-egy-red/30 transition-colors"
                      >
                        <div>
                          <h4 className="font-bold text-pharaoh-blue">{province.name}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-pharaoh-blue/70 flex items-center gap-1">
                              👥 {province.users.toLocaleString()}
                            </span>
                            <span className="text-sm text-pharaoh-blue/70 flex items-center gap-1">
                              📝 {province.posts}
                            </span>
                            <span className="text-sm text-green-600 font-bold flex items-center gap-1">
                              📈 +{province.growth}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-egy-gold/10 rounded-lg transition-colors">
                            <Edit3 size={18} className="text-egy-gold" />
                          </button>
                          <button className="p-2 hover:bg-egy-red/10 rounded-lg transition-colors">
                            <Trash2 size={18} className="text-egy-red" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}