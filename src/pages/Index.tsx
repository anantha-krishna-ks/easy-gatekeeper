import { LoginForm } from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="relative">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
