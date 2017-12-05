import React, {Component} from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
  Table,
  FormGroup,
  Row,
  Col,
  Media,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import {deleteUser, blacklistUser} from '../../utils/Users'
import store from '../../store'

export default class AdminUsers extends Component {

  constructor(props) {
    super(props)
    console.log(this.props.user._id)
    this.deleteUser = this.deleteUser.bind(this)
    this.blacklistUser = this.blacklistUser.bind(this)
    this.typeButton = this.typeButton.bind(this)
  }

  deleteUser = event => {
    console.log("Deleting user")
    deleteUser(store.getState().token, this.props.user._id).then((response) => {
      this.props.updateTable()
    }).catch( (err) => {
      console.log(err)
    })
  }

  blacklistUser = id => event => {
    console.log(id)
    blacklistUser(store.getState().token, this.props.user._id).then((response) => {
      this.props.updateTable()
    }).catch( (err) => {
      console.log(err)
    })
  }

  typeButton() {
    if(this.props.type === "blacklisted") {
      return(
        <Button
          size="sm"
          color="danger"
          value={this.props.user.token}
          onClick={this.deleteUser()}>
          Delete
        </Button>
      )
    } else if(this.props.type === "accepted") {
      return(
        <Button
          size="sm"
          color="danger"
          value={this.props.user.token}
          onClick={this.blacklistUser()}
        >
        Blacklist
        </Button>
      )
    }
      
  }

  render() {

    var status = ""

    if(this.props.user.blacklisted) {
      status = "BLACKLISTED"
    } else if(this.props.user.enabled) {
      status = "ENABLED"
    } else if(!this.props.user.enabled){
      status = "DISABLED"
    }

    const buttonType = this.typeButton()

    return(
      <tr>
        <th scope="row">{this.props.index + 1}</th>
        <td>
          {this.props.user.user_type}
        </td>
        <td>
          {this.props.user.first_name}
        </td>
        <td>
          {this.props.user.last_name}
        </td>
        <td>
          {this.props.user.username}
        </td>
        <td>
          {buttonType}
        </td>
        <td>
          {status}
        </td>
      </tr>
    )
  }
}