import React from 'react';
import Loader from './Spin.gif';
import './Loading.css';

const Loading = (props) => (
	<div className="loading">
    	<img alt="Loader" src={Loader} height="50px" width="50px" />
    </div>
);

export default Loading;