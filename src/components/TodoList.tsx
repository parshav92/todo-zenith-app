
import React, { useEffect, useState } from 'react';
import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useAuth } from '@/context/AuthContext';
import { getTodos, addTodo, updateTodo, deleteTodo } from '@/services/todoService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    
    const fetchTodos = async () => {
      if (!currentUser) return;
      
      try {
        const fetchedTodos = await getTodos(currentUser.uid);
        if (mounted) {
          setTodos(fetchedTodos);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
        toast({
          title: "Error fetching tasks",
          description: "There was a problem loading your tasks.",
          variant: "destructive"
        });
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    fetchTodos();
    
    return () => { mounted = false };
  }, [currentUser, toast]);

  const handleAddTodo = async (newTodo: Omit<Todo, "id" | "createdAt">) => {
    try {
      const id = await addTodo(newTodo);
      setTodos(prevTodos => [
        {
          ...newTodo,
          id,
          createdAt: new Date()
        },
        ...prevTodos
      ]);
      toast({
        title: "Task added",
        description: "Your new task has been created.",
      });
    } catch (error) {
      toast({
        title: "Error adding task",
        description: "There was a problem creating your task.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateTodo = async (id: string, data: Partial<Todo>) => {
    try {
      await updateTodo(id, data);
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? { ...todo, ...data } : todo
        )
      );
      toast({
        title: "Task updated",
        description: "Your task has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error updating task",
        description: "There was a problem updating your task.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      toast({
        title: "Task deleted",
        description: "Your task has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error deleting task",
        description: "There was a problem deleting your task.",
        variant: "destructive"
      });
    }
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (loading) {
    return <div className="text-center py-10">Loading your tasks...</div>;
  }

  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} />
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="active">Active ({activeTodos.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTodos.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {activeTodos.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No active tasks. Add a new task to get started!
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {completedTodos.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No completed tasks yet. Mark tasks as complete to see them here.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TodoList;
