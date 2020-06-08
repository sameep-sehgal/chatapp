import React from 'react';

const Message = props => {
    return(
        <div className={`row ${props.className}`} >
                <div className='d-flex bg-dark px-3 my-1 pt-1' style={{width:'fit-content',borderRadius:'10px 10px 10px 0px'}}>
                    <h3 style={{fontSize:'15px'}} className='text-warning'>{props.sender}({props.time})-></h3>
                    <small className='text-light'>{props.text}</small>
                </div>        
        </div>
    )
}

export default Message;