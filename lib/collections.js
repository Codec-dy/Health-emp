import { Mongo } from "meteor/mongo";

export const Accounts = new Mongo.Collection("accounts");
export const Msgs = new Mongo.Collection("messages");
export const Evts = new Mongo.Collection("events");
export const Admin = new Mongo.Collection("admin");