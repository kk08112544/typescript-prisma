import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { Book } from "./book.model";
import { Injectable } from "@nestjs/common";
import *as fs from 'fs';
import *as path from 'path';

@Injectable()
export class BookService{
    constructor(private prisma: PrismaService){}

    async getAllBook(): Promise<Book[]>{
        return this.prisma.book.findMany()
    }

    async getBook(id:number): Promise<Book | null>{
        return this.prisma.book.findUnique({where: {id:Number(id)}})
    }

    async createBook(data: Book): Promise<Book>{
        return this.prisma.book.create({
            data,
        })
    }

    async updateBook(id:number, data:Book):Promise<Book>{
        const getBook = await this.prisma.book.findUnique({ where: { id: Number(id) } });
        if (data.img_url && getBook.img_url !== data.img_url) {
            console.log(getBook.img_url);
            const imagePath = path.join(__dirname,  "../../assets/", getBook.img_url); // Adjust the path according to your folder structure
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image at ${imagePath}:`, err);
                } else {
                    console.log(`Successfully deleted image at ${imagePath}`);
                }
            });
        }
       
        return this.prisma.book.update({
            where: {id:Number(id)},
            data:{title:data.title, img_url:data.img_url, description:data.description}
        })
    }

    async deleteBook(id:number):Promise<Book>{

        const getBook = await this.prisma.book.findUnique({where: {id: Number(id)}});

        if(getBook.img_url){
            console.log(getBook.img_url);
            const imagePath = path.join(__dirname,  "../../assets/", getBook.img_url); // Adjust the path according to your folder structure
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image at ${imagePath}:`, err);
                } else {
                    console.log(`Successfully deleted image at ${imagePath}`);
                }
            });
        }
        return this.prisma.book.delete({
            where:{id:Number(id)}
        })
    }
}