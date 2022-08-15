import React from 'react';
import { Container } from 'react-bootstrap';
import ChatConversationList from '../react-components/ChatConversationsList';
import ChatMessageHistory from '../react-components/ChatMessageHistory';
import ChatMessageInput from '../react-components/ChatMessageInput';


const  Chat = (props) => {
    return (
        <Container>
            <ChatConversationList />
            <ChatMessageHistory />
            <ChatMessageInput />
        </Container>
    )
};


export default  Chat