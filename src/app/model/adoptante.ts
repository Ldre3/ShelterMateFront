import {Datos} from "./datos";

export class Adoptante {

  constructor(private _id:number,
              private _datos:Datos)
  {}


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get datos(): Datos {
    return this._datos;
  }

  set datos(value: Datos) {
    this._datos = value;
  }
}
