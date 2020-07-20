import React from 'react';

import { Container } from 'react-bootstrap';

import axios from 'axios';
import './Directory.css';
import GenericTable from '../GenericTable/GenericTable';

class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: "",
            patientList: [],
            villageList: [],
            loading: true
        }
    }

    uri = process.env.REACT_APP_SERVER_URI;

    componentDidMount() {
        axios.get(this.uri + 'GetAllPatient/').then(response => {
            console.log(response);
            axios.get(this.uri + 'GetVIllageNames/').then(responseVillage => {
                // this.setState({ villageList: responseVillage.data });
                // this.setState({ loading: false });
                this.setState(
                    {
                        patientList: response.data,
                        villageList: responseVillage.data,
                        loading: false
                    }
                )
            })
                .catch(err => {
                    console.log(err);
                });
            // this.setState({ patientList: response.data });
        })
            .catch(err => {
                console.log(err);
            });
    }

    getVillageNameFromId = (id) => {
        let { villageList } = this.state;
        if (villageList.length > 0) {
            for (let i = 0; i < villageList.length; i++) {
                if (villageList[i].village_id === id) {
                    return villageList[i].name;
                }
            }
        }
    }

    handleSearch = event => {
        console.log(event.target.value)
        this.setState({ searchField: event.target.value });
    }

    render() {
        const headers = ['Name', 'Village', 'Kidney Status', 'Deceased'];
        const keys = ['name', 'village','kidneystatus', 'deceased'];
        const dataTypes = ['String', 'Number', 'String', 'Boolean'];
        return (
            <Container style={{ marginTop: "2rem" }}>
                <GenericTable data={this.state.patientList} loading={this.state.loading} headers={headers} keys={keys} dataTypes={dataTypes} />
            </Container>
        )
    }
}

export default Directory;