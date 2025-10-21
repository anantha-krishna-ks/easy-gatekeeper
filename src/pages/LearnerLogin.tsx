import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const LearnerLogin = () => {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleForgotPassword = () => {
    toast.info('Password recovery coming soon!');
  };

  const handleOTPLogin = () => {
    toast.info('OTP login coming soon!');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background - clean blue theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 animate-gradient-xy"></div>
      
      {/* Moving gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 via-sky-100/50 to-indigo-100/50 animate-gradient-slow"></div>
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Oxford Advantage Logo */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="flex items-center gap-3 bg-blue-800 px-6 py-3 rounded-xl shadow-lg">
            {/* Colorful Book Icon */}
            <div className="relative">
              <div className="w-10 h-10 relative">
                {/* Book pages with gradient colors */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-l-md transform -rotate-12"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-md transform rotate-0 translate-x-1"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-green-500 rounded-r-md transform rotate-12 translate-x-2"></div>
              </div>
            </div>
            
            {/* Text Logo */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-tight">Oxford</span>
              <span className="text-xl font-bold text-green-400 leading-tight">Advantage</span>
              <span className="text-[8px] text-blue-200 uppercase tracking-widest mt-0.5">Integrated Learning Solutions</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white rounded-3xl shadow-lg p-8 animate-fade-in relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
          {/* Ribbon */}
          <div className="absolute top-6 -right-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-1.5 rotate-45 shadow-lg">
            <span className="text-xs font-semibold tracking-wide">SECURE LOGIN</span>
          </div>
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">Sign in to your Account</h1>
            <p className="text-sm text-gray-500">Enter your email and password to log in</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Loisbecket@gmail.com"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold rounded-xl shadow-sm hover:shadow-md transition-all mt-6"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                "Log In"
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-500">Or</span>
              </div>
            </div>

            {/* OTP Login Button */}
            <button
              type="button"
              onClick={handleOTPLogin}
              className="w-full h-12 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Login via OTP
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-blue-500 hover:text-blue-600 font-semibold transition-colors">
              Sign Up
            </button>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs">
              <div className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium">
                Demo
              </div>
              <span className="text-gray-500">student / student123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerLogin;
