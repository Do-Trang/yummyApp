declare const _default: {
    variants: {
        solid: (props: Record<string, any>) => {
            _text: {
                color: string;
            };
            _icon: {
                color: string;
            };
            bg: string;
            borderWidth: string;
            borderColor: string;
            borderRadius: string;
        };
        subtle: (props: Record<string, any>) => {
            _text: {
                color: string;
            };
            _icon: {
                color: string;
            };
            _light: {
                bg: string;
            };
            _dark: {
                bg: string;
            };
            borderWidth: string;
            borderRadius: string;
            borderColor: string;
        };
        outline: (props: Record<string, any>) => {
            _light: {
                _text: {
                    color: string;
                };
                _icon: {
                    color: string;
                };
                borderColor: string;
            };
            _dark: {
                _text: {
                    color: string;
                };
                _icon: {
                    color: string;
                };
                borderColor: string;
            };
            borderRadius: string;
            borderWidth: string;
        };
    };
    baseStyle: {
        _text: {
            fontWeight: string;
        };
        alignItems: string;
        justifyContent: string;
        flexDirection: string;
        display: string;
    };
    sizes: {
        sm: {
            minH: number;
            minW: number;
            _text: {
                fontSize: string;
            };
            p: number;
            borderRadius: string;
        };
        md: {
            minH: number;
            minW: number;
            _text: {
                fontSize: string;
            };
            borderRadius: string;
            p: number;
        };
        lg: {
            minH: number;
            minW: number;
            _text: {
                fontSize: string;
            };
            borderRadius: string;
            p: number;
        };
    };
    defaultProps: {
        size: string;
        variant: string;
        colorScheme: string;
    };
};
export default _default;
