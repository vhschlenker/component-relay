import { Environment } from './snjsTypes';
declare global {
    interface Window {
        msCrypto: unknown;
    }
}
export declare const generateUuid: () => string;
export declare const isValidJsonString: (str: unknown) => boolean;
export declare const environmentToString: (environment: Environment) => string;
