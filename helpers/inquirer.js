const inquirer = require("inquirer");
require("colors");

//Preguntas menu
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".red} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".red} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".red} Listar tareas completas`,
      },
      {
        value: "4",
        name: `${"4.".red} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".red} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".red} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".red} Salir`,
      },
    ],
  },
];

//Menu
const inquirerMenu = async () => {
  console.clear();
  console.log("=========================".america);
  console.log("  Seleccione una opción".green);
  console.log("=========================\n".america);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

//Espera
const pausa = async () => {
  const pause = {
    type: "input",
    name: "enter",
    message: `Presione ${"ENTER".green} para continuar.`,
  };
  console.log("\n");
  await inquirer.prompt(pause);
};

//Leer entrada
const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor.";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

//Listar tareas para borrar
const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const id = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${id} ${tarea.desc}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

//Confirmar selección
const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

//Lista de selección
const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const id = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${id} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });
  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
