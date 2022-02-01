import { v4 as uuidv4 } from "uuid";

const fakeData = [
  {
    id: uuidv4(),
    name: "Las canchas de pepe",
    direction: "Ameghino 520",
    city: "Malargüe",
    region: "Mendoza",
    field_name: "Fútbol 11",
    date: "10 de Marzo",
    time: "20:00",
    price: 250,
  },
  {
    id: uuidv4(),
    name: "Las canchas de dan",
    direction: "Rodriguez Peña 520",
    city: "San Luis",
    region: "San Luis",
    field_name: "Fútbol 5",
    date: "1 de Febrero",
    time: "19:00",
    price: 150,
  },
  {
    id: uuidv4(),
    name: "Las canchas de Fede",
    direction: "Av. Velez Zarfield 3220",
    city: "Rio Grande",
    region: "Tierra del Fuego",
    field_name: "Tennis 3",
    date: "15 de Abril",
    time: "17:00",
    price: 200,
  },
  {
    id: uuidv4(),
    name: "Las canchas de francisco",
    direction: "Julio Silva 4020",
    city: "Rio Gallegos",
    region: "Rio Gallegos",
    field_name: "Paddle",
    date: "5 de Enero",
    time: "16:30",
    price: 230,
  },
];

export default fakeData;
