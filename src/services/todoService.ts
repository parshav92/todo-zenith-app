
import {
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Todo } from "../types/todo";

const COLLECTION_NAME = "todos";

export const getTodos = async (userId: string): Promise<Todo[]> => {
  const todosRef = collection(db, COLLECTION_NAME);
  const q = query(
    todosRef, 
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      userId: data.userId,
      createdAt: (data.createdAt as Timestamp).toDate(),
    };
  });
};

export const addTodo = async (todo: Omit<Todo, "id" | "createdAt">): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...todo,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateTodo = async (id: string, data: Partial<Todo>): Promise<void> => {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(todoRef, data);
};

export const deleteTodo = async (id: string): Promise<void> => {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(todoRef);
};
