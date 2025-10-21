import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Menu, User, Lock, ArrowRight, Sparkles } from 'lucide-react';

const LearnerLogin = () => {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginName || !password) {
      toast.error('Please enter both login name and password');
      return;
    }

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Check for student credentials (from existing Login.tsx)
      if (loginName === 'student' && password === 'student123') {
        localStorage.setItem('userRole', 'student');
        toast.success('Login successful!');
        navigate('/student-dashboard');
      } else {
        toast.error('Invalid credentials. Try: student / student123');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleOTPLogin = () => {
    toast.info('OTP login coming soon!');
  };

  const handleForgotPassword = () => {
    toast.info('Password recovery coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden flex items-center justify-center p-6">
      {/* Fun decorative shapes with gradients */}
      <div className="absolute top-20 left-16 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-float blur-xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-teal-400/20 to-green-400/20 animate-float blur-lg" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-24 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400/20 to-pink-400/20 animate-float blur-lg" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-48 right-32 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 animate-float blur-md" style={{ animationDelay: '1.5s' }}></div>

      {/* Animated Character - Rocket */}
      <div className="absolute bottom-20 left-12 text-6xl animate-float cursor-pointer hover:scale-110 transition-transform" style={{ animationDelay: '0.5s' }}>
        🚀
      </div>

      {/* Animated Character - Sparkles */}
      <div className="absolute top-32 right-12 text-5xl animate-float cursor-pointer hover:scale-110 transition-transform" style={{ animationDelay: '1.2s' }}>
        ✨
      </div>

      {/* Animated Character - Star */}
      <div className="absolute top-1/4 left-20 text-4xl animate-pulse cursor-pointer hover:rotate-12 transition-transform">
        ⭐
      </div>

      {/* Animated Character - Brain */}
      <div className="absolute bottom-1/3 right-16 text-4xl animate-float cursor-pointer hover:scale-110 transition-transform" style={{ animationDelay: '2.5s' }}>
        🧠
      </div>

      {/* Animated Character - Trophy */}
      <div className="absolute top-1/3 right-1/4 text-3xl animate-bounce cursor-pointer" style={{ animationDelay: '3s' }}>
        🏆
      </div>

      {/* Menu button */}
      <button className="absolute top-6 right-6 text-gray-600 p-2 hover:bg-white/60 rounded-xl transition-all z-50">
        <Menu size={24} />
      </button>

      {/* Main content - centered */}
      <div className="relative z-10 w-full max-w-md space-y-10">
        {/* Logo */}
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📚</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800">Oxford</h1>
              <h2 className="text-2xl font-bold text-teal-600">Advantage</h2>
            </div>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">Integrated Learning Solutions</p>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-sm border border-white/60 p-10 animate-fade-in relative overflow-hidden" style={{ animationDelay: '0.1s', fontFamily: 'Inter, sans-serif' }}>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100/30 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            {/* Header with sparkle */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <h2 className="text-3xl font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Welcome Back</h2>
              </div>
              <p className="text-sm text-gray-500">Enter your credentials to continue</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Login Name Input with Icon */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Login Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <Input
                    type="text"
                    placeholder="Enter your login name"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    className="w-full h-14 pl-12 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all text-gray-700 placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Password Input with Icon */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all text-gray-700 placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end pt-1">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-teal-500 hover:bg-teal-600 text-white text-base font-semibold rounded-2xl shadow-sm hover:shadow-md transition-all mt-6 group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Login
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-500">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOTPLogin}
                className="w-full h-12 border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 text-gray-700 font-medium rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Login via OTP
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs">
                <div className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full font-medium">
                  Demo Access
                </div>
                <span className="text-gray-500">student / student123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-xs text-gray-500 mb-1">Powered by:</p>
          <p className="text-xl font-bold text-orange-500">LJSaras</p>
          <p className="text-xs text-gray-500">from Excelsoft</p>
        </div>
      </div>
    </div>
  );
};

export default LearnerLogin;
