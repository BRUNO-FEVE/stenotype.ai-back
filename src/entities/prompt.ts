import { ObjectId } from "mongodb";

interface PromptProps {
  id: ObjectId;
  title: string;
  template: string;
}

export class Prompt {
  private props: PromptProps;

  constructor(props: PromptProps) {
    const idValidationResponse = Prompt.validateID(props.id);
    if (!idValidationResponse) {
      throw new Error("Invalid ID: " + props.id);
    }

    const titleValiadationResponse = Prompt.validateTitle(props.title);
    if (!titleValiadationResponse) {
      throw new Error("Invalid Title: " + props.title);
    }

    const templateValidationResponse = Prompt.validateTemplate(props.template);
    if (!templateValidationResponse) {
      throw new Error("Invalid Template: " + props.template);
    }

    this.props = props;
  }

  get id(): ObjectId {
    return this.props.id;
  }

  set id(id: ObjectId) {
    const validationResponse = Prompt.validateID(id);
    if (validationResponse) {
      this.props.id = id;
    }
    throw new Error("Invalid ID: " + id);
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    const valiadationResponse = Prompt.validateTitle(title);
    if (valiadationResponse) {
      this.props.title = title;
    }
    throw new Error("Invalid Tille: " + title);
  }

  get template(): string {
    return this.props.template;
  }

  set template(template: string) {
    const validationTemplate = Prompt.validateTemplate(template);
    if (!validationTemplate) {
      this.props.template = template;
    }
    throw new Error("Invalid Template: " + template);
  }

  static validateID(id: ObjectId) {
    const validationResponse = ObjectId.isValid(id);
    return validationResponse;
  }

  static validateTitle(title: string) {
    if (title.length > 3) {
      return true;
    }
    return false;
  }

  static validateTemplate(template: string) {
    if (template.length > 3) {
      return true;
    }
    return false;
  }
}
