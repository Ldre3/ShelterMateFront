export class Paseo {

  constructor(private _id:number,
              private _fecha:Date,
              private _horaSalida: string,
              private _duracion: number,
              private _observaciones: string)
  {}


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get fecha(): Date {
    return this._fecha;
  }

  set fecha(value: Date) {
    this._fecha = value;
  }

  get horaSalida(): string {
    return this._horaSalida;
  }

  set horaSalida(value: string) {
    this._horaSalida = value;
  }

  get duracion(): number {
    return this._duracion;
  }

  set duracion(value: number) {
    this._duracion = value;
  }

  get observaciones(): string {
    return this._observaciones;
  }

  set observaciones(value: string) {
    this._observaciones = value;
  }
}
