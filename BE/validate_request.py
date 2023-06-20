from functools import wraps
from flask import request


def validate_sample_request():
    def validate(f):
        @wraps(f)
        def wrap(*args, **kargs):
            try:
                assert(type(request.json["label"]) is str)
            except:
                return ({
                    "code": "invalid_label",
                    "message": "Field label is invalid"
                }, 400)

            try:
                assert(type(request.json["proposals"]) is str)
            except:
                return ({
                    "code": "invalid_proposals",
                    "message": "Field proposals is invalid"
                }, 400)
            
            try:
                assert(float(request.json["innerDiameter"]))
            except:
                return ({
                    "code": "invalid_inner_diameter",
                    "message": "Field inner_diameter is invalid"
                }, 400)
            
            try:
                assert(float(request.json["outerDiameter"]))
            except:
                return ({
                    "code": "invalid_outer_diameter",
                    "message": "Field outer_diameter is invalid"
                }, 400)
            
            try:
                assert(request.json["user"])
            except:
                return ({
                    "code": "invalid_user",
                    "message": "Field user is invalid"
                }, 400)
            
            try:
                assert(request.json["innerDiameter"] < request.json["outerDiameter"])
            except:
                return ({
                    "code": "bad_diameters",
                    "message": "inner_diameter must be smaller than outer_diameter"
                })
            return f(*args, **kargs)
        return wrap
    return validate