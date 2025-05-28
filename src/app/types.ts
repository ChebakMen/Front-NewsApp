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
  fileURL?: string,
  author: User,
  createdAt: Date,
  updateAt?: Date,
  isPublished: string,
  publishDate?: Date,

}