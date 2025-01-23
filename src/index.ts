interface ICar {
  fuel: string;
  open: boolean;
  freeSeats: number;

  isOpen: () => string;
}

const car: ICar = {
  fuel: "100%",
  open: true,
  freeSeats: 3,
  isOpen() {
    return this.open ? `Car is opened` : `Car is closed`;
  },
};

function modifyCar(car: ICar): ICar {
  car.open = false;

  return car;
}

console.log(modifyCar(car).isOpen());
