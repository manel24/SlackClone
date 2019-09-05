import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from 'apollo-boost';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Container, Header, Form, Input, Message } from 'semantic-ui-react';


class CreateTeam extends Component {
    constructor(props) {
        super(props);
        extendObservable(this, {
            name: '',
            errors: {},
        });
    }
    onChangeHandler = (e) => {
        const { name, value } = e.target;
        this[name] = value;
        this.errors[`${name}Error`] = '';
    }
    onSubmitHandler = async () => {
        const { name } = this;
        const response = await this.props.mutate({ variables: { name } })
        const { ok, errors } = response.data.createTeam;
        if (ok) {
            this.props.history.push('/');
            console.log('team created  successfully!');
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
        const { name, errors: { nameError } } = this;
        const errorList = [];
        if (nameError) {
            errorList.push(nameError);
        }

        return (<Container text>
            <Header as="h2">Add a Team</Header>
            {(errorList.length !== 0) && <Message
                error
                header='There was some errors with your submission'
                list={errorList}
            />}
            <Form onSubmit={this.onSubmitHandler}>

                <Form.Field error={!!nameError}>
                    <label>Name</label>
                    <Input name="name" placeholder='Team name' fluid value={name} onChange={this.onChangeHandler} />
                </Form.Field>

                <Button type='submit' >Submit</Button>
            </Form>
        </Container>)
    }
    I
};

const createTeamMutation = gql`
mutation( $name:String!)
{createTeam(name:$name){ok errors {path message }}}
`;
export default graphql(createTeamMutation)(observer(CreateTeam));