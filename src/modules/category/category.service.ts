import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Repository } from "typeorm"
import { ApiError } from "../../common/constants/errors"
import { Category } from "./entities/category.entity"
import { GetCategoriesDto } from "./dto/get-categories.dto"
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
    await Promise.all(
      //HAVE TO SPLIT BY 5 DUE TO MY FREE DB PLAN CAN HANDLE ONLY 5 REQ AT ONCE
      defaultCategories.slice(0, 5).map(async (categoryData) => {
        const category = this.categoryRepository.create(categoryData)
        category.user = user

        return await category.save()
      }),
    )
    await Promise.all(
      defaultCategories.slice(5).map(async (categoryData) => {
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
    type,
  }: CreateCategoryDto): Promise<Category> {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const category = new Category()
    category.name = name
    category.icon = icon
    category.color = color
    category.user = user
    category.type = type

    await category.save()

    return category
  }

  async getCategoryById(id: number) {
    return await this.categoryRepository.findOneBy({ id })
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
