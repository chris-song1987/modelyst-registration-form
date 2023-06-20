from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from marshmallow_sqlalchemy.fields import Nested
from sqlalchemy.exc import IntegrityError
from validate_request import validate_sample_request

db = SQLAlchemy()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
CORS(app)
db.init_app(app)
ma = Marshmallow(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return f"<User '{self.name}'>"


class Sample(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String, unique=True, nullable=False)
    proposals = db.Column(db.String)
    inner_diameter = db.Column(db.Double)
    outer_diameter = db.Column(db.Double)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", backref="samples")

    def __repr__(self):
        return f"<Sample '{self.label}'>"


class SampleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Sample
        include_fk = True


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True

    samples = Nested(SampleSchema, many=True, exclude=("user_id",))


user_schema = UserSchema()
users_schema = UserSchema(many=True)
sample_schema = SampleSchema()


@app.route("/users", methods=["GET", "POST"])
def user_list():
    if request.method == "GET":
        users = db.session.execute(db.select(User)).scalars()
        return jsonify(users_schema.dump(users))
    else:
        new_user = User(
            name=request.json["name"]
        )
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user)


@app.route("/register", methods=['POST'])
@validate_sample_request()
def sample_add():
    try:
        user = User.query.get(request.json["user"])
        if not user:
            raise AssertionError({
                "code": "unknown_user"
            })
        
        new_sample = Sample(
            label=request.json["label"],
            proposals=request.json["proposals"],
            inner_diameter=request.json["innerDiameter"],
            outer_diameter=request.json["outerDiameter"],
            user=user
        )
        db.session.add(new_sample)
        db.session.commit()
        return sample_schema.dump(new_sample)
    except IntegrityError:
        return ({
            "code": "duplicate_label",
            "message": "Sample label already exists"
        }, 400)
    except Exception as e:
        return (jsonify(e.args[0]), 400)
