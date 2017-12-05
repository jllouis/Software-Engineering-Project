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
import '../../css/usertab.css';
import {accounts, acceptUser, blacklistUser, deleteUser, rejectUser} from '../../utils/Users'
import {projects} from '../../utils/Projects'
import store from '../../store'
import classnames from 'classnames'
import ProfileTab from './GeneralTab/ProfileTab'
import SettingsTab from './GeneralTab/SettingsTab'

export class AdminTab extends Component {
  constructor(props) {
    super(props);

    this.toggle = this
      .toggle
      .bind(this);
    this.state = {
      activeTab: '1',
      modal: false,
      reject_reason: "",
      link: false,
      users: [],
      projects: []
    };
    //this.renderAccounts = this.renderAccounts.bind(this)
    this.notAdmin = this
      .notAdmin
      .bind(this)
    this.checkPending = this
      .checkPending
      .bind(this)
    this.checkAccept = this
      .checkAccept
      .bind(this)
    this.checkBlacklist = this
      .checkBlacklist
      .bind(this)
    this.acceptUser = this
      .acceptUser
      .bind(this)
    this.declineUser = this
      .declineUser
      .bind(this)
    this.blacklistUser = this
      .blacklistUser
      .bind(this)
    this.updateTable = this
      .updateTable
      .bind(this)
    this.deleteUser = this
      .deleteUser
      .bind(this)
    this.toggleModal = this
      .toggleModal
      .bind(this)
    this.handleChange = this
      .handleChange
      .bind(this)
    this.rejectUser = this
      .rejectUser
      .bind(this)
    this.toggleLink = this.toggleLink.bind(this)
  }

