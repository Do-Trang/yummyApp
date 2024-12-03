import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputAddress: {
        height: 40,
        width: '100%',
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 35,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        position: "relative",
    },
    icon: {
        position: "absolute",
        left: 5,
        top: 8,
    },
    sliderContainer: {
        marginVertical: 0,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    sliderRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    slider: {
        flex: 1,
        height: 40,
    },
    value: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#6600CC",
    },
    ratingContainer: {
        marginTop: 20,
    },
    addButton: {
        backgroundColor: "#6600CC",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: "center",  
        alignItems: "center",      
        height: 40,              
    },
    addButtonText: {
        color: "#fff",         
        fontWeight: "bold",
        fontSize: 16,       
    },
    tagInputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gray",
        paddingLeft: 35,
    },
    tagListContainer: {
        flexDirection: 'row',        
        flexWrap: 'wrap',             
        marginTop: 10,                
      },
    tag: {
        backgroundColor: '#E0E0E0',   
        borderRadius: 20,            
        paddingVertical: 5,           
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 5,
        fontSize: 14,
        color: '#333',
    },
    removeTagButton: {
        position: 'absolute',
        top: -5,
        right: -5,
    },
});

export default styles;