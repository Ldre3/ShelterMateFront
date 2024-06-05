import {Datos} from "./datos";

export class Usuario {

  constructor(private _id:number,
              private _datos:Datos,
              private _licencia:boolean)
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

  get licencia(): boolean {
    return this._licencia;
  }

  set licencia(value: boolean) {
    this._licencia = value;
  }
}
