import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Between, LessThan, MoreThan, Repository } from "typeorm"
import { ApiError } from "../../common/constants/errors"
import { Category } from "./entities/category.entity"
import { GetCategoriesDto } from "./dto/get-categories.dto"
import { defaultAccounts } from "../account/constants/defaultAccounts"
import { defaultCategories } from "./constants/defaultCategories"

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createDefaultCategories(user: User) {
    return await Promise.all(
      defaultCategories.map(async (categoryData) => {
        const category = this.categoryRepository.create(categoryData)
        category.user = user

        return await category.save()
      }),
    )
  }

  async createCategory({
    userId,
    color,
    name,
    icon,
  }: CreateCategoryDto): Promise<Category> {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const category = new Category()
    category.name = name
    category.icon = icon
    category.color = color
    category.user = user

    await category.save()

    return category
  }

  async getCategories({ userId }: GetCategoriesDto) {
    return await this.categoryRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    })
  }
}
