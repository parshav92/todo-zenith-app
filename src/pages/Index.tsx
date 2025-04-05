
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle, CheckSquare } from "lucide-react";

const Index = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zen-blue to-background">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md mb-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckSquare className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Zen Todo</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Simple, clean, and efficient task management
          </p>
        </div>

        <AuthForm />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center p-4">
            <CheckCircle className="h-8 w-8 text-zen-teal mb-2" />
            <h3 className="text-lg font-medium mb-1">Simple Interface</h3>
            <p className="text-center text-muted-foreground text-sm">
              Clean, distraction-free UI to keep you focused
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <CheckCircle className="h-8 w-8 text-zen-teal mb-2" />
            <h3 className="text-lg font-medium mb-1">Secure Storage</h3>
            <p className="text-center text-muted-foreground text-sm">
              Your tasks securely stored and accessible anywhere
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <CheckCircle className="h-8 w-8 text-zen-teal mb-2" />
            <h3 className="text-lg font-medium mb-1">Easy Organization</h3>
            <p className="text-center text-muted-foreground text-sm">
              Manage active and completed tasks effortlessly
            </p>
          </div>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © 2025 Zen Todo - Find your productivity flow.
      </footer>
    </div>
  );
};

export default Index;
