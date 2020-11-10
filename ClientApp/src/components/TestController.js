import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class TestController extends Component {
    static displayName = TestController.name;

    constructor(props) {
        super(props);
        this.state = { data: [], loading: true };
    }

    componentDidMount() {
        this.populateDataWithoutAuth();
    }

    static renderData(data) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>E-Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(u =>
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.firstname}</td>
                            <td>{u.lastname}</td>
                            <td>{u.email}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TestController.renderData(this.state.data);

        return (
            <div>
                <h1 id="tabelLabel" >Users</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/Users', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ data: data, loading: false });
    }

    async populateDataWithoutAuth() {
        const response = await fetch('api/Users');
        const data = await response.json();
        this.setState({ data: data, loading: false });
    }
}
