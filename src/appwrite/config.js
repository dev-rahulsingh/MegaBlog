import { Client, Databases, ID, Query, Storage } from "appwrite";
import confi from "../Config/config";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(confi.appwriteUrl)
      .setProject(confi.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //create post
  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      await this.databases.createDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug,
        { title, content, featureImage, status, userId }
      );
    } catch (error) {
      console.log("Apprwrite services:: CreatePost :: error", error);
    }
  }
  // update post
  async updatePost(slug, { title, content, featureImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("Apprwrite services:: updatePost :: error", error);
    }
  }

  // delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Apprwrite services:: deletePost :: error", error);
      return false;
    }
  }

  // get document
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Apprwrite services:: getPost :: error", error);
      return false;
    }
  }

  // writing quering to filter data
  async getposts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Apprwrite services:: getposts :: error", error);
      return false;
    }
  }

  //file upload methods
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        confi.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Apprwrite services:: uploadFile :: error", error);
      return false;
    }
  }

  // files delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(confi.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Apprwrite services:: deleteFile :: error", error);
      return file;
    }
  }

  // get file preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(confi.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
