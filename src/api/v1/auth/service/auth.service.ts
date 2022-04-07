import {
  Injectable,
  Logger, NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeepPartial, Repository } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { trackDuplicationErrors } from "../../../../utils/duplicate-record-checker/duplicate-record-checker";
import * as bcrypt from 'bcrypt';
import { UserAuthDto } from "../interface/user-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginResponseDto } from "../interface/login-response.dto";
import { nameof } from "../../../../utils/name-of/name-of";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {
  }

  /**
   * Method for user authentication
   * @param email
   * @param pass
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOne({ email: email.toLowerCase() });
    if (user && (await this.verifyPassword(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * This method will register new users
   * @param registrationData
   */
  public async register(registrationData: DeepPartial<User>): Promise<User> {

    //Add hash password to user instead of plain password..
    const hashedPassword: string = await bcrypt.hash(registrationData.password, 10);

    //Convert registration email to lower case..
    const regEmail = registrationData.email.toLowerCase();

    registrationData.password = hashedPassword;
    registrationData.email = regEmail;

    //Create new user..
    let createdUser: User;
    try {
      //Create User..
      createdUser = await this.userRepo.save(registrationData);
      createdUser.password = undefined;

    } catch (e) {
      this.logger.error({ message: e.message, ...e });
      trackDuplicationErrors(e)
    }
    return createdUser;
  }

  /**
   * Method for user login..
   * @param userLoginRequest
   */
  public async userLogin(
    userLoginRequest: UserAuthDto
  ): Promise<LoginResponseDto> {

    //Get user by email address..
    const user: User = await this.getUserByEmail(userLoginRequest.email);

    //Create JWT for login..
    user.accessToken = await this.generateJWT({ id: user.id });

    //Save Jwt again user..
    await this.userRepo.save(user);

    //As per requirement return only JWT..
    return {
      jwt: user.accessToken
    } as LoginResponseDto;
  }

  /**
   * Local method to password verification
   * @param plainTextPassword
   * @param hashedPassword
   */
  public async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
  }


  /**
   * Method to get logged in user..
   * @param userId
   */
  public async getLoggedInUser(userId: number): Promise<DeepPartial<User>> {
    return await this.getUserById(userId);
  }

  /**
   * Method for signing JWT..
   * @param payload
   */
  public async generateJWT(payload: Object) {
    return this.jwtService.sign(payload);
  }

  /**
   * Method to get user by ID.
   * @param userId
   */
  async getUserById(userId: number): Promise<User> {
    const user: User = await this.userRepo.findOne({
      where: {
        id: userId
      },
      select: [
        nameof<User>('id'),
        nameof<User>('email')
      ]
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID: ${userId} NOT Found! `
      );
    }
    return user;
  }

  /**
   * Method to get user by email.
   * @param email
   */
  async getUserByEmail(email: string): Promise<User> {
    const user: User = await this.userRepo.findOne({
      where: {
        email: email.toLowerCase()
      }
    });

    if (!user) {
      throw new NotFoundException(
        `User with email: ${email} NOT Found! `
      );
    }
    return user;
  }
}
