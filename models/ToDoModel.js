import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
class todoModel {
  constructor() {
    //var roles = new RolesModel();
    this.Schema = mongoose.Schema;
    this.ToDoSchema = new this.Schema({
      name: String,
      description: String,
      date: Date,
      hour: String,
      done: {
          type: Boolean,
          default: true,
      }
    });
    //Ingresamos a llamar a la funcion model
    //this.mymodel = mongoose.model("users", this.UserSchema);
    if (modelenum["todos"] == null) {
      this.mymodel = mongoose.model("todos", this.ToDoSchema);
      modelenum["todos"] = this.mymodel;
    } else {
      this.mymodel = modelenum["todos"];
    }
  }
  /* 
  C. create
  */
  createExamen(name, description, date, hour, done) {
    var todo = {
      name,
      description,
      date,
      hour,
      done,
    };
    var newtodo = new this.mymodel(todo);
    // aqui viene la validacion
    var error = newtodo.validateSync();
    return new Promise((resolve, reject) => {
      if (error) {
        resolve(error);
        return;
      }
      newtodo.save().then((docs) => {
        console.log("examen registrado");
        resolve(docs);
      });
    });
  }
   /*
  D. delete
   */
  deleteTarea(id) {
    return new Promise((resolve, reject) => {
      this.mymodel.remove({ _id: id }).then((err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
  /*
  U. update
   */
 updateModel(id, tareaUpdate) {
    return new Promise((resolve, reject) => {
      this.mymodel.update({ _id: id }, { $set: tareaUpdate }, (err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }

  /* 
  R. read
  */
  getTareas(filterdata) {
    var filter = {};
    if (filterdata != null) {
      filter = filterdata;
    }
    return new Promise((resolve, reject) => {
      this.mymodel.find(filter, (err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
  getModel() {
    return this.mymodel;
  }
  getSchema() {
    return this.ToDoSchema;
  }
  
}
export default todoModel;