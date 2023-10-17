import { ObjectId } from "mongodb";

export interface VideoProps {
  id?: string;
  name: string;
  path: string;
  transcription: string;
  createAt?: Date;
}

export interface JsonProps {
  id: string;
  name: string;
  path: string;
  transcription: string;
  createAt: Date;
}

export class Video {
  private props: VideoProps;

  constructor(props: VideoProps) {
    this.props = {} as VideoProps;
    const { id, name, path, transcription, createAt } = props;

    const isAOldVideo = !!id;
    if (!isAOldVideo) {
      this.props.id = new ObjectId().toString();
    } else {
      const validationOfExistingId = Video.validateObjectId(id);
      if (!validationOfExistingId) {
        throw new Error("Invalid ID: " + id);
      }
      this.props.id = id;
    }

    const nameValidationResponse = Video.validateName(name);
    if (!nameValidationResponse) {
      throw new Error("Invalid Name: " + name);
    }
    this.props.name = name;

    const pathValidationResponse = Video.validatePath(path);
    if (!pathValidationResponse) {
      throw new Error("Invalid Path: " + path);
    }
    this.props.path = path;

    const transcriptionValidationResponse =
      Video.validateTranscription(transcription);
    if (!transcriptionValidationResponse) {
      throw new Error("Invalid Transcription: " + props.transcription);
    }
    this.props.transcription = transcription;

    if (!createAt) {
      this.props.createAt = new Date();
    } else {
      this.props.createAt = createAt;
    }
  }

  get id(): string {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get path() {
    return this.props.path;
  }

  get trasncription() {
    return this.props.transcription;
  }

  get createAt() {
    return this.props.createAt;
  }

  set id(id: string) {
    const validationResponse = Video.validateObjectId(id);
    if (validationResponse) {
      this.props.id = id;
    }
    throw new Error("Invalid ID: " + id);
  }

  set name(name: string) {
    const valiadationResponse = true;
    if (valiadationResponse) {
      this.props.name = name;
    }
    throw new Error("Invalid Name: " + name);
  }

  set path(path: string) {
    // const validationResponse = Video.validatePath(path)
    if (path) {
      this.props.path = path;
    }
    throw new Error("Invalid Path: " + path);
  }

  set trasncription(transcription: string) {
    const valiadationResponse = true;
    if (valiadationResponse) {
      this.props.transcription = transcription;
    }
    throw new Error("Invalid Transcription: " + transcription);
  }

  set createAt(createAt: Date) {
    this.props.createAt = createAt;
  }

  static validateObjectId(id: string) {
    const validationResponse = ObjectId.isValid(id);
    return validationResponse;
  }

  static validateName(name: string) {
    // eslint-disable-next-line no-useless-escape
    const mp3Validation = name.match(".mp3$");
    if (!mp3Validation) {
      return false;
    }
    return true;
  }

  static validatePath(path: string) {
    // eslint-disable-next-line no-useless-escape
    const mp3Validation = path.match(".mp3$");
    const splitedpath = path.split("/");
    const savedInTmpValidation = !!splitedpath.includes("tmp");
    if (!mp3Validation) {
      return false;
    } else if (!savedInTmpValidation) {
      return false;
    }
    return true;
  }

  static validateTranscription(transcription: string) {
    const transcriptionCompleted = transcription;
    if (transcriptionCompleted.length > 3) {
      return true;
    }
    return false;
  }

  static toJson(video: Video) {
    return {
      id: video.id,
      name: video.props.name,
      path: video.props.path,
      transcription: video.props.transcription,
      createAt: video.props.createAt,
    };
  }

  static fromJson(json: JsonProps): Video {
    return new Video({
      id: json.id,
      name: json.name,
      path: json.path,
      transcription: json.transcription,
      createAt: json.createAt,
    });
  }
}
