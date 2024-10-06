declare function variantGhost({ colorScheme }: Record<string, any>): {
    _light: {
        _text: {
            color: string;
        };
        _icon: {
            color: string;
        };
        _spinner: {
            color: string;
        };
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
    _dark: {
        _text: {
            color: string;
        };
        _icon: {
            color: string;
        };
        _spinner: {
            color: string;
        };
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
};
declare function variantOutline({ colorScheme }: Record<string, any>): {
    borderWidth: string;
    _light: {
        borderColor: string;
        _text: {
            color: string;
        };
        _icon: {
            color: string;
        };
        _spinner: {
            color: string;
        };
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
    _dark: {
        borderColor: string;
        _text: {
            color: string;
        };
        _icon: {
            color: string;
        };
        _spinner: {
            color: string;
        };
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
};
declare function variantSolid({ colorScheme }: Record<string, any>): {
    _text: {
        color: string;
    };
    _icon: {
        color: string;
    };
    _spinner: {
        color: string;
    };
    _light: {
        bg: string;
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
    _dark: {
        bg: string;
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
};
declare function variantSubtle({ colorScheme }: Record<string, any>): {
    _text: {
        color: string;
    };
    _icon: {
        color: string;
    };
    _spinner: {
        color: string;
    };
    _light: {
        bg: string;
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
    _dark: {
        bg: string;
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
};
declare function variantLink({ colorScheme }: Record<string, any>): {
    _icon: {
        color: string;
    };
    _spinner: {
        color: string;
    };
    _hover: {
        _text: {
            textDecorationLine: string;
        };
    };
    _light: {
        _text: {
            color: string;
        };
        _pressed: {
            _text: {
                color: string;
            };
        };
    };
    _dark: {
        _text: {
            color: string;
        };
        _pressed: {
            _text: {
                color: string;
            };
        };
    };
};
export declare const ButtonGroup: {
    baseStyle: {
        direction: string;
    };
    defaultProps: {
        space: number;
    };
};
declare const _default: {
    baseStyle: (props: Record<string, any>) => {
        borderRadius: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        _web: {
            _disabled: {
                cursor: string;
            };
            _loading: {
                cursor: string;
            };
            cursor: string;
            userSelect: string;
        };
        _focusVisible: {
            _web: {
                outlineWidth: string;
                style: any;
            };
        };
        _stack: {
            space: string;
            alignItems: string;
        };
        _loading: {
            opacity: string;
        };
        _disabled: {
            opacity: string;
        };
        _spinner: {
            size: string;
            focusable: boolean;
        };
    };
    variants: {
        ghost: typeof variantGhost;
        outline: typeof variantOutline;
        solid: typeof variantSolid;
        subtle: typeof variantSubtle;
        link: typeof variantLink;
        unstyled: {};
    };
    sizes: {
        lg: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
            _icon: {
                size: string;
            };
        };
        md: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
            _icon: {
                size: string;
            };
        };
        sm: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
            _icon: {
                size: string;
            };
        };
        xs: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
            _icon: {
                size: string;
            };
        };
    };
    defaultProps: {
        variant: string;
        size: string;
        colorScheme: string;
    };
};
export default _default;
