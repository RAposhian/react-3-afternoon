import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts/`)
    .then(res => {
      console.log('got posts')
      this.setState({posts: res.data})
      // console.log(this.state.posts)
    })
    .catch(err => console.log(err))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts/?id=${id}`, {text})
    .then(res => {
      this.setState({ posts: res.data})
    })
    .catch(error => console.log(error))
  
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts/?id=${id}`)
    .then(res => {
      console.log('deleted post')
      this.setState({ posts: res.data})
    })
    .catch(error => console.log(error))
  }

  createPost(text) {
    
    axios.post(`https://practiceapi.devmountain.com/api/posts/`, {text})
    .then(res=> {
      this.setState({ posts: res.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {this.state.posts.map((e)=><Post 
          key={e.id} 
          text={ e.text} 
          date ={e.date}
          updatePostFn={this.updatePost}
          id={ e.id }
          deletePostFn ={this.deletePost}
          
          />)}
        </section>
      </div>
    );
  }
}

export default App;
