export class Anuncio {

  constructor(private _id:number,
              private _titulo:string,
              private _contenido:string,
              private _fechaPublicacion:Date,
              )
  {}


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(value: string) {
    this._titulo = value;
  }

  get contenido(): string {
    return this._contenido;
  }

  set contenido(value: string) {
    this._contenido = value;
  }

  get fechaPublicacion(): Date {
    return this._fechaPublicacion;
  }

  set fechaPublicacion(value: Date) {
    this._fechaPublicacion = value;
  }
}
