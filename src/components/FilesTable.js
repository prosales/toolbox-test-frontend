import React from "react";
import { Table, Form, InputGroup, Spinner } from "react-bootstrap";

function FilesTable({ data, getData }) {

  const [loading, setLoading] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setLoading(true)
    setValidated(false)
    const handler = setTimeout(() => {
        getData(search);
        setLoading(false)
        setValidated(true)
    }, 2000)

    return () => {
        clearTimeout(handler)
    }
  }, [search])

  return (
      <div>
      <Form.Group className="mb-3">
          <InputGroup>
              <Form.Control
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroup.Text>
                  {loading ? (
                      <Spinner animation="border" size="sm" />
                  ) : validated ? (
                      <span style={{ color: "green" }}>✓</span>
                  ) : null}
              </InputGroup.Text>
          </InputGroup>
      </Form.Group>
        <Table striped bordered hover>
          <thead>
          <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
          </tr>
          </thead>
            <tbody>
            {data.map((file, fileIndex) =>
                file.lines.map((line, lineIndex) => (
                    <tr key={`${fileIndex}_${lineIndex}`}>
                        <td>{file.file}</td>
                        <td>{line.text}</td>
                        <td>{line.number}</td>
                        <td>{line.hex}</td>
                    </tr>
                ))
            )}
            {data.length === 0 && (
                <tr>
                    <td colSpan={4} className={"text-center"}>No hay datos</td>
                </tr>
            )}
            </tbody>
        </Table>
      </div>
  )
}

export default FilesTable