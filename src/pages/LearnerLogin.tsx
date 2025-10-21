import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Shield, Eye, EyeOff } from 'lucide-react';

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

  const handleGoogleLogin = () => {
    toast.info('Google login coming soon!');
  };

  const handleFacebookLogin = () => {
    toast.info('Facebook login coming soon!');
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
        {/* Shield Icon */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white rounded-3xl shadow-lg p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your Account</h1>
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

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-12 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={handleFacebookLogin}
                className="w-full h-12 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>
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
