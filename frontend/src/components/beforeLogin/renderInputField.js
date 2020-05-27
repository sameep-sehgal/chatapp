import React from 'react';

export default (label,name,type,onChange,value,error,minLength) => {
    return(
        <div className="form-row m-2">
            <label className='h4' htmlFor={label}><strong>{label}</strong></label>
            <input 
                type={type} 
                className="form-control" 
                id={label}
                name={name} 
                aria-describedby="emailHelp" 
                placeholder={`Enter ${label}`}
                onChange={(event)=>onChange(event)}
                value={value}
                required
                minLength={minLength}
                autoComplete='off'
                style={{backgroundColor:'white'}}
            />
            <p className="text-danger" style={{fontSize:'10px'}}>
                {error}
            </p>
        </div>
    )
}