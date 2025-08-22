import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "./Todo.css"
const apiUrl = process.env.REACT_APP_API_URL; 

const ShowTodo= ()=> {

    const [data , setData] = useState([]);

    const fetchTodos = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/getTodoList` , {
            withCredentials: true
        });
        setData(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        fetchTodos();
      }, []);
      

    const handleDelete = async(id)=> {
        if(!window.confirm("Delete this Todo?")) return ; 
 
        await axios.delete(`${apiUrl}/todo/delete/${id}` , {
            withCredentials:true
        })
        .catch( (err)=> {
             console.log(err);
             alert(err);
        })
       
         console.log("before setData")
        setData( prew=> prew.filter(todo =>  todo._id != id ));
        console.log("after setData")

        // window.location.reload();
    }

    const handleDone = async(id)=> {
         
        await axios.put(`${apiUrl}/todo/updateTodo/${id}` , {
            withCredentials: true 
        })
        alert("Congrats on completing the task! 🎉 Keep going!")
        fetchTodos()
        .catch( (err)=> {
             alert(err);
        })
    }

 

     return(
        <>
     <div className="showTodoBox">
  {data.map((todos) => (
    <Row className={todos.done ? " Done showTodoRow" : "showTodoRow"} key={todos._id}>
      <Col className="showTodoCol text-truncate" xs={8} sm={7} md={8} lg={9}>
        <h3 className="todoText" style={{fontWeight: "900"}}>{todos.todo.toUpperCase()}</h3>
         <small style={{marginLeft:'9px ' ,opacity: "0.5"}}>(      <span> {new Date(todos.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        )</small>
      </Col>
      <Col className="showTodoCol" xs={2} sm={2} md={2} lg={1}>
        <h5
          className="actionIcon deleteIcon"
          onClick={() => handleDelete(todos._id)}
        >
          ❌
        </h5>
      </Col>
      <Col className="showTodoCol" xs={2} sm={2} md={2} lg={1}>
        <h5
          className="actionIcon doneIcon"
          onClick={() => handleDone(todos._id)}
        >
          👍
        </h5>
      </Col>
    </Row>
  ))}
</div>

        </>
     )
}

export default ShowTodo;