type FieldRule = {
    min?: number;
    max?: number;
    regex?: RegExp;
    required?: boolean;
};

const fieldRules: { [key: string]: FieldRule } = {
    email: {
        min: 10,
        max: 13,
        regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        required: true,
    },
    password: {
        required: true,
    },
    language: {
        required: true,
    },
    name: {
        required: true,
        min: 5,
        max: 20,
    },
    confirmationToken: {
        required: true,
        regex: /^[a-zA-Z0-9]+$/,
    },
    emailCode: {
        required: true,
        regex: /^[0-9]+$/,
    },
};

function generateWrongValueForRule(rule: FieldRule): any {
    if (rule.required) {
        return '';
    }
    if (rule.min) {
        return 'a'.repeat(rule.min - 1);
    }
    if (rule.max) {
        return 'a'.repeat(rule.max + 1);
    }
    if (rule.regex) {
        return 'wrongformat';
    }
    return 'defaultwrongvalue';
}

export default function generateWrongField(
    fieldName: string,
    count = 1,
): string[] {
    const rule = fieldRules[fieldName];
    if (!rule) throw new Error(`No rule found for field: ${fieldName}`);

    const wrongValues: string[] = [];
    for (let i = 0; i < count; i++) {
        wrongValues.push(generateWrongValueForRule(rule));
    }

    return wrongValues;
}
