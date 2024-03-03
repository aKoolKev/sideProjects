#include "ToDoList.hpp"

using namespace std;

//print out the ToDoList
void 
ToDoList::print()
{
    for(Task task: _taskList)
        task.printTask();
}

//insert a Task to the list
void
ToDoList::insert(Task toInsert)
{
    _taskList.push_back(toInsert);
}

//remove a Task in the list
void 
ToDoList::remove(Task toRemove)
{
    //need to find by a specified parameter
}

//empty Task list
void
ToDoList::empty()
{
    _taskList.clear();
}

//save the list data to file
void
ToDoList::save(string saveFileName)
{

}

//load list data from file
void
ToDoList::load(string loadFileName)
{

}