  toggleLink = event => {
    this.setState({
      link: !this.state.link
    })
    console.log("link..")
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

  updateTable() {
    accounts(store.getState().token).then(({data}) => {
      var users = data.filter(this.notAdmin)
      this.setState({users: users})
      console.log(this.state.users)
    }).catch((err) => {
      console.log(err)
    })
    projects().then( (response) => {
      this.setState({
        projects: response.data
      })
      console.log(this.state.projects)
      console.log("Updating table...")
    }).catch( (err) => {
      console.log(err)
    })
  }

  rejectUser = id => event => {
    console.log("Rejecting User")
    this.setState({reject_reason: ""})

    const reject_msg = this.state.reject_reason
    rejectUser(store.getState().token, id, reject_msg).then((response) => {
      this.updateTable()
      this.toggleModal()
    })
  }

  blacklistUser = id => event => {
    console.log("Blacklisting user")
    blacklistUser(store.getState().token, id).then((response) => {
      this.updateTable()
    })
  }

  deleteUser = id => event => {
    console.log("Deleting user")
    deleteUser(store.getState().token, id).then((response) => {
      this.updateTable()
    })
  }

  declineUser = id => event => {
    console.log("Disabling user")
    console.log(id)
  }

  acceptUser = id => event => {
    console.log("Accepting user")
    console.log(id)
    acceptUser(store.getState().token, id).then((response) => {
      this.updateTable()
    })
  }

  checkAccept(user) {
    return user.enabled && !user.blacklisted
  }

  checkPending(user) {
    return !user.enabled && !user.blacklisted
  }

  checkBlacklist(user) {
    return user.blacklisted
  }

  notAdmin(user) {
    return user.user_type !== "admin"
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }

  componentDidMount() {
    this.updateTable()
  }

  render() {

    const pendingUsers = this
      .state
      .users
      .filter(this.checkPending)
      .map((user, index) => 
      <tr key={user._id}>
        <th scope="row">{index + 1}</th>
        <td>
          {user.user_type}
        </td>
        <td>
          {user.first_name}
        </td>
        <td>
          {user.last_name}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="success"
              value={user.token}
              onClick={this.acceptUser(user._id)}>
              Accept
            </Button>
            <Button size="sm" color="danger" onClick={this.toggleModal}>
              Decline
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <FormGroup>
                <Label>Why are you rejecting {user.username}
                  ?</Label>
                <Col sm={12}>
                  <Input
                    autoFocus
                    type="textarea"
                    name="reject_reason"
                    placeholder="Reason"
                    onChange={this.handleChange}
                    value={this.state.reject_reason}/>
                </Col>
              </FormGroup>
              <ModalFooter>
                <Button color="danger" onClick={this.rejectUser(user._id)}>
                  Reject
                </Button>
                <Button color="primary" onClick={this.toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ButtonGroup>
        </td>
        <td>
          {user.enabled
            ? "Enabled"
            : "Disabled"}
        </td>
      </tr>)

    const acceptedUsers = this
      .state
      .users
      .filter(this.checkAccept)
      .map((user, index) => <tr key={user._id}>
        <th scope="row">{index + 1}</th>
        <td>
          {user.user_type}
        </td>
        <td>
          {user.first_name}
        </td>
        <td>
          {user.last_name}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          <Button size="sm" color="danger" onClick={this.blacklistUser(user._id)}>
            Blacklist
          </Button>
        </td>
        <td>
          {user.enabled
            ? "Enabled"
            : "Disabled"}
        </td>
      </tr>)

    const blacklistedUsers = this
      .state
      .users
      .filter(this.checkBlacklist)
      .map((user, index) => <tr key={user._id}>
        <th scope="row">{index + 1}</th>
        <td>
          {user.user_type}
        </td>
        <td>
          {user.first_name}
        </td>
        <td>
          {user.last_name}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          <Button
            size="sm"
            color="danger"
            value={user.token}
            onClick={this.deleteUser(user._id)}>
            Delete
          </Button>
        </td>
        <td>
          {user.blacklisted
            ? "Blacklisted"
            : "Not blacklisted"}
        </td>
      </tr>)

    const allProjects = this.state.projects
      .map((project, index) => 
        <tr key={project._id}>
          <td scope="row">{index + 1}</td>
          <td>{project.title}</td>
          <td>{project.max_budget}</td>
          <td>I am status</td>
          <td>
            <Button
              size="sm"
              color="primary"
              onClick={this.toggleLink}
            >
              Link
            </Button>
            <Modal isOpen={this.state.link} toggle={this.toggleLink}>
              <ModalHeader>
                {project.title}
              </ModalHeader>
              <ModalBody>
                {project.summary}
              </ModalBody>
              <ModalFooter>
                <FormGroup>
                <select value={this.state.dev_username} 
                  onChange={this.handleChange} 
                  type="text" 
                  name="dev_username" 
                  className="form-control">
                  <option value="" disabled> Choose your user type </option>
                  <option value="developer"> Developer </option>
                  <option value="client"> Client </option>
                </select>
                </FormGroup>
                <Button color="danger" onClick={this.toggleLink}>
                  Choose
                </Button>
                <Button color="primary" onClick={this.toggleLink}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </td>
        </tr>
    )
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '1'
            })}
              onClick={() => {
              this.toggle('1');
            }}>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '2'
            })}
              onClick={() => {
              this.toggle('2');
            }}>
              Projects
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '3'
            })}
              onClick={() => {
              this.toggle('3');
            }}>
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '4'
            })}
              onClick={() => {
              this.toggle('4');
            }}>
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <div className="activeTab">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <h4>Pending User</h4>
                <Table hover responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Type</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers}
                  </tbody>
                </Table>
                <h4>Accepted User</h4>
                <Table hover responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Type</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedUsers}
                  </tbody>
                </Table>
                <h4>Blacklisted User</h4>
                <Table hover responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Type</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blacklistedUsers}
                  </tbody>
                </Table>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <h4>All Projects</h4>
                <Table hover responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Max Bid</th>
                      <th>Status</th>
                      <th>Link</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProjects}
                  </tbody>
                </Table>
              </Row>
            </TabPane>
            <ProfileTab tabId={"3"}/>
            <SettingsTab tabId={"4"}/>
          </TabContent>
        </div>
      </div>
    );
  }
}
