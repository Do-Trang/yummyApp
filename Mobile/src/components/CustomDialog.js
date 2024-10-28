import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import colors from "../constants/colors";
import GlobalStyle from "../styles/GlobalStyle";
import { CustomButtonText } from "./CustomButton";
import { connect } from "react-redux";
import MiniSearchbox from "./MiniSearchbox";
import { createIngredient, createTag } from '../redux/actions';

export function FilterOutDialog(props) {
    const [data, setData] = useState([...props.data]);

    React.useEffect(() => {
        props.setNewData(data);
    }, [data])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.open}
                onRequestClose={() => {
                    props.onCancel();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modal, { height: '50%', }]}>
                        <Text style={[GlobalStyle.Title]}>
                            {props.heading}
                        </Text>
                        <ScrollView>
                            {data.map((e) => {
                                return (
                                    <Chip
                                        key={e.id}
                                        mode='outlined'
                                        style={styles.chip}
                                        textStyle={GlobalStyle.CustomFont}
                                        onClose={() => {
                                            const fruits = data.filter((x) => x.id !== e.id);
                                            setData(fruits);
                                        }}
                                    >{e.title}</Chip>
                                )
                            })}
                        </ScrollView>
                        <View style={styles.bottomTab}>

                            <CustomButtonText
                                onPress={() => props.onCancel()}
                                content={props.Cancel}
                                colors={[colors.dislike1, colors.dislike2]}
                                padding={4}
                            />
                            <CustomButtonText
                                onPress={() => props.onOK()}
                                content={props.OK}
                                colors={[colors.like1, colors.like2]}
                                padding={4}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const ingredientDialog = (props) => {
    const [newFood, setNewFood] = useState({ ...props.newFood });

    React.useEffect(() => {
        props.setNewFood(newFood);
    }, [newFood])

    function _onAddIngredientNewFood(newItem) {
        if (
            !newFood.ingredients.some(item => item.title.toLowerCase() === newItem)
        ) {
            const newItemObj = props.ingredients.data.find(
                obj => obj.title.toLowerCase() === newItem,
            );
            if (newItemObj) {
                setNewFood({
                    ...newFood,
                    ingredients: [...newFood.ingredients, newItemObj],
                });
            }
        }
    }

    function _onRemoveIngredient(removeItem) {
        const fruits = newFood.ingredients.filter(
            item => item.title !== removeItem,
        );
        setNewFood({
            ...newFood,
            ingredients: [...fruits],
        });
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.open}
                onRequestClose={() => {
                    props.onCancel();
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modal}>
                        <ScrollView style={{ height: '50%' }}>
                            <MiniSearchbox
                                title="Nguyên liệu"
                                list={props.ingredients.data}
                                selected={newFood.ingredients}
                                onAddItem={_onAddIngredientNewFood}
                                onRemoveItem={_onRemoveIngredient}
                                createNew={false}
                            />
                        </ScrollView>
                        <CustomButtonText
                            onPress={() => props.onCancel()}
                            content={"Xonq"}
                            colors={[colors.dislike1, colors.dislike2, colors.dislike1, colors.dislike2]}
                            padding={4}
                        />
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const tagDialog = (props) => {
    const [newFood, setNewFood] = useState({ ...props.newFood });

    React.useEffect(() => {
        props.setNewFood(newFood);
    }, [newFood])

    function _onAddTagNewFood(newItem) {
        if (!newFood.tags.some(item => item.title.toLowerCase() === newItem)) {
            const newItemObj = props.tags.data.find(
                obj => obj.title.toLowerCase() === newItem,
            );
            if (newItemObj) {
                setNewFood({
                    ...newFood,
                    tags: [...newFood.tags, newItemObj],
                });
            }
        }
    }

    function _onRemoveTag(removeItem) {
        const fruits = newFood.tags.filter(item => item.title !== removeItem);
        setNewFood({
            ...newFood,
            tags: [...fruits],
        });
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.open}
                onRequestClose={() => {
                    props.onCancel();
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modal}>
                        <ScrollView style={{ height: '50%' }}>
                            <MiniSearchbox
                                title="Thẻ tags"
                                list={props.tags.data}
                                selected={newFood.tags}
                                onAddItem={_onAddTagNewFood}
                                onRemoveItem={_onRemoveTag}
                                createNew={false}
                            />
                        </ScrollView>
                        <CustomButtonText
                            onPress={() => props.onCancel()}
                            content={"Xonq"}
                            colors={[colors.dislike1, colors.dislike2, colors.dislike1, colors.dislike2]}
                            padding={4}
                        />
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const CustomDialog = (props) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.open}
                onRequestClose={() => {
                    props.onCancel();
                }}
            >
                <View style={styles.centeredView}
                >
                    <View style={styles.modal}>
                        <Text style={[GlobalStyle.Title]}>
                            {props.heading}
                        </Text>
                        <Text style={[GlobalStyle.CustomFont, styles.content]}>
                            {props.content}
                        </Text>
                        <View style={styles.bottomTab}>

                            <CustomButtonText
                                onPress={() => props.onCancel()}
                                content={props.Cancel}
                                colors={[colors.dislike1, colors.dislike2]}
                                padding={4}
                            />
                            <CustomButtonText
                                onPress={() => props.onOK()}
                                content={props.OK}
                                colors={[colors.like1, colors.like2]}
                                padding={4}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export function LikeDialog(props) {
    return (
        <CustomDialog
            open={props.open}
            onCancel={props.onCancel}
            onOK={props.onOK}
            heading={'CHÚC MỪNG'}
            content={props.content}
            Cancel={'Hừm...'}
            OK={'Géc gô !!'}
        />
    );
}

export function DislikeDialog(props) {
    return (
        <CustomDialog
            open={props.open}
            onCancel={props.onCancel}
            onOK={props.onOK}
            heading={'CHÚ Ý'}
            content={props.content}
            Cancel={'Hừm...'}
            OK={'Được !!'}
        />
    );
}

export function ConfirmDialog(props) {
    return (
        <CustomDialog
            open={props.open}
            onCancel={props.onCancel}
            onOK={props.onOK}
            heading={props.heading}
            content={props.content}
            Cancel={'Hừm...'}
            OK={'Lưu vô !'}
        />
    );
}

const styles = StyleSheet.create({
    centeredView: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary80,
        zIndex: 3,
        position: 'absolute',
        padding: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        padding: 10,
        borderColor: colors.primary,
        borderRadius: 30,
        borderWidth: 1,
        width: '70%',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomTab: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    chip: {
        overflow: 'visible',
        marginVertical: 4,
    }
});

export default CustomDialog;

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    tags: state.tags,
});

export const TagDialog = connect(mapStateToProps, {
    createTag,
})(tagDialog);

export const IngredientDialog = connect(mapStateToProps, {
    createIngredient,
})(ingredientDialog);