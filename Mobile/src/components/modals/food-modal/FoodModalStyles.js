import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triggerText: {
    fontSize: 18,
    color: 'blue',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  bottomPad: {
    paddingBottom: '14%',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
  },
  section: {
    paddingBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: 'EEEEEE',
    paddingTop: 10,
  },
});

export default styles;