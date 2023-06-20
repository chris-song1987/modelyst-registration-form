from main import app, db, User

with app.app_context():
    db.drop_all()
    db.create_all()

    users = []
    for name in ["Madelyn Bender", "Zavier West", "Remi Cunningham",
                 "Alejandro Wong", "Adelaide Vargas", "Ryker Armstrong",
                 "Presley Acevedo", "Dakari Compton"]:
        user = User(name=name)
        users.append(user)

    db.session.add_all(users)
    db.session.commit()
