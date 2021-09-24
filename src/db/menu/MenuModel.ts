import mongoose, { Schema } from 'mongoose';

export interface IMenu {
  _id: string;
  link: string;
  menu_name: string;
  price: number;
  beans: string;
  cafe_id: number;
  title: [string];
}

const menuSchema = new Schema({
  link: String,
  menu_name: String,
  price: Number,
  beans: String,
});

const menuListSchema = new Schema({
  cafe_id: Number,
  menu: [menuSchema],
  title: [String],
});

export const MenuModel = mongoose.model('menu', menuListSchema, 'menus');
