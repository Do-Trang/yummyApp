export declare const Alert: {
    baseStyle: {
        alignItems: string;
        justifyContent: string;
        p: number;
        space: number;
        borderRadius: string;
    };
    variants: {
        subtle: (props: Record<string, any>) => {
            _light: {
                bg: any;
                _icon: {
                    color: string;
                };
            };
            _dark: {
                bg: any;
                _icon: {
                    color: string;
                };
            };
        };
        solid: (props: Record<string, any>) => {
            _light: {
                bg: any;
            };
            _dark: {
                bg: any;
            };
            _icon: {
                color: string;
            };
        };
        'left-accent': (props: Record<string, any>) => {
            borderLeftWidth: number;
            _light: {
                bg: any;
                _icon: {
                    color: string;
                };
                borderLeftColor: string;
            };
            _dark: {
                bg: any;
                _icon: {
                    color: string;
                };
                borderLeftColor: string;
            };
        };
        'top-accent': (props: Record<string, any>) => {
            borderTopWidth: number;
            _light: {
                bg: any;
                _icon: {
                    color: string;
                };
                borderTopColor: string;
            };
            _dark: {
                bg: any;
                _icon: {
                    color: string;
                };
                borderTopColor: string;
            };
        };
        outline: (props: Record<string, any>) => {
            borderWidth: number;
            _light: {
                _icon: {
                    color: string;
                };
                borderColor: string;
            };
            _dark: {
                _icon: {
                    color: string;
                };
                borderColor: string;
            };
        };
        'outline-light': (props: Record<string, any>) => {
            borderWidth: number;
            _light: {
                _icon: {
                    color: string;
                };
                borderColor: string;
            };
            _dark: {
                _icon: {
                    color: string;
                };
                borderColor: string;
            };
        };
    };
    defaultProps: {
        colorScheme: string;
        variant: string;
    };
};
export declare const AlertIcon: {
    baseStyle: {
        size: number;
    };
};
