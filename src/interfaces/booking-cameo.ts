import { IPerformer } from './performer'
import { IUser } from './user'

export interface IBooking {
  _id: string;

  userId: string;

  userInfo: IUser;

  performerId: string;

  performerInfo: IPerformer;

  performerNote: string;

  price: number;

  status: string;

  releaseDate: Date;

  createdAt: Date;

  updatedAt: Date;

  releaseFileId: string;

  releaseFile: {
    url: string;
    thumbnails: string[];
    _id: string;
  };

  attachedFileId: string;

  attachedFile: {
    url: string;
    thumbnails: string[];
    _id: string;
  };

  releasedAt: Date;

  occasionType: string;

  questions: IQuestion[];

  recipientSource: string;

  recipient: {
    name: String,
    pronouns: String
  };

  sender: {
    name: String,
    pronouns: String
  }
}

export interface IQuestion {
  key: string;
  answer: string;
}
