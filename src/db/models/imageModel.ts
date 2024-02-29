import { ImageDocument } from '@/TypeInterfaces/TypeInterfaces';
import mongoose, { Schema } from 'mongoose';

const imageSchema = new Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

const ImageModel = mongoose.models.Image || mongoose.model<ImageDocument>('Image', imageSchema);

export default ImageModel;
