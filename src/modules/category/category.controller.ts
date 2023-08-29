import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { VerifyCodeDto } from "../Code/dto/verify-code.dto"
import { DefaultResponse } from "../../common/types/types"
import { CategoryService } from "./category.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { Category } from "./entities/category.entity"
import { GetCategoriesDto } from "./dto/get-categories.dto"

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //todo
  // @UseGuards(new RefreshTokenGuard())
  @UsePipes(new ValidationPipe())
  @Post("")
  async createCategory(
    @Body() createAccountDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createAccountDto)
  }

  @UsePipes(new ValidationPipe())
  @Get("")
  async getCategories(
    @Body() getTransactionsDto: GetCategoriesDto,
  ): Promise<Category[]> {
    return this.categoryService.getCategories(getTransactionsDto)
  }
}
