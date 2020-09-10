import React from 'react';
import './App.css';

const UserContext = React.createContext({
  user: {
    firstName: "John",
    lastName: "Doe",
    age: 10,
  },
  updateUser: () => {}, // (newUser) => void
});

const UserProvider = ({children}) => {
  const [user, setUser] = React.useState(
    {
      firstName: "John",
      lastName: "Doe",
      age: 10,
    }
  );
  return (
    <UserContext.Provider 
      value = {{
        user,
        update : (newUser) => setUser(newUser)
      }}>
      {children}
    </UserContext.Provider>
  )
}
/*
const User = () => {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <>
          <div>FirstName: {user.firstName}</div>
          <div>LastName: {user.lastName}</div>
          <div>Age: {user.age}</div>
        </>  
      )}
    </UserContext.Consumer>
  )
}*/

const User = () => {
  const { user } = React.useContext(UserContext)
  return (
    <>
      <div>FirstName: {user.firstName}</div>
      <div>LastName: {user.lastName}</div>
      <div>Age: {user.age}</div>
    </>
  )
}
/*
class Input extends React.Component {
  state = {
    value: this.props.defaultValue
  };
  onChange = (e) => {
    this.setState({ value: e.target.value }, () => {
      this.props.onChange(this.state.value, this.props.name);
    });
  };
  render() {
    const { value } = this.state;
    return (
      <div style={{ marginTop: 5 }}>
        <input
          value={value}
          onChange={this.onChange}
          placeholder={this.props.name}
          name={this.props.name}
          type="text"
        />
      </div>
    );
  }
}

class UserForm extends React.Component {
  state = {};
  onChange = (value, name) => {
    this.setState({
      [name]: value
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.context.update(this.state);
  };
  render() {
    const { user } = this.context
    return (
      <form onSubmit={this.onSubmit}>
        <Input defaultValue={user.firstName} onChange={this.onChange} name="firstName" />
        <Input defaultValue={user.lastName} onChange={this.onChange} name="lastName" />
        <Input defaultValue={user.age} onChange={this.onChange} name="age" />
        <button style={{ marginTop: 10 }}>Submit</button>
      </form>
    );
  }
}

UserForm.contextType = UserContext
*/
const Input = (props) => {
  const [value, setValue] = React.useState(props.defaultValue)
  const handleChange = (event) => {
    setValue(event.target.value)
    props.onChange(event.target.value, props.name)
  }
  return (
    <input name={props.name}
      value={value}
      onChange={handleChange}
      placeholder={props.name}
      type={props.type}
    />
  )
}

const UserForm = () => {
  const [stateForm, setStateForm] = React.useState({})
  
  const {user, update} = React.useContext(UserContext);

  const onChange = (value, name) => {
    setStateForm( prevValues => ({
      ...prevValues,
      [name]:value
      }) 
    )
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    update(stateForm)
  };

  return (
    <form onSubmit={onSubmitForm} style={{display: "flex", width: "150px", margin: "0 auto", flexDirection: "column"}}>
      <Input defaultValue={user.firstName} onChange={onChange} name="firstName" type="text" />
      <Input defaultValue={user.lastName} onChange={onChange} name="lastName" type="text" />
      <Input defaultValue={user.age} onChange={onChange} name="age" type="text"/>
      <button style={{ margin: "10px auto" }}>Submit</button>
    </form>
  );
}

const Header = ({children}) => {
  return (
    <div>{children}</div>
  )
}

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Header>
          <User />
        </Header>
        <UserForm />
      </UserProvider>
    </div>
  );
}

export default App;