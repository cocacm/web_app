import React, { Component } from 'react';
import { List, FABButton, Button, Icon, Dialog, DialogTitle, DialogContent, DialogActions, Textfield } from 'react-mdl';
import { Contact } from './Contact';
import fetch from 'isomorphic-fetch';

export class Contacts extends Component{
  constructor(props){
    super(props)
    this.state={
      contacts:[],
      dialogOpen:false,
      selectedContact:null,
      selectedIndex:-1
    }
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.updateSelected = this.updateSelected.bind(this)
    this.saveContact = this.saveContact.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
  }
  componentWillMount(){
    fetch('/contacts')
    .then( res => res.json() )
    .then( data => {
      console.log(data);
      if(!data.error){
        this.setState({contacts: data})
      }
    })
  }
  openDialog(contact = {firstName:'', lastName:'', phoneNumber:''}, selectedIndex=-1){
    this.setState({dialogOpen:true, selectedContact:Object.assign({}, contact), selectedIndex})
  }
  closeDialog(){
    this.setState({dialogOpen:false, selectedContact:null, selectedIndex: -1})
  }
  updateSelected(key, value){
    this.setState({ selectedContact: Object.assign({}, this.state.selectedContact, {[key]:value}) })
  }
  deleteContact(contact, index){
    fetch('/contact/'+contact._id, { method: 'delete' })
    .then( res => res.json() )
    .then( data => {
      console.log(data);
      let contacts = this.state.contacts;
      if(data.success){
        contacts.splice(index, 1);
        this.setState({ contacts: contacts })
      }
    })
  }
  saveContact(){
    const contact = this.state.selectedContact
    let method, url, isNew
    //id exists, modify contact
    if(contact._id){
      method = 'put'
      url = '/contact/'+contact._id
      isNew = false
    }else{
      //id doesnt exist, create contact
      method = 'post'
      url = '/contact/create'
      isNew = true
    }
    fetch(url, {
      method: method,
      body: JSON.stringify(contact),
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
    .then( res => res.json() )
    .then( data => {
      console.log(data);
      const contacts = this.state.contacts;
      if(data.success){
        if(isNew){
          contacts.push(data.contact)
          this.setState({contacts: contacts, dialogOpen: false, selectedContact: null, selectedIndex: -1})
        }else{
          contacts[this.state.selectedIndex] = data.contact;
          this.setState({contacts: contacts, dialogOpen: false, selectedContact: null, selectedIndex: -1})
        }
      }
    })
  }
  render(){
    const selected = this.state.selectedContact
    return(
      <div>
        <FABButton ripple key={0} style={{position:'fixed', bottom:16, right:16}} onClick={() => {this.openDialog()}}>
          <Icon name="add" />
        </FABButton>
        {
          this.state.dialogOpen?
          <Dialog open={this.state.dialogOpen} onCancel={this.openDialog}>
            <DialogTitle>{this.state.selectedContact._id? 'Edit' : 'Create'} Contact</DialogTitle>
            <DialogContent>
              <Textfield
                onChange={(e) => {this.updateSelected('firstName', e.target.value)}}
                label="First Name"
                floatingLabel
                value={selected.firstName}
              />
              <Textfield
                onChange={(e) => {this.updateSelected('lastName', e.target.value)}}
                label="Last Name"
                floatingLabel
                value={selected.lastName}
              />
              <Textfield
                onChange={(e) => {this.updateSelected('phoneNumber', e.target.value)}}
                label="Phone Number"
                floatingLabel
                value={selected.phoneNumber}
              />
            </DialogContent>
            <DialogActions>
              <Button type='button' colored onClick={this.saveContact}>Save</Button>
              <Button type='button' onClick={this.closeDialog}>Cancel</Button>
            </DialogActions>
          </Dialog>
          :
          null
        }
        <List>
          {
            this.state.contacts.filter( c => {
              return c.firstName.indexOf(this.props.searchText) > -1 || c.lastName.indexOf(this.props.searchText) > -1 || c.phoneNumber.indexOf(this.props.searchText) > -1
            }).map( ( contact, i ) => {
              return (
                <Contact contact={contact} deleteContact={this.deleteContact} openDialog={this.openDialog} index={i} key={i+1}/>
              )
            })
          }
        </List>
      </div>
    )
  }
}
