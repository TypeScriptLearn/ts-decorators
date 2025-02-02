interface ICar {
  fuel: string;
  open: boolean;
  freeSeats: number;

  isOpen: (value: string) => string;
}

/** changeFuelStatus(changeDoorStatus(obj)) */
@changeFuelStatus(110)
@changeDoorStatus(false)
class Car implements ICar {
  @checkAmountOfFuel
  isOpen(message: string): string {
    return this.open ? `${message} is opened` : `${message} is closed`;
  }

  constructor(
    public fuel: string,
    public open: boolean,
    public freeSeats: number,
  ) {}
}

function checkAmountOfFuel(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): PropertyDescriptor | void {
  const originValue = descriptor.value;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor.value = function (this: any, ...args: any[]) {
    console.log(this.fuel);
    return originValue.apply(this, args);
  };
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

console.log(car.isOpen('Car'));
