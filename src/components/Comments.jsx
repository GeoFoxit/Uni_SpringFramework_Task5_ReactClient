import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentsList: []
        }
    }
    
    componentDidMount() {
        axios.get(`http://localhost:8001/`)
        .then(data => data.data)
        .then(allCommentsArray => (allCommentsArray.filter(comment => parseInt(comment.good_id) === parseInt(this.props.good))))
        .then(arr => {
            this.setState({
                commentsList: arr
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    sendComment = () => {
        let user = JSON.parse(localStorage.getItem("user"))
        if (this.inputComment.value === "") {
            alert("Fill the field!")
            return;
        }
        axios.post('http://192.168.1.103:8001/',{
            user_id: user.id,
            good_id: this.props.good,
            content: this.inputComment.value
        })
        .then(response => {
            console.log(response);
        })
        .then(()=>{
            this.inputComment.value = "";
            alert("Your comment sent. Moderator will check it soon")
        })
        .catch(error => {
            this.inputComment.value = "";
            alert("Error, check details in console")
            console.log(error);
        })
        
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Leave comment</h2>
                    <input ref={node => this.inputComment = node} type="text" maxLength="200"/>
                    <button onClick={this.sendComment}>Send</button>
                </div>
                <h2>Comments</h2>
                <div>
                    {this.state.commentsList.map(comment => (
                        <div key={comment.id}>
                            User with id - {comment.user_id}, commented: <blockquote>{comment.content}</blockquote>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Comments;
