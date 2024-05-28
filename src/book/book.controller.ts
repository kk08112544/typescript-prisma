import { BookService } from "./book.service";
import { Book } from "./book.model";
import { Response } from 'express';
import { Get, Body, Post, Param, Delete, Put, Controller, Res } from "@nestjs/common";

@Controller('api/book')
export class BookController{

    constructor(private readonly bookService: BookService){}

    @Get()
    async getAllBooks(@Res() res: Response): Promise<any> {
        try {
            const books: Book[] = await this.bookService.getAllBook();
            return res.status(201).json(books);
        } catch (error) {
            return res.status(500).json({ error: 'Error message' });
        }
    }

    @Post('/createNewBook')
    async postBook(@Body() postData: Book, @Res() res: Response): Promise<any> {
      
        if (!postData.title || !postData.img_url || !postData.description) {
            return res.status(400).json({ error: 'Content is not empty' });
        }

        try {
            const data = await this.bookService.createBook(postData);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error message' });
        }
    }

 

    @Get(':id')
    async getBook(@Param('id') id:number, @Res() res: Response):Promise<any>{
        try {
            const book = await this.bookService.getBook(id);
            if (book) {
                res.status(201).json(book); 
            } else {
                res.status(400).json({ error: 'Book not found' }); 
            }
        } catch (error) {
            res.status(500).json({ error: 'Error message' });
        }
    }

   @Delete(':id')
   async deleteBook(@Param('id') id:number, @Res() res:Response): Promise<any>{
        try{
            const book = await this.bookService.deleteBook(id);
            if(book){
                res.status(201).json({message:'Delete Successfully'})
            }else{
                res.status(400).json({error:'Book ID not found'});
            }
        }catch(error){
            res.status(500).json({error:'Error message'});
        }
   }

    @Put(':id')
    async updateBook(@Param('id') id:number, @Body() postData:Book, @Res() res:Response):Promise<any>{
        if (!postData.title && !postData.description && !postData.img_url) {
            return res.status(400).json({ error: 'Content is not empty' });
        } 
        try{
            const updatedBook = await this.bookService.updateBook(id, postData);
            if (updatedBook) {
                res.status(201).json(updatedBook); // 201 status if update is successful
            } else {
                res.status(400).json({ error: 'Book not found' }); // 400 status if book is not found
            }
        }catch(error){
            res.status(500).json({ error: 'Error message' });
        }
    }
}