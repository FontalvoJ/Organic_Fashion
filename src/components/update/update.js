import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react'

export default function Update() {

    return (
        <div>
            <Table inverted>
            <Table.Header className="App">
                <Table.Row className="table">
                    <Table.HeaderCell className="td1"><h1>Información Actualizada !</h1></Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body className="App">
                    <Table.Row className="table">
                        <Table.Cell className="td1">Subiendo a la Base de Datos</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Link to='/'>
                <Button color="green">Volver</Button>
            </Link>
        </div>
    )
}