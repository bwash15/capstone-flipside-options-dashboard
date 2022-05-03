import { date, number } from 'joi';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userNoteSchema = new Schema({
  noteTitle:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  
});