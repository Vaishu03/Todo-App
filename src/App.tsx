import React, { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
      let add,active=todos,complete = CompletedTodos;
      if(source.droppableId === "TodosList"){
        add = active[source.index];
        active.splice(source.index,1);
      }else{
        add = complete[source.index];
        complete.splice(source.index,1);
      }

      if(destination.droppableId === "TodosList"){
        active.splice(destination.index,0,add);
      }else{
        complete.splice(destination.index,0,add);
      }

      setCompletedTodos(complete);
      setTodos(active)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Todo App</span>
        <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

// let name:string;
// let age: number | string;
// let isstud: boolean;
// let hobbies: string[];// number[];
// let role: [number,string];

// // // role = [5,"hi"];

// // type Person = {
// //   name: string,
// //   age?: number,
// // }

// // let person: Person = {
// //   name: "Vaish",
// //   // age: 10,
// // }

// let print: (name:string) =>  never;

// let person:unknown;

// interface Person {
//     name: string,
//     age?: number,
//   }

// type A = {
//   a:string,
//   b:number,
// }

// type B = A & {
//   a:string,
//   b:number,
// }

// type c = Person & {
//   a:string;
//   b:number;
// }

// interface guy extends Person{
//   a:string,
//   b:number,
// }

// interface girl extends A{
//   a:string,
//   b:number,
// }
