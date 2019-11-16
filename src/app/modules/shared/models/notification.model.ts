export class NotificationModel {
  constructor(
    public id: number,
    public title: string,
    public poster: string,
    public genre: string,
    public releaseDate: string,
    public actors: string
  ) {
  }
}
