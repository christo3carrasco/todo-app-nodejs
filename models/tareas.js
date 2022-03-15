const Tarea = require("./tarea");

//Clase Tareas
class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  //Constructor
  constructor() {
    this._listado = {};
  }

  //Método borrar tarea
  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  //Método cargar tareas del arreglo al objeto
  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  //Método crear tarea
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  //Método lista de tareas completa
  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const id = `${i + 1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${id} ${desc} :: ${estado}`);
    });
  }

  //Método listar tareas pendientes o completas
  listarPendientesCompletadas(completadas = true) {
    console.log();
    let i = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (completadas) {
        if (completadoEn) {
          i++;
          console.log(`${(i + ".").green} ${desc} :: ${completadoEn.green}`);
        }
      } else {
        if (!completadoEn) {
          i++;
          console.log(`${(i + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }

  //Método completar o reiniciar tareas
  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) this._listado[tarea.id].completadoEn = null;
    });
  }
}

module.exports = Tareas;
