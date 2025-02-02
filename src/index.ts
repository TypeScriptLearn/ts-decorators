interface ICar {
  fuel: string;
  open: boolean;
  freeSeats: number;
  errors?: string;

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

  @validateSeatsAmount(5)
  freeSeats: number;

  constructor(
    public fuel: string,
    public open: boolean,
    freeSeats: number,
  ) {
    this.freeSeats = freeSeats;
  }
}

function validateSeatsAmount(limit: number) {
  return function (target: object, propertyKey: string | symbol) {
    const symbol = Symbol();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const get = function (this: any): number {
      return this[symbol];
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const set = function (this: any, newValue: number): void {
      if (newValue >= 1 && newValue < limit) {
        this[symbol] = newValue;
      } else {
        Object.defineProperty(target, 'errors', {
          value: `Error! Seats more than ${limit}.`,
          writable: false,
          enumerable: true,
          configurable: false,
        });
      }
    };

    Object.defineProperty(target, propertyKey, {
      get,
      set,
    });
  };
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

const car: ICar = new Car('100%', true, 5);

console.log(car.isOpen('Car'));
console.log(car.errors);
