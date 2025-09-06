declare const validators: {
    required: (value: string) => boolean;
    email: (value: string) => boolean;
    url: (value: string) => boolean;
    number: (value: string) => boolean;
    price: (value: string) => boolean;
};
export default validators;
