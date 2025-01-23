interface ICar {
  fuel: string;
  open: boolean;
  freeSeats: number;

  isOpen: () => string;
}

@modifyCar
class Car implements ICar {
  isOpen() {
    console.log(`Current fuel level is ${this.fuel}`);
    return this.open ? `Car is opened` : `Car is closed`;
  }
  constructor(
    public fuel: string,
    public open: boolean,
    public freeSeats: number,
  ) {}
}

const car: ICar = new Car('100%', true, 3);

function modifyCar<T extends { new (...args: any[]): {} }>(constructor: T): T {
  return class extends constructor {
    open = false;
  };
}

function modifyFuel(car: ICar): ICar {
  car.fuel = '110%';

  return car;
}

console.log(car.isOpen());
