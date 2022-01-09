import React, { Component } from "react";
import image from '../images/food.jfif';
import UserService from "../services/user-service";
// import { Link } from 'react-router-dom';
// // import menu from "./restaurant-menu";
// import { useParams } from "react-router-dom";

export default class menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            menuinfo: [],
            value: props.match.params.id,
        };
    }
    async componentDidMount() {
        const url = "http://127.0.0.1:8000/api/restaurant/" + this.state.value;
        var id = this.state.value;
        console.log(id);
        console.log("hello")
        const opts = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        try {
            const response = await fetch(url, opts)
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            console.log(json)
            this.setState({ content: json, menuinfo: json.restaurantmenu });
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        const { content, value, menuinfo } = this.state;

        return (
            <div className="container" >
                <h1>Hotel : {content.title}</h1>
                <div className="container" >
                    <div class="row">
                        <div className="col-md-3">
                        </div>
                        {menuinfo.map(cont => (
                            <div className="card" >

                                <div className="row no-gutters">

                                    <div className="col-md-3">
                                        <img src={image} className="card-img-top" alt="Hotel"></img>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-body">
                                            <h5 className="card-text">Name : {cont.content}</h5>
                                            <h5 className="card-text">Price : {cont.price}</h5>

                                            <p class="card-text"><small class="text-muted">Date updated: {cont.updatedAt.split("T")[0]}</small></p>
                                            <button className="btn btn-dark" onClick={() => { alert(`Order Placed\nTotal Price: ${cont.price}`); }}>Order</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
        );

    }
}