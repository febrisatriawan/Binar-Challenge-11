import { useState, useEffect } from "react";
// import "./styles.css";
import firebaseDB from "../../config/firebaseDB";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Table } from "react-bootstrap";
import Navbar from "../../components/Navbar";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firebaseDB, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center">Leaderboard Game</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.displayName}</td>
                <td>{item.email}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Leaderboard;
