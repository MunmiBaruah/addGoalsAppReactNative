import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, {text: enteredGoalText, id: Math.random().toString()}]);
    setModalIsVisible(false);
  }

  function onDeleteItem(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar style={"light"}> </StatusBar>
      <View style={styles.appContainer}>
        {!modalIsVisible && <Button title='Add New Goal' color={"#a065ec"} onPress={startAddGoalHandler}/>}
        {modalIsVisible && <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>}
        {!modalIsVisible && <View style={styles.goalsContainer}>
          <FlatList data={courseGoals}
            renderItem={(itemData) => {
              return (
              <GoalItem text={itemData.item.text} deleteItem={onDeleteItem} id={itemData.item.id} />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false} 
          />
        </View>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
 
  goalsContainer: {
    flex: 5
  },
});
 