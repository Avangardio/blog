import {ArgumentMetadata, Injectable, NotAcceptableException, PipeTransform,} from '@nestjs/common';
import {ObjectSchema, StringSchema} from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema | StringSchema) {
    }

    transform(value: any, metadata: ArgumentMetadata) {
        const {error} = this.schema.validate(value);
        if (error) {
            throw new NotAcceptableException(error.message);
        }
        return value;
    }
}

//todo сделать под фастифай
