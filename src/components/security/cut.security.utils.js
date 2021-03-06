import { $models } from 'rikki';
export function isAuthenticated(req,res,next){

    const accessToken = req.headers['authorization'];
    if(accessToken) {
        $models['token'].findOne({
            accessToken: accessToken
        }, function (err, token) { // don't ever give out the password or salt
            if (token) {
                return next();
            }
            else {
                const error = {"message": "unauthorized access"}
                res.status(401).json(error)
            }
        });
    }

}

export function authenticateJWT(req,res,next){

    const JWTToken = req.headers['authorization'];

}