import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 50,
  },
  profileHeader: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  cover: {
    width: width,
    height: 200,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 2,
  },
  detailsContainer: {
    marginTop: 80,
  },
  description: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft:5,
    marginTop: 5,
  },
  infoItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15,
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 8,
    marginRight: 10,
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
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'gray',
  },
  divider: {
    height: 1,
    width: width,
    backgroundColor: '#E6E6E6',
    marginTop: 2,
  },
  statsContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  followButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginRight: 15,
  },
  nameAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoContainer: {
    marginTop: 70,
  },
});

export default styles;