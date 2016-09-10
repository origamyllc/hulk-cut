
const _ = require('lodash');
import Promise from 'bluebird';

function  send_not_found_error(obj){
    let error = null;
    if(obj.error === 'Resource Not Found'){
        error = {};
        res.status(404).json(error);
    }
}

export function send_bad_implementation_response(res ,obj){
    var  error = {};
    res.status(500).json(error);
}


export function send_unauthorized_user_error(req, res) {
    const error = {};
    res.status(401).json(error);
}

