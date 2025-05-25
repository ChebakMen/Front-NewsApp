export type User = {
  _id: string,
  email:string,
  password: string,
  name: string,
}

export type News = {
  _id: string,
  title: string,
  text:string,
  imageURL?: string,
  authorId: string,
  createdAt: Date,
  updateAt?: Date,
  isPublished: string,
  publishDate?: Date,

}