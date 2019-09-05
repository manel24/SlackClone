import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from 'apollo-boost';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Container, Header, Form, Input, Message } from 'semantic-ui-react';


class Login extends Component {
    constructor(props) {
        super(props);
        extendObservable(this, {
            email: '',
            password: '',
            errors: {},
        });
    }
    onChangeHandler = (e) => {
        const { name, value } = e.target;
        this[name] = value;
        this.errors[`${name}Error`] = '';
    }
    onSubmitHandler = async () => {
        const { email, password } = this;
        const response = await this.props.mutate({ variables: { email, password } })
        const { ok, token, refreshToken, errors } = response.data.login;
        if (ok) {
            console.log('user logged in successfully!');
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
        }
        if (errors) {
            const err = {};
            errors.forEach(({ path, message }) => {
                err[`${path}Error`] = message;
            }
            )
            this.errors = err;
        }
        console.log(response);

    }
    render() {
        const { email, password, errors: { emailError, passwordError } } = this;
        const errorList = [];
        if (emailError) {
            errorList.push(emailError);
        }
        if (passwordError) {
            errorList.push(passwordError);
        }

        return (<Container text>
            <Header as="h2">Login</Header>
            {(errorList.length !== 0) && <Message
                error
                header='There was some errors with your submission'
                list={errorList}
            />}
            <Form onSubmit={this.onSubmitHandler}>

                <Form.Field error={!!emailError}>
                    <label>Email</label>
                    <Input name="email" placeholder='Email' fluid value={email} onChange={this.onChangeHandler} />
                </Form.Field>
                <Form.Field error={!!passwordError}>
                    <label>Password</label>
                    <Input name="password" type="password" placeholder='*********' fluid value={password} onChange={this.onChangeHandler} autoComplete="current-password" />
                </Form.Field>

                <Button type='submit' >Submit</Button>
            </Form>
        </Container>)
    }
    I
};

const loginMutation = gql`
mutation( $email:String!, $password:String!)
{login(email:$email, password:$password){ok errors {path message } token refreshToken}}
`;
export default graphql(loginMutation)(observer(Login));