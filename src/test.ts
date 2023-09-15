let a: number;
let b: string;
let c: boolean;

let d: Array<string>;

type permissions = "admin" | "user" | "menager";

type BasicUser<A = boolean, P = string[]> = {
  name: string;
  surname: string;
  age: number;
  isAdult: A;
  permissions?: P[];
};

type AdvancedUser = {
  account: number;
};

type FullUser<A = boolean, P = string[]> = BasicUser<A, P> & AdvancedUser;

const user: FullUser<boolean, permissions> = {
  name: "John",
  surname: "Doe",
  age: 18,
  isAdult: true,
  account: 123456789,
  permissions: ["admin", "user", "menager"],
};

const usersArray: BasicUser[] = [user, user, user];

function getFirst<T>(arr: T[]): T {
  return arr[0];
}

getFirst<BasicUser>(usersArray);

type MathFunc = (a: number, b: number) => number;

const mul = (a: number, b: number): number => a * b;

const sum = (a: number, b: number): number => a + b;
