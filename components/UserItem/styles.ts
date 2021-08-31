import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    badgeContainer: {
        backgroundColor: '#3872E9',
        width: 18,
        height: 18,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 50,
        top: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
    rightContainer: {
        flex: 1,
        margin: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 10,
        color: 'grey',
    }
});

export default styles;