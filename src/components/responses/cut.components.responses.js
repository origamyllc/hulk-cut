'use strict';

const _ = require('lodash');
import Promise from 'bluebird';
import * as Boom from 'boom';

function  send_not_found_error(obj){
    let error = null;
    if(obj.error === 'Resource Not Found'){
        error = Boom.notFound('Resource Not Found');
        res.status(404).json(error);
    }
}

export function send_bad_implementation_response(res ,obj){
    var  error = Boom.badImplementation( obj );
    res.status(500).json(error);
}


export function send_unauthorized_user_error(req, res) {
    const error = Boom.unauthorized('invalid username or password');
    res.status(401).json(error);
}

