'use client'

import { useState } from 'react'
import { Lock, Eye, EyeOff, Pyramid } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // هنا ستتصل بالخادم للتحقق
    if (username === 'ilperata' && password === 'admin123') {
      // تخزين جلسة وتسجيل الدخول
      localStorage.setItem('admin_token', 'fake_token_for_now')
      router.push('/dashboard')
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pharaoh-blue via-egy-black to-nile-green">
      {/* خلفية هيروغليفية */}
      <div className="absolute inset-0 hieroglyph-bg opacity-10"></div>
      
      <div className="relative z-10 bg-egy-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-egy-gold">
        {/* رأس فرعوني */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-egy-red to-egy-gold p-4 rounded-full">
              <Pyramid size={48} className="text-egy-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-pharaoh-blue font-title">
            <span className="text-egy-red">𓂀</span> EgyBook Admin <span className="text-egy-red">𓂀</span>
          </h1>
          <p className="text-egy-black/70 mt-2">لوحة التحكم الإدارية - الهوية المصرية</p>
        </div>

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-pharaoh-blue mb-2">
              اسم المستخدم
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-egy-white border-2 border-egy-gold/30 rounded-lg focus:border-egy-red focus:ring-2 focus:ring-egy-red/20 transition-all outline-none"
                placeholder="أدخل اسم المستخدم"
                required
              />
              <div className="absolute left-4 top-3.5 text-egy-gold">
                <span className="pharaoh-icon text-xl">𓀀</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-pharaoh-blue mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-12 bg-egy-white border-2 border-egy-gold/30 rounded-lg focus:border-egy-red focus:ring-2 focus:ring-egy-red/20 transition-all outline-none"
                placeholder="أدخل كلمة المرور"
                required
              />
              <div className="absolute left-4 top-3.5 text-egy-gold">
                <Lock size={20} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-egy-gold hover:text-egy-red transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-egy-red/10 border border-egy-red/30 rounded-lg p-3">
              <p className="text-egy-red text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-egy-red to-egy-gold text-egy-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <span className="anubis-icon">𓁢</span>
                دخول المشرف
              </>
            )}
          </button>

          <div className="text-center text-sm text-pharaoh-blue/70 pt-4 border-t border-egy-gold/20">
            <p>اسم المستخدم: <span className="font-bold text-egy-red">ilperata</span></p>
            <p className="mt-1">البريد: <span className="font-bold text-egy-gold">ilperata@msn.com</span></p>
          </div>
        </form>
      </div>

      {/* هامش فرعوني */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-egy-red via-egy-white to-egy-black"></div>
    </div>
  )
}