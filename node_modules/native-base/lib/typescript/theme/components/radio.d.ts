declare const _default: {
    baseStyle: (props: Record<string, any>) => {
        borderWidth: number;
        borderRadius: string;
        p: number;
        _light: {
            bg: string;
            borderColor: string;
            _checked: {
                borderColor: string;
                _icon: {
                    color: string;
                };
                _hover: {
                    borderColor: string;
                    _icon: {
                        color: string;
                    };
                    _disabled: {
                        borderColor: string;
                        _icon: {
                            color: string;
                        };
                    };
                };
                _pressed: {
                    borderColor: string;
                    _icon: {
                        color: string;
                    };
                };
            };
            _hover: {
                borderColor: string;
                _disabled: {
                    borderColor: string;
                };
            };
            _pressed: {
                borderColor: string;
            };
            _invalid: {
                borderColor: string;
            };
        };
        _dark: {
            bg: string;
            borderColor: string;
            _checked: {
                borderColor: string;
                _icon: {
                    color: string;
                };
                _hover: {
                    borderColor: string;
                    _icon: {
                        color: string;
                    };
                    _disabled: {
                        borderColor: string;
                        _icon: {
                            color: string;
                        };
                    };
                };
                _pressed: {
                    borderColor: string;
                    _icon: {
                        color: string;
                    };
                };
            };
            _hover: {
                borderColor: string;
                _disabled: {
                    borderColor: string;
                };
            };
            _pressed: {
                borderColor: string;
            };
            _invalid: {
                borderColor: string;
            };
        };
        _stack: {
            direction: string;
            alignItems: string;
            space: number;
            _web: {
                cursor: string;
            };
        };
        _disabled: {
            opacity: string;
            _interactionBox: {
                bg: string;
            };
            _icon: {
                bg: string;
            };
            _stack: {
                opacity: string;
            };
        };
        _focus: {
            _interactionBox: {
                bg: string;
                p: string;
            };
        };
        _focusVisible: {
            _interactionBox: {
                bg: string;
                p: string;
            };
        };
        _interactionBox: {
            borderRadius: string;
            position: string;
            zIndex: number;
            _web: {
                transition: string;
                pointerEvents: string;
            };
        };
    };
    sizes: {
        lg: {
            _icon: {
                size: number;
            };
            _interactionBox: {
                size: number;
            };
            _text: {
                fontSize: string;
            };
        };
        md: {
            _icon: {
                size: number;
            };
            _interactionBox: {
                size: number;
            };
            _text: {
                fontSize: string;
            };
        };
        sm: {
            _icon: {
                size: number;
            };
            _text: {
                fontSize: string;
            };
        };
    };
    defaultProps: {
        defaultIsChecked: boolean;
        size: string;
        colorScheme: string;
    };
};
export default _default;
