declare const _default: {
    baseStyle: {
        _text: {
            fontFamily: string;
            fontSize: string;
        };
        borderRadius: string;
        px: number;
        py: number;
    };
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
    defaultProps: {
        variant: string;
        colorScheme: string;
        size: string;
    };
};
export default _default;
