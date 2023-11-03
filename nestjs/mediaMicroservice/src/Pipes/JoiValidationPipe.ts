import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {ObjectSchema} from "joi";
import {NotAcceptableJoiError} from "@/Errors/JoiErrors/joierrors";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {
    }

    transform(value: any, metadata: ArgumentMetadata) {
        const {error} = this.schema.validate(value);
        if (error) {
            throw new NotAcceptableJoiError(error.message);
        }
        return value;
    }
}
