import todoModel from "../models/ToDoModel.js";
var TODO = new todoModel();
class todoController {
  constructor() {}
  //services
  async createExamen(request, response) {
    var data = request.body;
    var result = await TODO.createExamen(
      data.name,
      data.description,
      new Date(),
      data.hour,
      data.done
    );
    response.status(200).json(result);
  }
  async deleteTarea(request, response) {
    var id = request.params.id;
    var result = await TODO.deleteTarea(id);
    response.status(200).json(result);
  }

  async updateTarea(request, response) {
    var id = request.params.id;
    var updatedata = request.body;
    var result = await TODO.updateModel(id, updatedata);
    response.status(200).json(result);
  }

  async getTareas(request, response) {
    var result = await TODO.getTareas();
    response.status(200).json(result);
  }
  










  /*async addRol(req, res) {
    var body = req.body;
    var idrol = body.idrol;
    var idus = body.idus;
    var filter = { _id: idrol };
    var rolresult = await roles.getRol(filter);
    if (rolresult.length == 1) {
      var result = await USER.addRol(idus, rolresult[0]);
      res.status(200).json({ serverResponse: result });
      return;
    }
    res.status(200).json({ serverResponse: "EL rol no pudo se asignado" });
  }
  async uploadAvatar(req, res) {
    var id = req.params.id;
    if (id == null) {
      res
        .status(200)
        .json({ serverResponse: "ERROR es necesario el id de usuario" });
      return;
    }
    if (!empty(req.files)) {
      //existen archivos en la peticion request
      var files = req.files;
      var file = files.avatar;
      var date = new Date();
      var token = Sha1(date.toString()).substr(0, 5);
      var totalname = `${token}_${file.name}`;
      var toalpath = `/opt/app/files/${totalname}`;
      var result = await file.mv(toalpath, (err) => {
        if (err) {
          res
            .status(500)
            .json({ serverResponse: "ERROR AL COPIAR LA IMAGEN", error: err });
          return;
        }
      });
      var obj = {};
      obj["uriAvatar"] = `/showavatar/${totalname}`;
      obj["directorypath"] = toalpath;
      obj["name"] = totalname;
      obj["default"] = true;
      var r = await USER.updateAvatar(id, obj);
      res.status(200).json({ serverResponse: r });
      //Upload Images Work
    }
  }*/
}
export default todoController;
