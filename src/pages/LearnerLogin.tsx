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
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Decorative circles in background */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-blue-400/30"></div>
      <div className="absolute top-32 right-16 w-16 h-16 rounded-full border-4 border-blue-400/30"></div>
      <div className="absolute top-64 left-32 w-12 h-12 rounded-full border-4 border-blue-400/30"></div>

      {/* Menu button */}
      <button className="absolute top-6 right-6 text-white p-2">
        <Menu size={28} />
      </button>

      {/* Clouds at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full text-white fill-current">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* Astronaut decoration - left */}
      <div className="absolute bottom-24 left-8 text-4xl">
        🚀
      </div>

      {/* Rocket decoration - right */}
      <div className="absolute bottom-24 right-8 text-4xl">
        🎨
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-12 px-6 min-h-screen">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Oxford</h1>
              <h2 className="text-2xl font-bold text-green-400">Advantage</h2>
            </div>
          </div>
          <p className="text-xs text-blue-200 uppercase tracking-wider text-center">Integrated Learning Solutions</p>
        </div>

        {/* Avatar */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-3xl">
            😊
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Login Name"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full h-12 rounded-lg border-gray-300 focus:border-blue-500"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-lg border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-full shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleOTPLogin}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium"
              >
                Login via OTP
              </button>
            </div>
          </form>
        </div>

        {/* Powered by */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xs text-blue-200 mb-1">Powered by:</p>
          <p className="text-2xl font-bold text-orange-500">LJSaras</p>
          <p className="text-xs text-blue-200">from Excelsoft</p>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 text-center text-xs text-blue-100">
          <p>Demo: student / student123</p>
        </div>
      </div>
    </div>
  );
};

export default LearnerLogin;
