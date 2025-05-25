import { Account, Client, ID } from "appwrite";
import confi from "../Config/config";
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(confi.appwriteUrl)
      .setProject(confi.appwriteProjectId);

    this.account = new Account(this.client);
  }

  //   create account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //   login method
  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // get account
  async getCurrentuser() {
    try {
      return this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  //   logout;
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
