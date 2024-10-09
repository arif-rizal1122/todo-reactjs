import { useEffect, useRef, useState } from 'react'
import './App.css'
import Form from './componets/Form'
import TodoList from './componets/TodoList'

function App() {
  const STORAGE = 'TODOLIST_APP'
  const newTask = useRef()
  const [tasks, setTasks] = useState(()=>{
      return JSON.parse(localStorage.getItem(STORAGE)) || []
  })
  
  const [taskCompleted, setTaskCompleted] = useState(0)



  useEffect(()=> {
     localStorage.setItem(STORAGE, JSON.stringify(tasks))
     const complete = tasks.filter((item)=>item.completed == true).length
     setTaskCompleted(complete)
  }, [tasks])

  function setId() {
     if (tasks == '') {
         return 1
     } else {
      return tasks[0].id + 1
     }
  }

  function addTask(event) {
    event.preventDefault()
      if (newTask.current.value == '') {
         alert('Tidak Boleh Kosong')
         return false
      } 
      const data = {
        id: setId(),
        task: newTask.current.value,
        completed: false
      }
      newTask.current.value = ''
      setTasks([...tasks, data])
  }


  function setCompleted(id) {
    let taskItem = []
    tasks.map((item,index)=> {
        if (item.id == id) {
           taskItem[index]={...item,completed: !item.completed}
        } else {
           taskItem[index] = item
        }
    })
    setTasks(taskItem)
  }

  function move(currentIndex, updateIndex) {
     const currentData = tasks[currentIndex]
     const updateData = tasks[updateIndex]
     
     tasks[currentIndex]={...currentData, id:updateData.id}
     tasks[updateIndex]={...updateData, id:currentData.id}

     const newData = [...tasks]
     setTasks(newData)
  }

  function remove(id) {
     if (window.confirm('yakin mau hapus')) {
       setTasks(tasks.filter((item)=> item.id !=id ))
     }
  }

  return (
    <>
    <Form addTask={addTask} newTask={newTask} taskCompleted={taskCompleted} tasks={tasks}/>
    <TodoList tasks={tasks} setCompleted={setCompleted} move={move} remove={remove}/>
    </>
  )




}

export default App