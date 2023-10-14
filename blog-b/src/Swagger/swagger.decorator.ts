import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
export class SwaggerResponse {
  status: number;
  description: string;
  type?: any;
  isArray?: boolean;
}

export class SwaggerMetadataDto {
  title?: string;
  description?: string;
  responses?: SwaggerResponse[];
  requestBody?: {
    description?: string;
    type: any;
    isArray?: boolean;
  };
}

export function SwaggerDecorator(metadata: SwaggerMetadataDto) {
  const decorators = [];

  if (metadata.description) {
    decorators.push(ApiOperation({ description: metadata.description }));
  }
  if (metadata.requestBody && metadata.requestBody.type) {
    decorators.push(
      ApiBody({
        description: metadata.requestBody.description || '',
        type: metadata.requestBody.type,
        isArray: metadata.requestBody.isArray || false,
      }),
    );
  }

  if (metadata.responses && metadata.responses.length) {
    for (const response of metadata.responses) {
      decorators.push(
        ApiResponse({
          status: response.status,
          description: response.description,
          type: response.type || String,
          isArray: response.isArray || false,
        }),
      );
    }
  }

  return applyDecorators(...decorators);
}
