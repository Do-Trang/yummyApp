declare function roundedStyle(props: Record<string, any>): {
    borderRadius: string;
    borderWidth: string;
    _focus: {
        bg: string;
    };
};
declare function outlineStyle(props: Record<string, any>): {
    borderWidth: string;
    _focus: {
        bg: string;
    };
};
declare function filledStyle(props: Record<string, any>): {
    borderWidth: string;
    _focus: {
        bg: string;
    };
    _hover: {
        borderWidth: string;
        _disabled: {
            borderWidth: number;
        };
    };
    _light: {
        bg: string;
        borderColor: string;
    };
    _dark: {
        bg: string;
        borderColor: string;
    };
};
declare function unstyledStyle(): {
    borderWidth: string;
    _light: {
        _focus: {
            placeholderTextColor: string;
        };
    };
    _dark: {
        _focus: {
            placeholderTextColor: string;
        };
    };
    _focus: {
        bg: string;
    };
    _invalid: {
        _stack: {
            style: {
                outlineWidth: number;
            };
        };
    };
    _stack: {
        _focus: {
            style: {
                outlineWidth: string;
            };
        };
    };
};
declare function underlinedStyle(props: Record<string, any>): {
    borderWidth: string;
    pl: string;
    borderBottomWidth: string;
    _light: {
        _focus: {
            _stack: {
                style: {
                    outlineWidth: string;
                    boxShadow: string;
                };
            };
        };
        _invalid: {
            _stack: {
                style: {
                    outlineWidth: number;
                    boxShadow: string;
                };
            };
        };
    };
    _dark: {
        _focus: {
            _stack: {
                style: {
                    outlineWidth: string;
                    boxShadow: string;
                };
            };
        };
        _invalid: {
            _stack: {
                style: {
                    outlineWidth: number;
                    boxShadow: string;
                };
            };
        };
    };
    borderRadius: number;
};
export declare const Input: {
    baseStyle: (props: any) => {
        fontFamily: string;
        py: string;
        px: string;
        borderRadius: string;
        overflow: string;
        _disabled: {
            opacity: string;
            _web: {
                disabled: boolean;
                cursor: string;
            };
        };
        _web: {
            outlineWidth: string;
            overflow: string;
            lineHeight: string;
            style: {
                outline: string;
            };
            cursor: string;
        };
        _input: {
            bg: string;
            flex: number;
            w: string;
        };
        _light: {
            placeholderTextColor: string;
            color: string;
            borderColor: string;
            _hover: {
                borderColor: string;
            };
            _focus: {
                borderColor: string;
                _hover: {
                    borderColor: string;
                };
                _stack: {
                    style: {
                        outlineWidth: string;
                        outlineColor: string;
                        outlineStyle: string;
                    };
                };
            };
            _invalid: {
                borderColor: string;
                _hover: {
                    borderColor: string;
                };
                _stack: {
                    style: {
                        outlineWidth: string;
                        outlineColor: string;
                        outlineStyle: string;
                    };
                };
            };
            _ios: {
                selectionColor: string;
            };
            _android: {
                selectionColor: string;
            };
            _disabled: {
                placeholderTextColor: string;
                _hover: {
                    borderColor: string;
                };
            };
            _stack: {
                flexDirection: string;
                alignItems: string;
                overflow: string;
            };
        };
        _dark: {
            placeholderTextColor: string;
            color: string;
            borderColor: string;
            _hover: {
                borderColor: string;
            };
            _focus: {
                borderColor: string;
                _hover: {
                    borderColor: string;
                };
                _stack: {
                    style: {
                        outlineWidth: string;
                        outlineColor: string;
                        outlineStyle: string;
                    };
                };
            };
            _invalid: {
                borderColor: string;
                _stack: {
                    style: {
                        outlineWidth: string;
                        outlineColor: string;
                        outlineStyle: string;
                    };
                };
                _hover: {
                    borderColor: string;
                };
            };
            _ios: {
                selectionColor: string;
            };
            _android: {
                selectionColor: string;
            };
            _disabled: {
                placeholderTextColor: string;
                _hover: {
                    borderColor: string;
                };
            };
            _stack: {
                flexDirection: string;
                alignItems: string;
                overflow: string;
            };
        };
    };
    defaultProps: {
        size: string;
        variant: string;
    };
    variants: {
        outline: typeof outlineStyle;
        underlined: typeof underlinedStyle;
        rounded: typeof roundedStyle;
        filled: typeof filledStyle;
        unstyled: typeof unstyledStyle;
    };
    sizes: {
        '2xl': {
            fontSize: string;
        };
        xl: {
            fontSize: string;
        };
        lg: {
            fontSize: string;
        };
        md: {
            fontSize: string;
        };
        sm: {
            fontSize: string;
        };
        xs: {
            fontSize: string;
        };
    };
};
declare const _default: {};
export default _default;
