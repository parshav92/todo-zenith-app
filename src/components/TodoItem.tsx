
import React, { useState } from 'react';
import { Todo } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Trash2, Edit, X, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    await onUpdate(todo.id!, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleSaveEdit = async () => {
    await onUpdate(todo.id!, { 
      title: editedTitle, 
      description: editedDescription 
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id!);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <Card className={cn(
      "animate-fade-in transition-all duration-200 overflow-hidden",
      todo.completed && "opacity-70",
      isDeleting && "scale-95 opacity-0"
    )}>
      <CardContent className="pt-6 pb-2">
        <div className="flex gap-2">
          <Checkbox 
            checked={todo.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
          />
          <div className="flex-1">
            {isEditing ? (
              <Input 
                value={editedTitle} 
                onChange={(e) => setEditedTitle(e.target.value)}
                className="mb-2"
                placeholder="Todo title"
              />
            ) : (
              <h3 className={cn(
                "text-lg font-medium",
                todo.completed && "line-through text-muted-foreground"
              )}>
                {todo.title}
              </h3>
            )}
            
            {isEditing ? (
              <Textarea 
                value={editedDescription} 
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={2}
                placeholder="Description (optional)"
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {todo.description || "No description"}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdit}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
