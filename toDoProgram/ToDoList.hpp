#ifndef _TODOLIST_HPP_
#define _TODOLIST_HPP_

#include <list>
#include "Task.hpp"

class ToDoList
{
private:
    std::list<Task> _taskList; // holds the list of tasks

public:

    //constructor
    ToDoList();

    //print out the ToDoList
    void print();

    //insert a Task to the list
    void insert(Task toInsert);

    //remove a Task in the list
    void remove(Task toRemove);

    //empty Task list
    void empty();

    //save the list data to file
    void save(std::string saveFileName);

    //load list data from file
    void load(std::string loadFileName);
};

#endif