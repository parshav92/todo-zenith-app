
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { Todo } from '@/types/todo';
import { useAuth } from '@/context/AuthContext';

interface TodoFormProps {
  onAddTodo: (todo: Omit<Todo, "id" | "createdAt">) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddTodo({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        userId: currentUser.uid
      });
      
      // Reset form
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || !title.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
