import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import axios from 'axios';

const CreateTaskScreen = ({ route, navigation }: any) => {
  const { projectId } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTask = async () => {
    try {
      await axios.post(`http://your-backend-api/projects/${projectId}/tasks`, {
        title,
        description,
        status: 'Todo',
        projectId,
      });
      navigation.goBack(); // Navigate back to project details after successful task creation
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  
  return (
    <View>
      <Text>Create a New Task</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Task Title"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Task Description"
      />
      <Button title="Create Task" onPress={createTask} />
    </View>
  );
};

export default CreateTaskScreen;
