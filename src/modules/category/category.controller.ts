import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CategoryService } from "./category.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { Category } from "./entities/category.entity"
import { GetCategoriesDto } from "./dto/get-categories.dto"
import { EditCategoryDto } from "./dto/edit-category.dto"
import { AccessTokenGuard } from "../../guards/access-token.guard";

@UseGuards(new AccessTokenGuard())
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UsePipes(new ValidationPipe())
  @Put("")
  async editCategory(
    @Body() editCategoryDto: EditCategoryDto,
  ): Promise<Category> {
    return this.categoryService.editCategory(editCategoryDto)
  }
  @UsePipes(new ValidationPipe())
  @Post("")
  async createCategory(
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

  @Get("")
  async getCategories(
    @Param() getCategoriesDto: GetCategoriesDto,
  ): Promise<Category[]> {
    return this.categoryService.getCategories(getCategoriesDto)
  }
}
