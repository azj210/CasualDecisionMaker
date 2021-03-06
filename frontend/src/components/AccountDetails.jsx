import React, { useState } from 'react';
import LoginError from './LoginError';
import lifecycle from 'react-pure-lifecycle';
import AccountInfo from './AccountInfo';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function AccountDetails(props) {

    const [userInfo, setUserInfo] = useState();

    return (
        props.authenticated ?
        <div>
            <AccountInfo userInfo={userInfo} setUserInfo={setUserInfo} authenticated={props.authenticated} />
        </div> :
        <LoginError />
        
    )
};

export default lifecycle(methods)(AccountDetails);