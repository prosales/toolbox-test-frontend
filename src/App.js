import React, { useState, useEffect } from "react"
import './App.css'
import {Container} from "react-bootstrap";
import FilesTable from "./components/FilesTable";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = (search = '') => {
    let url = "http://localhost:3000/api/files/data"
    if (search) {
        url += `?fileName=${search}`
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      })
  }

  return (
    <Container className={"mt-5"}>
      <FilesTable data={data} getData={getData} />
    </Container>
  );
}

export default App;
