import Output from "@/DTO/output";

export class RestorationBodyDto {
    email: string;
}

export class RestorationOutputDto extends Output {
    payload: {
        confirmationToken: string;
    };
}
