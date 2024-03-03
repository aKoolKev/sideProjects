#ifndef _TASK_HPP_
#define _TASK_HPP_

#include <iostream>

class Task
{
private: 

    std::string _description; // the task to complete
    
    
    // task due date
    int _month;
    int _day;
    int _year;

    int _importance; // urgency of the task

    bool _status; // is this task complete or not?

public:

    //default constructor 
    Task(std::string descrip, int m, int d, int y, int importance, bool status): 
    _description(descrip), _month(m), _day(d), _year(y), _importance(importance), _status(status){}


    //print out task info
    void printTask();

    //accessor/modifier methods
    std::string getDescription() const {return _description;}
    std::string & getDescription(){return _description;}

    int getMonth() const {return _month;}
    int & getMonth() {return _month;}

    int getDay() const {return _day;}
    int & getDay() {return _day;}

    int getYear() const {return _year;}
    int & getYear() {return _year;}

    int getImportance() const {return _importance;}
    int & getImportance() {return _importance;}

    bool getStatus() const {return _status;}
    bool & getStatus() {return _status;}

    

};

#endif
