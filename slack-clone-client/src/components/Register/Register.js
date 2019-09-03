import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from 'apollo-boost';
import { Button, Container, Header, Form } from 'semantic-ui-react';



class Register extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    onSubmitHandler = async () => {
        const response = await this.props.mutate({ variables: this.state })
        console.log(response);
        // const { loading, error, data } = await useQuery(gql`
        // mutation{register(username:"${this.state.username}", email:"${this.state.email}",password:"${this.state.password}")}
        // `);

        // mutation($username: String!, $email:String!, $password:String!)
        //  {register(username:$username, email:$email, password:$password ),
        //  variables: ${this.state}
        //   }
        // console.log(data)
        // console.log(this.state)

    }
    onChangeHandler = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value });
    }
    render() {

        const { username, email, password } = this.state
        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Form onSubmit={this.onSubmitHandler}>
                    <Form.Field>
                        <label>Username</label>
                        <input name="username" placeholder='Username' fluid="true" value={this.state.username} onChange={this.onChangeHandler} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input name="email" placeholder='Email' fluid="true" value={this.state.email} onChange={this.onChangeHandler} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input name="password" type="password" placeholder='*********' fluid="true" value={this.state.password} onChange={this.onChangeHandler} autoComplete="current-password" />
                    </Form.Field>

                    <Button type='submit' >Submit</Button>
                </Form>
            </Container>

        )
    }
}

const registerMutation = gql`
 mutation($username: String!, $email:String!, $password:String!)
 {register(username:$username, email:$email, password:$password )}
`;

export default graphql(registerMutation)(Register);