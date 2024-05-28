import { Prisma } from "@prisma/client";

export class Book implements Prisma.BookCreateInput{
    title: string;
    img_url: string;
    description?: string;
}