declare function variantSolid(props: Record<string, any>): {
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
declare function variantSubtle(props: Record<string, any>): {
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
declare function variantOutline(props: Record<string, any>): {
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
declare const _default: {
    baseStyle: {
        flexDirection: string;
        space: number;
        px: string;
        py: string;
        alignItems: string;
        _text: {
            fontSize: string;
            fontWeight: string;
        };
    };
    variants: {
        solid: typeof variantSolid;
        subtle: typeof variantSubtle;
        outline: typeof variantOutline;
    };
    defaultProps: {
        variant: string;
        colorScheme: string;
        size: string;
    };
};
export default _default;
