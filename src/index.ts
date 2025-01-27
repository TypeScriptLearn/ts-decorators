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
    return this.open ? `Car is opened` : `Car is closed`;
  }

  constructor(
    public fuel: string,
    public open: boolean,
    public freeSeats: number,
  ) {}
}

function changeDoorStatus(status: boolean) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <T extends { new (...args: any[]): object }>(constructor: T): T => {
    return class extends constructor {
      open = status;
    };
  };
}

function changeFuelStatus(amount: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <T extends { new (...args: any[]): object }>(constructor: T): T => {
    return class extends constructor {
      fuel = `${amount}%`;
    };
  };
}

const car: ICar = new Car('100%', true, 3);

console.log(car.isOpen());
