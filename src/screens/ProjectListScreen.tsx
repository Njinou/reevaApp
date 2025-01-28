import React from 'react';
import { FlatList, Text, View, Button,SafeAreaView,Pressable } from 'react-native';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

interface Task {
    due_date: string;
    id: number;
    title: string;
    description: string;
    status: string;
    priority: number;
    created_at: string;
    updated_at: string;
    project: number;
    assignee: number;
  }
  
const fetchProjects = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/projects/`, {
  auth: {
    username: process.env.REACT_APP_API_USERNAME,
    password: process.env.REACT_APP_API_PASSWORD,
  },
});

  return response.data;
};

const ProjectListScreen = ({ navigation }: any) => {
  const { data, error, isLoading } = useQuery('projects', fetchProjects);

  const isTaskOverdue = (task: Task): boolean => {
    const today = new Date();
    const dueDate = new Date(task.due_date); 
    return dueDate < today; 
  };

  const groundColor:any = {
    "active" :"green", 
    "on_hold" :"yellow",
    "completed": "red"
  }
  const overdueTask = (task: Task[]): number => {
    let overTask = task.filter( (tas:Task) => isTaskOverdue(tas));
    return overTask.length;
  }
  
  const taskCompleted = (task: Task[]): number => {
    if (!task || task.length === 0) return 0;
    let completed = task.filter((task: Task) => task.status === "done");
    return completed.length;
  }


  if (isLoading) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable style={{flex:1,borderWidth:1,borderColor:'gray',justifyContent:'space-between',backgroundColor:groundColor[item.status.toLowerCase()]}}  
          onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
                <Text>{item.title}</Text>
                <Text>{item.status}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
                <Text> Completion Rate {(100 * taskCompleted(item.tasks)/ (item?.tasks.length || 1)).toFixed(2)}%</Text>
                <Text style={{color: overdueTask(item?.tasks)> 0? 'red':'black'}}> Task overdue  {overdueTask(item?.tasks)|| 0}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default ProjectListScreen;
