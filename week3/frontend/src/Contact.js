import React, { Component } from 'react';
import { ListItem, ListItemContent, Checkbox, ListItemAction, IconButton } from 'react-mdl';

export class Contact extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const contact = this.props.contact
    return(
      <ListItem twoLine>
        <ListItemContent
          onClick={() => {this.props.openDialog(contact, this.props.index)}}
          avatar={contact.firstName.substr(0, 1)+contact.lastName.substr(0, 1)}
          subtitle={contact.phoneNumber}>{contact.firstName + ' ' + contact.lastName}</ListItemContent>
        <ListItemAction>
          <IconButton name="edit" ripple onClick={() => {this.props.openDialog(contact, this.props.index)}}/>
        </ListItemAction>
        <ListItemAction>
          <IconButton name="delete" ripple onClick={() => {this.props.deleteContact(contact, this.props.index)}}/>
        </ListItemAction>
      </ListItem>
    )
  }
}
