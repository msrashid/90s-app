import React from 'react'

import {Icon, Card, Button, Image } from 'semantic-ui-react'




export default function AllUserPostsList(props){
    // const [open, setOpen] = React.useState(false)
    console.log(props);
    const allPosts = props.userPosts.map(post => {
    // const likes = props.likes.filter(like => like.post.id === post.id)
    return(
        <Card raised key={post.id} onClick={() => {} }  medium circular>
            <Card.Content textAlign={"center"}>
                <Card.Header>
                    {post.title}
                </Card.Header>
                <Card.Meta>
                    {post.description}
                </Card.Meta>
                <Card.Description>
                   {post.owner.username}
                    
                </Card.Description>
                <Image raised
                    src={post.img} onClick={ ()=> props.showPost(post.id)} medium circular />
            </Card.Content>
                <Card.Content extra>
                    <a className="left floated">
                    <Icon name='user' />
                        {post.owner.username}
                    </a>
                    <span className="right floated">
                        <i className="heart like icon" ></i>
                            {props.likes}
                    </span>  
                </Card.Content>
                <Button 
                    basic color={"red"}
                    onClick={() => props.deletePost(post.id)}>Delete</Button>
                <Button
                    basic color={"yellow"}
                    onClick={() => props.editPost(post.id)}>Edit</Button>
            </Card>
        )
    })
    return(
        <Card.Group centered={true}>
            {allPosts}
        </Card.Group>
    )

}