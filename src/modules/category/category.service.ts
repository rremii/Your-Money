import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { DataSource, Repository } from "typeorm"
import { ApiError } from "../../common/constants/errors"
import { Category } from "./entities/category.entity"
import { GetCategoriesDto } from "./dto/get-categories.dto"
import { defaultCategories } from "./constants/defaultCategories"
import { EditCategoryDto } from "./dto/edit-category.dto"
import { DeleteCategoryDto } from "./dto/delete-category.dto"
import { TransactionService } from "../transaction/transaction.service"
import { UsersService } from "../users/users.service"

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly transactionService: TransactionService,
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
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

  async editCategory({ name, id, type, icon, color }: EditCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id })

    const existCategory = await this.categoryRepository.findOneBy({
      userId: category.userId,
      name,
    })
    if (existCategory && existCategory.id !== id)
      throw new BadRequestException(ApiError.CATEGORY_EXIST)

    category.name = name
    category.type = type
    category.icon = icon
    category.color = color

    return await category.save()
  }

  async deleteCategory({ id }: DeleteCategoryDto) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const manager = queryRunner.manager
    try {
      const categoryWithTransIds = await manager.findOne(Category, {
        where: { id },
        select: {
          transactions: {
            id: true,
          },
        },
        relations: {
          transactions: true,
        },
      })

      const transactionsIds = categoryWithTransIds.transactions.map(
        ({ id }) => id,
      )

      await this.transactionService.deleteTransactionsByIds(
        manager,
        transactionsIds,
      )

      await manager.delete(Category, {
        id: categoryWithTransIds.id,
      })

      await queryRunner.commitTransaction()
      return categoryWithTransIds
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  async createCategory({
    userId,
    color,
    name,
    icon,
    type,
  }: CreateCategoryDto): Promise<Category> {
    const user = await this.userService.findUserById(userId)
    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const existCategory = await this.categoryRepository.findOneBy({
      userId,
      name,
    })
    if (existCategory) throw new BadRequestException(ApiError.CATEGORY_EXIST)

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
