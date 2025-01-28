import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, TouchableOpacity } from 'react-native';

// Define TypeScript interface for task data
interface TaskProps {
    route:any;
    navigation:any;
}


// A utility function to get a readable status
const getStatusLabel = (status: 'in_progress' | 'done' | 'todo') => {
  switch (status) {
    case 'in_progress':
      return 'In Progress';
    case 'done':
      return 'done';
    case 'todo':
      return 'todo';
    default:    
      return '';
  }
};

// A utility function to get priority label
const getPriorityLabel = (priority: 1 | 2 | 3) => {
  switch (priority) {
    case 1:
      return 'Low';
    case 2:
      return 'Medium';
    case 3:
      return 'High';
    default:
      return '';
  }
};

const TaskDetailsScreen: React.FC<TaskProps> = ({
    route,navigation
}) => {
  // Format the dates
  const {item} = route.params;

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{item?.tile}</Text>
      <Text style={styles.description}>{item?.description}</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Status: </Text>{getStatusLabel(item?.status)}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Priority: </Text>{getPriorityLabel(item?.priority)}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Due Date: </Text>{item.due_date}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Created At: </Text>{item.created_at}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Last Updated: </Text>{item.updated_at}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert(`Task ID: ${item.id}`)}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TaskDetailsScreen;
