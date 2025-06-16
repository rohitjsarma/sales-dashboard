"use client";
import React,{useState,useEffect} from 'react';

const UserDetails=()=>{
  const[users,setUsers] = useState([]);

  useEffect(()=>{
    const api_url='https://jsonplaceholder.typicode.com/users';
    fetch(api_url).then((response)=>response.json())
    .then((data)=>setUsers(data))
    .catch((Error)=>console.error(Error))
  },[])

  return(
    <div >
        <h3>User Table</h3>
        <table border="1" cellPadding="10">
           <thead>
            <tr>
              <th>Id</th>
              <th>Nmae</th>
              <th>UserName</th>
              <th>Email</th>
            </tr>
              
          </thead>
          <tbody>
            {users.map((user)=>{
              return(
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              )
              })}
            
          </tbody>
        </table>
    </div>
  )
}
export default UserDetails;
