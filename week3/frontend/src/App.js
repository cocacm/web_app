import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout, Header, HeaderRow, Textfield, Content} from 'react-mdl';
import './App.css';
import { Contacts } from './Contacts';
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      searchText:''
    }
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        <Layout fixedHeader>
            <Header title="Contacts" className="mdl-color--blue-500" >
              <Textfield
                  value={this.state.searchText}
                  onChange={(e) => {this.setState({searchText: e.target.value})}}
                  label="Search"
                  expandable
                  expandableIcon="search"
              />
            </Header>
            <Content>
                <Contacts searchText={this.state.searchText}/>
            </Content>
        </Layout>
    </div>
    );
  }
}

export default App;
