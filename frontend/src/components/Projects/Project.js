import React, {Component} from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';

import store from '../../store'
import '../../css/project.css'

class Project extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modal: false,
      bid: 0

    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitBid = this.handleSubmitBid.bind(this)
  }

  handleSubmitBid = event => {
    console.log(this.state.bid)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <div className="Project">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <CardTitle>
                  {this.props.project.title}
                </CardTitle>
                <CardText className = "module">
                {store.getState().user.user_type=="client"? //if user is client, display more than one line of summary, since client dont have the expand for more details button
                  <h9> {this.props.project.summary}</h9>
                  :
                  <h9 className="truncate"> {this.props.project.summary}</h9>//otherwise(visitor) display
                }
                </CardText>
              </CardBody>
              {store.getState().user.user_type === "developer" ?
              <Button onClick={this.toggleModal}>
                Expand for more details
              </Button> : null
              }
              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>{this.props.project.title}
                </ModalHeader>
                <ModalBody>
                  <Label>Project Summary</Label>
                    <p className="modelP"> {this.props.project.summary} </p>
                  <Label>Project Details</Label>
                    <p className="modelP">{this.props.project.details}</p>
                  <div class="row">
                    <div class="col-md-6">
                    <Label>Bid Starts:</Label>
                      <p className="modelP">{this.props.project.bid_start}</p>
                    </div>
                      <div class="col-md-6">
                      <Label>Bid End:</Label>
                      <p className="modelP">{this.props.project.bid_end}</p>
                    </div>
                  </div>
                  <Label>Enter Bid</Label>
                  <InputGroup>
                    <InputGroupAddon>$</InputGroupAddon>
                    <Input
                      autoFocus
                      type="number"
                      name="bid"
                      value={this.state.bid}
                      onChange={this.handleChange}
                      placeholder="Enter Bid"
                    />
                  </InputGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.handleSubmitBid}>
                    Submit Bid
                  </Button>
                  <Button color="secondary" onClick={this.toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Project;
