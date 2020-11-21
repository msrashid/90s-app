import React, { Component } from 'react'
import AllPostsList from '../ShowAllPosts'
import NewPostForm from '../NewPostForm'
import PostToShow from '../PostToShow'


export default class PostsContainer extends Component {
    constructor(props){
        super(props)
        this.state ={
            posts: [],
            likes: [],
            idOfPostToShow: -1,
        }
    }
    getPosts = async () =>{
        try{
            const url = process.env.REACT_APP_API_URL + "/90s/posts/"
            const postsResponse = await fetch(url)
            const postsJson = await postsResponse.json()
            this.setState({
                posts: postsJson.data.posts,
                likes: postsJson.data.likes

            })
            console.log(this.state.likes)
        }catch(err){
            console.log("Error getting posts data", err)

            }    
        }
    createPost = async (postToAdd) =>{
        try{
            const url = process.env.REACT_APP_API_URL + "/90s/posts/"
            const createPostResponse = await fetch(url,{
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postToAdd)
            })
            const createPostJson = await createPostResponse.json()
            console.log("This is createpostjson", createPostJson);
            if(createPostResponse.status === 201 || createPostResponse.status === 200){
                this.setState({
                    posts: [...this.state.posts, createPostJson.data]
                })
            }
        } catch(err){
            console.log("Error adding post", err);
        }
    }

    deletePost = async (id) => {
        try {
            const url = process.env.REACT_APP_API_URL + "/90s/posts/" + id
            const deletePostResponse = await fetch(url, {
                method: "DELETE",
            // }).then( res => {
            //     const findIndex = this.state.posts.findIndex(post => post.id === id)
            //     const copyPosts = [...this.state.posts]
            //     copyPosts.splice(findIndex, 1)
            //     this.setState({
            //         posts: copyPosts
            //     })
            })
            const deletePostJson = await deletePostResponse.json()
            console.log("Here is the deletePostJson: ", deletePostJson)
            if(deletePostJson.status === 200 || deletePostJson.status === 201) {
                this.setState({
                    posts: this.state.posts.filter(post => post.id !== id)
                })
            }
            this.getPosts()
        } catch(err) {
            console.log("There was an error deleting the post", id)
        }
    }


    componentDidMount() {
        this.getPosts()
    }

    showPost = (idOfPostToShow) => {
        console.log("you are trying to show post with id: ", idOfPostToShow)
            this.setState({
                idOfPostToShow: idOfPostToShow
            })
        }

 

    closeShowModal = () => {
        this.setState({
            idOfPostToShow: -1
        })
    }

   addLike = async (id) => {
        console.log(id)
        try {
            const url = process.env.REACT_APP_API_URL + "/90s/posts/like/" + id
            const likePostResponse = await fetch(url, {
                method: "POST",
                credentials: "include",
            // }).then( res => {
            //     const findIndex = this.state.posts.findIndex(post => post.id === id)
            //     const copyPosts = [...this.state.posts]
            //    setState({
            //        likes: 
            //    })
            })
            const likePostJson = await likePostResponse.json()
            console.log("Here is the likePostJson: ", likePostJson)
            if(likePostJson.status === 200 || likePostJson.status === 201) {
                this.setState({
                    likes: this.state.likes + 1   
                })
            }
            this.getPosts()
//          this.getLikes()
        } catch(err) {
            console.log("There was an error liking this post", err)
        }
    }


    render(){
        return(
            <React.Fragment>
                <h2>All Throwback Posts</h2>
                <NewPostForm createPost={this.createPost}/>
                <AllPostsList 
                    posts={this.state.posts}
                    showPost={this.showPost}
                    deletePost={this.deletePost}
                    addLike={this.addLike} />
                {
                    this.state.idOfPostToShow !== -1 
                    &&
                    <PostToShow
                        showThisPost={this.state.posts.find((post) => post.id === this.state.idOfPostToShow)}
                        closeShowModal={this.closeShowModal}
                        getPosts={this.getPosts}
                        addLike={this.addLike}
                    />
                }
            </React.Fragment>
        )
    }
}
