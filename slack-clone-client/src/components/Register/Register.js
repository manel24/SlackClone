import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from 'apollo-boost';
import { Button, Container, Header, Form, Input, Message } from 'semantic-ui-react';



class Register extends Component {

    state = {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
    }

    onSubmitHandler = async () => {
        this.setState({ usernameError: '', passwordError: '', emailError: '' })
        const { username, email, password } = this.state
        const response = await this.props.mutate({ variables: { username, email, password } })
        const { ok, errors } = response.data.register;
        if (ok) {
            console.log('user registered successfully!');
            this.props.history.push('/')
        }
        if (errors) {
            const err = {};
            errors.forEach(({ path, message }) => {
                err[`${path}Error`] = message;
                this.setState(err);

            }
            )
        }
        console.log(response);
    }
    onChangeHandler = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value });
    }
    render() {

        const { username, email, password, usernameError, passwordError, emailError } = this.state
        const errorList = [];
        if (usernameError) {
            errorList.push(emailError);
        }
        if (passwordError) {
            errorList.push(passwordError);
        }
        if (usernameError) {
            errorList.push(usernameError);
        }

        return (
            <Container text>
                <Header as="h2">Register</Header>
                {(usernameError || emailError || passwordError) && <Message
                    error
                    header='There was some errors with your submission'
                    list={errorList}
                />}
                <Form onSubmit={this.onSubmitHandler}>
                    <Form.Field>
                        <label>Username</label>
                        <Input name="username" placeholder='Username' error={!!usernameError} fluid value={username} onChange={this.onChangeHandler} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <Input name="email" placeholder='Email' error={!!emailError} fluid value={email} onChange={this.onChangeHandler} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input name="password" type="password" error={!!passwordError} placeholder='*********' fluid value={password} onChange={this.onChangeHandler} autoComplete="current-password" />
                    </Form.Field>

                    <Button type='submit' >Submit</Button>
                </Form>
            </Container>

        )
    }
}

const registerMutation = gql`
 mutation($username: String!, $email:String!, $password:String!)
 {register(username:$username, email:$email, password:$password ){
     ok
     user {email}
     errors {
         path
         message
     }
 }}
`;

export default graphql(registerMutation)(Register);