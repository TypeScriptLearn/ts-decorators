interface ICar {
  fuel: string;
  open: boolean;
  freeSeats: number;

  isOpen: () => string;
}

const car: ICar = {
  fuel: '100%',
  open: true,
  freeSeats: 3,
  isOpen() {
    console.log(`Current fuel level is ${this.fuel}`);
    return this.open ? `Car is opened` : `Car is closed`;
  },
};

function modifyCar(car: ICar): ICar {
  car.open = false;

  return car;
}

function modifyFuel(car: ICar): ICar {
  car.fuel = '110%';

  return car;
}

console.log(modifyFuel(modifyCar(car)).isOpen());
