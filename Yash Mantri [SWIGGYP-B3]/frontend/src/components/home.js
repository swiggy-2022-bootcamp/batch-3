import React, { Component } from "react";
import image from '../images/download.jfif';
import UserService from "../services/user-service";
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }
    componentDidMount() {

        UserService.getrestaurant().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error
                });
            });
    }

    render() {
        const { content } = this.state;
        return (
            <div className="container" >
                {content.map(cont => (
                    <div class="card" >
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src={image} class="card-img-top" alt="Hotel"></img>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-text">{cont.title}</h5>
                                    <p class="card-text"><small class="text-muted">Time updated: {cont.updatedAt.split("T")[1].split(":")[0]}:{cont.updatedAt.split("T")[1].split(":")[1]}:{cont.updatedAt.split("T")[1].split(":")[2]}</small></p>
                                    <p class="card-text"><small class="text-muted">Date updated: {cont.updatedAt.split("T")[0]}</small></p>

                                    <Link to={{
                                        pathname: "/menu/" + cont.id,
                                        state: [{ id: cont.id }]
                                    }} class="btn btn-dark">Go somewhere</Link>

                                </div>
                            </div>
                        </div>
                    </div>))}
            </div>
        );
    }
}