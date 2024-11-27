
export const getSender=(loggedUser,users)=>{
    console.log(users[1].Name,loggedUser.Name,'user from getsenderrrrrr');
    
    return users[0]._id ===loggedUser._id ? users[1].Name:users[0].Name;
}

export const getSenderFull=(loggedUser,users)=>{

    console.log('fulll',loggedUser,users);
    
    
return users[0]._id===loggedUser._id ? users[1]:users[0]
}

export const isSameSender=(messages,m,i,userId)=>{
    return(
        i < messages.length-1 && 
        (messages[i+1].sender._id !==m.sender._id ||
        messages[i+1].sender._id===undefined)&&
        messages[i].sender._id !==userId
    );
}

export const isLastMessage=(messages,i,userId)=>{
    return(
        i===messages.length-1 && 
        messages[messages.length-1].sender._id !==userId&&
        messages[messages.length-1].sender._id
        
    );
}

export const isSameSenderMargin=(messages,m,i,userId)=>{

    
   if(
    i<messages.length-1 && 
        messages[i+1].sender._id === m.sender._id &&
        messages[i].sender._id !==userId
   )
   return 33 ;

   else if(
    (i<messages.length-1 && 
    messages[i+1].sender._id !==m.sender._id &&
    messages[i].sender._id !==userId)||
    (i=== messages.length-1 && messages[i].sender._id !==userId)
   )
   return 0;

   else return 'auto'
}

export const isSameUser=(messages,m,i)=>{
    return i > 0 && messages[i-1].sender._id === m.sender._id;
}