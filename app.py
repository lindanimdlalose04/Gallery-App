import os
from flask import Flask, render_template, request, redirect, url_for
from models import db, Category, Image

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['UPLOAD_FOLDER'] = 'static/images'
app.config['SECRET_KEY'] = 'secret-key'

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/gallery")
def gallery():
    categories = Category.query.all()
    images = Image.query.all()

    if request.method == 'POST':
        action = request.form.get("action")

        if action == "add_category":
            name = request.form.get("category_name")
            if name and not Category.query.filter_by(name=name).first():
                db.session.add(Category(name=name))
                db.session.commit()
        
        elif action == "delete_category":
            cat_id = request.form.get("category_id")
            category = Category.query.get(cat_id)
            if category:
                for img in category.images:
                    try:
                        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], img.filename))
                    except FileNotFoundError:
                        pass
                    db.session.delete(img)
                db.session.delete(category)
                db.session.commit()
        
        elif action == "add_image":
            cat_id = request.form.get("category_id")
            image_file = request.files.get("image")
            if image_file and cat_id:
                filename = image_file.filename
                path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image_file.save(path)
                db.session.add(Image(filename=filename, category_id=int(cat_id)))
                db.session.commit()
        
        elif action == "add_image":
            cat_id = request.form.get("category_id")
            image_file = request.files.get("image")
            if image_file and cat_id:
                filename = image_file.filename
                path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image_file.save(path)
                db.session.add(Image(filename=filename, category_id=int(cat_id)))
                db.session.commit()

        elif action == "move_image":
            img_id = request.form.get("image_id")
            new_cat_id = request.form.get("new_category_id")
            img = Image.query.get(img_id)
            if img:
                img.category_id = int(new_cat_id)
                db.session.commit()

        elif action == "delete_image":
            img_id = request.form.get("image_id")
            img = Image.query.get(img_id)
            if img:
                try:
                    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], img.filename))
                except FileNotFoundError:
                    pass
                db.session.delete(img)
                db.session.commit()
        elif action == "rename_category":
            cat_id = request.form.get("category_id")
            new_name = request.form.get("new_name")
            
            category = Category.query.get(cat_id)
            if category and new_name:
                category.name = new_name
                db.session.commit()
        

        return redirect(url_for("gallery"))
    
    return render_template("gallery.html", categories=categories, images=images)

if __name__ == "__main__":
    app.run(debug=True)