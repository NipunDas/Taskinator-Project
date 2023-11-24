import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function GridHeader(props) {
    return (
        <div>
            <hr />
            <h2 className="p-2">{props.name}</h2>
        </div>
    );
}

function GridBody(props) {
    return (
        <Container>
            <Row xs={2} md={4} lg={3}>
                {props.taskData?.map((task, index) => {
                    if (props.id === task.priority) {
                        return (
                            <Col key={index}>
                                <Card key={index} className="mb-2">
                                    <Card.Body>
                                        <Card.Title>{task.name}</Card.Title>
                                        <Card.Subtitle>
                                            {task.description}
                                        </Card.Subtitle>
                                        <Card.Text>{task.tags}</Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                props.removeTask(task._id)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    }
                    return undefined;
                })}
            </Row>
        </Container>
    );
}

function Grid(props) {
    return (
        <div>
            <GridHeader name={props.name} />
            <GridBody
                id={props.id}
                taskData={props.taskData}
                removeTask={props.removeTask}
            />
        </div>
    );
}

export default Grid;
