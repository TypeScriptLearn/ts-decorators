interface ICar {
  fuel: string;
  open: boolean;
  freeSeats: number;

  isOpen: () => string;
}

/** changeFuelStatus(changeDoorStatus(obj)) */
@changeFuelStatus(110)
@changeDoorStatus(false)
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

function changeDoorStatus(status: boolean) {
  return <T extends { new (...args: any[]): {} }>(constructor: T): T => {
    return class extends constructor {
      open = status;
    };
  };
}

function changeFuelStatus(amount: number) {
  return <T extends { new (...args: any[]): {} }>(constructor: T): T => {
    return class extends constructor {
      fuel = `${amount}%`;
    };
  };
}

const car: ICar = new Car('100%', true, 3);

console.log(car.isOpen());
