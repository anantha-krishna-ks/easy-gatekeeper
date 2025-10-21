import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Menu } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden flex items-center justify-center p-4">
      {/* Decorative circles in background */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-blue-400/30 animate-pulse"></div>
      <div className="absolute top-32 right-16 w-16 h-16 rounded-full border-4 border-blue-400/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-32 w-12 h-12 rounded-full border-4 border-blue-400/30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Menu button */}
      <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
        <Menu size={28} />
      </button>

      {/* Clouds at bottom - with proper z-index */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full text-white/90 fill-current">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* Astronaut decoration - left */}
      <div className="absolute bottom-28 left-8 text-4xl z-0 animate-float">
        🚀
      </div>

      {/* Rocket decoration - right */}
      <div className="absolute bottom-28 right-8 text-4xl z-0 animate-float" style={{ animationDelay: '1.5s' }}>
        🎨
      </div>

      {/* Main content - centered with proper z-index */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Oxford</h1>
              <h2 className="text-2xl font-bold text-green-400">Advantage</h2>
            </div>
          </div>
          <p className="text-xs text-blue-200 uppercase tracking-wider">Integrated Learning Solutions</p>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6 animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-white/20">
            😊
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white rounded-3xl shadow-2xl p-8 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Login Name"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleOTPLogin}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Login via OTP
              </button>
            </div>
          </form>

          {/* Demo credentials inside card */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Demo: <span className="font-semibold text-gray-700">student</span> / <span className="font-semibold text-gray-700">student123</span>
            </p>
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-xs text-blue-200 mb-1">Powered by:</p>
          <p className="text-2xl font-bold text-orange-400">LJSaras</p>
          <p className="text-xs text-blue-200">from Excelsoft</p>
        </div>
      </div>
    </div>
  );
};

export default LearnerLogin;
