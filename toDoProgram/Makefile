OPTS = -g -Wall -ansi -pedantic -std=c++20

OBJS = main.o ToDoList.o

CC = g++ -c $(OPTS) 
LN = g++

run: $(OBJS)
	$(LN) -o run $(OBJS)

main.o: main.cpp
	$(CC) main.cpp

ToDoList.o: ToDoList.cpp
	$(CC) ToDoList.cpp