import React,{useState,useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet, Pressable } from 'react-native';

// Define the types for the navigation stack
type RootStackParamList = {
  ProjectDetails: { projectId: number };
  CreateTask: { projectId: number };
  route:any;
  navigation:any
};

const ProjectDetailsScreen: React.FC<RootStackParamList> = ({ route, navigation }) => {
  const { project } = route.params;

  const [loading,setLoading]  = useState(true);
  const [error,setError] = useState();

  //if (loading) return <Text>Loading...</Text>;
  if (error ) return <Text>Error: {error}</Text>;
    
  return (
    <View style={styles.container}>
      <FlatList
        data={project?.tasks || []}
        renderItem={({ item }) => (
          <Pressable style={styles.taskItem} onPress={()=> navigation.navigate("TaskDetail",{item:item})}>
            <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text>Due: {item.due_date}</Text>
                </View>
                <Text>Status: {item.status}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('CreateTask', { project })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ProjectDetailsScreen;
