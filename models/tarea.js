const { v4: uuidv4 } = require("uuid");

//Clase Tarea
class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  //Constructor
  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

module.exports = Tarea;
