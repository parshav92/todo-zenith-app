
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";

const Dashboard = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-3xl py-8 px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
        
        <TodoList />
      </main>
      
      <footer className="py-4 border-t text-center text-sm text-muted-foreground">
        © 2025 Zen Todo - Find your productivity flow.
      </footer>
    </div>
  );
};

export default Dashboard;
