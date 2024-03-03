OPTS = -g -Wall -ansi -pedantic -std=c++20

OBJS = main.o ToDoList.o Task.o

CC = g++ -c $(OPTS) 
LN = g++

run: $(OBJS)
	$(LN) -o run $(OBJS)

main.o: main.cpp
	$(CC) main.cpp

ToDoList.o: ToDoList.cpp Task.hpp
	$(CC) ToDoList.cpp

Task.o: Task.cpp 	
	$(CC) Task.cpp