import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { Category } from "./entities/category.entity"
import { GetCategoriesDto } from "./dto/get-categories.dto"
import { EditCategoryDto } from "./dto/edit-category.dto"
import { UpdateResult } from "typeorm"
import { DeleteCategoryDto } from "./dto/delete-category.dto"

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //todo
  // @UseGuards(new RefreshTokenGuard())
  @UsePipes(new ValidationPipe())
  @Put("")
  async createCategory(
    @Body() editCategoryDto: EditCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryService.editCategory(editCategoryDto)
  }
  @UsePipes(new ValidationPipe())
  @Post("")
  async editCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto)
  }
  @UsePipes(new ValidationPipe())
  @Delete(":id")
  async deleteCategory(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Category> {
    return this.categoryService.deleteCategory({ id })
  }

  // @UsePipes(new ValidationPipe())
  @Get("")
  async getCategories(
    @Param() getCategoriesDto: GetCategoriesDto,
  ): Promise<Category[]> {
    return this.categoryService.getCategories(getCategoriesDto)
  }
}
